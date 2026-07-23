export type IWishlist = {
  _id: string;
  userId: string;
  productIds: string[];
  createdAt: Date;
  updatedAt: Date;
};
