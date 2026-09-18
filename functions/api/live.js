function json(body, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('content-type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(body, null, 2), {
    ...init,
    headers
  });
}

export async function onRequestGet({ env }) {
  const videoId = env.YOUTUBE_LIVE_VIDEO_ID?.trim();

  if (!videoId) {
    return json({ live: false }, {
      status: 200,
      headers: {
        'cache-control': 'no-store'
      }
    });
  }

  return json({
    live: true,
    videoId,
    embedUrl: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`
  }, {
    status: 200,
    headers: {
      'cache-control': 'no-store'
    }
  });
}
