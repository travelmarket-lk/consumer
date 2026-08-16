import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { HotelGallery } from "@/features/hotel/components/HotelGallery";

export default async function HotelDetailsPage({ params }: { params: Promise<{ hotelId: string }> }) {
  const { hotelId } = await params;
  if (!hotelId) notFound();
  const hotel = { id: hotelId, name: "Hotel details", location: "Location coming soon" };
  return <main><Container className="py-12"><HotelGallery hotel={hotel} /><h1 className="mt-8 text-4xl font-semibold text-slate-950">{hotel.name}</h1><p className="mt-3 text-slate-600">Connect the hotel provider to load full property details.</p></Container></main>;
}
