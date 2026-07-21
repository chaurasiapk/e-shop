import { ICartItem } from '@/types/cart';
import { X, RotateCcw, Truck } from 'lucide-react';
import Image from 'next/image';

interface Props {
  item: ICartItem;
  onToggleSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, delta: number) => void;
  disabled?: boolean;
}

export default function CartItem({ item, onToggleSelect, onRemove, onQuantityChange, disabled = false }: Props) {
  const discount = item.originalPrice > item.price
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-3 overflow-hidden">
      <div className="p-4">
        <div className="flex gap-4">
          {/* Checkbox + Image */}
          <div className="flex items-start gap-3 flex-shrink-0">
            <button
              onClick={() => onToggleSelect(item.productId)}
              aria-label={`Select ${item.name}`}
              disabled={disabled}
              className={`mt-1 w-5 h-5 rounded flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
                item.selected
                  ? 'bg-primary border-primary'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {item.selected && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div className="relative">
              <Image
                width={144}
                height={144}
                src={item.thumbnail}
                alt={item.name}
                className="w-36 h-36 object-cover rounded-md bg-gray-100"
              />
              {/* {item.offerEndsInDays > 0 && (
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-50 border border-amber-200 text-amber-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  Offer Ends in {item.offerEndsInDays} Days
                </span>
              )} */}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">
                  {item.name} | {item.productId}
                </p>
                <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">
                  {item.name}
                </h3>
              </div>
              <button
                onClick={() => onRemove(item.productId)}
                aria-label={`Remove ${item.name} from cart`}
                disabled={disabled}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-lg font-bold text-gray-900">
                ₹ {item.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-gray-400">MRP</span>
              <span className="text-sm text-gray-400 line-through">
                ₹ {item.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-semibold text-green-600">{discount}% off</span>
            </div>

            {/* Quantity + Color */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => onQuantityChange(item.productId, -1)}
                  disabled={disabled || item.quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg font-light"
                >
                  −
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-800 border-x border-gray-300">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onQuantityChange(item.productId, 1)}
                  disabled={disabled}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-light"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-6">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{3} Days Return</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Truck className="w-3.5 h-3.5" />
          <span>Dispatches in <span className="font-semibold text-gray-700">1–2 days</span></span>
        </div>
      </div>
    </div>
  );
}
