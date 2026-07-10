import Image from "next/image";
import { formatPrice } from "@/lib/data";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  id: string;
  className?: string;
}

export default function ProductCard({
  name,
  price,
  originalPrice,
  discount,
  image,
  id: productId,
  className = "",
}: ProductCardProps) {
  const savings = originalPrice - price;

  return (
    <Link
      href={`/products/${productId}`}
      className={`bg-white rounded-xl border border-gray-100 p-4 flex flex-col hover:shadow-md transition-shadow shrink-0 w-[180px] sm:w-auto ${className}`}
    >
      <div className="relative mb-3">
        <span className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
          {discount}% OFF
        </span>
        <div className="relative w-full aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain"
            sizes="200px"
          />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
        {name}
      </h3>
      <div className="mt-auto">
        <p className="text-base font-bold text-gray-900">{formatPrice(price)}</p>
        <p className="text-sm text-gray-400 line-through">
          {formatPrice(originalPrice)}
        </p>
        <p className="text-xs text-success font-medium mt-1">
          Save - {formatPrice(savings)}
        </p>
      </div>
    </Link>
  );
}
