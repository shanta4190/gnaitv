export async function onRequestGet(context) {
  const videoId = context.env.GNAITV_LIVE_VIDEO_ID;
  const live = Boolean(videoId);

  return Response.json({
    live,
    videoId: live ? videoId : null,
    mode: live ? "verified-live-feed" : "standby",
    message: live
      ? "A verified live video is configured for the breaking-news desk."
      : "Standby until an authorized live source is configured and verified."
  });
}
