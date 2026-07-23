import { requireCurrentUser } from "@/features/auth";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireCurrentUser();
  return <div className="">{children}</div>;
}
