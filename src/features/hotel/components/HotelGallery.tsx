import type { Hotel } from "@/features/hotel/types/hotel.types";

export function HotelGallery({ hotel }: { hotel: Hotel }) {
  return <div className="flex min-h-72 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-slate-100 text-slate-500">Gallery for {hotel.name}</div>;
}
