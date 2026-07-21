import type { ReactNode } from "react";
import AuthBrandPanel from "./auth-brand-panel";

export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 items-center justify-center p-0 sm:p-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded sm:rounded-3xl shadow-2xl shadow-indigo-950/40 lg:grid-cols-[0.78fr_1.35fr]">
        <AuthBrandPanel />
        <section className="flex min-h-[590px] items-center justify-center bg-white px-6 py-12 sm:px-12">
          <div className="w-full max-w-sm">{children}</div>
        </section>
      </div>
    </main>
  );
}
