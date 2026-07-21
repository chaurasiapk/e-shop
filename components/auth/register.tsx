"use client";

import { useActionState } from "react";
import { Eye, LockKeyhole, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { registerAction } from "@/features/auth";
import AuthField from "./auth-field";
import AuthHeading from "./auth-heading";
import AuthSocialSignIn from "./auth-social-sign-in";

export default function Register() {
  const [state, formAction, isPending] = useActionState(registerAction, {});

  return (
    <>
      <AuthHeading title="Create your account" description="Start shopping with E-Shop today" icon={<UserRound className="h-5 w-5" />} />
      <form action={formAction} className="space-y-4">
        <AuthField label="Full name" name="name" placeholder="Enter your full name" icon={<UserRound className="h-4 w-4" />} />
        <AuthField label="Email address" name="email" type="email" placeholder="Enter your email" icon={<Mail className="h-4 w-4" />} />
        <AuthField label="Password" name="password" type="password" placeholder="Enter your password" icon={<LockKeyhole className="h-4 w-4" />} />
        <AuthField label="Confirm password" name="confirmPassword" type="password" placeholder="Confirm your password" icon={<Eye className="h-4 w-4" />} />
        <label className="flex items-start gap-2 text-xs leading-5 text-gray-600">
          <input required name="terms" type="checkbox" className="mt-0.5 rounded border-gray-300 text-primary focus:ring-primary" />
          I agree to the Terms of Service and Privacy Policy.
        </label>
        {state.error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{state.error}</p>}
        <button disabled={isPending} type="submit" className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60">
          {isPending ? "Creating account..." : "Create account"}
        </button>
      </form>
      <AuthSocialSignIn />
      <p className="mt-7 text-center text-sm text-gray-500">
        Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Log in</Link>
      </p>
    </>
  );
}
