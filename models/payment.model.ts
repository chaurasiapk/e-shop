import "server-only";
import { model, models, Schema } from "mongoose";
import type { IPayment } from "@/types/payment";

const paymentSchema = new Schema<IPayment>(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    orderId: { type: String, required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, required: true, enum: ["cod", "card", "upi", "netbanking"] },
    status: { type: String, required: true, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },
    transactionId: { type: String, trim: true },
  },
  { timestamps: true, versionKey: false },
);

export const PaymentModel = models.Payment ?? model<IPayment>("Payment", paymentSchema);
