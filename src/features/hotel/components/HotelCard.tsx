import Link from "next/link";
import type { Hotel } from "@/features/hotel/types/hotel.types";
import { formatHotelPrice } from "@/features/hotel/utils/hotel.utils";

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-cyan-100 to-slate-100 text-sm text-slate-500">Hotel image</div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{hotel.location}</p>
        <h2 className="mt-2 text-lg font-semibold text-slate-950">{hotel.name}</h2>
        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
          <span className="font-semibold text-slate-950">{formatHotelPrice(hotel.pricePerNight)} <span className="font-normal text-slate-500">/ night</span></span>
          <Link href={`/hotels/${hotel.id}`} className="font-semibold text-cyan-700 hover:text-cyan-800">View details →</Link>
        </div>
      </div>
    </article>
  );
}
