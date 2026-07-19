import { ChevronRight, Tag, CreditCard, MapPin } from 'lucide-react';

interface Props {
  itemCount: number;
  orderValue: number;
  discount: number;
  shipping: number;
  onCheckout: () => void;
}

export default function OrderSummary({ itemCount, orderValue, discount, shipping, onCheckout }: Props) {
  const grandTotal = orderValue - discount + shipping;

  return (
    <div className="space-y-3">
      {/* Delivery */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Check Delivery Availability</span>
          </div>
        </div>
        <div className="relative h-20 bg-amber-50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-end pr-4">
            <svg viewBox="0 0 200 80" className="w-full h-full opacity-60">
              <rect x="10" y="50" width="18" height="22" fill="#F59E0B" rx="2"/>
              <rect x="35" y="38" width="18" height="34" fill="#F59E0B" rx="2"/>
              <rect x="60" y="44" width="18" height="28" fill="#F59E0B" rx="2"/>
              <rect x="85" y="32" width="18" height="40" fill="#FBBF24" rx="2"/>
              <rect x="110" y="48" width="18" height="24" fill="#F59E0B" rx="2"/>
            </svg>
          </div>
          <div className="absolute bottom-3 right-6">
            <div className="flex items-center gap-1">
              <div className="w-12 h-6 bg-amber-500 rounded-sm flex items-center justify-center">
                <div className="w-10 h-4 bg-amber-400 rounded-sm" />
              </div>
              <div className="w-3 h-3 bg-amber-600 rounded-full border-2 border-amber-800" />
              <div className="w-3 h-3 bg-amber-600 rounded-full border-2 border-amber-800" />
            </div>
          </div>
          <div className="absolute top-3 right-16">
            <MapPin className="w-5 h-5 text-amber-600 fill-amber-400" />
          </div>
        </div>
        <div className="p-3">
          <button className="w-full border-2 border-gray-300 rounded text-xs font-bold tracking-widest text-gray-700 py-2.5 hover:border-gray-400 hover:bg-gray-50 transition-colors">
            ENTER PINCODE
          </button>
        </div>
      </div>

      {/* Coupons */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-800">Coupons & Offers</span>
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-500">No Coupons Available</span>
          <button className="text-sm font-semibold text-gray-800 hover:underline">View</button>
        </div>
        <div className="border-t border-gray-100 pt-3 mt-1">
          <button className="flex items-center justify-between w-full group">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">View payment offers</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </button>
        </div>
      </div>

      {/* Savings Banner */}
      {discount > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
          <span className="text-sm text-gray-700">
            {`You're saving `}
            <span className="font-bold text-green-600">
              ₹ {discount.toLocaleString('en-IN')}.00
            </span>{' '}
            on this purchase
          </span>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Order Summary{' '}
          <span className="font-normal text-gray-500 text-sm">({itemCount} {itemCount === 1 ? 'Item' : 'Items'})</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Order Value</span>
            <span className="text-sm text-gray-800">₹ {orderValue.toLocaleString('en-IN')}.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Shipping</span>
            <span className="text-sm font-semibold text-green-600">
              {shipping === 0 ? 'Free' : `₹ ${shipping.toLocaleString('en-IN')}.00`}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Product Discount</span>
              <span className="text-sm text-gray-800">− ₹ {discount.toLocaleString('en-IN')}.00</span>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4 flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">Grand Total</span>
          <span className="text-xl font-bold text-gray-900">
            ₹ {grandTotal.toLocaleString('en-IN')}.00
          </span>
        </div>

        <button
          onClick={onCheckout}
          className="bg-primary cursor-pointer mt-4 w-full text-white text-sm font-bold tracking-widest py-4 rounded-lg active:scale-[0.98] transition-all duration-150"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
}
