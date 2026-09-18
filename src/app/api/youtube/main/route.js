import { NextResponse } from "next/server";
import { getYouTubeChannelSummary } from "@/lib/youtube";

export async function GET(request) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_GNAITV_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return NextResponse.json(
      { configured: false, message: "Set YOUTUBE_API_KEY and YOUTUBE_GNAITV_CHANNEL_ID" },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const pageToken = searchParams.get("pageToken") ?? undefined;

  try {
    const data = await getYouTubeChannelSummary({ apiKey, channelId, pageToken });
    return NextResponse.json({ configured: true, ...data });
  } catch (error) {
    return NextResponse.json(
      { configured: true, error: "youtube_request_failed", detail: error.message },
      { status: 502 },
    );
  }
}
