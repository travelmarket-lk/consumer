"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Heart,
  Share2,
  Calendar,
  Users,
  Grid,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Map,
  Building,
  Loader2,
} from "lucide-react";

import { KANDY_HOTEL_DATA, RoomType } from "./hotel-data";
import { HotelGalleryModal } from "./components/HotelGalleryModal";
import { RoomDetailsModal } from "./components/RoomDetailsModal";
import { RoomCard } from "./components/RoomCard";
import { ReviewsSection } from "./components/ReviewsSection";
import { StickyBookingBar } from "./components/StickyBookingBar";
import Loading from "../loading";

export default function HotelViewPage() {
  // Hotel Data


  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  // Active states
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedRoomForDetails, setSelectedRoomForDetails] = useState<RoomType | null>(null);
  const [activeRoomCategory, setActiveRoomCategory] = useState<string>("all");
  const [roomQuantities, setRoomQuantities] = useState<Record<string, number>>({});
  const [isSaved, setIsSaved] = useState(false);

  // Search Bar state
  const [checkInDate, setCheckInDate] = useState("2026-09-02");
  const [checkOutDate, setCheckOutDate] = useState("2026-09-04");
  const [guestsCount, setGuestsCount] = useState("2 Adults, 0 Children");

  const hotel = KANDY_HOTEL_DATA || data;

useEffect(() => {
  fetch("/api/v1/hotel") 
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((result) => {
      setData(result);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
}, []);

if (loading) {
  return <Loading />;
  }
  

  // Handle Room Quantity Change
  const handleQuantityChange = (roomId: string, quantity: number) => {
    setRoomQuantities((prev) => ({
      ...prev,
      [roomId]: quantity,
    }));
  };

  // Selected rooms array for Sticky Booking Bar
  const selectedRoomsList = Object.entries(roomQuantities)
    .filter(([, qty]) => qty > 0)
    .map(([roomId, qty]) => ({
      room: hotel.rooms.find((r) => r.id === roomId)!,
      quantity: qty,
    }))
    .filter((item) => item.room !== undefined);

  // Filtered rooms list
  const filteredRooms = activeRoomCategory === "all"
    ? hotel.rooms
    : hotel.rooms.filter((r) => r.category === activeRoomCategory);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      {/* Top Breadcrumb & Navigation Bar */}
      <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-14 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-2">
            <Link href="/" className="hover:text-cyan-700">Home</Link>
            <span>/</span>
            <Link href="/hotels" className="hover:text-cyan-700">Sri Lanka</Link>
            <span>/</span>
            <span className="hover:text-cyan-700">Kandy</span>
            <span>/</span>
            <span className="font-semibold text-slate-900 truncate max-w-37.5 sm:max-w-none">{hotel.name}</span>
          </div>

          <div className="hidden md:flex items-center gap-6 font-semibold">
            <button onClick={() => handleScrollToSection("overview")} className="hover:text-cyan-700 transition-colors">Overview</button>
            <button onClick={() => handleScrollToSection("gallery")} className="hover:text-cyan-700 transition-colors">Photos</button>
            <button onClick={() => handleScrollToSection("rooms")} className="hover:text-cyan-700 transition-colors">Rooms & Rates</button>
            <button onClick={() => handleScrollToSection("facilities")} className="hover:text-cyan-700 transition-colors">Facilities</button>
            <button onClick={() => handleScrollToSection("reviews")} className="hover:text-cyan-700 transition-colors">Reviews</button>
            <button onClick={() => handleScrollToSection("location")} className="hover:text-cyan-700 transition-colors">Location</button>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 space-y-8">
        
        {/* Section 1: Hotel Title, Rating Badges & Actions Header */}
        <section id="overview" className="space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="rounded-md bg-cyan-100 px-2 py-0.5 text-[11px] font-bold text-cyan-800 uppercase tracking-wider">
                  Preferred Partner
                </span>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(hotel.starRating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                {hotel.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1 font-medium">
                  <MapPin className="h-4 w-4 text-rose-500 flex-shrink-0" />
                  <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
                </div>
                <button
                  onClick={() => handleScrollToSection("location")}
                  className="font-bold text-cyan-600 hover:text-cyan-800 underline flex items-center gap-1"
                >
                  <Map className="h-3.5 w-3.5" /> Show on map
                </button>
              </div>
            </div>

            {/* Scorecard & Action Buttons */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-2xl bg-white p-3 border border-slate-200 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-600 text-white font-black text-xl shadow-md shadow-cyan-600/30">
                  {hotel.reviewScore}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{hotel.reviewLabel}</div>
                  <div className="text-xs text-slate-500">{hotel.reviewCount.toLocaleString()} reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`rounded-xl p-3 border transition-colors ${
                    isSaved ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                  aria-label="Save hotel"
                >
                  <Heart className={`h-5 w-5 ${isSaved ? "fill-rose-600" : ""}`} />
                </button>
                <button
                  className="rounded-xl bg-white p-3 border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  aria-label="Share hotel"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Hero Photo Gallery Grid */}
        <section id="gallery" className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 rounded-2xl overflow-hidden shadow-md bg-slate-200 p-1">
            {/* Main Featured Photo */}
            <div className="relative col-span-1 sm:col-span-2 md:col-span-2 row-span-2 h-72 sm:h-96 md:h-full group overflow-hidden rounded-xl">
              <Image
                src={hotel.heroImages[0].url}
                alt={hotel.heroImages[0].caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => setIsGalleryOpen(true)}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 pointer-events-none" />
              <span className="absolute bottom-4 left-4 rounded-md bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                {hotel.heroImages[0].caption}
              </span>
            </div>

            {/* Thumbnail Grid Photos */}
            {hotel.heroImages.slice(1, 7).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setIsGalleryOpen(true)}
                className="relative h-36 sm:h-44 md:h-48 group overflow-hidden rounded-xl cursor-pointer"
              >
                <Image
                  src={img.url}
                  alt={img.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>

          {/* View All Photos Button */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-slate-900/90 px-4 py-2.5 text-xs font-bold text-white shadow-xl backdrop-blur-md hover:bg-cyan-600 transition-all hover:scale-105"
          >
            <Grid className="h-4 w-4" />
            <span>View All 25 Photos</span>
          </button>
        </section>

        {/* Section 3: Highlights & Key Advantages Bar */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hotel.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{h.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{h.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Section 4: Sticky Search & Availability Selector Bar */}
        <section className="rounded-2xl bg-slate-900 p-4 sm:p-6 text-white shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-cyan-400" /> Check-in Date
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2.5 text-xs font-semibold text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-cyan-400" /> Check-out Date
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2.5 text-xs font-semibold text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Users className="h-4 w-4 text-cyan-400" /> Guests & Rooms
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2.5 text-xs font-semibold text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="1 Adult, 0 Children">1 Adult, 1 Room</option>
                <option value="2 Adults, 0 Children">2 Adults, 1 Room</option>
                <option value="2 Adults, 1 Child">2 Adults + 1 Child, 1 Room</option>
                <option value="4 Adults, 2 Children">4 Adults + 2 Children, 2 Rooms</option>
              </select>
            </div>

            <button
              onClick={() => handleScrollToSection("rooms")}
              className="w-full rounded-xl bg-cyan-600 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-600/30 hover:bg-cyan-500 transition-all hover:scale-102"
            >
              Check Availability
            </button>
          </div>
        </section>

        {/* Section 5: Available Rooms & Rates Section (Core Feature) */}
        <section id="rooms" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Building className="h-5 w-5 text-cyan-600" /> Select Your Room
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">All rates include taxes, fees & free high-speed Wi-Fi</p>
            </div>

            {/* Room Filter Category Tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none">
              {[
                { id: "all", label: "All Rooms" },
                { id: "deluxe", label: "Deluxe Rooms" },
                { id: "suite", label: "Executive Suites" },
                { id: "family", label: "Family Suites" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRoomCategory(tab.id)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    activeRoomCategory === tab.id
                      ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms List */}
          <div className="space-y-4">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                selectedQuantity={roomQuantities[room.id] || 0}
                onQuantityChange={handleQuantityChange}
                onOpenDetails={(r) => setSelectedRoomForDetails(r)}
              />
            ))}
          </div>
        </section>

        {/* Section 6: Property Overview & Top Amenities */}
        <section id="facilities" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4 rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">About {hotel.name}</h3>
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              {hotel.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Popular Property Facilities</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {hotel.topAmenities.map((am, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-100 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                    <span>{am.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nearby Landmarks Card */}
          <div id="location" className="space-y-4 rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-cyan-600" /> Location Highlights
            </h3>
            <p className="text-xs text-slate-500">{hotel.locationHighlights}</p>

            <div className="space-y-3 pt-2">
              {hotel.landmarks.map((lm, i) => (
                <div key={i} className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-700">{lm.name}</span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{lm.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Guest Reviews Section */}
        <section id="reviews">
          <ReviewsSection
            score={hotel.reviewScore}
            reviewCount={hotel.reviewCount}
            label={hotel.reviewLabel}
            categories={hotel.reviewCategories}
            reviews={hotel.reviews}
          />
        </section>

        {/* Section 8: Property Policies */}
        <section className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-cyan-600" /> Hotel Policies & Essential Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {hotel.policies.map((pol, i) => (
              <div key={i} className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{pol.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{pol.details}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Floating Bottom Selected Rooms Bar */}
      <StickyBookingBar
        selectedRooms={selectedRoomsList}
        onProceed={() => {
          alert(`Proceeding to checkout with ${selectedRoomsList.reduce((acc, i) => acc + i.quantity, 0)} room(s). Total: $${selectedRoomsList.reduce((acc, i) => acc + i.room.pricePerNight * i.quantity, 0)}`);
        }}
      />

      {/* Fullscreen Photo Gallery Lightbox Modal */}
      <HotelGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={hotel.heroImages}
        hotelName={hotel.name}
      />

      {/* Room Details Modal */}
      <RoomDetailsModal
        isOpen={selectedRoomForDetails !== null}
        onClose={() => setSelectedRoomForDetails(null)}
        room={selectedRoomForDetails}
        onSelectRoom={(roomId) => handleQuantityChange(roomId, 1)}
      />
    </div>
  );
}
