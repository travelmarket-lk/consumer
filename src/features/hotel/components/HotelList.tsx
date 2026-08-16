import type { Hotel } from "@/features/hotel/types/hotel.types";
import { HotelCard } from "@/features/hotel/components/HotelCard";

export function HotelList({ hotels }: { hotels: Hotel[] }) {
  if (!hotels.length) return <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">No hotels found. Connect the hotel service to load results.</p>;
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}</div>;
}
