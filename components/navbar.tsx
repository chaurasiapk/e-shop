"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ICategory } from "@/types/categories";

export default function Navbar({ categories }: { categories: ICategory[] }) {
  const pathname = usePathname();
  const categorySlug = pathname === "/" ? undefined : pathname.slice(1);

  return (
    Array.isArray(categories) &&
    categories.length && (
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((category) => {
              const isActive = categorySlug === category.slug;
              return (
                <Link
                  key={category._id}
                  href={`/categories/${category.slug}`}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-white text-primary border border-primary/30 hover:bg-primary-light"
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}
