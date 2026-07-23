"use server";

import { requireCurrentUser } from "@/features/auth";
import { getPaymentsByUserId } from "@/services/payment.service";

export async function getUserPayments() {
  const user = await requireCurrentUser();
  return getPaymentsByUserId(user._id);
}
