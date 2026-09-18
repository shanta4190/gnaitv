export async function onRequestGet() {
  return Response.json({
    ok: true,
    platform: "Cloudflare Pages",
    environment: "production",
    features: {
      functions: true,
      youtubeUploadsConfigured: false,
      liveVideoConfigured: false
    },
    timestamp: new Date().toISOString()
  });
}
