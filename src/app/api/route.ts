import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "Consumer API", version: "v1" });
}
