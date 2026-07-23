import ProductCard from "@/components/home/product-card";
import { getCurrentWishlist } from "@/features/wishlist";
import { getProductsDetails } from "@/services/product.service";

export default async function WishlistPage() {
  const wishlist = await getCurrentWishlist();
  const products = await Promise.all(
    (wishlist?.productIds ?? []).map(getProductsDetails),
  );
  const availableProducts = products.filter(
    (product): product is NonNullable<typeof product> => Boolean(product?.isActive),
  );

  console.log({availableProducts});
  

  return (
    <main className="flex-1 bg-surface">
      <section className="mx-auto w-full max-w-7xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        {availableProducts.length ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {availableProducts.map((product) => (
              <ProductCard key={product._id} {...product} className="w-full" />
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-xl bg-white p-8 text-center text-sm text-gray-500">
            Your wishlist is empty.
          </p>
        )}
      </section>
    </main>
  );
}
