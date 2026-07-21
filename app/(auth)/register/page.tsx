import AuthShell from "@/components/auth/auth-shell";
import Register from "@/components/auth/register";
import { getCurrentUser } from "@/features/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/");
  return <AuthShell><Register /></AuthShell>;
}
