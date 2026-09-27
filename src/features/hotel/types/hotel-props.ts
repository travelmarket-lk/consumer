import type {
  SelectedRoomItem,
  RoomType,
  ReviewCategoryScores,
  Review,
  HotelImage,
  HotelData,
  HotelFeature,
  AmenityBadge,
  Landmark,
  HotelPolicy,
} from "./hotel.types";

export type {
  SelectedRoomItem,
  RoomType,
  ReviewCategoryScores,
  Review,
  HotelImage,
  HotelData,
  HotelFeature,
  AmenityBadge,
  Landmark,
  HotelPolicy,
};

export interface StickyBookingBarProps {
  selectedRooms: SelectedRoomItem[];
  onProceed: () => void;
  nights?: number;
}

export interface RoomCardProps {
  room: RoomType;
  selectedQuantity: number;
  onQuantityChange: (roomId: string, quantity: number) => void;
  onOpenDetails: (room: RoomType) => void;
  nights?: number;
  checkInDate?: string;
  checkOutDate?: string;
  guestsCount?: string;
}

export interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: RoomType | null;
  onSelectRoom?: (roomId: string) => void;
}

export interface ReviewsSectionProps {
  score: number;
  reviewCount: number;
  label: string;
  categories: ReviewCategoryScores;
  reviews: Review[];
}

export interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: HotelImage[];
  hotelName: string;
}

export interface HotelTitleProps {
  hotel: HotelData;
  onScrollToSection?: (id: string) => void;
}

export interface InteractiveHeroPhotoGalleryGridProps {
  hotel?: HotelData;
  heroImages?: HotelImage[];
  onOpenGallery?: () => void;
  onScrollToSection?: (id: string) => void;
}

export interface HighlightsAndKeyAdvantagesBarProps {
  highlights?: HotelFeature[];
  hotel?: HotelData;
}

export type HighlightsProps = HighlightsAndKeyAdvantagesBarProps;

export interface AvailabilitySelectorAndHotelSwitcherBarProps {
  hotel: HotelData;
  setHotel?: (hotelId: string) => void;
  handleHotelSelect?: (hotelId: string) => void;
  checkInDate: string;
  setCheckInDate: (date: string) => void;
  checkOutDate: string;
  setCheckOutDate: (date: string) => void;
  guestsCount: string;
  setGuestsCount: (count: string) => void;
  handleScrollToSection: (sectionId: string) => void;
  onSearchApplied?: () => void;
}

export interface HotelNavigationProps {
  hotelName: string;
  city: string;
  onScrollToSection: (id: string) => void;
}

export interface RoomsSectionProps {
  rooms: RoomType[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  roomQuantities: Record<string, number>;
  onQuantityChange: (roomId: string, quantity: number) => void;
  onOpenRoomDetails: (room: RoomType) => void;
  checkInDate?: string;
  checkOutDate?: string;
  guestsCount?: string;
  hasAppliedSearch?: boolean;
}

export interface HotelFacilitiesSectionProps {
  hotelName: string;
  description: string[];
  topAmenities: AmenityBadge[];
  locationHighlights: string;
  landmarks: Landmark[];
}

export interface HotelPoliciesSectionProps {
  policies: HotelPolicy[];
}

export interface TabButtonProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
  className?: string;
}