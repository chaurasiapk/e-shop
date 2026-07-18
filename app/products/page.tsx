import { IProducts } from "@/types/products";

import ProductsListing from "@/components/products/products-listing";
import { getAllProducts, getFilterOptions } from "@/features/products";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | E-Shop",
  description: "Browse and filter smartphones, laptops, and accessories.",
};

type ProductsSearchParams = {
  category?: string | string[];
  brand?: string | string[];
  search?: string | string[];
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<ProductsSearchParams>;
}) {
  const params = await searchParams;
  const { products } = await getAllProducts();
  const filterOptions = await getFilterOptions(products as IProducts);
  const listingKey = [
    toParamKey(params.category),
    toParamKey(params.brand),
    toParamKey(params.search),
  ].join("|");

  return (
    <main className="flex-1 bg-surface">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductsListing
          key={listingKey}
          products={products}
          filterOptions={filterOptions}
          initialParams={params}
        />
      </div>
    </main>
  );
}

function toParamKey(value?: string | string[]) {
  if (!value) return "";
  return Array.isArray(value) ? value.join(",") : value;
}
