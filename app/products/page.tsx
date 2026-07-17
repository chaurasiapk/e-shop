import { IProducts } from "@/types/products";

import ProductsListing from "@/components/products/products-listing";
import { getAllProducts, getFilterOptions } from "@/features/products";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | E-Shop",
  description: "Browse and filter smartphones, laptops, and accessories.",
};

export default async function ProductsPage() {
  const { products } = await getAllProducts()
  const filterOptions = await getFilterOptions(products as IProducts); 
   
  return (
    <main className="flex-1 bg-surface">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductsListing products={products} filterOptions={filterOptions} />
      </div>
    </main>
  );
}
