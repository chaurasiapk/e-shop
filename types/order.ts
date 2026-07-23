export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export type IOrderItem = {
  productId: string;
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
};

export type IOrder = {
  _id: string;
  userId: string;
  addressId: string;
  items: IOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: Date;
  updatedAt: Date;
};
