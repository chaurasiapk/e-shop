import "server-only";
import { connectDB } from "@/lib/db";
import { CategoryModel } from "@/models/category.model";
import type { ICategory } from "@/types/categories";

export async function getCategories(): Promise<ICategory[]> {
  await connectDB();
  const categories = await CategoryModel.find({ isActive: true })
    .lean<ICategory[]>()
    .exec();

  return categories.map((category) => ({
    ...category,
    _id: String(category._id),
  }));
}
