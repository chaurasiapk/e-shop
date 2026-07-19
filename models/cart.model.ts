import "server-only";
import { Schema, models, model } from "mongoose";
import type { ICart } from "@/types/cart";

const cartItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const cartSchema = new Schema<ICart>(
  {
    _id: { type: String, required: true },
    sessionId: { type: String, required: true, index: true },
    items: { type: [cartItemSchema], default: [] },
    totalItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false },
);

export const CartModel = models.Cart ?? model<ICart>("Cart", cartSchema);
