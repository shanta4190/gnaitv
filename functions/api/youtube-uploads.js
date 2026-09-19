const RESULTS_LIMIT = 6;
const SUCCESS_CACHE_TTL = 300;

function json(body, init) {
  return new Response(JSON.stringify(body, null, 2), {
    status: init?.status || 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init?.headers || {})
    }
  });
}

function getUploadsPlaylistId(channelId) {
  return channelId && channelId.startsWith("UC") ? `UU${channelId.slice(2)}` : null;
}

function normalizeItems(items) {
  return items.map((item) => {
    const snippet = item?.snippet || {};
    const resourceId = snippet?.resourceId || {};

    return {
      videoId: resourceId.videoId || "",
      title: snippet.title || "",
      description: snippet.description || "",
      publishedAt: snippet.publishedAt || null,
      thumbnails: snippet.thumbnails || {}
    };
  });
}

export async function onRequest(context) {
  const { env, request } = context;

  if (!env.YOUTUBE_API_KEY || !env.YOUTUBE_CHANNEL_ID) {
    return json(
      { configured: false },
      { headers: { "cache-control": "no-store" } }
    );
  }

  const playlistId = getUploadsPlaylistId(env.YOUTUBE_CHANNEL_ID);
  if (!playlistId) {
    return json(
      {
        configured: true,
        error: "invalid_channel_id"
      },
      {
        status: 400,
        headers: { "cache-control": "no-store" }
      }
    );
  }

  const cache = caches.default;
  const cacheKey = new Request(request.url, request);
  const cached = await cache.match(cacheKey);
  if (cached) {
    return cached;
  }

  const apiUrl = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  apiUrl.searchParams.set("part", "snippet");
  apiUrl.searchParams.set("maxResults", String(RESULTS_LIMIT));
  apiUrl.searchParams.set("playlistId", playlistId);
  apiUrl.searchParams.set("key", env.YOUTUBE_API_KEY);

  let upstream;
  try {
    upstream = await fetch(apiUrl, {
      headers: { accept: "application/json" }
    });
  } catch (error) {
    return json(
      {
        configured: true,
        error: "upstream_unavailable"
      },
      {
        status: 502,
        headers: { "cache-control": "no-store" }
      }
    );
  }

  let payload = {};
  try {
    payload = await upstream.json();
  } catch (error) {
    payload = {};
  }

  if (!upstream.ok) {
    const reason = payload?.error?.errors?.[0]?.reason || null;
    const status = reason === "quotaExceeded" ? 429 : upstream.status;

    return json(
      {
        configured: true,
        error: "youtube_api_error",
        reason
      },
      {
        status,
        headers: { "cache-control": "no-store" }
      }
    );
  }

  const response = json(
    {
      configured: true,
      channelId: env.YOUTUBE_CHANNEL_ID,
      uploads: normalizeItems(payload.items || []),
      pageInfo: {
        totalResults: payload?.pageInfo?.totalResults ?? null,
        resultsPerPage: payload?.pageInfo?.resultsPerPage ?? RESULTS_LIMIT
      }
    },
    {
      headers: {
        "cache-control": `public, max-age=${SUCCESS_CACHE_TTL}`
      }
    }
  );

  context.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}
