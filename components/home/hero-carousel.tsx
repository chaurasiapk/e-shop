"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/data";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const slide = heroSlides[current];

  const prev = () =>
    setCurrent((c) => (c === 0 ? heroSlides.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === heroSlides.length - 1 ? 0 : c + 1));

  return (
    <section className="relative bg-hero rounded-2xl overflow-hidden min-h-[280px] md:min-h-[320px]">
      <div className="flex items-center justify-between h-full px-8 md:px-12 py-8">
        <div className="flex-1 z-10">
          <p className="text-gray-300 text-sm mb-2">{slide.tagline}</p>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
            {slide.title}
          </h2>
          <p className="text-white text-xl md:text-2xl font-semibold">
            {slide.subtitle}
          </p>
        </div>

        <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-8 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
