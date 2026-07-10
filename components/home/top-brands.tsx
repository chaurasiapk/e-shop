import Image from "next/image";
import { topBrands } from "@/lib/data";
import SectionHeader from "./section-header";

export default function TopBrands() {
  return (
    <section>
      <SectionHeader title="Top Top Brands" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topBrands.map((brand) => (
          <div
            key={brand.name}
            className={`${brand.bg} rounded-2xl overflow-hidden relative h-48 md:h-56 cursor-pointer hover:shadow-lg transition-shadow`}
          >
            <div className="p-6 relative z-10">
              <h3 className="text-xl font-bold text-gray-800">{brand.name}</h3>
              <p className="text-sm font-semibold text-primary mt-1">
                {brand.subtitle}
              </p>
            </div>
            <div className="absolute right-4 bottom-0 w-40 h-36">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain object-bottom"
                sizes="160px"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i === 0 ? "bg-primary" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
