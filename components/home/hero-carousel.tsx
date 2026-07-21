"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import { heroSlides } from "@/lib/data";
import { IOffer } from "@/types/offers";
import { formatPrice } from "@/utils/helper";

export default function HeroCarousel({ offers = [] }: { offers?: IOffer[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const heroSlides = offers.map((offer) => ({
    id: offer._id,
    tagline: offer.tagline,
    title: offer.title,
    subtitle: offer.tagline,
    image: offer.image,
    bg: offer.bg,
    price: offer.price,
    originalPrice: offer.originalPrice,
  }));

  useEffect(() => {
    if (paused) return;

    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [current, heroSlides.length, paused]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r
    ${heroSlides[current].bg}  h-[280px] md:h-[320px] cursor-pointer`}
    >
      {/* Slider Track */}
      <div
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id ?? index}
            className="min-w-full flex items-center justify-between px-8 md:px-14"
          >
            {/* Left */}
            <div
              className={`max-w-xl transition-all duration-700 delay-150 ${
                current === index
                  ? "opacity-100 translate-x-0"
                  : "opacity-30 -translate-x-8"
              }`}
            >
              <p className="text-gray-300 text-sm uppercase tracking-widest mb-3">
                {slide.tagline}
              </p>

              <h2 className="text-white text-4xl md:text-6xl font-bold leading-tight">
                {slide.title}
              </h2>

              <p className="mt-4 text-white/90 text-xl md:text-3xl font-semibold">
                {slide.subtitle}
              </p>
              <div className="mt-2">
                <p className="text-white text-lg font-bold">
                  From {formatPrice(slide.price)}
                  <span className="text-white/60">*</span>
                </p>
                <p className="text-white/60 text-sm line-through">
                  {formatPrice(slide.originalPrice)}
                </p>
              </div>
            </div>

            {/* Right */}
            <div
              className={`relative w-56 h-56 md:w-80 md:h-80 transition-all duration-700 ${
                current === index
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-90 rotate-6"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-contain select-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Previous */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20
        h-11 w-11 rounded-full bg-white/20 backdrop-blur-md
        hover:bg-white/30 transition-all"
      >
        <ChevronLeft className="mx-auto text-white" />
      </button>

      {/* Next */}
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20
        h-11 w-11 rounded-full bg-white/20 backdrop-blur-md
        hover:bg-white/30 transition-all"
      >
        <ChevronRight className="mx-auto text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-500 ${
              current === index
                ? "w-10 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
