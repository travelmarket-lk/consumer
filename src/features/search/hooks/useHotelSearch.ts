"use client";

import { useMemo, useState } from "react";
import { SEARCH_HOTELS } from "@/features/search/services/search.service";
import type { GuestType, SearchSort } from "@/features/search/types/search.types";
import { filterAndSortHotels, getNights } from "@/features/search/utils/search.utils";

export function useHotelSearch() {
  const [destination, setDestination] = useState("Kandy");
  const [activeDestination, setActiveDestination] = useState("Kandy");
  const [checkIn, setCheckIn] = useState("2026-10-25");
  const [checkOut, setCheckOut] = useState("2026-10-29");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [guestMenuOpen, setGuestMenuOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [budget, setBudget] = useState(250);
  const [sort, setSort] = useState<SearchSort>("Recommended");
  const [savedHotels, setSavedHotels] = useState<string[]>([]);

  const visibleHotels = useMemo(() => filterAndSortHotels(SEARCH_HOTELS, selectedFilters, budget, sort), [budget, selectedFilters, sort]);
  const nights = getNights(checkIn, checkOut);
  const mapQuery = `${activeDestination}, Sri Lanka`;

  function submitSearch() {
    setActiveDestination(destination.trim() || "Kandy");
  }

  function updateGuest(type: GuestType, amount: number) {
    const minimum = type === "children" ? 0 : 1;
    const setters = { adults: setAdults, children: setChildren, rooms: setRooms };
    setters[type]((value) => Math.max(minimum, value + amount));
  }

  function setGuestPreset(value: string) {
    const [nextAdults, nextChildren, nextRooms] = value.split(",").map(Number);
    setAdults(nextAdults);
    setChildren(nextChildren);
    setRooms(nextRooms);
  }

  function toggleFilter(filter: string) {
    setSelectedFilters((current) => current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]);
  }

  function toggleSavedHotel(hotelId: string) {
    setSavedHotels((current) => current.includes(hotelId) ? current.filter((id) => id !== hotelId) : [...current, hotelId]);
  }

  function clearFilters() {
    setSelectedFilters([]);
    setBudget(250);
  }

  return {
    destination, setDestination, activeDestination, checkIn, setCheckIn, checkOut, setCheckOut,
    adults, children, rooms, guestMenuOpen, setGuestMenuOpen, selectedFilters, budget, setBudget,
    sort, setSort, savedHotels, visibleHotels, nights, mapQuery, submitSearch, updateGuest,
    toggleFilter, toggleSavedHotel, clearFilters, setGuestPreset,
  };
}