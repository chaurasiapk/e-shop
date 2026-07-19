import "server-only";
import { Schema, models, model } from "mongoose";
import type { IDetailedProduct } from "@/types/products";

const productSchema = new Schema<IDetailedProduct>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    brand: { type: String, required: true, index: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    thumbnail: { type: String, required: true },
    images: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    specifications: { type: Map, of: String, default: {} },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export const ProductModel =
  models.Product ?? model<IDetailedProduct>("Product", productSchema);
