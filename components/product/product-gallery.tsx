"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, GitCompare, Heart, Share2 } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex gap-4">
      <div className="hidden sm:flex flex-col gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            onClick={() => setActiveIndex(index)}
            className={`relative w-16 h-16 rounded-lg border overflow-hidden ${
              index === activeIndex
                ? "border-gray-900"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <Image
              src={image}
              alt={`${name} view ${index + 1}`}
              fill
              className="object-contain p-1"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      <div className="flex-1">
        <div className="relative aspect-square bg-white border border-gray-100 rounded-xl overflow-hidden">
          <Image
            src={images[activeIndex]}
            alt={name}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`View image ${index + 1}`}
                className={`w-2 h-2 rounded-full ${
                  index === activeIndex ? "bg-gray-900" : "bg-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">
              {activeIndex + 1}/{images.length}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <button
              aria-label="Add to wishlist"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              aria-label="Compare product"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <GitCompare className="w-5 h-5" />
            </button>
            <button
              aria-label="Share product"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VariantPicker({
  variants,
  variantLabel,
  selectedId,
  onSelect,
}: {
  variants: { id: string; label: string; image: string }[];
  variantLabel: string;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = variants.find((variant) => variant.id === selectedId);

  return (
    <div>
      <p className="text-sm text-gray-700 mb-3">
        {variantLabel}:{" "}
        <span className="font-semibold text-gray-900">{selected?.label}</span>
      </p>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedId;
          return (
            <button
              key={variant.id}
              onClick={() => onSelect(variant.id)}
              className={`relative w-16 h-16 rounded-lg border overflow-hidden ${
                isSelected ? "border-gray-900" : "border-gray-200"
              }`}
            >
              <Image
                src={variant.image}
                alt={variant.label}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
              {isSelected && (
                <span className="absolute top-1 right-1 bg-gray-900 text-white rounded-full p-0.5">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
