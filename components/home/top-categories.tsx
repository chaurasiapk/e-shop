import Image from "next/image";
import SectionHeader from "./section-header";
import Link from "next/link";
import { getCategories } from "@/features/categories";

export default async function TopCategories() {
  const { categories } = await getCategories();

  return (
    <section>
      <SectionHeader
        title="Shop From Top Categories"
        viewAllHref="/categories"
      />
      <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category.slug}`}
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors ">
              <div className="relative w-full h-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            </div>
            <span className="text-sm text-gray-700 font-medium">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
