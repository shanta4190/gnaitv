import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "gnaitv",
    timestamp: new Date().toISOString(),
    youtubeConfigured:
      Boolean(process.env.YOUTUBE_API_KEY) &&
      Boolean(process.env.YOUTUBE_GNAITV_CHANNEL_ID) &&
      Boolean(process.env.YOUTUBE_WEATHER_CHANNEL_ID),
  });
}
