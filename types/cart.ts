export type ICartItem = {
  productId: string;
  name: string;
  thumbnail: string;
  price: number;
  originalPrice: number;
  quantity: number;
  selected?: boolean;
};

export type ICart = {
  _id: string;
  userId: string;
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
};
