export default function WeatherLivePage() {
  return (
    <section>
      <h2>Weather Live Service</h2>
      <p>
        <span className="status">SIMULATED LIVE</span>
        <span className="status">NOT CONNECTED</span>
      </p>
      <article className="card">
        This route is reserved for the dedicated GNAI TV Weather live stream service and can be
        wired to the Weather channel endpoint once production connectivity is approved.
      </article>
    </section>
  );
}
