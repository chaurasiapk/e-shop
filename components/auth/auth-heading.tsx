import type { ReactNode } from "react";

export default function AuthHeading({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
        {icon}
      </div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}