import type { SearchHotel, SearchSort } from "@/features/search/types/search.types";

export function getNights(checkIn: string, checkOut: string) {
  const difference = new Date(`${checkOut}T00:00:00Z`).getTime() - new Date(`${checkIn}T00:00:00Z`).getTime();
  return Math.max(1, Math.ceil(difference / 86400000));
}

export function filterAndSortHotels(hotels: SearchHotel[], filters: string[], budget: number, sort: SearchSort) {
  const matches = hotels.filter((hotel) => filters.every((filter) => hotel.amenities.includes(filter)) && hotel.price <= budget);
  return [...matches].sort((first, second) => {
    if (sort === "Price: low to high") return first.price - second.price;
    if (sort === "Top reviewed") return second.rating - first.rating;
    return 0;
  });
}