export * from "./hotel-props";

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

// 1. Room Categories & Policies
export type RoomCategory = "all" | "deluxe" | "suite" | "family";

export interface RoomInclusions {
  freeBreakfast: boolean;
  freeCancellation: boolean;
  cancellationDeadline?: string;
  noPrepaymentNeeded: boolean;
  instantConfirmation: boolean;
}

export interface AmenityCategory {
  category: string;
  items: string[];
}

// 2. Room Type Interface
export interface RoomType {
  id: string;
  title: string;
  category: RoomCategory | string;
  pricePerNight: number;
  originalPrice: number;
  sizeSqM: number;
  maxAdults: number;
  maxChildren: number;
  bedType: string;
  viewType: string;
  images: string[];
  inclusions: RoomInclusions;
  popularAmenities: string[];
  allAmenities: AmenityCategory[];
}

// 3. Review Interface
export interface Review {
  id: string;
  author: string;
  avatar: string;
  country: string;
  rating: number;
  ratingLabel: string;
  stayDate: string;
  roomType: string;
  title: string;
  comment: string;
  positivePoints?: string[];
}

// 4. Landmark Interface
export type LandmarkCategory = "attraction" | "transport" | "airport";

export interface Landmark {
  name: string;
  distance: string;
  category: LandmarkCategory;
}

// 5. Visual Assets & Highlights
export interface HotelImage {
  url: string;
  caption: string;
  category: string;
}

export interface HotelFeature {
  icon: string;
  title: string;
  description: string;
}

export interface AmenityBadge {
  icon: string;
  label: string;
}

// 6. Ratings & Scores
export interface ReviewCategoryScores {
  cleanliness: number;
  location: number;
  service: number;
  facilities: number;
  valueForMoney: number;
  comfort: number;
  [key: string]: number;
}

export interface HotelPolicy {
  title: string;
  details: string;
}

// 7. Main HotelData Interface
export interface HotelData {
  id: string;
  name: string;
  starRating: number;
  reviewScore: number;
  reviewCount: number;
  reviewLabel: string;
  address: string;
  city: string;
  country: string;
  locationHighlights: string;
  heroImages: HotelImage[];
  highlights: HotelFeature[];
  description: string[];
  topAmenities: AmenityBadge[];
  rooms: RoomType[];
  reviewCategories: ReviewCategoryScores;
  reviews: Review[];
  landmarks: Landmark[];
  policies: HotelPolicy[];
}

// 8. Component Props Interfaces
export interface SelectedRoomItem {
  room: RoomType;
  quantity: number;
}


export type ReviewSummary = {
  score: number;
  reviewCount: number;
  label: string;
};
