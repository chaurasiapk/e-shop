import "server-only";
import { connectDB } from "@/lib/db";
import { WishlistModel } from "@/models/wishlist.model";
import type { IWishlist } from "@/types/wishlist";

function toWishlist(wishlist: IWishlist): IWishlist {
  return { ...wishlist, _id: String(wishlist._id) };
}

export async function getWishlistByUserId(userId: string): Promise<IWishlist | null> {
  await connectDB();
  const wishlist = await WishlistModel.findOne({ userId }).lean<IWishlist | null>().exec();
  return wishlist ? toWishlist(wishlist) : null;
}

export async function toggleWishlistProduct(userId: string, productId: string) {
  await connectDB();
  const wishlist = await WishlistModel.findOne({ userId });

  if (!wishlist) {
    await WishlistModel.create({ _id: `wishlist_${userId}`, userId, productIds: [productId] });
    return true;
  }

  const isWishlisted = wishlist.productIds.includes(productId);
  wishlist.productIds = isWishlisted
    ? wishlist.productIds.filter((id: string) => id !== productId)
    : [...wishlist.productIds, productId];
  await wishlist.save();
  return !isWishlisted;
}

export async function addWishlistProduct(userId: string, productId: string) {
  await connectDB();
  const wishlist = await WishlistModel.findOne({ userId });

  if (!wishlist) {
    await WishlistModel.create({ _id: `wishlist_${userId}`, userId, productIds: [productId] });
    return;
  }

  if (!wishlist.productIds.includes(productId)) {
    wishlist.productIds.push(productId);
    await wishlist.save();
  }
}
