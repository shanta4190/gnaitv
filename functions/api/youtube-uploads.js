const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
const DEFAULT_MAX_RESULTS = 8;
const CACHE_SECONDS = 300;

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}

function getUploadsPlaylistId(channelId) {
  if (!channelId?.startsWith("UC") || channelId.length < 3) {
    return null;
  }
  return `UU${channelId.slice(2)}`;
}

export async function onRequestGet(context) {
  const apiKey = context.env?.YOUTUBE_API_KEY?.trim();
  const channelId = context.env?.YOUTUBE_CHANNEL_ID?.trim();

  if (!apiKey || !channelId) {
    return json(
      { configured: false, uploads: [] },
      200,
      { "cache-control": "no-store" },
    );
  }

  const playlistId = getUploadsPlaylistId(channelId);
  if (!playlistId) {
    return json(
      { configured: true, error: "Invalid YOUTUBE_CHANNEL_ID format.", uploads: [] },
      400,
      { "cache-control": "no-store" },
    );
  }

  const url = new URL(YOUTUBE_API_URL);
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("maxResults", String(DEFAULT_MAX_RESULTS));
  url.searchParams.set("key", apiKey);

  const cache = caches.default;
  const cacheKey = new Request(url.toString(), { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) {
    return cached;
  }

  const upstream = await fetch(url.toString(), { method: "GET" });
  const payload = await upstream.json();

  if (!upstream.ok) {
    return json(
      {
        configured: true,
        error: payload?.error?.message || "YouTube API request failed.",
        uploads: [],
      },
      upstream.status,
      { "cache-control": "no-store" },
    );
  }

  const uploads = (payload.items || []).map((item) => ({
    videoId: item?.contentDetails?.videoId || null,
    publishedAt: item?.contentDetails?.videoPublishedAt || item?.snippet?.publishedAt || null,
    title: item?.snippet?.title || null,
    thumbnail:
      item?.snippet?.thumbnails?.high?.url ||
      item?.snippet?.thumbnails?.medium?.url ||
      item?.snippet?.thumbnails?.default?.url ||
      null,
  }));

  const response = json(
    {
      configured: true,
      channelId,
      uploads,
    },
    200,
    { "cache-control": `public, max-age=${CACHE_SECONDS}` },
  );

  await cache.put(cacheKey, response.clone());
  return response;
}
