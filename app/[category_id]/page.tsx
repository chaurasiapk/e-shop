import {
  getBrandsByCategory,
  getCategoryById,
  getOffersByCategory,
  getProductsByCategory,
} from "@/lib/data";
import OffersCarousel from "@/components/category/offers-carousel";
import BrandGrid from "@/components/category/brand-grid";
import ProductGrid from "@/components/category/product-grid";
import { notFound } from "next/navigation";

export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ category_id: string }>;
}) {
  const { category_id } = await params;
  const category = getCategoryById(category_id);

  if (!category) {
    notFound();
  }

  const offers = getOffersByCategory(category_id);
  const brands = getBrandsByCategory(category_id);
  const products = getProductsByCategory(category_id);

  return (
    <main className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <OffersCarousel offers={offers} />
        <BrandGrid brands={brands} categoryName={category.category_name} />
        <ProductGrid
          products={products}
          title={`Top Rated ${category.category_name}`}
        />
        {products.length === 0 && offers.length === 0 && brands.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium">No items found for this category yet.</p>
            <p className="text-sm mt-2">Check back soon for new arrivals.</p>
          </div>
        )}
      </div>
    </main>
  );
}
