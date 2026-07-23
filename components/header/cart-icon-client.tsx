"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { getGuestCart, onGuestCartChange } from "@/utils/guest-cart";

export default function CartIconClient({
  initialCount,
  isAuthenticated,
}: {
  initialCount: number;
  isAuthenticated: boolean;
}) {
  const [count, setCount] = useState(() =>
    isAuthenticated ? initialCount : getGuestCart().length,
  );

  useEffect(() => {
    if (isAuthenticated) return;

    const updateCount = () => setCount(getGuestCart().length);
    return onGuestCartChange(updateCount);
  }, [initialCount, isAuthenticated]);

  return (
    <Link
      href="/cart"
      className="flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
    >
      <div className="relative">
        <ShoppingCart className="h-5 w-5" />
        {!!count && (
          <span className="absolute top-[-10px] left-[40%] flex h-5 min-w-5 max-w-8 items-center justify-center overflow-hidden rounded-full bg-primary text-xs text-white">
            {count}
          </span>
        )}
      </div>
      <span className="hidden sm:inline">Cart</span>
    </Link>
  );
}
