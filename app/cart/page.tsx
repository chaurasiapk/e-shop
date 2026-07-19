import CartPage from "@/components/cart/cart-page";
import { getCurrentCart } from "@/features/cart";

export default async function Cart() {
  const cart = await getCurrentCart();
  
  return <CartPage initialItems={cart?.items ?? []} />;
}
