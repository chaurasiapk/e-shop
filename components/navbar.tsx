"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { categories } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const categoryId = pathname === "/" ? undefined : pathname.slice(1);

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories
            .filter((category) => category.category_types.includes("nav"))
            .map((category) => {
              const isActive = categoryId === category.category_id;
              return (
                <Link
                  key={category.category_id}
                  href={`/${category.category_id}`}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-white text-primary border border-primary/30 hover:bg-primary-light"
                  }`}
                >
                  {category.category_name}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
