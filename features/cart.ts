"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  getCartBySession,
  removeCartItem,
  updateCartItemQuantity,
  upsertCartItem,
} from "@/services/cart.service";
import { getProductsDetails } from "@/services/product.service";
import type { ICartItem } from "@/types/cart";

const CART_SESSION_COOKIE = "e-shop-cart-session";

async function getCartSessionId(create = false) {
  const cookieStore = await cookies();
  const existingSessionId = cookieStore.get(CART_SESSION_COOKIE)?.value;
  if (existingSessionId || !create) return existingSessionId;

  const sessionId = randomUUID();
  cookieStore.set(CART_SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return sessionId;
}

export async function getCurrentCart() {
  const sessionId = await getCartSessionId();
  return sessionId ? getCartBySession(sessionId) : null;
}

export async function addProductToCart(productId: string) {
  if (!productId) throw new Error("A product is required.");

  const product = await getProductsDetails(productId);
  if (!product || !product.isActive || product.stock < 1) {
    throw new Error("This product is unavailable.");
  }

  const sessionId = await getCartSessionId(true);
  const existingCart = await getCartBySession(sessionId!);
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
  const cart = await upsertCartItem(sessionId!, item);
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

  const sessionId = await getCartSessionId();
  if (!sessionId) throw new Error("Your cart is empty.");
  const cart = await updateCartItemQuantity(sessionId, productId, quantity);
  if (!cart) throw new Error("Cart item not found.");
  revalidatePath("/cart");
  return cart;
}

export async function deleteCartItem(productId: string) {
  if (!productId) throw new Error("A product is required.");

  const sessionId = await getCartSessionId();
  if (!sessionId) throw new Error("Your cart is empty.");
  const cart = await removeCartItem(sessionId, productId);
  if (!cart) throw new Error("Cart item not found.");
  revalidatePath("/cart");
  return cart;
}
