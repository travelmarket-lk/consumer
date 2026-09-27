"use client";

import { useState } from "react";
import {
  MapPin,
  Star,
  Heart,
  Share2,
  Map,
} from "lucide-react";
import type { HotelData, HotelTitleProps } from "../../types/hotel-props";



export function HotelTitle({ hotel, onScrollToSection }: HotelTitleProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleScroll = (id: string) => {
    if (onScrollToSection) {
      onScrollToSection(id);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="overview" className="space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="rounded-md bg-cyan-100 px-2 py-0.5 text-[11px] font-bold text-cyan-800 uppercase tracking-wider">
              Preferred Partner
            </span>
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(hotel.starRating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            {hotel.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-1 font-medium">
              <MapPin className="h-4 w-4 text-rose-500 flex-shrink-0" />
              <span>
                {hotel.address}, {hotel.city}, {hotel.country}
              </span>
            </div>
            <button
              onClick={() => handleScroll("location")}
              className="font-bold text-cyan-600 hover:text-cyan-800 underline flex items-center gap-1"
            >
              <Map className="h-3.5 w-3.5" /> Show on map
            </button>
          </div>
        </div>

        {/* Scorecard & Action Buttons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 border border-slate-200 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-600 text-white font-black text-xl shadow-md shadow-cyan-600/30">
              {hotel.reviewScore}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">
                {hotel.reviewLabel}
              </div>
              <div className="text-xs text-slate-500">
                {hotel.reviewCount.toLocaleString()} reviews
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`rounded-xl p-3 border transition-colors ${
                isSaved
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
              aria-label="Save hotel"
            >
              <Heart className={`h-5 w-5 ${isSaved ? "fill-rose-600" : ""}`} />
            </button>
            <button
              className="rounded-xl bg-white p-3 border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              aria-label="Share hotel"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}