import type { SearchHotel } from "@/features/search/types/search.types";

export const SEARCH_FILTERS = [
  "Free cancellation",
  "Breakfast included",
  "Swimming pool",
  "Free Wi-Fi",
] as const;

export const SEARCH_HOTELS: SearchHotel[] = [
  { id: "grand-kandyan", name: "The Grand Kandyan", location: "Anniewatta, Kandy", rating: 8.8, reviews: 1248, price: 92, tag: "Excellent location", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80", amenities: ["Breakfast included", "Free Wi-Fi", "Swimming pool"] },
  { id: "radisson-kandy", name: "Radisson Hotel Kandy", location: "Kandy Lake Front", rating: 8.5, reviews: 863, price: 76, tag: "Limited-time deal", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80", amenities: ["Free cancellation", "Free Wi-Fi", "City view"] },
  { id: "fox-kandy", name: "Fox Kandy by Fox Resorts", location: "Deyyannewela, Kandy", rating: 9.1, reviews: 427, price: 118, tag: "Top rated", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80", amenities: ["Breakfast included", "Free parking", "Mountain view"] },
];