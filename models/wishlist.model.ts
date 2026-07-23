import "server-only";
import { Schema, models, model } from "mongoose";
import type { IWishlist } from "@/types/wishlist";

const wishlistSchema = new Schema<IWishlist>(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    productIds: { type: [String], default: [] },
  },
  { timestamps: true, versionKey: false },
);

export const WishlistModel =
  models.Wishlist ?? model<IWishlist>("Wishlist", wishlistSchema);
