"use client";

import Image from "next/image";
import { X, Check, Users, Maximize2, Bed, Eye, ShieldCheck, Sparkles } from "lucide-react";

import { RoomDetailsModalProps, RoomType } from "../types/hotel-data";



export function RoomDetailsModal({ isOpen, onClose, room, onSelectRoom }: RoomDetailsModalProps) {
  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
          <div>
            <span className="inline-block rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 uppercase tracking-wider mb-1">
              Room Overview
            </span>
            <h3 className="text-xl font-bold text-slate-900">{room.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-200/80 p-2 text-slate-600 hover:bg-slate-300 hover:text-slate-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Photo Gallery Grid inside modal */}
          <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden shadow-inner bg-slate-100 p-1">
            {room.images.map((imgUrl, i) => (
              <div key={i} className="relative h-44 overflow-hidden rounded-lg">
                <Image src={imgUrl} alt={`${room.title} photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>

          {/* Quick Room Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-slate-700 text-sm">
            <div className="flex items-center gap-2.5">
              <Maximize2 className="h-5 w-5 text-cyan-600 flex-shrink-0" />
              <div>
                <div className="text-xs text-slate-500 font-medium">Room Size</div>
                <div className="font-semibold text-slate-900">{room.sizeSqM} m² / {Math.round(room.sizeSqM * 10.764)} sq ft</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="h-5 w-5 text-cyan-600 flex-shrink-0" />
              <div>
                <div className="text-xs text-slate-500 font-medium">Max Guests</div>
                <div className="font-semibold text-slate-900">{room.maxAdults} Adults + {room.maxChildren} Child</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Bed className="h-5 w-5 text-cyan-600 flex-shrink-0" />
              <div>
                <div className="text-xs text-slate-500 font-medium">Bed Layout</div>
                <div className="font-semibold text-slate-900">{room.bedType}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Eye className="h-5 w-5 text-cyan-600 flex-shrink-0" />
              <div>
                <div className="text-xs text-slate-500 font-medium">View Type</div>
                <div className="font-semibold text-slate-900">{room.viewType}</div>
              </div>
            </div>
          </div>

          {/* Included Benefits */}
          <div className="rounded-xl bg-emerald-50/80 p-4 border border-emerald-200/80 text-emerald-950">
            <h4 className="flex items-center gap-2 font-semibold text-emerald-900 text-sm mb-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" /> Included with your reservation:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
              {room.inclusions.freeBreakfast && <div className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Free Breakfast Included Daily</div>}
              {room.inclusions.freeCancellation && <div className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Free Cancellation before {room.inclusions.cancellationDeadline}</div>}
              {room.inclusions.noPrepaymentNeeded && <div className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Pay later at property</div>}
              {room.inclusions.instantConfirmation && <div className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Instant booking confirmation</div>}
            </div>
          </div>

          {/* Detailed Amenities Breakdown */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-slate-900 text-base mb-3">
              <Sparkles className="h-5 w-5 text-cyan-600" /> Full Room Amenities & Facilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {room.allAmenities.map((group, idx) => (
                <div key={idx} className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-1">{group.category}</h5>
                  <ul className="space-y-1.5">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="h-3.5 w-3.5 text-cyan-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
          <div>
            <div className="text-xs text-slate-500 font-medium">Price per night</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">${room.pricePerNight}</span>
              <span className="text-xs text-slate-400 line-through">${room.originalPrice}</span>
              <span className="text-xs text-slate-500 font-medium">+ taxes & charges</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200/70 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSelectRoom(room.id);
                onClose();
              }}
              className="rounded-xl bg-cyan-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-600/30 hover:bg-cyan-700 transition-colors"
            >
              Select This Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
