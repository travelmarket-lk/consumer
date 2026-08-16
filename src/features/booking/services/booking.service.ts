import { apiClient } from "@/lib/api/api-client";
import type { Booking } from "@/features/booking/types/booking.types";

export function getBooking(bookingId: string) {
  return apiClient<Booking>(`/api/v1/bookings/${encodeURIComponent(bookingId)}`);
}
