import CartPage from "@/components/cart/cart-page";
import { getCurrentCart } from "@/features/cart";
import { getCurrentUser } from "@/features/auth";

export default async function Cart() {
  const cart = await getCurrentCart();
  const user = await getCurrentUser();
  
  return <CartPage initialItems={cart?.items ?? []} isAuthenticated={Boolean(user)} />;
}
