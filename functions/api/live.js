export async function onRequest() {
  return new Response(JSON.stringify({ live: false }, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

