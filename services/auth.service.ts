import "server-only";
import { createHash, randomUUID } from "crypto";
import { connectDB } from "@/lib/db";
import { AuthSessionModel } from "@/models/auth-session.model";
import { UserModel } from "@/models/user.model";
import type { AuthUser, IUser } from "@/types/auth";

function toAuthUser(user: IUser): AuthUser {
  return {
    _id: String(user._id),
    name: user.name,
    email: user.email,
    isLockedIn: user.isLockedIn ?? false,
  };
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function findUserByEmail(email: string) {
  await connectDB();
  return UserModel.findOne({ email: email.toLowerCase() }).lean<IUser | null>().exec();
}

export async function createUser(name: string, email: string, passwordHash: string) {
  await connectDB();
  const user = await UserModel.create({
    _id: randomUUID(),
    name,
    email: email.toLowerCase(),
    passwordHash,
    isLockedIn: false,
  });
  return toAuthUser(user.toObject());
}

export async function createAuthSession(userId: string, token: string) {
  await connectDB();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await AuthSessionModel.create({
    _id: randomUUID(),
    userId,
    tokenHash: hashToken(token),
    expiresAt,
  });
  await UserModel.updateOne({ _id: userId }, { isLockedIn: true }).exec();
  return expiresAt;
}

export async function getUserBySessionToken(token: string) {
  await connectDB();
  const session = await AuthSessionModel.findOne({
    tokenHash: hashToken(token),
    expiresAt: { $gt: new Date() },
  }).lean().exec();
  if (!session) return null;

  const user = await UserModel.findById(session.userId).lean<IUser | null>().exec();
  return user ? toAuthUser(user) : null;
}

export async function deleteAuthSession(token: string) {
  await connectDB();
  const session = await AuthSessionModel.findOneAndDelete({
    tokenHash: hashToken(token),
  }).lean().exec();
  if (!session) return;

  const remainingSessions = await AuthSessionModel.countDocuments({
    userId: session.userId,
    expiresAt: { $gt: new Date() },
  }).exec();
  await UserModel.updateOne(
    { _id: session.userId },
    { isLockedIn: remainingSessions > 0 },
  ).exec();
}
