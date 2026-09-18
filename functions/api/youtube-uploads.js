const MAX_RESULTS = 8;
const CACHE_SECONDS = 300;

function json(body, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('content-type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(body, null, 2), {
    ...init,
    headers
  });
}

function uploadsPlaylistId(channelId) {
  return channelId.startsWith('UC') ? `UU${channelId.slice(2)}` : '';
}

function buildCacheKey(request) {
  return new Request(request.url, {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  });
}

export async function onRequestGet(context) {
  const { env, request, waitUntil } = context;
  const apiKey = env.YOUTUBE_API_KEY?.trim();
  const channelId = env.YOUTUBE_CHANNEL_ID?.trim();

  if (!apiKey || !channelId) {
    return json({ configured: false }, {
      status: 200,
      headers: {
        'cache-control': 'no-store'
      }
    });
  }

  const playlistId = uploadsPlaylistId(channelId);
  if (!playlistId) {
    return json({
      configured: true,
      error: 'YOUTUBE_CHANNEL_ID must begin with UC.'
    }, {
      status: 400,
      headers: {
        'cache-control': 'no-store'
      }
    });
  }

  const cacheKey = buildCacheKey(request);
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) {
    return cached;
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  url.searchParams.set('part', 'snippet,contentDetails,status');
  url.searchParams.set('maxResults', String(MAX_RESULTS));
  url.searchParams.set('playlistId', playlistId);
  url.searchParams.set('key', apiKey);

  const upstream = await fetch(url, {
    headers: {
      accept: 'application/json'
    }
  });

  const payload = await upstream.json();

  if (!upstream.ok) {
    return json({
      configured: true,
      error: payload?.error?.message || 'Unable to read YouTube uploads.',
      status: upstream.status
    }, {
      status: upstream.status,
      headers: {
        'cache-control': 'no-store'
      }
    });
  }

  const uploads = Array.isArray(payload.items)
    ? payload.items
        .filter((item) => item?.snippet?.resourceId?.videoId)
        .map((item) => ({
          videoId: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.contentDetails?.videoPublishedAt || item.snippet.publishedAt,
          channelTitle: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || null,
          url: `https://www.youtube.com/watch?v=${encodeURIComponent(item.snippet.resourceId.videoId)}`
        }))
    : [];

  const response = json({
    configured: true,
    channelId,
    uploads
  }, {
    status: 200,
    headers: {
      'cache-control': `public, max-age=${CACHE_SECONDS}`
    }
  });

  waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}
