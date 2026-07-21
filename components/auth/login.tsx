"use client";

import { useActionState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { loginAction } from "@/features/auth";
import AuthField from "./auth-field";
import AuthHeading from "./auth-heading";
import AuthSocialSignIn from "./auth-social-sign-in";

export default function Login() {
  const [state, formAction, isPending] = useActionState(loginAction, {});

  return (
    <>
      <AuthHeading title="Welcome Back" description="Please enter your details to sign in" icon={<LockKeyhole className="h-5 w-5" />} />
      <form action={formAction} className="space-y-4">
        <AuthField label="Email address" name="email" type="email" placeholder="Enter your email" icon={<Mail className="h-4 w-4" />} />
        <AuthField label="Password" name="password" type="password" placeholder="Enter your password" icon={<LockKeyhole className="h-4 w-4" />} />
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
            Remember me
          </label>
          <Link href="#" className="font-medium text-primary hover:underline">Forgot password?</Link>
        </div>
        {state.error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{state.error}</p>}
        <button disabled={isPending} type="submit" className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60">
          {isPending ? "Logging in..." : "Log in"}
        </button>
      </form>
      <AuthSocialSignIn />
      <p className="mt-7 text-center text-sm text-gray-500">
        Don’t have an account? <Link href="/register" className="font-semibold text-primary hover:underline">Sign up</Link>
      </p>
    </>
  );
}
