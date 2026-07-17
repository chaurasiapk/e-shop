import SectionHeader from "./section-header";
import ProductCard from "./product-card";
import { getAllProducts } from "@/features/products";

export default async function LaptopSection() {
  const { products } = await getAllProducts()
  const laptops = products.filter(({category})=>category==="laptop")
  return (
    <section>
      <SectionHeader title="Grab the best deal on Laptops" viewAllHref="categories/laptop"/>
      <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible">
        {laptops.filter((_,index)=>index < 5).map((laptop) => (
          <ProductCard key={laptop._id} {...(laptop)} />
        ))}
      </div>
    </section>
  );
}
