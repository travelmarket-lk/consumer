export type Hotel = {
  id: string;
  name: string;
  location: string;
  description?: string;
  imageUrl?: string;
  rating?: number;
  pricePerNight?: number;
};

export type HotelFilters = {
  destination: string;
  guests: number;
};
