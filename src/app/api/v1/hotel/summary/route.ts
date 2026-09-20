import { getHotelById } from "@/features/hotel/types/hotel-data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hotelId = searchParams.get("id") || searchParams.get("hotelId");
    const hotelData = getHotelById(hotelId);

    return NextResponse.json(
      {
        data: [hotelData],
        metaInfo: {
          totalCount: 1,
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