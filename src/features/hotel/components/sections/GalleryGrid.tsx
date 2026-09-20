"use client";

import Image from "next/image";
import { Grid } from "lucide-react";
import type { HotelData, HotelImage } from "../../types/hotel.types";

export interface InteractiveHeroPhotoGalleryGridProps {
  hotel?: HotelData;
  heroImages?: HotelImage[];
  onOpenGallery?: () => void;
  onScrollToSection?: (id: string) => void;
}

export function GalleryGrid({
  hotel,
  heroImages,
  onOpenGallery,
  onScrollToSection,
}: InteractiveHeroPhotoGalleryGridProps) {
  const images = heroImages ?? hotel?.heroImages ?? [];
  const mainImage = images[0];

  const handleImageClick = () => {
    if (onOpenGallery) {
      onOpenGallery();
    } else if (onScrollToSection) {
      onScrollToSection("gallery");
    }
  };

  return (
    <section id="gallery" className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 rounded-2xl overflow-hidden shadow-md bg-slate-200 p-1">
        {/* Main Featured Photo */}
        <div className="relative col-span-1 sm:col-span-2 md:col-span-2 row-span-2 h-72 sm:h-96 md:h-full group overflow-hidden rounded-xl">
          {mainImage && (
            <>
              <Image
                src={mainImage.url}
                alt={mainImage.caption}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={handleImageClick}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 pointer-events-none" />
              <span className="absolute bottom-4 left-4 rounded-md bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                {mainImage.caption}
              </span>
            </>
          )}
        </div>

        {/* Thumbnail Grid Photos */}
        {images.slice(1, 7).map((img, idx) => (
          <div
            key={idx}
            onClick={handleImageClick}
            className="relative h-36 sm:h-44 md:h-48 group overflow-hidden rounded-xl cursor-pointer"
          >
            <Image
              src={img.url}
              alt={img.caption}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors" />
          </div>
        ))}
      </div>

      {/* View All Photos Button */}
      <button
        onClick={handleImageClick}
        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-slate-900/90 px-4 py-2.5 text-xs font-bold text-white shadow-xl backdrop-blur-md hover:bg-cyan-600 transition-all hover:scale-105"
      >
        <Grid className="h-4 w-4" />
        <span>View All Photos</span>
      </button>
    </section>
  );
}