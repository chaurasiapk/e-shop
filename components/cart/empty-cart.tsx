import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-16 text-center">
      <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Your cart is empty
      </h2>
      <p className="text-sm text-gray-500">Add items to get started.</p>
    </div>
  );
}
