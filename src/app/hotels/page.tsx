import { Container } from "@/components/layout/Container";
import { HotelList } from "@/features/hotel/components/HotelList";
import type { Hotel } from "@/features/hotel/types/hotel.types";

const hotels: Hotel[] = [];

export default function HotelsPage() {
  return <main><Container className="py-12"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Explore</p><h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Find your next stay</h1><p className="mt-4 max-w-2xl text-slate-600">Hotel results will be powered by the hotel service integration.</p><div className="mt-10"><HotelList hotels={hotels} /></div></Container></main>;
}
