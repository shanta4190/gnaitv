import Link from "next/link";

const routeCards = [
  ["/watch", "Main GNAI TV live/upcoming/uploads panel"],
  ["/weather", "Weather dashboard and weather channel"],
  ["/weather/live", "Dedicated weather live service"],
  ["/earthquake", "Earthquake Connect / Earth Shield evidence board"],
  ["/channels", "Channel directory"],
  ["/simulator", "Interactive simulator mode"],
];

export default function HomePage() {
  return (
    <section>
      <h2>Universal Digital Television Baseline</h2>
      <p>
        Main GNAI TV and GNAI TV Weather are configured as separate channels.
        API keys remain server-side in route handlers.
      </p>
      <div className="grid">
        {routeCards.map(([href, description]) => (
          <article key={href} className="card">
            <h3>
              <Link href={href}>{href}</Link>
            </h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
