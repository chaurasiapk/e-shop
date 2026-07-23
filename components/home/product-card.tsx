"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { addProductToCart } from "@/features/cart";
import { toggleWishlistProduct } from "@/features/wishlist";
import type { IProduct } from "@/types/products";
import { addGuestCartItem } from "@/utils/guest-cart";
import { formatPrice } from "@/utils/helper";
import { useWishlist } from "@/components/wishlist/wishlist-provider";

export default function ProductCard({
  name,
  price,
  originalPrice,
  discount,
  images,
  thumbnail,
  _id: productId,
  className = "",
}: IProduct & { className?: string }) {
  const router = useRouter();
  const { isAuthenticated, isWishlisted, setWishlisted } = useWishlist();
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const savings = originalPrice - price;

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setMessage("");

    startTransition(async () => {
      try {
        if (isAuthenticated) {
          await addProductToCart(productId);
        } else {
          addGuestCartItem({ productId, name, thumbnail, price, originalPrice, quantity: 1 });
        }
        setMessage("Added to cart");
      } catch (cause) {
        setMessage(cause instanceof Error ? cause.message : "Unable to add to cart");
      }
    });
  };

  const handleWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthenticated) {
      router.push(`/login?next=/products/${productId}`);
      return;
    }

    setMessage("");
    startTransition(async () => {
      try {
        const result = await toggleWishlistProduct(productId);
        setWishlisted(productId, result.isWishlisted);
        setMessage(result.isWishlisted ? "Added to wishlist" : "Removed from wishlist");
      } catch (cause) {
        setMessage(cause instanceof Error ? cause.message : "Unable to update wishlist");
      }
    });
  };

  return (
    <Link
      href={`/products/${productId}`}
      className={`group relative flex w-[180px] shrink-0 flex-col rounded-xl border border-gray-100 bg-white p-4 transition-shadow hover:shadow-md sm:w-auto ${className}`}
    >
      <div className="relative mb-3">
        <div className="absolute left-0 top-0 z-10 flex gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <button type="button" onClick={handleAddToCart} disabled={isPending} aria-label={`Add ${name} to cart`} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:bg-primary hover:text-white disabled:opacity-50">
            <ShoppingCart className="h-4 w-4" />
          </button>
          <button type="button" onClick={handleWishlist} disabled={isPending} aria-label={`${isWishlisted(productId) ? "Remove" : "Add"} ${name} ${isWishlisted(productId) ? "from" : "to"} wishlist`} className={`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-rose-200 disabled:opacity-50 ${isWishlisted(productId) ? "text-rose-500" : "text-gray-700"}`}>
            <Heart className={`h-4 w-4 ${isWishlisted(productId) ? "fill-current" : ""}`} />
          </button>
        </div>
        {!!discount && <span className="absolute right-0 top-0 z-10 rounded-md bg-primary px-2 py-1 text-xs font-semibold text-white">{discount}% OFF</span>}
        <div className="relative aspect-square w-full">
          <Image src={images[0]} alt={name} fill className="object-contain" sizes="200px" />
        </div>
      </div>
      <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-800">{name}</h3>
      <div className="mt-auto">
        <p className="text-base font-bold text-gray-900">{formatPrice(price)}</p>
        <p className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</p>
        <p className="mt-1 text-xs font-medium text-success">Save - {formatPrice(savings)}</p>
      </div>
      <span aria-live="polite" className="sr-only">{message}</span>
    </Link>
  );
}
