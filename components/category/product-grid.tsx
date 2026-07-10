import type { CategoryProduct } from "@/lib/data";
import ProductCard from "@/components/home/product-card";

interface ProductGridProps {
  products: CategoryProduct[];
  title: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-primary mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
