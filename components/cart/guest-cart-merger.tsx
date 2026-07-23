"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { mergeGuestCart } from "@/features/cart";
import { clearGuestCart, getGuestCart } from "@/utils/guest-cart";

export default function GuestCartMerger() {
  const router = useRouter();
  const hasMerged = useRef(false);

  useEffect(() => {
    if (hasMerged.current) return;
    const guestItems = getGuestCart();
    if (!guestItems.length) return;

    hasMerged.current = true;
    void mergeGuestCart(guestItems.map(({ productId, quantity }) => ({ productId, quantity })))
      .then(() => {
        clearGuestCart();
        router.refresh();
      })
      .catch(() => {
        hasMerged.current = false;
      });
  }, [router]);

  return null;
}
