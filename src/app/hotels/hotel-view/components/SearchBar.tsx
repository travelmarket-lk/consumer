"use client";

import { useState } from "react";
import Image from "next/image";
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
} from "lucide-react";
import { HotelData, KANDY_HOTEL_DATA, RoomType } from "../types/hotel-data";



export default function SearchBar() {
  // Hotel Data
  const [data, setData] = useState<HotelData | null>(null);
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

  const hotel: HotelData = KANDY_HOTEL_DATA || data;
  const [city, setCity] = useState("");


  
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
  
      <> 

       {/* Section 4: Availability Selector Bar */}
        <section className="relative rounded-4xl bg-slate-900/90 backdrop-blur-xl p-2 shadow-2xl shadow-slate-900/40 border border-slate-700/50 z-20 mt-8 mb-4">
          
          {/* Decorative Glow Background */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-blue-600 rounded-4xl opacity-20 blur-lg pointer-events-none"></div>

          <div className="relative flex flex-col lg:flex-row lg:items-stretch bg-slate-900 rounded-3xl overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            
            {/* City / Location */}
            <div className="relative flex-1 group hover:bg-slate-800/50 transition-colors cursor-text px-6 py-4 flex flex-col justify-center">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" /> Location
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Where are you going?"
                className="w-full bg-transparent text-sm sm:text-base font-bold text-white placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            {/* Check-in Date */}
            <div className="relative flex-1 group hover:bg-slate-800/50 transition-colors cursor-pointer px-6 py-4 flex flex-col justify-center">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" /> Check-in
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base font-bold text-white focus:outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[1] [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 transition-opacity"
              />
            </div>

            {/* Check-out Date */}
            <div className="relative flex-1 group hover:bg-slate-800/50 transition-colors cursor-pointer px-6 py-4 flex flex-col justify-center">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" /> Check-out
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base font-bold text-white focus:outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[1] [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 transition-opacity"
              />
            </div>

            {/* Guests & Rooms */}
            <div className="relative flex-1 group hover:bg-slate-800/50 transition-colors cursor-pointer px-6 py-4 flex flex-col justify-center">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" /> Guests & Rooms
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base font-bold text-white focus:outline-none cursor-pointer"
              >
                <option value="1 Adult, 0 Children" className="bg-slate-800 text-white">1 Adult, 1 Room</option>
                <option value="2 Adults, 0 Children" className="bg-slate-800 text-white">2 Adults, 1 Room</option>
                <option value="2 Adults, 1 Child" className="bg-slate-800 text-white">2 Adults + 1 Child, 1 Room</option>
                <option value="4 Adults, 2 Children" className="bg-slate-800 text-white">4 Adults + 2 Children, 2 Rooms</option>
              </select>
            </div>

            {/* Action Button */}
            <div className="p-2 lg:p-3 flex items-center justify-center bg-slate-900">
              <button
                onClick={() => handleScrollToSection("rooms")}
                className="w-full lg:w-auto h-full min-h-[3rem] lg:min-h-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-sm font-black text-white shadow-lg shadow-cyan-600/30 hover:shadow-cyan-600/50 hover:scale-[1.02] transition-all duration-300"
              >
                <Sparkles className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>

          </div>
        </section>

       </>
       
    

      
    
  );
}