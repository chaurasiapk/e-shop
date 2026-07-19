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
