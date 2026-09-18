import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    source: "simulated-weather-provider",
    note: "Weather metrics are separate from YouTube API data.",
    generatedAt: new Date().toISOString(),
    current: {
      location: "GNAI TV Weather Studio",
      condition: "Partly Cloudy",
      temperatureF: 72,
      windMph: 8,
      humidityPct: 58,
    },
    forecast7Day: [
      { day: "Day 1", condition: "Sunny", highF: 77, lowF: 62 },
      { day: "Day 2", condition: "Clouds", highF: 74, lowF: 60 },
      { day: "Day 3", condition: "Rain", highF: 71, lowF: 59 },
      { day: "Day 4", condition: "Sunny", highF: 79, lowF: 63 },
      { day: "Day 5", condition: "Windy", highF: 73, lowF: 57 },
      { day: "Day 6", condition: "Showers", highF: 70, lowF: 56 },
      { day: "Day 7", condition: "Sunny", highF: 78, lowF: 61 },
    ],
  });
}
