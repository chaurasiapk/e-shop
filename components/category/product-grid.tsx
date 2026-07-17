import ProductCard from "@/components/home/product-card";
import type { IProduct } from "@/types/products";

interface ProductGridProps {
  products: IProduct[];
  title: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-primary mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} className="w-full" />
        ))}
      </div>
    </section>
  );
}
