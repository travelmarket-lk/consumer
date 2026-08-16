import type { Hotel } from "@/features/hotel/types/hotel.types";

export function formatHotelPrice(price?: number) {
  if (price == null) return "Price unavailable";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
}

export function filterHotels(hotels: Hotel[], destination: string) {
  const query = destination.trim().toLowerCase();
  if (!query) return hotels;
  return hotels.filter((hotel) => `${hotel.name} ${hotel.location}`.toLowerCase().includes(query));
}
