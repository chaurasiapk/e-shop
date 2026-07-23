import AuthShell from "@/components/auth/auth-shell";
import Register from "@/components/auth/register";
import { getCurrentUser } from "@/features/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (await getCurrentUser()) redirect("/");
  const { next } = await searchParams;
  return <AuthShell><Register next={next} /></AuthShell>;
}
