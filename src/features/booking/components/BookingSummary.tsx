import type { Booking } from "@/features/booking/types/booking.types";

export function BookingSummary({ booking }: { booking: Booking }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Booking</p><p className="mt-1 font-semibold text-slate-950">{booking.id}</p></div>;
}
