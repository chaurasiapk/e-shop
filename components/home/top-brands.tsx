import Image from "next/image";
import SectionHeader from "./section-header";
import { getAllBrands } from "@/features/brands";
import { BRANDS_BG, OFFER_BG } from "@/utils/contants";

export default async function TopBrands() {
  const { brands } = await getAllBrands();
  const topBrands = brands.slice(0, 4);

  return (
    <section>
      <SectionHeader title="Top Brands" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topBrands.map((brand) => (
          <div
            key={brand._id}
            className={`rounded-2xl overflow-hidden relative h-48 md:h-56 cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br ${BRANDS_BG}`}
          >
            <div className="p-6 relative z-10">
              <h3 className="text-xl font-bold text-[#ffffff]">{brand.name}</h3>
              <p className="text-sm font-semibold text-[#ffffff] mt-1">
                {brand.description}
              </p>
            </div>
            <div className="absolute right-4 bottom-0 w-40 h-36">
              <Image
                src={brand.logo}
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
