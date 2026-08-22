"use client";

import Image from "next/image";
import { Users, Maximize2, Bed, Check, Info, ShieldCheck, ChevronRight } from "lucide-react";
import type { RoomType } from "../hotel-data";

interface RoomCardProps {
  room: RoomType;
  selectedQuantity: number;
  onQuantityChange: (roomId: string, quantity: number) => void;
  onOpenDetails: (room: RoomType) => void;
}

export function RoomCard({ room, selectedQuantity, onQuantityChange, onOpenDetails }: RoomCardProps) {
  const isSelected = selectedQuantity > 0;

  return (
    <div
      className={`group relative flex flex-col lg:flex-row rounded-2xl bg-white border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
        isSelected ? "border-cyan-500 ring-2 ring-cyan-500/20 bg-cyan-50/10" : "border-slate-200"
      }`}
    >
      {/* Left Column: Room Gallery Thumbnail */}
      <div className="relative h-64 lg:h-auto lg:w-72 flex-shrink-0 overflow-hidden bg-slate-100">
        <Image
          src={room.images[0]}
          alt={room.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 1024px) 100vw, 300px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
        
        {/* Photos badge counter */}
        <button
          onClick={() => onOpenDetails(room)}
          className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md hover:bg-cyan-600 transition-colors"
        >
          <span>{room.images.length} Photos</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

        {/* Category Badge */}
        <span className="absolute top-3 left-3 rounded-full bg-cyan-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
          {room.category}
        </span>
      </div>

      {/* Middle Column: Room Info, Specifications & Included Benefits */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
              {room.title}
            </h3>
            <button
              onClick={() => onOpenDetails(room)}
              className="text-xs font-semibold text-cyan-600 hover:text-cyan-800 underline flex items-center gap-1 flex-shrink-0"
            >
              <Info className="h-3.5 w-3.5" /> View details
            </button>
          </div>

          {/* Quick Specifications Icons */}
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="h-4 w-4 text-cyan-600" />
              <span>{room.sizeSqM} m²</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-cyan-600" />
              <span>{room.maxAdults} Guests ({room.maxChildren} Child)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-cyan-600" />
              <span>{room.bedType}</span>
            </div>
          </div>
        </div>

        {/* Inclusions & Policies List */}
        <div className="space-y-1.5 text-xs">
          {room.inclusions.freeBreakfast && (
            <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
              <Check className="h-4 w-4 text-emerald-600" />
              <span>FREE Breakfast included</span>
            </div>
          )}
          {room.inclusions.freeCancellation && (
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <Check className="h-4 w-4 text-emerald-600" />
              <span>FREE cancellation before {room.inclusions.cancellationDeadline}</span>
            </div>
          )}
          {room.inclusions.noPrepaymentNeeded && (
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>No prepayment needed — Pay at hotel</span>
            </div>
          )}
        </div>

        {/* Popular Room Amenities Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
          {room.popularAmenities.slice(0, 4).map((amenity, i) => (
            <span key={i} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
              {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Right Column: Pricing & Room Quantity Selector */}
      <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 bg-slate-50/60 p-5 lg:w-64 flex-shrink-0">
        <div>
          <div className="text-right">
            <span className="inline-block rounded-md bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-700 mb-1">
              SAVE {Math.round(((room.originalPrice - room.pricePerNight) / room.originalPrice) * 100)}% TODAY
            </span>
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-xs text-slate-400 line-through font-medium">${room.originalPrice}</span>
              <span className="text-2xl font-black text-slate-900">${room.pricePerNight}</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">per night (excl. taxes & fees)</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {/* Room Quantity Selector */}
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-700">Select Rooms:</label>
            <select
              value={selectedQuantity}
              onChange={(e) => onQuantityChange(room.id, parseInt(e.target.value))}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value={0}>0 rooms</option>
              <option value={1}>1 room (${room.pricePerNight})</option>
              <option value={2}>2 rooms (${room.pricePerNight * 2})</option>
              <option value={3}>3 rooms (${room.pricePerNight * 3})</option>
            </select>
          </div>

          <button
            onClick={() => onQuantityChange(room.id, selectedQuantity > 0 ? 0 : 1)}
            className={`w-full rounded-xl py-2.5 text-xs font-bold transition-all shadow-md ${
              isSelected
                ? "bg-slate-900 text-white hover:bg-slate-800"
                : "bg-cyan-600 text-white hover:bg-cyan-700 shadow-cyan-600/20"
            }`}
          >
            {isSelected ? "Remove Selection" : "Reserve Room"}
          </button>
        </div>
      </div>
    </div>
  );
}
