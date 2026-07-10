"use client";

import { useState } from "react";
import {
  BadgeCheck,
  MapPin,
  RotateCcw,
  Shield,
  Star,
  Truck,
  Wallet,
} from "lucide-react";
import type { ProductDetail } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import ProductGallery, { VariantPicker } from "@/components/product/product-gallery";
import CountdownTimer from "@/components/product/countdown-timer";
import ProductAccordions from "@/components/product/product-accordions";

interface ProductDetailsProps {
  product: ProductDetail;
}

const trustBadges = [
  { icon: Shield, label: "24 Months Warranty" },
  { icon: Truck, label: "Free Shipping Countrywide" },
  { icon: RotateCcw, label: "Easy Return" },
  { icon: Wallet, label: "Pay on Delivery Available" },
  { icon: MapPin, label: "Serviced Across India" },
];

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState<string | null>(null);

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryMessage("Delivery by Wed, 16 Jul");
      return;
    }
    setDeliveryMessage("Please enter a valid 6-digit pincode");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <ProductGallery images={product.images} name={product.name} />

      <div className="space-y-5">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-medium text-gray-900">{product.tag}</span>
            <span>|</span>
            <span>{product.brand}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-700">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-400">|</span>
            <span>{product.reviews.toLocaleString("en-IN")} Reviews</span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {product.sku} | {product.categoryLabel}
          </p>
        </div>

        <div>
          <div className="flex items-end gap-3 flex-wrap">
            <p className="text-3xl font-bold text-success">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-gray-400 line-through">
              MRP {formatPrice(product.originalPrice)}
            </p>
            <p className="text-sm font-semibold text-success">
              {product.discount}% off
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2">Inclusive of all taxes*</p>
          <p className="text-xs text-primary mt-1">
            LOGIN/SIGNUP to use NeuCoins on this purchase
          </p>
        </div>

        <CountdownTimer endsAt={product.saleEndsAt} />

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900">3D Try On</p>
              <p className="text-sm text-gray-600 mt-1">
                See how this product looks on you
              </p>
            </div>
            <button className="text-sm font-semibold text-primary hover:underline shrink-0">
              Try Now
            </button>
          </div>
        </div>

        <VariantPicker
          variants={product.variants}
          variantLabel={product.variantLabel}
          selectedId={selectedVariantId}
          onSelect={setSelectedVariantId}
        />

        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 px-4 border-2 border-gray-900 rounded-lg font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
            ADD TO CART
          </button>
          <button className="py-3 px-4 bg-primary text-white rounded-lg font-semibold  transition-colors cursor-pointer">
            BUY NOW
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <p className="font-medium text-gray-900">Check Delivery Availability</p>
          <p className="text-sm text-success font-medium">
            Order in the next 04 hrs 54 mins for dispatch today
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={pincode}
              onChange={(event) => setPincode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter pincode"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              onClick={checkDelivery}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
            >
              Check
            </button>
          </div>
          {deliveryMessage && (
            <p className="text-sm text-gray-700">{deliveryMessage}</p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 py-2">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-700">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-[11px] text-gray-600 leading-tight">{label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <p className="font-medium text-gray-900">Available Offers</p>
          <div className="border-2 border-amber-300 bg-amber-50/40 rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BadgeCheck className="w-5 h-5 text-amber-700" />
                  <p className="font-semibold text-gray-900">
                    EMI Plans powered by Razorpay
                  </p>
                </div>
                <p className="text-sm text-gray-700">
                  No cost EMI starting from {formatPrice(product.emiAmount)}/month
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  HDFC • ICICI • Axis • SBI • Kotak
                </p>
              </div>
              <button className="text-sm font-semibold border border-gray-900 rounded-lg px-3 py-2 hover:bg-white transition-colors shrink-0">
                View plans
              </button>
            </div>
          </div>
        </div>

        <ProductAccordions
          description={product.description}
          specifications={product.specifications}
          moreInfo={product.moreInfo}
        />
      </div>
    </div>
  );
}
