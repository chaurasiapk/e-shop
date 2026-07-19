import "server-only";
import { connectDB } from "@/lib/db";
import { BrandModel } from "@/models/brand.model";
import type { IBrand } from "@/types/products";

export async function getBrands(): Promise<IBrand[]> {
  await connectDB();
  const brands = await BrandModel.find({ isActive: true })
    .lean<IBrand[]>()
    .exec();

  return brands.map((brand) => ({
    ...brand,
    _id: String(brand._id),
    productCategories: brand.productCategories ?? [],
  }));
}
