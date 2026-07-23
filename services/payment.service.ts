import "server-only";
import { connectDB } from "@/lib/db";
import { PaymentModel } from "@/models/payment.model";
import type { IPayment } from "@/types/payment";

function toPayment(payment: IPayment): IPayment {
  return { ...payment, _id: String(payment._id) };
}

export async function getPaymentsByUserId(userId: string) {
  await connectDB();
  const payments = await PaymentModel.find({ userId }).sort({ createdAt: -1 }).lean<IPayment[]>().exec();
  return payments.map(toPayment);
}
