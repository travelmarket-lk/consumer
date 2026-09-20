"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { searchHotels } from "@/features/hotel/services/hotel.service";
import { getHotelById } from "@/features/hotel/types/hotel-data";
import type { HotelData, SelectedRoomItem } from "@/features/hotel/types/hotel.types";

export function useHotelView(hotelId?: string) {
  const [data, setData] = useState<HotelData>(() => getHotelById(hotelId));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [city, setCity] = useState<string>(() => getHotelById(hotelId).city);
  const [roomQuantities, setRoomQuantities] = useState<Record<string, number>>({});

  const fetchHotel = useCallback(async (id?: string) => {
    const fallback = getHotelById(id);
    setData(fallback);
    setCity(fallback.city);
    setRoomQuantities({});
    setError(null);

    try {
      const res = await searchHotels(id);
      if (res && res.length > 0) {
        setData(res[0]);
        setCity(res[0].city);
      }
    } catch (err) {
      console.error("Failed to fetch hotel from API, using fallback data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHotel(hotelId);
  }, [hotelId, fetchHotel]);

  const handleQuantityChange = useCallback((roomId: string, quantity: number) => {
    setRoomQuantities((prev) => ({
      ...prev,
      [roomId]: quantity,
    }));
  }, []);

  const selectedRoomsList: SelectedRoomItem[] = useMemo(() => {
    return Object.entries(roomQuantities)
      .filter(([, qty]) => qty > 0)
      .map(([roomId, qty]) => ({
        room: data.rooms.find((r) => r.id === roomId)!,
        quantity: qty,
      }))
      .filter((item) => item.room !== undefined);
  }, [roomQuantities, data.rooms]);

  return {
    hotel: data,
    loading,
    error,
    city,
    setCity,
    roomQuantities,
    setRoomQuantities,
    handleQuantityChange,
    selectedRoomsList,
    refetch: () => fetchHotel(hotelId),
  };
}
