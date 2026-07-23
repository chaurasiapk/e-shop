export type PaymentMethod = "cod" | "card" | "upi" | "netbanking";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type IPayment = {
  _id: string;
  userId: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
};
