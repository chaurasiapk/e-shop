import ProductDetails from "@/components/product/product-details";
import { getProductsDetails } from "@/features/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const { product } = await getProductsDetails(productId);

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
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const { product } = await getProductsDetails(productId);

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
