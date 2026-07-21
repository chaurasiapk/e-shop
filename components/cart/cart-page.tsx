"use client";
import { useState, useTransition } from "react";
import { ShoppingCart, ChevronRight, MapPin } from "lucide-react";
import { ICartItem } from "@/types/cart";
import CartItem from "./cart-item";
import OrderSummary from "./order-summary";
import EmptyCart from "./empty-cart";
import { changeCartItemQuantity, deleteCartItem } from "@/features/cart";

const CartHeader = ({ length }: { length: number }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-gray-800" />
          <h1 className="text-lg font-bold text-gray-900">Cart</h1>
          <span className="text-sm text-gray-400">
            ({length} {length === 1 ? "item" : "items"})
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="hidden sm:inline">Cart</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-400">Address</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-400">Payment</span>
        </div>
      </div>
    </header>
  );
};

const DeliveryBar = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">Deliver to:</span>
        <span className="text-sm font-semibold text-gray-800">
          Mumbai 400001
        </span>
        <span className="text-sm text-green-600">• Available</span>
      </div>
    </div>
  );
};

export default function CartPage({
  initialItems,
}: {
  initialItems: ICartItem[];
}) {
  const [items, setItems] = useState<ICartItem[]>(() =>
    initialItems.map((item) => ({ ...item, selected: true })),
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const selectedItems = items.filter((item) => item.selected);
  const orderValue = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const originalValue = selectedItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0,
  );
  const discount = originalValue - orderValue;
  const shipping = 0;
  const itemCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleToggleSelect = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const applyCart = (nextItems: ICartItem[]) => {
    setItems((currentItems) =>
      nextItems.map((item) => ({
        ...item,
        selected:
          currentItems.find((current) => current.productId === item.productId)
            ?.selected ?? true,
      })),
    );
  };

  const handleRemove = (id: string) => {
    setError(null);
    startTransition(async () => {
      try {
        const cart = await deleteCartItem(id);
        applyCart(cart.items);
      } catch (cause) {
        setError(
          cause instanceof Error ? cause.message : "Unable to remove item.",
        );
      }
    });
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find((currentItem) => currentItem.productId === id);
    if (!item) return;
    setError(null);
    startTransition(async () => {
      try {
        const cart = await changeCartItemQuantity(id, item.quantity + delta);
        applyCart(cart.items);
      } catch (cause) {
        setError(
          cause instanceof Error ? cause.message : "Unable to update quantity.",
        );
      }
    });
  };

  const allSelected = items.length > 0 && items.every((item) => item.selected);
  const handleToggleAll = () => {
    setItems((prev) =>
      prev.map((item) => ({ ...item, selected: !allSelected })),
    );
  };

  const handleCheckout = () => {
    alert(
      `Proceeding to checkout with ${itemCount} item(s) totaling ₹${(orderValue - discount + shipping).toLocaleString("en-IN")}`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <CartHeader length={items.length} />

      {/* Delivery bar */}
      <DeliveryBar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items list */}
            <div className="lg:col-span-2">
              {/* Select all */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3 flex items-center gap-3">
                <button
                  onClick={handleToggleAll}
                  className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
                    allSelected
                      ? "bg-primary border-primary"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {allSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <span className="text-sm font-medium text-gray-700">
                  Select All ({items.length}{" "}
                  {items.length === 1 ? "Item" : "Items"})
                </span>
              </div>

              {items.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onToggleSelect={handleToggleSelect}
                  onRemove={handleRemove}
                  onQuantityChange={handleQuantityChange}
                  disabled={isPending}
                />
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                itemCount={itemCount}
                orderValue={originalValue}
                discount={discount}
                shipping={shipping}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
