import "server-only";
import { connectDB } from "@/lib/db";
import { ProductModel } from "@/models/product.model";
import type { IDetailedProduct, IProduct } from "@/types/products";

function toProduct(doc: IDetailedProduct): IProduct {
  return {
    _id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    category: doc.category,
    brand: doc.brand,
    price: doc.price,
    originalPrice: doc.originalPrice,
    thumbnail: doc.thumbnail,
    rating: doc.rating,
    discount: doc.discount,
    images: doc.images,
    stock: doc.stock,
    isFeatured: doc.isFeatured,
    isActive: doc.isActive,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function toDetailedProduct(doc: IDetailedProduct): IDetailedProduct {
  const specifications =
    doc.specifications instanceof Map
      ? Object.fromEntries(doc.specifications)
      : (doc.specifications ?? {});

  return {
    ...doc,
    _id: String(doc._id),
    specifications,
  };
}

export async function getProducts(): Promise<IProduct[]> {
  await connectDB();
  const products = await ProductModel.find({ isActive: true })
    .lean<IDetailedProduct[]>()
    .exec();
  return products.map(toProduct);
}

export async function getProductsDetails(
  productId: string,
): Promise<IDetailedProduct | undefined> {
  await connectDB();
  const product = await ProductModel.findById(productId)
    .lean<IDetailedProduct | null>()
    .exec();
  return product ? toDetailedProduct(product) : undefined;
}
