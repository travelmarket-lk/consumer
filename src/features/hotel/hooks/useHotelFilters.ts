"use client";

import { useMemo, useState } from "react";
import type { Hotel, HotelFilters } from "@/features/hotel/types/hotel.types";
import { filterHotels } from "@/features/hotel/utils/hotel.utils";

export function useHotelFilters(hotels: Hotel[]) {
  const [filters, setFilters] = useState<HotelFilters>({ destination: "", guests: 1 });
  const filteredHotels = useMemo(() => filterHotels(hotels, filters.destination), [filters.destination, hotels]);
  return { filters, setFilters, filteredHotels };
}
