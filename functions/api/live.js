export async function onRequest(context) {
  const videoId = context.env?.YOUTUBE_LIVE_VIDEO_ID?.trim();
  const live = Boolean(videoId);

  return new Response(
    JSON.stringify(
      live
        ? {
            live: true,
            videoId,
          }
        : { live: false },
    ),
    {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    },
  );
}
