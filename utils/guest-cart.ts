"use client";

import type { ICartItem } from "@/types/cart";

const GUEST_CART_STORAGE_KEY = "e-shop-guest-cart";
const GUEST_CART_EVENT = "guest-cart-updated";

function readItems(): ICartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(GUEST_CART_STORAGE_KEY) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter(isCartItem);
  } catch {
    return [];
  }
}

function isCartItem(value: unknown): value is ICartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<ICartItem>;
  return typeof item.productId === "string" && typeof item.name === "string" &&
    typeof item.thumbnail === "string" && typeof item.price === "number" &&
    typeof item.originalPrice === "number" && typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) && item.quantity > 0;
}

function writeItems(items: ICartItem[]) {
  window.localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(GUEST_CART_EVENT));
}

export function getGuestCart() {
  return readItems();
}

export function addGuestCartItem(item: ICartItem) {
  const items = readItems();
  const existing = items.find((current) => current.productId === item.productId);
  if (existing) existing.quantity += item.quantity;
  else items.push(item);
  writeItems(items);
  return items;
}

export function updateGuestCartItemQuantity(productId: string, quantity: number) {
  const items = readItems().map((item) => item.productId === productId ? { ...item, quantity } : item);
  writeItems(items);
  return items;
}

export function removeGuestCartItem(productId: string) {
  const items = readItems().filter((item) => item.productId !== productId);
  writeItems(items);
  return items;
}

export function clearGuestCart() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(GUEST_CART_STORAGE_KEY);
  window.dispatchEvent(new Event(GUEST_CART_EVENT));
}

export function onGuestCartChange(listener: () => void) {
  window.addEventListener(GUEST_CART_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(GUEST_CART_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}
