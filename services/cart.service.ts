import "server-only";
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

function toCart(cart: ICart): ICart {
  return {
    ...cart,
    _id: String(cart._id),
    items: cart.items.map((item) => ({
      ...item,
      originalPrice: item.originalPrice ?? item.price,
    })),
  };
}

export async function getCarts(): Promise<ICart[]> {
  await connectDB();
  const carts = await CartModel.find().lean<ICart[]>().exec();
  return carts.map(toCart);
}

export async function getCartByUserId(
  userId: string,
): Promise<ICart | null> {
  await connectDB();
  const cart = await CartModel.findOne({ userId })
    .lean<ICart | null>()
    .exec();
  if (!cart) return null;
  return toCart(cart);
}

export async function upsertCartItem(
  userId: string,
  item: ICartItem,
): Promise<ICart> {
  await connectDB();

  let cart = await CartModel.findOne({ userId });

  if (!cart) {
    const totals = summarize([item]);
    cart = await CartModel.create({
      _id: `cart_${userId}`,
      userId,
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
  return toCart(lean);
}

export async function updateCartItemQuantity(
  userId: string,
  productId: string,
  quantity: number,
): Promise<ICart | null> {
  await connectDB();
  const cart = await CartModel.findOne({ userId });
  if (!cart) return null;

  const item = cart.items.find(
    (cartItem: ICartItem) => cartItem.productId === productId,
  );
  if (!item) return null;

  item.quantity = quantity;
  const totals = summarize(cart.items);
  cart.totalItems = totals.totalItems;
  cart.totalPrice = totals.totalPrice;
  await cart.save();

  return toCart(cart.toObject());
}

export async function removeCartItem(
  userId: string,
  productId: string,
): Promise<ICart | null> {
  await connectDB();
  const cart = await CartModel.findOne({ userId });
  if (!cart) return null;

  const remainingItems = cart.items.filter(
    (cartItem: ICartItem) => cartItem.productId !== productId,
  );
  if (remainingItems.length === cart.items.length) return null;

  if (remainingItems.length === 0) {
    const deletedCart = toCart(cart.toObject());
    await CartModel.deleteOne({ _id: cart._id });
    return { ...deletedCart, items: [], totalItems: 0, totalPrice: 0 };
  }

  cart.items = remainingItems;
  const totals = summarize(remainingItems);
  cart.totalItems = totals.totalItems;
  cart.totalPrice = totals.totalPrice;
  await cart.save();

  return toCart(cart.toObject());
}
