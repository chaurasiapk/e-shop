import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth";
import AuthShell from "@/components/auth/auth-shell";
import Login from "@/components/auth/login";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (await getCurrentUser()) redirect("/");
  const { next } = await searchParams;
  return <AuthShell><Login next={next} /></AuthShell>;
}
