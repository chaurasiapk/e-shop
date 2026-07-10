import ProductDetails from "@/components/product/product-details";
import { getProductById } from "@/lib/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product_id: string }>;
}): Promise<Metadata> {
  const { product_id } = await params;
  const product = getProductById(product_id);

  if (!product) {
    return { title: "Product Not Found | E-Shop" };
  }

  return {
    title: `${product.name} | E-Shop`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ product_id: string }>;
}) {
  const { product_id } = await params;
  const product = getProductById(product_id);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </div>
    </main>
  );
}
