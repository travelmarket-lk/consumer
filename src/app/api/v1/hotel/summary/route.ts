import { KANDY_HOTEL_DATA } from "@/app/hotels/hotel-view/types/hotel-data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hotelData = KANDY_HOTEL_DATA;

    return NextResponse.json(
        {
          data: [hotelData],
          metaInfo: {
            totalCount: Array.isArray(hotelData) ? hotelData.length : 1,
          },
          status: {
            code: 1,
            message: "SUCCESS",
          },
          version: "v1.0",
        },
        { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
        {
          data: [],
          metaInfo: {
            totalCount: 0,
          },
          status: {
            code: 0,
            message: "Failed to fetch hotel view",
          },
          version: "v1.0",
        },
        { status: 500 }
    );
  }
}