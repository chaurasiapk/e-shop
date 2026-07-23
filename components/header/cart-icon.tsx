import { getCurrentCart } from "@/features/cart";
import { getCurrentUser } from "@/features/auth";
import CartIconClient from "./cart-icon-client";

export default async function CartIcon() {
  const [user, cart] = await Promise.all([getCurrentUser(), getCurrentCart()]);
  console.log(cart);
  
  return <CartIconClient initialCount={cart?.items.length ?? 0} isAuthenticated={Boolean(user)} />;
}
