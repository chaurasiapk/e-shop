export type ISepecification = {
  [key: string]: string | undefined;
};
export interface IDetailedProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  thumbnail: string;
  images: string[];
  rating: number;
  totalReviews: number;
  stock: number;
  specifications: ISepecification;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IProduct = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
  rating: number;
  images: string[];
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type IProducts = IProduct[];

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  productCategories: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFilterOptions {
  brands: {
    id: string;
    label: string;
  }[];
  categories: {
    id: string;
    label: string;
  }[];
  minPrice: number;
  maxPrice: number;
  minRating?: number;
  minDiscount?: number;
  sort?: string;
  search?: string;
}
