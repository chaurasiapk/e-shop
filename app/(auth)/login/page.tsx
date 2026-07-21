import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth";
import AuthShell from "@/components/auth/auth-shell";
import Login from "@/components/auth/login";

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/");
  return <AuthShell><Login /></AuthShell>;
}
