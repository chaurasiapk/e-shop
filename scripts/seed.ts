import "dotenv/config";
import mongoose from "mongoose";
import { brands, categories, products } from "../lib/data";
import { BrandModel } from "../models/brand.model";
import { CartModel } from "../models/cart.model";
import { CategoryModel } from "../models/category.model";
import { OfferModel } from "../models/offer.model";
import { ProductModel } from "../models/product.model";
import { brandLogos, productMedia } from "./seed-images";
import { extraProducts } from "./extra-products";

const MONGODB_URI =
  process.env.MONGO_URI ??
  process.env.MONGODB_URI ??
  "mongodb://127.0.0.1:27017/e-shop";

const offers = [
  {
    _id: "689000000000000000000001",
    categorySlug: "mobile",
    eventLabel: "Mobiles MAHOTSAV",
    title: "POVA Curve 2 5G",
    price: 28499,
    originalPrice: 31999,
    tagline: "World's Slimmest 8000mAh Curve Dis.",
    emiAmount: 4750,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    bg: "from-slate-800 via-slate-700 to-slate-900",
    isActive: true,
  },
  {
    _id: "689000000000000000000002",
    categorySlug: "mobile",
    eventLabel: "Mobiles MAHOTSAV",
    title: "motorola g96 5G",
    price: 15999,
    originalPrice: 25999,
    tagline: "Segment's Biggest 6000mAh Battery",
    emiAmount: 2667,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    bg: "from-rose-900 via-rose-800 to-rose-950",
    isActive: true,
  },
  {
    _id: "689000000000000000000003",
    categorySlug: "mobile",
    eventLabel: "Mobiles MAHOTSAV",
    title: "Galaxy S25 Ultra 512GB",
    price: 84999,
    originalPrice: 129999,
    tagline: "Galaxy AI is here",
    emiAmount: 14167,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    bg: "from-indigo-950 via-indigo-900 to-slate-900",
    isActive: true,
  },
  {
    _id: "689000000000000000000004",
    categorySlug: "laptop",
    eventLabel: "Laptop Fest",
    title: "MacBook Air M4",
    price: 114900,
    originalPrice: 119900,
    tagline: "Supercharged by Apple M4 chip",
    emiAmount: 9583,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    bg: "from-gray-800 via-gray-700 to-gray-900",
    isActive: true,
  },
  {
    _id: "689000000000000000000005",
    categorySlug: "laptop",
    eventLabel: "Laptop Fest",
    title: "ROG Zephyrus G16",
    price: 219999,
    originalPrice: 229999,
    tagline: "Gaming powerhouse with OLED display",
    emiAmount: 18333,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    bg: "from-zinc-900 via-zinc-800 to-black",
    isActive: true,
  },
];

function withProductMedia<T extends { slug: string; category: string }>(
  product: T,
) {
  const media = productMedia[product.slug];
  const categoryFix =
    product.category === "keyboard" ? "keyboards" : product.category;

  return {
    ...product,
    category: categoryFix,
    ...(media ?? {}),
  };
}

async function seed() {
  console.log(`Connecting to MongoDB...`);
  await mongoose.connect(MONGODB_URI, { dbName: "e-shop" });

  await Promise.all([
    CategoryModel.deleteMany({}),
    BrandModel.deleteMany({}),
    ProductModel.deleteMany({}),
    OfferModel.deleteMany({}),
    CartModel.deleteMany({}),
  ]);

  const brandsToInsert = brands.map((brand) => ({
    ...brand,
    logo: brandLogos[brand.slug] ?? brand.logo,
  }));

  const baseProducts = products.map(withProductMedia);
  // Avoid duplicate slug if MX Keys already in base as keyboard
  const allProducts = [
    ...baseProducts.filter((p) => p.slug !== "keychron-k2-v2"),
    ...extraProducts,
  ];

  // Deduplicate by slug
  const bySlug = new Map(allProducts.map((p) => [p.slug, p]));
  const productsToInsert = [...bySlug.values()];

  const iphoneThumb =
    productMedia["iphone-16"]?.thumbnail ??
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80";
  const macThumb =
    productMedia["macbook-air-13-m4"]?.thumbnail ??
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80";
  const mouseThumb =
    productMedia["mx-master-3s-wireless-mouse"]?.thumbnail ??
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80";

  const carts = [
    {
      _id: "68a000000000000000000001",
      sessionId: "demo-session-1",
      items: [
        {
          productId: "686f8d9b7a2c4e1f3b5d9a01",
          name: "iPhone 16",
          thumbnail: iphoneThumb,
          price: 79999,
          originalPrice: 79999,
          quantity: 1,
        },
        {
          productId: "686f8d9b7a2c4e1f3b5d9c01",
          name: "MX Master 3S Wireless Mouse",
          thumbnail: mouseThumb,
          price: 8995,
          originalPrice: 9995,
          quantity: 2,
        },
      ],
      totalItems: 3,
      totalPrice: 97989,
    },
    {
      _id: "68a000000000000000000002",
      sessionId: "demo-session-2",
      items: [
        {
          productId: "686f8d9b7a2c4e1f3b5d9b01",
          name: 'MacBook Air 13" M4',
          thumbnail: macThumb,
          price: 114900,
          originalPrice: 119900,
          quantity: 1,
        },
      ],
      totalItems: 1,
      totalPrice: 114900,
    },
  ];

  await CategoryModel.insertMany(categories);
  await BrandModel.insertMany(brandsToInsert);
  await ProductModel.insertMany(productsToInsert);
  await OfferModel.insertMany(offers);
  await CartModel.insertMany(carts);

  const counts = {
    categories: await CategoryModel.countDocuments(),
    brands: await BrandModel.countDocuments(),
    products: await ProductModel.countDocuments(),
    offers: await OfferModel.countDocuments(),
    carts: await CartModel.countDocuments(),
  };

  const perCategory = await ProductModel.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  console.log("Seed complete:", counts);
  console.log(
    "Products per category:",
    Object.fromEntries(perCategory.map((row) => [row._id, row.count])),
  );

  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error("Seed failed:", error);
  await mongoose.disconnect();
  process.exit(1);
});
