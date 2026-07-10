import Image from "next/image";
import { computerAccessories } from "@/lib/data";
import SectionHeader from "./section-header";
import Link from "next/link";

export default function Accessories() {
  return (
    <section>
      <SectionHeader title="Top Accessories" viewAllHref="/accessories"/>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 overflow-auto">
        {computerAccessories.filter((_,index)=>index < 6).map((item) => (
          <Link
            href={`/${item.id}`}
            key={item.name}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-full aspect-square rounded-2xl bg-white border border-gray-100 overflow-hidden group-hover:shadow-md transition-shadow">
              <div className="relative w-full h-full p-2">
                <Image
                  src={item.image}
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
                {/* {item.brand} */}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
