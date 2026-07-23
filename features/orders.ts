"use server";

import { requireCurrentUser } from "@/features/auth";
import { getOrdersByUserId } from "@/services/order.service";

export async function getUserOrders() {
  const user = await requireCurrentUser();
  return getOrdersByUserId(user._id);
}
