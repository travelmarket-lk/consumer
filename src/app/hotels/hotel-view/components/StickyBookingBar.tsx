"use client";

import { ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { StickyBookingBarProps } from "../types/hotel-data";




export function StickyBookingBar({ selectedRooms, onProceed }: StickyBookingBarProps) {
  const totalQuantity = selectedRooms.reduce((acc, item) => acc + item.quantity, 0);

  if (totalQuantity === 0) return null;

  const totalPrice = selectedRooms.reduce((acc, item) => acc + item.room.pricePerNight * item.quantity, 0);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 text-white backdrop-blur-md border-t border-slate-800 shadow-2xl py-3.5 px-4 sm:px-8 animate-slideUp">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        {/* Left: Selected Room Summary */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-600/30">
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black">
              {totalQuantity}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-100">
                {totalQuantity} {totalQuantity === 1 ? "Room" : "Rooms"} Selected
              </h4>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                <ShieldCheck className="h-3 w-3" /> Best Rate Guaranteed
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
              {selectedRooms.map((sr) => `${sr.quantity}x ${sr.room.title}`).join(", ")}
            </p>
          </div>
        </div>

        {/* Right: Total Price & CTA Button */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Price</div>
            <div className="text-xl sm:text-2xl font-black text-white">${totalPrice}</div>
          </div>

          <button
            onClick={onProceed}
            className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/30 hover:bg-cyan-500 transition-all hover:scale-105 active:scale-95"
          >
            <span>Proceed to Book</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
