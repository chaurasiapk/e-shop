import Image from "next/image";
import type { CategoryBrand } from "@/lib/data";

interface BrandGridProps {
  brands: CategoryBrand[];
  categoryName: string;
}

export default function BrandGrid({ brands, categoryName }: BrandGridProps) {
  if (brands.length === 0) return null;

  return (
    <section>
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Shop by {categoryName} Brands
      </h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-x-3 gap-y-5">
        {brands.map((brand) => (
          <button
            key={brand.id}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-full aspect-square rounded-xl bg-primary-light/60 border border-primary/10 p-2 flex items-center justify-center overflow-hidden group-hover:border-primary/40 transition-colors">
              <div className="relative w-full h-full">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
            </div>
            <span className="text-[11px] sm:text-xs text-gray-800 text-center leading-tight line-clamp-2">
              {brand.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
