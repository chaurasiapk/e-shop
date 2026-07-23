"use client";

import { createContext, useContext, useMemo, useState } from "react";

type WishlistContextValue = {
  isAuthenticated: boolean;
  isWishlisted: (productId: string) => boolean;
  setWishlisted: (productId: string, value: boolean) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export default function WishlistProvider({
  initialProductIds,
  isAuthenticated,
  children,
}: {
  initialProductIds: string[];
  isAuthenticated: boolean;
  children: React.ReactNode;
}) {
  const [productIds, setProductIds] = useState(() => new Set(initialProductIds));

  const value = useMemo<WishlistContextValue>(() => ({
    isAuthenticated,
    isWishlisted: (productId) => productIds.has(productId),
    setWishlisted: (productId, value) => {
      setProductIds((current) => {
        const next = new Set(current);
        if (value) next.add(productId);
        else next.delete(productId);
        return next;
      });
    },
  }), [isAuthenticated, productIds]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const wishlist = useContext(WishlistContext);
  if (!wishlist) throw new Error("useWishlist must be used within WishlistProvider.");
  return wishlist;
}
