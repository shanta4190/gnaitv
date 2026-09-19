function json(body, init) {
  return new Response(JSON.stringify(body, null, 2), {
    status: init?.status || 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(init?.headers || {})
    }
  });
}

export async function onRequest(context) {
  const { env, request } = context;

  return json({
    ok: true,
    service: "gnaitv",
    deployment: "cloudflare-pages",
    pathname: new URL(request.url).pathname,
    configured: {
      youtubeUploads: Boolean(env.YOUTUBE_API_KEY && env.YOUTUBE_CHANNEL_ID),
      live: false
    },
    timestamp: new Date().toISOString()
  });
}

