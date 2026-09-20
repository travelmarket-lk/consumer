"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MapPin,
  ChevronDown,
  Calendar,
  Users,
  Sparkles,
  Search,
} from "lucide-react";
import { ALL_HOTELS } from "../../types/hotel-data";
import type { AvailabilitySelectorAndHotelSwitcherBarProps } from "../../types/hotel-props";

export function HotelSearchBar({
  hotel,
  setHotel,
  handleHotelSelect,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guestsCount,
  setGuestsCount,
  handleScrollToSection,
  onSearchApplied,
}: AvailabilitySelectorAndHotelSwitcherBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onSelectProperty = handleHotelSelect ?? setHotel;

  // Local state to track changes
  const [selectedProperty, setSelectedProperty] = useState(hotel.id);
  const [selectedCheckIn, setSelectedCheckIn] = useState(checkInDate);
  const [selectedCheckOut, setSelectedCheckOut] = useState(checkOutDate);
  const [selectedGuests, setSelectedGuests] = useState(guestsCount);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setSelectedProperty(hotel.id);
  }, [hotel.id]);

  useEffect(() => {
    setSelectedCheckIn(checkInDate);
  }, [checkInDate]);

  useEffect(() => {
    setSelectedCheckOut(checkOutDate);
  }, [checkOutDate]);

  useEffect(() => {
    setSelectedGuests(guestsCount);
  }, [guestsCount]);

  const scrollToSection = (sectionId: string): void => {
    if (handleScrollToSection) {
      handleScrollToSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handlePropertyChange = (newId: string) => {
    setSelectedProperty(newId);
    setHasChanged(true);
  };

  const handleCheckInChange = (newDate: string) => {
    setSelectedCheckIn(newDate);
    setHasChanged(true);
  };

  const handleCheckOutChange = (newDate: string) => {
    setSelectedCheckOut(newDate);
    setHasChanged(true);
  };

  const handleGuestsChange = (newGuests: string) => {
    setSelectedGuests(newGuests);
    setHasChanged(true);
  };

  const handleActionClick = () => {
    if (hasChanged) {
      // Propagate state changes
      setCheckInDate(selectedCheckIn);
      setCheckOutDate(selectedCheckOut);
      setGuestsCount(selectedGuests);
      onSearchApplied?.();

      // Sync URL parameters
      const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
      params.set("id", selectedProperty);
      params.set("checkIn", selectedCheckIn);
      params.set("checkOut", selectedCheckOut);
      params.set("guests", selectedGuests);
      router.push(`/hotels/hotel-view?${params.toString()}`, { scroll: false });

      if (selectedProperty !== hotel.id && onSelectProperty) {
        onSelectProperty(selectedProperty);
      }

      setHasChanged(false);
    }
    scrollToSection("rooms");
  };

  return (
    <section className="relative rounded-[2rem] bg-slate-900/90 backdrop-blur-xl p-2 shadow-2xl shadow-slate-900/40 border border-slate-700/50 z-20 mt-8 mb-4">
      {/* Decorative Glow Background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] opacity-20 blur-lg pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row lg:items-stretch bg-slate-900 rounded-3xl overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Hotel Selector / Location */}
        <div className="relative flex-1 group hover:bg-slate-800/50 transition-colors px-6 py-4 flex flex-col justify-center">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />{" "}
            Select Property
          </label>
          <div className="relative">
            <select
              value={selectedProperty}
              onChange={(e) => handlePropertyChange(e.target.value)}
              className="w-full bg-transparent text-sm sm:text-base font-bold text-white focus:outline-none cursor-pointer appearance-none pr-6"
            >
              {ALL_HOTELS.map((h) => (
                <option
                  key={h.id}
                  value={h.id}
                  className="bg-slate-900 text-white"
                >
                  {h.name} — {h.city}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="relative flex-1 group hover:bg-slate-800/50 transition-colors cursor-pointer px-6 py-4 flex flex-col justify-center">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />{" "}
            Check-in
          </label>
          <input
            type="date"
            value={selectedCheckIn}
            onChange={(e) => handleCheckInChange(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base font-bold text-white focus:outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[1] [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 transition-opacity"
          />
        </div>

        {/* Check-out Date */}
        <div className="relative flex-1 group hover:bg-slate-800/50 transition-colors cursor-pointer px-6 py-4 flex flex-col justify-center">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />{" "}
            Check-out
          </label>
          <input
            type="date"
            value={selectedCheckOut}
            onChange={(e) => handleCheckOutChange(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base font-bold text-white focus:outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[1] [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 transition-opacity"
          />
        </div>

        {/* Guests & Rooms */}
        <div className="relative flex-1 group hover:bg-slate-800/50 transition-colors cursor-pointer px-6 py-4 flex flex-col justify-center">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />{" "}
            Guests & Rooms
          </label>
          <select
            value={selectedGuests}
            onChange={(e) => handleGuestsChange(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base font-bold text-white focus:outline-none cursor-pointer"
          >
            <option
              value="1 Adult, 0 Children"
              className="bg-slate-800 text-white"
            >
              1 Adult, 1 Room
            </option>
            <option
              value="2 Adults, 0 Children"
              className="bg-slate-800 text-white"
            >
              2 Adults, 1 Room
            </option>
            <option
              value="2 Adults, 1 Child"
              className="bg-slate-800 text-white"
            >
              2 Adults + 1 Child, 1 Room
            </option>
            <option
              value="4 Adults, 2 Children"
              className="bg-slate-800 text-white"
            >
              4 Adults + 2 Children, 2 Rooms
            </option>
          </select>
        </div>

        {/* Action Button */}
        <div className="p-2 lg:p-3 flex items-center justify-center bg-slate-900">
          <button
            type="button"
            onClick={handleActionClick}
            className={`w-full lg:w-auto h-full min-h-12 lg:min-h-full flex items-center justify-center gap-2 rounded-2xl px-8 py-3 text-sm font-black text-white transition-all duration-300 cursor-pointer ${
              hasChanged
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/40 hover:scale-[1.03] ring-2 ring-cyan-400/50"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-600/30 hover:shadow-cyan-600/50 hover:scale-[1.02]"
            }`}
          >
            {hasChanged ? (
              <>
                <Search className="h-4 w-4 animate-pulse" />
                <span>Search</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>View Rates</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
