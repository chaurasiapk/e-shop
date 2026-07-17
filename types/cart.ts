export type ICartItem = {
  productId: string;
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
};

export type ICart = {
  _id: string;
  sessionId: string;
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
};
