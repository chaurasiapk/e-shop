import "server-only";
import { model, models, Schema } from "mongoose";
import type { IOrder } from "@/types/order";

const orderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    addressId: { type: String, required: true },
    items: { type: [orderItemSchema], required: true, validate: [(items: unknown[]) => items.length > 0, "An order needs at least one item."] },
    subtotal: { type: Number, required: true, min: 0 },
    shipping: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, required: true, enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"], default: "pending" },
    paymentStatus: { type: String, required: true, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },
  },
  { timestamps: true, versionKey: false },
);

export const OrderModel = models.Order ?? model<IOrder>("Order", orderSchema);
