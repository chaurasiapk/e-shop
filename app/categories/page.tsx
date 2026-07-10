import Image from "next/image";
import { categories } from "@/lib/data";
import Link from "next/link";

export default function TopCategories() {
  return (
    <section>
      <div className="flex flex-wrap gap-6 justify-center md:justify-start  max-w-7xl mx-auto px-4 py-6 space-y-10 ">
        {categories.map((category) => (
          <Link 
            key={category.category_id}
            href={`/${category.category_id}`}
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            <div className="w-18 h-18 md:w-32 md:h-32 rounded-full bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors">
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
