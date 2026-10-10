export type GuestType = "adults" | "children" | "rooms";

export type SearchSort = "Recommended" | "Price: low to high" | "Top reviewed";

export type SearchHotel = {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  tag: string;
  amenities: string[];
};