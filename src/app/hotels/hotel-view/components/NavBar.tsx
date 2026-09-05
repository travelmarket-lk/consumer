"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HotelData, KANDY_HOTEL_DATA} from "../types/hotel-data";




export default function NavBar() {
  // Hotel Data
  const [data, setData] = useState<HotelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);



  const hotel: HotelData = KANDY_HOTEL_DATA || data;
  
  useEffect(() => {
    fetch("/api/v1/hotel") 
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((result: HotelData) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);


  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
    
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
</>
  );
}