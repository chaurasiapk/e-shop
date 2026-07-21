import type { ReactNode } from "react";

export default function AuthField({
  label,
  name,
  placeholder,
  icon,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  icon: ReactNode;
  type?: "text" | "email" | "password";
}) {
  return (
    <label className="block text-xs font-medium text-gray-700">
      {label}
      <span className="relative mt-1.5 block">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
          {icon}
        </span>
        <input
          required
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
        />
      </span>
    </label>
  );
}
