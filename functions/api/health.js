export async function onRequest(context) {
  const configured = Boolean(
    context.env?.YOUTUBE_API_KEY && context.env?.YOUTUBE_CHANNEL_ID,
  );

  return new Response(
    JSON.stringify({
      ok: true,
      service: "gnaitv-pages-functions",
      configured,
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    },
  );
}
