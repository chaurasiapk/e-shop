import "server-only";
import { connectDB } from "@/lib/db";
import { OrderModel } from "@/models/order.model";
import type { IOrder } from "@/types/order";

function toOrder(order: IOrder): IOrder {
  return { ...order, _id: String(order._id) };
}

export async function getOrdersByUserId(userId: string) {
  await connectDB();
  const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 }).lean<IOrder[]>().exec();
  return orders.map(toOrder);
}
