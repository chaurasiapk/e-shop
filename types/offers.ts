export type IOffer = {
  _id: string;
  categorySlug: string;
  eventLabel: string;
  title: string;
  price: number;
  originalPrice: number;
  tagline: string;
  emiAmount: number;
  rating: number;
  image: string;
  bg: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
