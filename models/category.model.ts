import "server-only";
import { Schema, models, model } from "mongoose";
import type { ICategory } from "@/types/categories";

const categorySchema = new Schema<ICategory>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    image: { type: String, required: true },
    parentCategoryId: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export const CategoryModel =
  models.Category ?? model<ICategory>("Category", categorySchema);
