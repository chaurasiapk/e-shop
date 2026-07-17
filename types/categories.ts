export type ICategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  parentCategoryId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// export type ICategoryOffer = {
//   id: string;
//   eventLabel: string;
//   title: string;
//   price: number;
//   originalPrice: number;
//   tagline: string;
//   emiAmount: number;
//   rating: number;
//   image: string;
//   bg: string;
// };
