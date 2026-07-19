import { getCurrentCart } from "@/features/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default async function CartIcon() {
  const cart = await getCurrentCart();
  const cartLength = cart?.items?.length;
  return (
    <Link
      href="/cart"
      className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer"
    >
      <div className="relative">
        <ShoppingCart className="w-5 h-5" />
        {!!cartLength && (
          <span className="absolute top-[-10px] left-[40%] bg-primary text-white rounded-full min-w-5 max-w-8 h-5 text-xs flex items-center justify-center overflow-hidden">{cartLength}</span>
        )}
      </div>
      <span className="hidden sm:inline">Cart</span>
    </Link>
  );
}
