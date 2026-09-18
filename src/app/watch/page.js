import Link from "next/link";

async function getMainChannelData() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_ORIGIN ?? ""}/api/youtube/main`, {
    cache: "no-store",
  }).catch(() => null);

  if (!response || !response.ok) {
    return null;
  }

  return response.json();
}

export default async function WatchPage() {
  const data = await getMainChannelData();

  return (
    <section>
      <h2>Main GNAI TV</h2>
      <p>
        Broadcast discovery uses YouTube <code>search.list</code> for live/upcoming only. Latest uploads
        come from channel uploads playlist resolution.
      </p>

      {!data?.configured ? (
        <article className="card">
          <strong>Configuration required:</strong> set <code>YOUTUBE_API_KEY</code> and
          <code> YOUTUBE_GNAITV_CHANNEL_ID</code> server-side.
        </article>
      ) : (
        <>
          <article className="card">
            <h3>Live broadcasts</h3>
            <p>{data.live.length} active live event(s).</p>
          </article>
          <article className="card">
            <h3>Upcoming broadcasts</h3>
            <p>{data.upcoming.length} scheduled event(s).</p>
          </article>
          <article className="card">
            <h3>Recent uploads</h3>
            <p>{data.uploads.items.length} upload item(s) from playlistItems.list.</p>
            {data.uploads.nextPageToken ? (
              <p>Next page token available for pagination.</p>
            ) : (
              <p>No additional upload page token currently returned.</p>
            )}
          </article>
        </>
      )}

      <article className="card">
        <h3>API endpoints</h3>
        <ul>
          <li>
            <Link href="/api/youtube/main">/api/youtube/main</Link>
          </li>
          <li>
            <Link href="/api/youtube/weather">/api/youtube/weather</Link>
          </li>
        </ul>
      </article>
    </section>
  );
}
