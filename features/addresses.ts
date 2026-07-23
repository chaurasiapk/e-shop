"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { requireCurrentUser } from "@/features/auth";
import { createAddress, getAddressesByUserId, setDefaultAddress } from "@/services/address.service";
import type { AddressInput } from "@/types/address";

export type AddressActionState = { error?: string; success?: boolean };

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export async function getUserAddresses() {
  const user = await requireCurrentUser();
  return getAddressesByUserId(user._id);
}

export async function createAddressAction(_: AddressActionState, formData: FormData): Promise<AddressActionState> {
  const input: AddressInput = {
    fullName: field(formData, "fullName"),
    phone: field(formData, "phone"),
    addressLine1: field(formData, "addressLine1"),
    addressLine2: field(formData, "addressLine2") || undefined,
    city: field(formData, "city"),
    state: field(formData, "state"),
    postalCode: field(formData, "postalCode"),
    country: field(formData, "country") || "India",
  };

  if (Object.values(input).some((value) => value === "")) {
    return { error: "Complete all required address fields." };
  }
  if (!/^\d{6}$/.test(input.postalCode)) return { error: "Enter a valid 6-digit postal code." };

  const user = await requireCurrentUser();
  await createAddress(user._id, `address_${randomUUID()}`, input);
  revalidatePath("/profile/addresses");
  return { success: true };
}

export async function setDefaultAddressAction(addressId: string) {
  if (!addressId) throw new Error("An address is required.");
  const user = await requireCurrentUser();
  const address = await setDefaultAddress(user._id, addressId);
  if (!address) throw new Error("Address not found.");
  revalidatePath("/profile/addresses")
}
