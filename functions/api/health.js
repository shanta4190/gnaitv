export async function onRequestGet(context) {
  const youtubeUploadsConfigured = Boolean(
    context.env.YOUTUBE_API_KEY && context.env.YOUTUBE_CHANNEL_ID
  );
  const liveVideoConfigured = Boolean(context.env.GNAITV_LIVE_VIDEO_ID);

  return Response.json({
    ok: true,
    platform: "Cloudflare Pages",
    environment: context.env.CF_PAGES_BRANCH || "production",
    features: {
      functions: true,
      youtubeUploadsConfigured,
      liveVideoConfigured,
      securityCore: true
    },
    timestamp: new Date().toISOString()
  });
}
