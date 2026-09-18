const channels = [
  {
    name: "Main GNAI TV",
    env: "YOUTUBE_GNAITV_CHANNEL_ID",
    endpoint: "/api/youtube/main",
  },
  {
    name: "GNAI TV Weather",
    env: "YOUTUBE_WEATHER_CHANNEL_ID",
    endpoint: "/api/youtube/weather",
  },
];

export default function ChannelsPage() {
  return (
    <section>
      <h2>Channel Directory</h2>
      <div className="grid">
        {channels.map((channel) => (
          <article className="card" key={channel.name}>
            <h3>{channel.name}</h3>
            <p>Environment variable: {channel.env}</p>
            <p>Endpoint: {channel.endpoint}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
