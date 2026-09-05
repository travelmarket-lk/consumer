export interface RoomType {
  id: string;
  title: string;
  category: "all" | "deluxe" | "suite" | "family";
  pricePerNight: number;
  originalPrice: number;
  sizeSqM: number;
  maxAdults: number;
  maxChildren: number;
  bedType: string;
  viewType: string;
  images: string[];
  inclusions: {
    freeBreakfast: boolean;
    freeCancellation: boolean;
    cancellationDeadline?: string;
    noPrepaymentNeeded: boolean;
    instantConfirmation: boolean;
  };
  popularAmenities: string[];
  allAmenities: {
    category: string;
    items: string[];
  }[];
}

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

export interface Landmark {
  name: string;
  distance: string;
  category: "attraction" | "transport" | "airport";
}

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
  heroImages: {
    url: string;
    caption: string;
    category: string;
  }[];
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  description: string[];
  topAmenities: {
    icon: string;
    label: string;
  }[];
  rooms: RoomType[];
  reviewCategories: {
    cleanliness: number;
    location: number;
    service: number;
    facilities: number;
    valueForMoney: number;
    comfort: number;
  };
  reviews: Review[];
  landmarks: Landmark[];
  policies: {
    title: string;
    details: string;
  }[];
}

export const KANDY_HOTEL_DATA: HotelData = {
  id: "kandy-city-stay-001",
  name: "Kandy City Stay & Luxury Suites asdadsda",
  starRating: 4,
  reviewScore: 8.8,
  reviewCount: 1420,
  reviewLabel: "Superb",
  address: "123 Rajapihilla Mawatha, Kandy City Center",
  city: "Kandy",
  country: "Sri Lanka",
  locationHighlights: "Prime City Location — 500m from Temple of the Sacred Tooth Relic",
  heroImages: [
    {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      caption: "Luxury Exterior & Infinity Pool View",
      category: "Exterior",
    },
    {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      caption: "Grand Master King Suite Bedroom",
      category: "Rooms",
    },
    {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      caption: "Rooftop Restaurant & Panoramic Lake View",
      category: "Dining",
    },
    {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      caption: "Serene Spa & Ayurvedic Wellness Center",
      category: "Wellness",
    },
    {
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      caption: "Deluxe Twin Room with Mountain View Balcony",
      category: "Rooms",
    },
    {
      url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
      caption: "Modern Marble Bathroom with Rain Shower",
      category: "Bathroom",
    },
    {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      caption: "Executive Lounge & Evening Cocktail Lounge",
      category: "Lounge",
    },
     {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      caption: "Executive Lounge & Evening Cocktail Lounge",
      category: "Lounge",
    },
     {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      caption: "Executive Lounge & Evening Cocktail Lounge",
      category: "Lounge",
    },
  ],
  highlights: [
    {
      icon: "MapPin",
      title: "Top Rated Location",
      description: "Rated 9.5/10 by recent guests for central walking distance",
    },
    {
      icon: "Sparkles",
      title: "Sparkling Clean",
      description: "9.2 Cleanliness rating based on verified guest checks",
    },
    {
      icon: "Coffee",
      title: "Exceptional Breakfast",
      description: "Buffet with Sri Lankan specialties & International dishes",
    },
    {
      icon: "ShieldCheck",
      title: "Agoda Preferred Partner",
      description: "Guaranteed best rates & trusted hospitality partner",
    },
  ],
  description: [
    "Nestled in the lush hills surrounding the UNESCO World Heritage city of Kandy, Kandy City Stay & Luxury Suites offers an unforgettable blend of authentic Sri Lankan hospitality and modern luxury elegance.",
    "Located just a 5-minute stroll from Kandy Lake and the sacred Temple of the Tooth, our hotel features panoramic mountain-view balconies, an outdoor infinity pool, a world-class Ayurvedic spa, and fine dining serving both local delicacies and international cuisine.",
    "Whether you are visiting for a romantic getaway, family vacation, or cultural tour of Sri Lanka's hill capital, our spacious air-conditioned suites provide the ultimate sanctuary with high-speed Wi-Fi, plush bedding, and dedicated 24/7 concierge service.",
  ],
  topAmenities: [
    { icon: "Wifi", label: "Free High-Speed Wi-Fi" },
    { icon: "Pool", label: "Outdoor Infinity Pool" },
    { icon: "Utensils", label: "Rooftop Restaurant & Bar" },
    { icon: "Car", label: "Free Valet Parking" },
    { icon: "Plane", label: "Airport Shuttle Service" },
    { icon: "Coffee", label: "Free Breakfast Available" },
    { icon: "AirConditioner", label: "Full Climate Control AC" },
    { icon: "Clock", label: "24-Hour Front Desk" },
  ],
  rooms: [
    {
      id: "room-deluxe-king",
      title: "Deluxe King Room with Mountain View",
      category: "deluxe",
      pricePerNight: 85,
      originalPrice: 120,
      sizeSqM: 36,
      maxAdults: 2,
      maxChildren: 1,
      bedType: "1 Extra-Large King Bed",
      viewType: "Kandy Hills & Garden View",
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      ],
      inclusions: {
        freeBreakfast: true,
        freeCancellation: true,
        cancellationDeadline: "Sep 1, 2026",
        noPrepaymentNeeded: true,
        instantConfirmation: true,
      },
      popularAmenities: [
        "Private Balcony",
        "Flat-screen Smart TV",
        "Coffee/Tea Maker",
        "Rain Shower",
        "Free High-speed Wi-Fi",
        "Air Conditioning",
      ],
      allAmenities: [
        {
          category: "Room Features",
          items: ["36 m² Floor Space", "Soundproof Walls", "Hardwood/Parquet Floors", "Work Desk & Ergonomic Chair", "In-room Safe Box"],
        },
        {
          category: "Bathroom & Toiletries",
          items: ["Private Marble Bathroom", "Rain Shower", "Free Premium Toiletries", "Hairdryer", "Bathrobes & Soft Slippers"],
        },
        {
          category: "Media & Technology",
          items: ["55-inch 4K Smart TV", "Satellite Channels", "High-speed Wi-Fi", "USB Charging Ports"],
        },
        {
          category: "Food & Refreshment",
          items: ["Mini Bar", "Espresso Machine", "Complimentary Bottled Water Daily", "Electric Kettle"],
        },
      ],
    },
    {
      id: "room-executive-suite",
      title: "Executive Suite with Lake & Mountain View",
      category: "suite",
      pricePerNight: 145,
      originalPrice: 210,
      sizeSqM: 58,
      maxAdults: 2,
      maxChildren: 2,
      bedType: "1 Super-King Bed + Sofa Bed",
      viewType: "Panoramic Kandy Lake & City View",
      images: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      ],
      inclusions: {
        freeBreakfast: true,
        freeCancellation: true,
        cancellationDeadline: "Aug 31, 2026",
        noPrepaymentNeeded: true,
        instantConfirmation: true,
      },
      popularAmenities: [
        "Executive Lounge Access",
        "Private Terrace Balcony",
        "Deep Soaking Bathtub",
        "Free Cocktail Hours",
        "Espresso Machine",
      ],
      allAmenities: [
        {
          category: "Room Features",
          items: ["58 m² Living Area", "Separate Living Room Sofa Area", "Walk-in Closet", "Panoramic Floor-to-Ceiling Windows"],
        },
        {
          category: "Bathroom & Spa",
          items: ["Deep Soaking Jacuzzi Tub", "Separate Glass Rain Shower", "Double Vanity Sinks", "Designer Luxury Toiletries"],
        },
        {
          category: "VIP Privileges",
          items: ["Complimentary Evening Cocktails", "Priority Check-in/out", "Free Airport Transfer (One Way)"],
        },
      ],
    },
    {
      id: "room-family-suite",
      title: "Grand Family Two-Bedroom Suite",
      category: "family",
      pricePerNight: 195,
      originalPrice: 280,
      sizeSqM: 82,
      maxAdults: 4,
      maxChildren: 2,
      bedType: "1 King Bed + 2 Twin Beds",
      viewType: "Pool & Tropical Garden View",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
      ],
      inclusions: {
        freeBreakfast: true,
        freeCancellation: true,
        cancellationDeadline: "Aug 30, 2026",
        noPrepaymentNeeded: true,
        instantConfirmation: true,
      },
      popularAmenities: [
        "2 Separate Bedrooms",
        "2 En-suite Bathrooms",
        "Dining Table & Lounge Area",
        "Kitchenette with Microwave",
        "Children's Play Amenities",
      ],
      allAmenities: [
        {
          category: "Family Features",
          items: ["82 m² Spacious Suite", "Connecting Bedrooms", "Full Kitchenette & Refrigerator", "4-Seater Dining Area"],
        },
        {
          category: "Entertainment & Comfort",
          items: ["Two 55-inch Smart TVs", "PlayStation 5 Console (On Request)", "Child Safety Socket Covers"],
        },
      ],
    },
    {
      id: "room-superior-twin",
      title: "Superior Twin Room with Garden View",
      category: "deluxe",
      pricePerNight: 72,
      originalPrice: 98,
      sizeSqM: 32,
      maxAdults: 2,
      maxChildren: 1,
      bedType: "2 Single Twin Beds",
      viewType: "Courtyard & Garden View",
      images: [
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      ],
      inclusions: {
        freeBreakfast: true,
        freeCancellation: true,
        cancellationDeadline: "Sep 2, 2026",
        noPrepaymentNeeded: true,
        instantConfirmation: true,
      },
      popularAmenities: [
        "Garden Terrace Access",
        "Work Station Desk",
        "Free High-speed Wi-Fi",
        "Air Conditioning",
      ],
      allAmenities: [
        {
          category: "Room Features",
          items: ["32 m² Cozy Space", "Twin Pillowtop Beds", "Air Conditioning", "Coffee Maker"],
        },
      ],
    },
  ],
  reviewCategories: {
    cleanliness: 9.2,
    location: 9.5,
    service: 9.0,
    facilities: 8.7,
    valueForMoney: 8.6,
    comfort: 9.1,
  },
  reviews: [
    {
      id: "rev-1",
      author: "David & Sarah Walker",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      country: "United Kingdom",
      rating: 9.6,
      ratingLabel: "Exceptional",
      stayDate: "August 2026",
      roomType: "Deluxe King Room with Mountain View",
      title: "Outstanding stay in the heart of Kandy!",
      comment: "The mountain view from our balcony was breathtaking. Staff went above and beyond to organize our train tickets to Ella and recommended an amazing local tea tour. Breakfast spread was huge!",
      positivePoints: ["Unbeatable city location", "Super clean rooms", "Friendly concierge desk"],
    },
    {
      id: "rev-2",
      author: "Kasun Perera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      country: "Sri Lanka",
      rating: 9.2,
      ratingLabel: "Superb",
      stayDate: "July 2026",
      roomType: "Executive Suite with Lake View",
      title: "Luxury experience with incredible lake views",
      comment: "Stayed here for our wedding anniversary. The executive lounge cocktails were great, and the infinity pool overlooking Kandy Lake is world class. Will definitely return!",
      positivePoints: ["Infinity pool view", "Delicious Sri Lankan hopper breakfast"],
    },
    {
      id: "rev-3",
      author: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      country: "Germany",
      rating: 8.8,
      ratingLabel: "Fabulous",
      stayDate: "August 2026",
      roomType: "Grand Family Two-Bedroom Suite",
      title: "Great family stay close to Temple of Tooth",
      comment: "Spacious rooms for 4 adults and 2 children. Very short walk to the Temple of the Tooth Relic and Kandy Lake. Kids loved the pool!",
      positivePoints: ["Spacious suite", "Great location for sightseeing"],
    },
  ],
  landmarks: [
    { name: "Kandy Lake & Promenade", distance: "300 m", category: "attraction" },
    { name: "Temple of the Sacred Tooth Relic (Sri Dalada Maligawa)", distance: "500 m", category: "attraction" },
    { name: "Kandy City Centre Shopping Mall", distance: "650 m", category: "attraction" },
    { name: "Kandy Railway Station", distance: "1.2 km", category: "transport" },
    { name: "Royal Botanical Gardens, Peradeniya", distance: "5.5 km", category: "attraction" },
    { name: "Bandaranaike International Airport (CMB)", distance: "102 km", category: "airport" },
  ],
  policies: [
    {
      title: "Check-in / Check-out",
      details: "Check-in from 14:00 PM anytime. Check-out until 12:00 PM. Early check-in or late check-out available upon request subject to availability.",
    },
    {
      title: "Cancellation / Prepayment",
      details: "Cancellation and prepayment policies vary according to accommodation type. Free cancellation available up to 24-48 hours before check-in on most room types.",
    },
    {
      title: "Children & Extra Beds",
      details: "Children of any age are welcome. Children aged 6 and above are considered adults at this property. Extra beds can be requested for $25 per night.",
    },
    {
      title: "Pets",
      details: "Pets are not allowed on the property premises, except for registered service animals.",
    },
  ],
};



export interface StickyBookingBarProps {
  selectedRooms: { room: RoomType; quantity: number }[];
  onProceed: () => void;
}


export interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: RoomType | null;
  onSelectRoom: (roomId: string) => void;
}

export interface RoomCardProps {
  room: RoomType;
  selectedQuantity: number;
  onQuantityChange: (roomId: string, quantity: number) => void;
  onOpenDetails: (room: RoomType) => void;
}

export interface ReviewsSectionProps {
  score: number;
  reviewCount: number;
  label: string;
  categories: {
    cleanliness: number;
    location: number;
    service: number;
    facilities: number;
    valueForMoney: number;
    comfort: number;
  };
  reviews: Review[];
}

export interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; caption: string; category: string }[];
  hotelName: string;
}
