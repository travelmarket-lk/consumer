"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  HotelNavigation,
  HotelTitle,
  GalleryGrid,
  Highlights,
  HotelSearchBar,
  RoomsSection,
  HotelFacilitiesSection,
  HotelPoliciesSection,
} from "@/features/hotel/components/sections";
import { ReviewsSection } from "@/features/hotel/components/ReviewsSection";
import { StickyBookingBar } from "@/features/hotel/components/StickyBookingBar";
import { HotelGalleryModal } from "@/features/hotel/components/HotelGalleryModal";
import { RoomDetailsModal } from "@/features/hotel/components/RoomDetailsModal";
import Loading from "@/features/hotel/components/loading";
import { useHotelView } from "@/features/hotel/hooks";
import type { RoomType } from "@/features/hotel/types/hotel.types";

function HotelViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hotelId = searchParams.get("id") || searchParams.get("hotelId") || undefined;

  // Custom Hook encapsulates data fetching, room quantities, and fallback state
  const {
    hotel,
    loading,
    roomQuantities,
    handleQuantityChange,
    selectedRoomsList,
  } = useHotelView(hotelId);

  // Active UI modal states
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedRoomForDetails, setSelectedRoomForDetails] = useState<RoomType | null>(null);
  const [activeRoomCategory, setActiveRoomCategory] = useState<string>("all");

  // Search Bar state initialized from URL query params or defaults
  const queryCheckIn = searchParams.get("checkIn") || "2026-09-02";
  const queryCheckOut = searchParams.get("checkOut") || "2026-09-04";
  const queryGuests = searchParams.get("guests") || "2 Adults, 0 Children";

  const [checkInDate, setCheckInDate] = useState(queryCheckIn);
  const [checkOutDate, setCheckOutDate] = useState(queryCheckOut);
  const [guestsCount, setGuestsCount] = useState(queryGuests);
  const [hasAppliedSearch, setHasAppliedSearch] = useState(false);

  // Sync state if URL searchParams change externally (e.g. back/forward navigation)
  useEffect(() => {
    const currentCheckIn = searchParams.get("checkIn");
    if (currentCheckIn && currentCheckIn !== checkInDate) {
      setCheckInDate(currentCheckIn);
    }
  }, [searchParams, checkInDate]);

  useEffect(() => {
    const currentCheckOut = searchParams.get("checkOut");
    if (currentCheckOut && currentCheckOut !== checkOutDate) {
      setCheckOutDate(currentCheckOut);
    }
  }, [searchParams, checkOutDate]);

  useEffect(() => {
    const currentGuests = searchParams.get("guests");
    if (currentGuests && currentGuests !== guestsCount) {
      setGuestsCount(currentGuests);
    }
  }, [searchParams, guestsCount]);

  if (loading || !hotel) {
    return <Loading />;
  }

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleHotelSelect = (selectedId: string) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.set("id", selectedId);
    router.push(`/hotels/hotel-view?${params.toString()}`, { scroll: false });
  };

  const totalNights = Math.max(
    1,
    checkInDate && checkOutDate
      ? Math.round(
          (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) || 1
      : 1
  );

  const handleProceedBooking = () => {
    const totalRooms = selectedRoomsList.reduce((acc, i) => acc + i.quantity, 0);
    const totalPrice = selectedRoomsList.reduce(
      (acc, i) => acc + i.room.pricePerNight * i.quantity * totalNights,
      0
    );
    alert(
      `Proceeding to checkout with ${totalRooms} room(s) for ${totalNights} night(s). Total: $${totalPrice}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28">
      {/* Top Breadcrumb & Navigation Bar */}
      <HotelNavigation
        hotelName={hotel.name}
        city={hotel.city}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 space-y-8">
        {/* Section 1: Hotel Title, Rating Badges & Actions Header */}
        <HotelTitle hotel={hotel} onScrollToSection={handleScrollToSection} />

        {/* Section 2: Interactive Hero Photo Gallery Grid */}
        <GalleryGrid
          hotel={hotel}
          onOpenGallery={() => setIsGalleryOpen(true)}
          onScrollToSection={handleScrollToSection}
        />

        {/* Section 3: Highlights & Key Advantages Bar */}
        <Highlights highlights={hotel.highlights} />

        {/* Section 4: Availability Selector & Hotel Switcher Bar */}
        <HotelSearchBar
          hotel={hotel}
          setHotel={handleHotelSelect}
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          guestsCount={guestsCount}
          setGuestsCount={setGuestsCount}
          handleScrollToSection={handleScrollToSection}
          onSearchApplied={() => setHasAppliedSearch(true)}
        />

        {/* Section 5: Available Rooms & Rates Section */}
        <RoomsSection
          rooms={hotel.rooms}
          activeCategory={activeRoomCategory}
          onCategoryChange={setActiveRoomCategory}
          roomQuantities={roomQuantities}
          onQuantityChange={handleQuantityChange}
          onOpenRoomDetails={(r: RoomType) => setSelectedRoomForDetails(r)}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guestsCount={guestsCount}
          hasAppliedSearch={hasAppliedSearch}
        />

        {/* Section 6: Property Overview, Facilities & Nearby Landmarks */}
        <HotelFacilitiesSection
          hotelName={hotel.name}
          description={hotel.description}
          topAmenities={hotel.topAmenities}
          locationHighlights={hotel.locationHighlights}
          landmarks={hotel.landmarks}
        />

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
        <HotelPoliciesSection policies={hotel.policies} />
      </main>

      {/* Floating Bottom Selected Rooms Bar */}
      <StickyBookingBar
        selectedRooms={selectedRoomsList}
        onProceed={handleProceedBooking}
        nights={totalNights}
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
        onSelectRoom={(roomId: string) => handleQuantityChange(roomId, 1)}
      />
    </div>
  );
}

export default function HotelViewPage() {
  return (
    <Suspense fallback={<Loading />}>
      <HotelViewContent />
    </Suspense>
  );
}