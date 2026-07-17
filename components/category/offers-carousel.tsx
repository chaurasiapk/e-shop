"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { ICategoryOffer } from "@/types/categories";
import { formatPrice } from "@/utils/helper";

interface OffersCarouselProps {
  offers: ICategoryOffer[];
}

export default function OffersCarousel({ offers }: OffersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container || offers.length === 0) return;

    const cardWidth = container.offsetWidth * 0.88;
    const index = Math.round(container.scrollLeft / (cardWidth + 16));
    setActiveIndex(Math.min(index, offers.length - 1));
  };

  if (offers.length === 0) return null;

  return (
    <section>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
      >
        {offers.map((offer) => (
          <article
            key={offer.id}
            className={`relative shrink-0 w-[88%] sm:w-[70%] md:w-[55%] snap-start rounded-2xl bg-gradient-to-br ${offer.bg} overflow-hidden min-h-[220px]`}
          >
            <div className="flex h-full p-5 md:p-6">
              <div className="flex-1 z-10 flex flex-col justify-between pr-4">
                <div>
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wide bg-white/15 text-white px-2 py-1 rounded">
                    {offer.eventLabel}
                  </span>
                  <span className="absolute top-4 right-4 flex items-center gap-1 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {offer.rating}
                    <Star className="w-3 h-3 fill-white" />
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-bold mt-3 leading-tight">
                    {offer.title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-white text-lg font-bold">
                      From {formatPrice(offer.price)}
                      <span className="text-white/60">*</span>
                    </p>
                    <p className="text-white/60 text-sm line-through">
                      {formatPrice(offer.originalPrice)}
                    </p>
                  </div>
                  <p className="text-white/80 text-xs md:text-sm mt-2 max-w-[200px]">
                    {offer.tagline}
                  </p>
                </div>
                <button className="mt-4 w-fit bg-white text-gray-900 text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  Pay Only {formatPrice(offer.emiAmount)}/m
                </button>
              </div>

              <div className="relative w-32 sm:w-40 md:w-48 shrink-0 self-end">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  width={200}
                  height={240}
                  className="object-contain w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {offers.map((offer, index) => (
          <button
            key={offer.id}
            aria-label={`Go to offer ${index + 1}`}
            onClick={() => {
              const container = scrollRef.current;
              if (!container) return;
              const cardWidth = container.offsetWidth * 0.88;
              container.scrollTo({
                left: index * (cardWidth + 16),
                behavior: "smooth",
              });
              setActiveIndex(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex
                ? "w-6 bg-gray-700"
                : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
