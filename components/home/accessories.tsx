import Image from "next/image";
import SectionHeader from "./section-header";
import Link from "next/link";
import { getAllProducts } from "@/features/products";

export default async function Accessories() {
  const { products  } =  await getAllProducts()
  
  return (
    <section>
      <SectionHeader title="Top Accessories" viewAllHref="categories/accessories"/>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 overflow-auto">
        {products.filter(({category})=>category==="accessories").map((item) => (
          <Link
            href={`categories/${item.category}`}
            key={item.name}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-full aspect-square rounded-2xl bg-white border border-gray-100 overflow-hidden group-hover:shadow-md transition-shadow">
              <div className="relative w-full h-full p-2">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover rounded-xl"
                  sizes="150px"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-800">{item.name}</p>
              <p className="text-xs text-primary font-semibold">
                {item.brand}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
