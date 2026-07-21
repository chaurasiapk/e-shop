import { getCurrentUser } from "@/features/auth";
import { Mail, ShieldCheck, UserRound } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <main className="flex flex-1 bg-surface">
      <section className="mx-auto w-full max-w-7xl rounded-2xl bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
            <UserRound className="h-7 w-7" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="mt-1 text-sm text-gray-500">E-Shop account details</p>
          </div>
        </div>

        <dl className="mt-6 space-y-5">
          <ProfileDetail icon={<UserRound className="h-5 w-5" />} label="Name" value={user.name} />
          <ProfileDetail icon={<Mail className="h-5 w-5" />} label="Email address" value={user.email} />
          <ProfileDetail icon={<ShieldCheck className="h-5 w-5" />} label="Account status" value={user.isLockedIn ? "Signed in" : "Inactive"} />
        </dl>
      </section>
    </main>
  );
}

function ProfileDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-primary">{icon}</span>
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</dt>
        <dd className="mt-1 text-sm font-medium text-gray-900">{value}</dd>
      </div>
    </div>
  );
}
