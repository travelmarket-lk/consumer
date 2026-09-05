"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { GalleryModalProps } from "../types/hotel-data";


export function HotelGalleryModal({
  isOpen,
  onClose,
  images,
  hotelName,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  if (!isOpen) return null;

  const categories = [
    "All",
    ...Array.from(new Set(images.map((img) => img.category))),
  ];

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const activeImage = filteredImages[currentIndex] || filteredImages[0];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md">
      <div className="relative flex h-[90vh] w-full max-w-6xl flex-col rounded-2xl bg-slate-900 text-white shadow-2xl overflow-hidden border border-slate-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <Grid className="h-5 w-5 text-cyan-400" />
            <div>
              <h3 className="font-semibold text-lg text-slate-100">
                {hotelName} - Photo Gallery
              </h3>
              <p className="text-xs text-slate-400">
                Photo {currentIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto border-b border-slate-800 px-6 py-3 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                  : "bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Image View */}
        <div className="relative flex flex-1 items-center justify-center bg-slate-950 p-4">
          {activeImage && (
            <div className="relative h-full w-full max-w-4xl">
              <Image
                src={activeImage.url}
                alt={activeImage.caption}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-200 backdrop-blur-md border border-slate-700/50 shadow-lg">
                {activeImage.caption}
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-6 rounded-full bg-slate-900/80 p-3 text-white backdrop-blur-md hover:bg-cyan-600 transition-colors border border-slate-700/50 shadow-xl"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 rounded-full bg-slate-900/80 p-3 text-white backdrop-blur-md hover:bg-cyan-600 transition-colors border border-slate-700/50 shadow-xl"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-2 overflow-x-auto border-t border-slate-800 bg-slate-950/80 p-3 scrollbar-thin">
          {filteredImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                currentIndex === idx
                  ? "border-cyan-400 scale-105 shadow-md shadow-cyan-500/20"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={img.caption}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
