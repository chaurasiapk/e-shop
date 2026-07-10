import Image from "next/image";
import { categories } from "@/lib/data";
import SectionHeader from "./section-header";
import Link from "next/link";

export default function TopCategories() {
  return (
    <section>
      <SectionHeader title="Shop From Top Categories" viewAllHref="/categories"/>
      <div className="flex gap-6 overflow-x-auto pb-2">
        {categories.filter(category=>category.category_types.includes("top_category")).map((category) => (
          <Link 
            key={category.category_id}
            href={`/${category.category_id}`}
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors">
              <div className="relative w-full h-full">
                <Image
                  src={category.category_image}
                  alt={category.category_name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            </div>
            <span className="text-sm text-gray-700 font-medium">
              {category.category_name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
