const CACHE_SECONDS = 300;

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, max-age=${CACHE_SECONDS}`
    },
    ...init
  });
}

async function fetchUploads(apiKey, channelId) {
  const uploadsPlaylistId = `UU${channelId.slice(2)}`;
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("maxResults", "6");
  url.searchParams.set("playlistId", uploadsPlaylistId);
  url.searchParams.set("key", apiKey);

  const response = await fetch(url);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`YouTube API request failed with status ${response.status}: ${body.slice(0, 160)}`);
  }

  const payload = await response.json();
  return (payload.items || []).map((item) => ({
    title: item.snippet?.title || "Untitled upload",
    description: item.snippet?.description || "",
    publishedAt: item.snippet?.publishedAt || null,
    videoId: item.snippet?.resourceId?.videoId || null,
    url: item.snippet?.resourceId?.videoId
      ? `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
      : "https://www.youtube.com/"
  }));
}

export async function onRequestGet(context) {
  const apiKey = context.env.YOUTUBE_API_KEY;
  const channelId = context.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId || !channelId.startsWith("UC")) {
    return json({ configured: false, items: [] });
  }

  const cache = caches.default;
  const cacheKey = new Request(context.request.url, context.request);
  const cached = await cache.match(cacheKey);

  if (cached) {
    return cached;
  }

  try {
    const items = await fetchUploads(apiKey, channelId);
    const response = json({ configured: true, items });
    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (error) {
    return json(
      {
        configured: true,
        items: [],
        error: "Unable to load YouTube uploads."
      },
      { status: 502 }
    );
  }
}
