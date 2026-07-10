import { laptops } from "@/lib/data";
import SectionHeader from "./section-header";
import ProductCard from "./product-card";

export default function LaptopSection() {
  return (
    <section>
      <SectionHeader title="Grab the best deal on Laptops" viewAllHref="/laptop"/>
      <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible">
        {laptops.filter((_,index)=>index < 5).map((phone) => (
          <ProductCard key={phone.id} {...phone} />
        ))}
      </div>
    </section>
  );
}
