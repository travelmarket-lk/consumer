import { KANDY_HOTEL_DATA } from "@/app/hotels/hotel-view/types/hotel-data";
import { NextResponse } from "next/server";

export async function GET() {
    
  try {
    
    const hotelData = KANDY_HOTEL_DATA;
    

    return NextResponse.json(hotelData, { status: 200 });

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch hotel view" },
      { status: 500 }
    );
  }
}