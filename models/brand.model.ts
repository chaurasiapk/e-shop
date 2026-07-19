import "server-only";
import { Schema, models, model } from "mongoose";
import type { IBrand } from "@/types/products";

const brandSchema = new Schema<IBrand>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    logo: { type: String, required: true },
    description: { type: String, required: true },
    productCategories: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export const BrandModel =
  models.Brand ?? model<IBrand>("Brand", brandSchema);
