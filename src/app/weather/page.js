import Link from "next/link";

async function getWeather() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_ORIGIN ?? ""}/api/weather`, {
    cache: "no-store",
  }).catch(() => null);

  if (!response || !response.ok) {
    return null;
  }

  return response.json();
}

export default async function WeatherPage() {
  const data = await getWeather();

  return (
    <section>
      <h2>GNAI TV Weather Dashboard</h2>
      <p>
        Weather metrics are distinct from YouTube channel metadata and are rendered separately by
        design.
      </p>
      <article className="card">
        <h3>Current Conditions</h3>
        {data ? (
          <ul>
            <li>Location: {data.current.location}</li>
            <li>Condition: {data.current.condition}</li>
            <li>Temperature: {data.current.temperatureF}°F</li>
            <li>Wind: {data.current.windMph} mph</li>
          </ul>
        ) : (
          <p>Weather API unavailable.</p>
        )}
      </article>
      <article className="card">
        <h3>7-Day Outlook</h3>
        <p>Probabilistic weather outlook for planning purposes.</p>
      </article>
      <article className="card">
        <Link href="/weather/live">Open dedicated Weather Live service</Link>
      </article>
    </section>
  );
}
