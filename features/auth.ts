"use server";

import { randomBytes } from "crypto";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { hashPassword, verifyPassword } from "@/lib/password";
import {
  createAuthSession,
  createUser,
  deleteAuthSession,
  findUserByEmail,
} from "@/services/auth.service";
import { getUserBySessionToken } from "@/services/auth.service";
import { AUTH_SESSION_COOKIE } from "@/utils/contants";

export type AuthActionState = { error?: string };

const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function startSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  await createAuthSession(userId, token);
  (await cookies()).set(AUTH_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function loginAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");
  if (!validEmail(email) || !password) return { error: "Enter a valid email and password." };

  const user = await findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Email or password is incorrect." };
  }

  await startSession(String(user._id));
  redirect("/");
}

export async function registerAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const name = value(formData, "name");
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");
  const confirmPassword = value(formData, "confirmPassword");
  const acceptedTerms = formData.get("terms") === "on";

  if (name.length < 2 || name.length > 80) return { error: "Enter a name between 2 and 80 characters." };
  if (!validEmail(email)) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== confirmPassword) return { error: "Passwords do not match." };
  if (!acceptedTerms) return { error: "Please accept the terms to continue." };
  if (await findUserByEmail(email)) return { error: "An account already exists for this email." };

  const user = await createUser(name, email, await hashPassword(password));
  await startSession(user._id);
  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_SESSION_COOKIE)?.value;
  if (token) await deleteAuthSession(token);
  cookieStore.delete(AUTH_SESSION_COOKIE);
  redirect("/");
}

export async function getCurrentUser() {
  const token = (await cookies()).get(AUTH_SESSION_COOKIE)?.value;
  return token ? getUserBySessionToken(token) : null;
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
