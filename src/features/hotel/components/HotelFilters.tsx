"use client";

import { Input } from "@/components/ui/Input";
import type { HotelFilters as HotelFiltersState } from "@/features/hotel/types/hotel.types";

export function HotelFilters({ filters, onChange }: { filters: HotelFiltersState; onChange: (filters: HotelFiltersState) => void }) {
  return <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_160px]">
    <Input label="Destination" placeholder="City or hotel name" value={filters.destination} onChange={(event) => onChange({ ...filters, destination: event.target.value })} />
    <Input label="Guests" type="number" min={1} value={filters.guests} onChange={(event) => onChange({ ...filters, guests: Math.max(1, Number(event.target.value) || 1) })} />
  </div>;
}
