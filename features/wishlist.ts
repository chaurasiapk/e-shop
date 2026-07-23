"use server";

import { revalidatePath } from "next/cache";
import { requireCurrentUser } from "@/features/auth";
import { getProductsDetails } from "@/services/product.service";
import {
  getWishlistByUserId,
  toggleWishlistProduct as toggleWishlistProductForUser,
} from "@/services/wishlist.service";

export async function getCurrentWishlist() {
  const user = await requireCurrentUser();
  return getWishlistByUserId(user._id);
}

export async function toggleWishlistProduct(productId: string) {
  if (!productId) throw new Error("A product is required.");

  const [user, product] = await Promise.all([
    requireCurrentUser(),
    getProductsDetails(productId),
  ]);
  if (!product || !product.isActive) throw new Error("This product is unavailable.");

  const isWishlisted = await toggleWishlistProductForUser(user._id, productId);
  revalidatePath("/", "layout");
  revalidatePath("/profile/wishlist");
  return { isWishlisted };
}
