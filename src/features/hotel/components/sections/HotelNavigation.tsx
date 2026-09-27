"use client";

import Link from "next/link";
import type { HotelNavigationProps } from "../../types/hotel-props";

export const HOTEL_NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "gallery", label: "Photos" },
  { id: "rooms", label: "Rooms & Rates" },
  { id: "facilities", label: "Facilities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
] as const;

export function HotelNavigation({
  hotelName,
  city,
  onScrollToSection,
}: HotelNavigationProps) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Sri Lanka", href: "/hotels" },
    { label: city, href: "#" },
  ];

  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-14 text-xs font-medium text-slate-600">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-2">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-2">
              <Link href={crumb.href} className="hover:text-cyan-700 transition-colors">
                {crumb.label}
              </Link>
              <span>/</span>
            </span>
          ))}
          <span className="font-semibold text-slate-900 truncate max-w-[150px] sm:max-w-none">
            {hotelName}
          </span>
        </div>

        {/* Section Quick Jump Buttons (Array-mapped) */}
        <div className="hidden md:flex items-center gap-6 font-semibold">
          {HOTEL_NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onScrollToSection(item.id)}
              className="hover:text-cyan-700 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
