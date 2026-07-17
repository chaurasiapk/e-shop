"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const query = useSearchParams();
  const searchParams = query.get("search");
  const router = useRouter();

  const handleSearch = async (formData: FormData) => {
    const searchText = formData.get("search")?.toString();
    router.push(`/products?search=${searchText}`);
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto">
      <div className="relative">
        <form action={handleSearch}>
          <input
            defaultValue={searchParams ?? ""}
            type="search"
            name="search"
            placeholder="Search smartphones, laptops and more..."
            className="w-full pl-4 pr-12 py-3 bg-surface rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <button type="submit" className="cursor-pointer">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 h:color-red-500" />
          </button>
        </form>
      </div>
    </div>
  );
}
