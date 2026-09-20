"use client";

import { Building, Users, Calendar, Sparkles } from "lucide-react";
import { RoomCard } from "../RoomCard";
import { TabButton } from "../ui/TabButton";
import type { RoomsSectionProps, RoomType } from "../../types/hotel-props";

export const ROOM_CATEGORY_TABS = [
  { id: "all", label: "All Rooms" },
  { id: "deluxe", label: "Deluxe Rooms" },
  { id: "suite", label: "Executive Suites" },
  { id: "family", label: "Family Suites" },
] as const;

export function RoomsSection({
  rooms,
  activeCategory,
  onCategoryChange,
  roomQuantities,
  onQuantityChange,
  onOpenRoomDetails,
  checkInDate,
  checkOutDate,
  guestsCount,
  hasAppliedSearch = false,
}: RoomsSectionProps) {
  const nights = Math.max(
    1,
    checkInDate && checkOutDate
      ? Math.round(
          (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) || 1
      : 1
  );

  const adultsMatch = guestsCount?.match(/(\d+)\s*Adult/i);
  const childrenMatch = guestsCount?.match(/(\d+)\s*Child/i);
  const selectedAdults = adultsMatch ? parseInt(adultsMatch[1], 10) : 1;
  const selectedChildren = childrenMatch ? parseInt(childrenMatch[1], 10) : 0;

  // Filter by category
  const categoryRooms =
    activeCategory === "all"
      ? rooms
      : rooms.filter((r) => r.category === activeCategory);

  // Filter by capacity only when search has been applied
  const capacityMatchingRooms = categoryRooms.filter(
    (r) =>
      r.maxAdults >= selectedAdults &&
      (r.maxChildren >= selectedChildren || r.maxAdults >= selectedAdults + selectedChildren)
  );

  const isFilteredByGuests = hasAppliedSearch && (selectedAdults > 2 || selectedChildren > 1);
  // When loading (before search is clicked), display ALL rooms!
  const displayRooms = hasAppliedSearch
    ? (capacityMatchingRooms.length > 0 ? capacityMatchingRooms : categoryRooms)
    : categoryRooms;
  const showFallbackNotice =
    hasAppliedSearch && capacityMatchingRooms.length === 0 && isFilteredByGuests && categoryRooms.length > 0;

  return (
    <section id="rooms" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Building className="h-5 w-5 text-cyan-600" /> Select Your Room
            </h2>
            {/* Search Criteria Pill */}
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800 border border-cyan-200/70">
              <Calendar className="h-3.5 w-3.5 text-cyan-600" />
              <span>{nights} {nights === 1 ? "Night" : "Nights"}</span>
              <span>•</span>
              <Users className="h-3.5 w-3.5 text-cyan-600" />
              <span>
                {selectedAdults} {selectedAdults === 1 ? "Adult" : "Adults"}
                {selectedChildren > 0 ? `, ${selectedChildren} Child` : ""}
              </span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Prices calculated for {nights} {nights === 1 ? "night" : "nights"} • All rates include taxes, fees & free high-speed Wi-Fi
          </p>
        </div>

        {/* Room Filter Category Tabs with Reusable TabButton */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {ROOM_CATEGORY_TABS.map((tab) => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              isActive={activeCategory === tab.id}
              onClick={onCategoryChange}
            />
          ))}
        </div>
      </div>

      {/* Fallback Notice if current category doesn't fit selected guests */}
      {showFallbackNotice && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
            <span>
              Rooms in this category comfortably fit up to 2 adults. For {selectedAdults} adults, you can book multiple rooms or view our Family Suites.
            </span>
          </div>
          <button
            onClick={() => onCategoryChange("all")}
            className="shrink-0 font-bold text-amber-900 underline hover:text-amber-700"
          >
            Show All Rooms
          </button>
        </div>
      )}

      {/* Rooms List */}
      <div className="space-y-4">
        {displayRooms.map((room: RoomType) => (
          <RoomCard
            key={room.id}
            room={room}
            selectedQuantity={roomQuantities[room.id] || 0}
            onQuantityChange={onQuantityChange}
            onOpenDetails={onOpenRoomDetails}
            nights={nights}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            guestsCount={guestsCount}
          />
        ))}
      </div>
    </section>
  );
}
