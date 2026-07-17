// import "server-only";
import { connectDB } from "@/lib/db";
import { CartModel } from "@/models/cart.model";
import type { ICart, ICartItem } from "@/types/cart";

function summarize(items: ICartItem[]) {
  return {
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ),
  };
}

export async function getCarts(): Promise<ICart[]> {
  await connectDB();
  const carts = await CartModel.find().lean<ICart[]>().exec();
  return carts.map((cart) => ({ ...cart, _id: String(cart._id) }));
}

export async function getCartBySession(
  sessionId: string,
): Promise<ICart | null> {
  await connectDB();
  const cart = await CartModel.findOne({ sessionId })
    .lean<ICart | null>()
    .exec();
  if (!cart) return null;
  return { ...cart, _id: String(cart._id) };
}

export async function upsertCartItem(
  sessionId: string,
  item: ICartItem,
): Promise<ICart> {
  await connectDB();

  let cart = await CartModel.findOne({ sessionId });

  if (!cart) {
    const totals = summarize([item]);
    cart = await CartModel.create({
      _id: `cart_${Date.now()}`,
      sessionId,
      items: [item],
      ...totals,
    });
  } else {
    const existing = cart.items.find(
      (cartItem: ICartItem) => cartItem.productId === item.productId,
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }
    const totals = summarize(cart.items);
    cart.totalItems = totals.totalItems;
    cart.totalPrice = totals.totalPrice;
    await cart.save();
  }

  const lean = cart.toObject();
  return { ...lean, _id: String(lean._id) };
}
