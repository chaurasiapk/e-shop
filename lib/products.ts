import {
  computerAccessories,
  formatPrice,
  laptops,
  smartphones,
  type CategoryProduct,
} from "@/lib/data";

export type ProductVariant = {
  id: string;
  label: string;
  image: string;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductDetail = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  sku: string;
  categoryId: string;
  categoryLabel: string;
  tag: string;
  images: string[];
  variants: ProductVariant[];
  variantLabel: string;
  description: string;
  specifications: ProductSpecification[];
  moreInfo: string;
  emiAmount: number;
  saleEndsAt: string;
};

type RawProduct = CategoryProduct & Record<string, unknown>;

const allProducts: { categoryId: string; categoryLabel: string; product: RawProduct }[] = [
  ...smartphones.map((product) => ({
    categoryId: "mobile",
    categoryLabel: "Smartphone",
    product: product as RawProduct,
  })),
  ...laptops.map((product) => ({
    categoryId: "laptop",
    categoryLabel: "Laptop",
    product: product as RawProduct,
  })),
  ...computerAccessories.map((product) => ({
    categoryId: "accessories",
    categoryLabel: (product.category as string) ?? "Accessory",
    product: product as RawProduct,
  })),
];

const galleryFallbacks: Record<string, string[]> = {
  mobile: [
    "https://images.pexels.com/photos/9667336/pexels-photo-9667336.jpeg",
    "https://images.pexels.com/photos/1092675/pexels-photo-1092675.jpeg",
    "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
    "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg",
    "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
  ],
  laptop: [
    "https://images.pexels.com/photos/34130516/pexels-photo-34130516.jpeg",
    "https://images.pexels.com/photos/18105/pexels-photo.jpg",
    "https://images.pexels.com/photos/7974/pexels-photo.jpg",
    "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg",
    "https://images.pexels.com/photos/797875/pexels-photo-797875.jpeg",
  ],
  accessories: [
    "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg",
    "https://images.pexels.com/photos/7531569/pexels-photo-7531569.jpeg",
    "https://images.pexels.com/photos/3921817/pexels-photo-3921817.jpeg",
    "https://images.pexels.com/photos/27095031/pexels-photo-27095031.jpeg",
    "https://images.pexels.com/photos/7643947/pexels-photo-7643947.jpeg",
  ],
};

const colorVariants = ["Black", "White", "Blue", "Green", "Silver"];
const storageVariants = ["128GB", "256GB", "512GB", "1TB"];

function buildSku(product: RawProduct, categoryId: string) {
  const prefix = categoryId.slice(0, 2).toUpperCase();
  return `${prefix}${product.id.slice(-6).toUpperCase()}`;
}

function buildVariants(
  product: RawProduct,
  categoryId: string,
  image: string,
): { variants: ProductVariant[]; variantLabel: string } {
  if (categoryId === "mobile") {
    const defaultColor = (product.color as string) ?? "Black";
    const labels = [
      defaultColor,
      ...colorVariants.filter((color) => color !== defaultColor),
    ].slice(0, 5);

    return {
      variantLabel: "Color",
      variants: labels.map((label, index) => ({
        id: `${product.id}-${label.toLowerCase()}`,
        label,
        image,
      })),
    };
  }

  if (categoryId === "laptop") {
    const defaultStorage = (product.storage as string) ?? "256GB";
    const labels = [
      defaultStorage,
      ...storageVariants.filter((storage) => storage !== defaultStorage),
    ].slice(0, 4);

    return {
      variantLabel: "Storage",
      variants: labels.map((label) => ({
        id: `${product.id}-${label.toLowerCase()}`,
        label,
        image,
      })),
    };
  }

  return {
    variantLabel: "Option",
    variants: [
      { id: `${product.id}-default`, label: "Standard", image },
    ],
  };
}

function buildSpecifications(
  product: RawProduct,
  categoryId: string,
  categoryLabel: string,
): ProductSpecification[] {
  const specs: ProductSpecification[] = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: categoryLabel },
  ];

  if (product.ram) specs.push({ label: "RAM", value: String(product.ram) });
  if (product.storage) {
    specs.push({ label: "Storage", value: String(product.storage) });
  }
  if (product.processor) {
    specs.push({ label: "Processor", value: String(product.processor) });
  }
  if (product.display) {
    specs.push({ label: "Display", value: String(product.display) });
  }
  if (product.color) specs.push({ label: "Color", value: String(product.color) });
  if (product.connectivity) {
    specs.push({ label: "Connectivity", value: String(product.connectivity) });
  }

  if (categoryId === "mobile") {
    specs.push(
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
      { label: "Country of Origin", value: "India" },
    );
  }

  return specs;
}

function toProductDetail({
  categoryId,
  categoryLabel,
  product,
}: {
  categoryId: string;
  categoryLabel: string;
  product: RawProduct;
}): ProductDetail {
  const gallery = galleryFallbacks[categoryId] ?? galleryFallbacks.mobile;
  const image = product.image.startsWith("/images/")
    ? gallery[0]
    : product.image;
  const { variants, variantLabel } = buildVariants(product, categoryId, image);
  const saleEndsAt = new Date(
    Date.now() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
  ).toISOString();

  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    rating: product.rating,
    reviews: product.reviews,
    image,
    sku: buildSku(product, categoryId),
    categoryId,
    categoryLabel,
    tag: product.discount >= 10 ? "Sale" : "New",
    images: [image, ...gallery.slice(1, 5)],
    variants,
    variantLabel,
    description: `Experience the ${product.name} from ${product.brand}, crafted for everyday performance and premium build quality. Designed with attention to detail, this ${categoryLabel.toLowerCase()} delivers reliable performance, modern features, and a refined user experience. Ideal for customers looking for value, durability, and trusted brand assurance.`,
    specifications: buildSpecifications(product, categoryId, categoryLabel),
    moreInfo:
      "All products are 100% genuine and sourced from authorized distributors. Easy returns and exchanges are available within the return window. For bulk orders or corporate purchases, contact customer support.",
    emiAmount: Math.max(Math.round(product.price / 12), 258),
    saleEndsAt,
  };
}

export type CatalogProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  categoryId: string;
  categoryLabel: string;
};

export type ProductSort =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "discount";

export type ProductFilters = {
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  minDiscount: number;
  sort: ProductSort;
  search: string;
};

export type FilterOptions = {
  brands: string[];
  categories: { id: string; label: string }[];
  minPrice: number;
  maxPrice: number;
};

function toCatalogProduct({
  categoryId,
  categoryLabel,
  product,
}: {
  categoryId: string;
  categoryLabel: string;
  product: RawProduct;
}): CatalogProduct {
  const gallery = galleryFallbacks[categoryId] ?? galleryFallbacks.mobile;
  const image = product.image.startsWith("/images/")
    ? gallery[0]
    : product.image;

  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    rating: product.rating,
    reviews: product.reviews,
    image,
    categoryId,
    categoryLabel,
  };
}

export function getAllCatalogProducts(): CatalogProduct[] {
  return allProducts.map(toCatalogProduct);
}

export function getFilterOptions(products: CatalogProduct[]): FilterOptions {
  const categoryMap = new Map<string, string>();
  for (const product of products) {
    categoryMap.set(product.categoryId, product.categoryLabel);
  }

  const prices = products.map((product) => product.price);

  return {
    brands: [...new Set(products.map((product) => product.brand))].sort(),
    categories: [...categoryMap.entries()].map(([id, label]) => ({ id, label })),
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 0,
  };
}

export function filterCatalogProducts(
  products: CatalogProduct[],
  filters: ProductFilters,
): CatalogProduct[] {
  const search = filters.search.trim().toLowerCase();

  let result = products.filter((product) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.categoryId)
    ) {
      return false;
    }
    if (
      filters.brands.length > 0 &&
      !filters.brands.includes(product.brand)
    ) {
      return false;
    }
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    if (filters.minRating > 0 && product.rating < filters.minRating) {
      return false;
    }
    if (filters.minDiscount > 0 && product.discount < filters.minDiscount) {
      return false;
    }
    if (
      search &&
      !product.name.toLowerCase().includes(search) &&
      !product.brand.toLowerCase().includes(search)
    ) {
      return false;
    }
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      result = [...result].sort((a, b) => b.discount - a.discount);
      break;
    default:
      break;
  }

  return result;
}

export function createDefaultFilters(options: FilterOptions): ProductFilters {
  return {
    categories: [],
    brands: [],
    minPrice: options.minPrice,
    maxPrice: options.maxPrice,
    minRating: 0,
    minDiscount: 0,
    sort: "relevance",
    search: "",
  };
}

export function getProductById(productId: string): ProductDetail | undefined {
  const match = allProducts.find(({ product }) => product.id === productId);
  if (!match) return undefined;
  return toProductDetail(match);
}

export function getAllProductIds(): string[] {
  return allProducts.map(({ product }) => product.id);
}

export { formatPrice };
