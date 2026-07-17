"use client";

import { useRef, useState, useCallback } from "react";
import cn from "classnames";
import Image from "next/image";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

type ImageZoomProps = {
  images: GalleryImage[];
  zoomScale?: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const LOADING_SKELETON_CLASS = "absolute inset-0 animate-pulse bg-muted";

export default function ImageZoom({
  images,
  zoomScale = 2.5,
  activeIndex,
  setActiveIndex,
}: ImageZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomPosition, setZoomPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const activeImage = images[activeIndex];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false);
    setZoomPosition(null);
  }, []);

  const markLoaded = useCallback((id: string) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  }, []);

  const onImageClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
      {/* Thumbnails - vertical on desktop, horizontal on mobile */}
      <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-x-visible lg:overflow-y-auto">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => onImageClick(index)}
            className={cn(
              "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 bg-muted transition-all hover:border-primary/50",
              index === activeIndex
                ? "border-primary ring-2 ring-primary/20"
                : "border-border",
            )}
            aria-label={`View ${image.alt}`}
            aria-pressed={index === activeIndex}
          >
            {!loaded[image.id] && <div className={LOADING_SKELETON_CLASS} />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              onLoad={() => markLoaded(image.id)}
              className={cn(
                "h-full w-full object-cover transition-opacity duration-300",
                loaded[image.id] ? "opacity-100" : "opacity-0",
              )}
            />
            <Image
              src={image.src}
              alt={image.alt}
              onLoad={() => markLoaded(image.id)}
              fill
              className={cn(
                "h-full w-full object-cover transition-opacity duration-300",
                loaded[image.id] ? "opacity-100" : "opacity-0",
              )}
            />
          </button>
        ))}
      </div>

      {/* Main image with hover zoom */}
      <div className="relative flex-1">
        <div
          ref={containerRef}
          className="relative aspect-square w-full max-w-[600px] cursor-crosshair overflow-hidden rounded-lg border bg-muted"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {!loaded[activeImage.id] && (
            <div className={LOADING_SKELETON_CLASS} />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            onLoad={() => markLoaded(activeImage.id)}
            fill
            className={`object-contain ${cn(
              "h-full w-full object-cover transition-opacity duration-300",
              loaded[activeImage.id] ? "opacity-100" : "opacity-0",
            )}`}
            priority
          />

          {/* Zoom lens indicator on source image */}
          {isZoomed && zoomPosition && (
            <div
              className="pointer-events-none absolute border-2 border-white/80 bg-white/10 backdrop-blur-[1px] transition-opacity duration-150"
              style={{
                width: `${100 / zoomScale}%`,
                height: `${100 / zoomScale}%`,
                left: `${zoomPosition.x - 100 / zoomScale / 2}%`,
                top: `${zoomPosition.y - 100 / zoomScale / 2}%`,
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.25)",
              }}
            />
          )}

          {/* Zoom hint badge */}
          {!isZoomed && loaded[activeImage.id] && (
            <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              Hover to zoom
            </div>
          )}
        </div>

        {/* Zoomed popup overlay — appears on top of the image */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden rounded-lg border bg-background/95 shadow-2xl backdrop-blur-sm transition-opacity duration-200",
            isZoomed ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={!isZoomed}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="h-full w-full object-cover"
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: `${zoomPosition?.x ?? 50}% ${
                zoomPosition?.y ?? 50
              }%`,
            }}
          />
          <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            Zoomed view
          </div>
        </div>
      </div>
    </div>
  );
}
