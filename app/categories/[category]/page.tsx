import OffersCarousel from "@/components/category/offers-carousel";
import BrandGrid from "@/components/category/brand-grid";
import ProductGrid from "@/components/category/product-grid";
import { notFound } from "next/navigation";
import { getCategories } from "@/features/categories";
import { getBrandsByCategory } from "@/features/brands";
import { getProductsByCategory } from "@/features/products";
import { getOffersByCategory } from "@/features/offers";

export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const { categories } = await getCategories();
  const category = categories.find(
    (categoryItem) => categoryItem.slug === categorySlug,
  );

  if (!category) {
    notFound();
  }

  const { categoryProducts: products } =
    await getProductsByCategory(categorySlug);
  const { categoryBrands: brands } = await getBrandsByCategory(categorySlug);
  const { offers } = await getOffersByCategory(categorySlug);

  return (
    <main className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <OffersCarousel offers={offers} />
        <BrandGrid
          brands={brands}
          categoryName={category.name}
          categorySlug={category.slug}
        />
        <ProductGrid products={products} title={`Top Rated ${category.name}`} />
        {products.length === 0 && offers.length === 0 && brands.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium">
              No items found for this category yet.
            </p>
            <p className="text-sm mt-2">Check back soon for new arrivals.</p>
          </div>
        )}
      </div>
    </main>
  );
}
