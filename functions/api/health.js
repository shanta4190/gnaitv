function json(body, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('content-type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(body, null, 2), {
    ...init,
    headers
  });
}

export async function onRequestGet({ env }) {
  const uploadsConfigured = Boolean(env.YOUTUBE_API_KEY && env.YOUTUBE_CHANNEL_ID);
  const liveConfigured = Boolean(env.YOUTUBE_LIVE_VIDEO_ID);

  return json({
    ok: true,
    project: 'gnaitv',
    deployment: 'cloudflare-pages',
    configured: {
      youtubeUploads: uploadsConfigured,
      liveBroadcast: liveConfigured
    }
  }, {
    status: 200,
    headers: {
      'cache-control': 'no-store'
    }
  });
}
