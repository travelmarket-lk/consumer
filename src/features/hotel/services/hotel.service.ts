import { apiClient } from "@/lib/api/api-client";
import type { Hotel } from "@/features/hotel/types/hotel.types";

export async function getHotels(params?: { destination?: string; guests?: number }) {
  const query = new URLSearchParams();
  if (params?.destination) query.set("destination", params.destination);
  if (params?.guests) query.set("guests", String(params.guests));
  return apiClient<Hotel[]>(`/api/v1/hotels${query.size ? `?${query.toString()}` : ""}`);
}

export async function getHotel(hotelId: string) {
  return apiClient<Hotel>(`/api/v1/hotels/${encodeURIComponent(hotelId)}`);
}


export async function searchHotels() {
  return apiClient<Hotel[]>(`/api/v1/hotel/summary`);
}