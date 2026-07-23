"use server";

import { revalidatePath } from "next/cache";
import {
  getCartByUserId,
  removeCartItem,
  updateCartItemQuantity,
  upsertCartItem,
} from "@/services/cart.service";
import { getProductsDetails } from "@/services/product.service";
import type { ICartItem } from "@/types/cart";
import { getCurrentUser, requireCurrentUser } from "@/features/auth";

export type GuestCartItem = Pick<ICartItem, "productId" | "quantity">;

export async function getCurrentCart() {
  const user = await getCurrentUser();
  if (!user) return null;
  return getCartByUserId(user._id);
}

export async function addProductToCart(productId: string) {
  if (!productId) throw new Error("A product is required.");

  const product = await getProductsDetails(productId);
  if (!product || !product.isActive || product.stock < 1) {
    throw new Error("This product is unavailable.");
  }

  const user = await requireCurrentUser();
  const existingCart = await getCartByUserId(user._id);
  const existingItem = existingCart?.items.find(
    (item) => item.productId === product._id,
  );
  if ((existingItem?.quantity ?? 0) >= product.stock) {
    throw new Error("The requested quantity is unavailable.");
  }
  const item: ICartItem = {
    productId: product._id,
    name: product.name,
    thumbnail: product.thumbnail,
    price: product.price,
    originalPrice: product.originalPrice,
    quantity: 1,
  };
  const cart = await upsertCartItem(user._id, item);
  revalidatePath("/cart");
  return cart;
}

export async function changeCartItemQuantity(productId: string, quantity: number) {
  if (!productId || !Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Invalid quantity.");
  }

  const product = await getProductsDetails(productId);
  if (!product || !product.isActive || quantity > product.stock) {
    throw new Error("The requested quantity is unavailable.");
  }

  const user = await requireCurrentUser();
  const cart = await updateCartItemQuantity(user._id, productId, quantity);
  if (!cart) throw new Error("Cart item not found.");
  revalidatePath("/cart");
  return cart;
}

export async function deleteCartItem(productId: string) {
  if (!productId) throw new Error("A product is required.");

  const user = await requireCurrentUser();
  const cart = await removeCartItem(user._id, productId);
  if (!cart) throw new Error("Cart item not found.");
  revalidatePath("/", "layout");
  revalidatePath("/cart");
  return cart;
}

export async function mergeGuestCart(guestItems: GuestCartItem[]) {
  const user = await requireCurrentUser();
  const quantities = new Map<string, number>();

  for (const item of guestItems) {
    if (!item.productId || !Number.isInteger(item.quantity) || item.quantity < 1) continue;
    quantities.set(item.productId, (quantities.get(item.productId) ?? 0) + item.quantity);
  }

  for (const [productId, quantity] of quantities) {
    const product = await getProductsDetails(productId);
    if (!product || !product.isActive || product.stock < 1) continue;

    const cart = await getCartByUserId(user._id);
    const currentQuantity = cart?.items.find((item) => item.productId === productId)?.quantity ?? 0;
    const quantityToAdd = Math.min(quantity, Math.max(product.stock - currentQuantity, 0));
    if (!quantityToAdd) continue;

    await upsertCartItem(user._id, {
      productId: product._id,
      name: product.name,
      thumbnail: product.thumbnail,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: quantityToAdd,
    });
  }

  revalidatePath("/");
  revalidatePath("/cart");
}
