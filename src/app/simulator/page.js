"use client";

import { useEffect, useMemo, useState } from "react";

const CHANNELS = ["Main GNAI TV", "GNAI TV Weather", "Earthquake Connect"];

export default function SimulatorPage() {
  const [selectedChannel, setSelectedChannel] = useState(CHANNELS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const timerLabel = useMemo(() => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }, [seconds]);

  return (
    <section>
      <h2>GNAI TV Live Simulator</h2>
      <p>
        <span className="status">SIMULATED LIVE</span>
        <span className="status">NOT CONNECTED</span>
        <span className="status">SIMULATION</span>
      </p>

      <article className="card">
        <h3>Interactive controls</h3>
        <p>Selected channel: {selectedChannel}</p>
        <p>Session timer: {timerLabel}</p>
        <div className="grid">
          {CHANNELS.map((channel) => (
            <button key={channel} onClick={() => setSelectedChannel(channel)}>
              {channel}
            </button>
          ))}
        </div>
        <p>
          <button onClick={() => setIsRunning((v) => !v)}>{isRunning ? "Pause" : "Play"}</button>{" "}
          <button
            onClick={() => {
              setIsRunning(false);
              setSeconds(0);
            }}
          >
            Reset
          </button>
        </p>
      </article>

      <article className="card">
        This simulator does not claim a real YouTube broadcast, real seismic feed, or emergency
        warning.
      </article>
    </section>
  );
}
