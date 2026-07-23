"use client";

import { useState, useTransition } from "react";
import { MapPin, RotateCcw, Shield, Star, Truck, Wallet } from "lucide-react";
import ProductGallery from "@/components/product/product-gallery";
import ProductAccordions from "@/components/product/product-accordions";
import { formatPrice } from "@/utils/helper";
import { IDetailedProduct } from "@/types/products";
import { addProductToCart } from "@/features/cart";
import { addGuestCartItem } from "@/utils/guest-cart";

const trustBadges = [
  { icon: Shield, label: "24 Months Warranty" },
  { icon: Truck, label: "Free Shipping Countrywide" },
  { icon: RotateCcw, label: "Easy Return" },
  { icon: Wallet, label: "Pay on Delivery Available" },
  { icon: MapPin, label: "Serviced Across India" },
];

export default function ProductDetails({
  product,
  isAuthenticated,
}: {
  product: IDetailedProduct;
  isAuthenticated: boolean;
}) {
  // const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState<string | null>(null);
  const [cartMessage, setCartMessage] = useState<string | null>(null);
  const [isAddingToCart, startAddToCart] = useTransition();

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryMessage("Delivery by Wed, 16 Jul");
      return;
    }
    setDeliveryMessage("Please enter a valid 6-digit pincode");
  };

  const handleAddToCart = () => {
    setCartMessage(null);
    startAddToCart(async () => {
      try {
        if (isAuthenticated) {
          await addProductToCart(product._id);
        } else {
          addGuestCartItem({
            productId: product._id,
            name: product.name,
            thumbnail: product.thumbnail,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity: 1,
          });
        }
        setCartMessage("Added to cart.");
      } catch (cause) {
        setCartMessage(
          cause instanceof Error
            ? cause.message
            : "Unable to add this product to cart.",
        );
      }
    });
  };

  const handleBuyNow = () => {
    startAddToCart(async () => {
      try {
        if (isAuthenticated) await addProductToCart(product._id);
        else addGuestCartItem({ productId: product._id, name: product.name, thumbnail: product.thumbnail, price: product.price, originalPrice: product.originalPrice, quantity: 1 });
      } catch (cause) {
        setCartMessage(
          cause instanceof Error
            ? cause.message
            : "Unable to add this product to cart.",
        );
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <ProductGallery images={product.images} name={product.name} />
      <div className="space-y-5">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            {/* <span className="font-medium text-gray-900">{product.}</span> */}
            {/* <span>|</span> */}
            <span className="capitalize">{product.brand}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-700">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-400">|</span>
            <span>{product.totalReviews.toLocaleString("en-IN")} Reviews</span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {/* {product.sku} |  */}
            <span className="capitalize">{product.category}</span>
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

        {/* <CountdownTimer endsAt={product.updatedAt.toISOString()} /> */}

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900">Try 360&deg; view</p>
              <p className="text-sm text-gray-600 mt-1">
                See how this product looks in 360&deg; view
              </p>
            </div>
            <button className="text-sm font-semibold text-primary hover:underline shrink-0">
              Try Now
            </button>
          </div>
        </div>

        {/* <VariantPicker
          variants={product.variants}
          variantLabel={product.variantLabel}
          selectedId={selectedVariantId}
          onSelect={setSelectedVariantId}
        /> */}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stock < 1}
            className="cursor-pointer py-3 px-4 border-2 border-primary text-primary rounded-lg font-semibold text-gray-900 hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {product.stock < 1
              ? "OUT OF STOCK"
              : isAddingToCart
                ? "ADDING..."
                : "ADD TO CART"}
          </button>
          <button
            onClick={handleBuyNow}
            className="py-3 px-4 bg-primary text-white rounded-lg font-semibold  transition-colors cursor-pointer"
          >
            BUY NOW
          </button>
        </div>
        {cartMessage && <p className="text-sm text-gray-700">{cartMessage}</p>}

        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <p className="font-medium text-gray-900">
            Check Delivery Availability
          </p>
          <p className="text-sm text-success font-medium">
            Order in the next 04 hrs 54 mins for dispatch today
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={pincode}
              onChange={(event) =>
                setPincode(event.target.value.replace(/\D/g, "").slice(0, 6))
              }
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

        <ProductAccordions
          description={product.description}
          specifications={product.specifications}
          moreInfo={"product.moreInfo"}
        />
      </div>
    </div>
  );
}
