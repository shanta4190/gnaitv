const statuses = [
  "LIVE",
  "VERIFIED",
  "FORECAST",
  "RESEARCH",
  "SIMULATION",
  "FUTURE-INTEGRATION",
];

export default function EarthquakePage() {
  return (
    <section>
      <h2>Earthquake Connect / Earth Shield</h2>
      <p>
        30-day outputs are probabilistic seismic outlooks and are not exact earthquake predictions.
      </p>
      <article className="card">
        {statuses.map((status) => (
          <span className="status" key={status}>
            {status}
          </span>
        ))}
      </article>
      <article className="card">
        Planned NTN, RF, satellite, GNSS-array, or quantum capabilities remain labeled as
        SIMULATION or FUTURE-INTEGRATION until deployment evidence is available.
      </article>
    </section>
  );
}
