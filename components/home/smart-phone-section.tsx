import SectionHeader from "./section-header";
import ProductCard from "./product-card";
import { getAllProducts } from "@/features/products";

export default async function SmartphonesSection() {
  const { products } = await getAllProducts();
  const smartphones = products.filter(({ category }) => category === "mobile");
  return (
    <section>
      <SectionHeader
        title="Grab the best deal on Smartphones"
        viewAllHref="categories/mobile"
      />
      <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible">
        {smartphones
          .filter((_, index) => index < 5)
          .map((phone) => (
            <ProductCard key={phone._id} {...phone} />
          ))}
      </div>
    </section>
  );
}
