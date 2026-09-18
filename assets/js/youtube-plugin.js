(function () {
  const config = window.GNAITV_CONFIG || {};
  const api = config.api || {};

  async function readJson(path) {
    if (!path) {
      return null;
    }

    try {
      const response = await fetch(path, {
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = value;
    }
  }

  function setStatusCard(id, pillClass, pillText, heading, body) {
    const card = document.getElementById(id);
    if (!card) {
      return;
    }

    card.innerHTML = `
      <span class="status-pill ${pillClass}">${pillText}</span>
      <h3>${heading}</h3>
      <p>${body}</p>
    `;
  }

  function renderUploads(payload) {
    const target = document.getElementById("uploads-list");
    if (!target) {
      return;
    }

    if (!payload || payload.error) {
      target.innerHTML = `<div class="empty-state">Upload feed unavailable right now.</div>`;
      return;
    }

    if (!payload.configured) {
      target.innerHTML = `<div class="empty-state">Recent uploads will appear after Cloudflare production variables are configured.</div>`;
      return;
    }

    const items = Array.isArray(payload.items) ? payload.items : [];
    if (!items.length) {
      target.innerHTML = `<div class="empty-state">No uploads were returned by the configured YouTube feed.</div>`;
      return;
    }

    target.innerHTML = items
      .map(
        (item) => `
          <article class="upload-card">
            <h3>${item.title}</h3>
            <p>${item.publishedAt ? new Date(item.publishedAt).toLocaleString() : "Publish time unavailable"}</p>
            <p>${item.description ? item.description.slice(0, 180) : "No description available."}</p>
            <a href="${item.url}" target="_blank" rel="noreferrer">Open on YouTube</a>
          </article>
        `
      )
      .join("");
  }

  function renderLivePanel(payload) {
    const placeholder = document.getElementById("watch-placeholder");
    const embed = document.getElementById("live-embed");
    if (!placeholder || !embed) {
      return;
    }

    if (!payload || !payload.live || !payload.videoId) {
      placeholder.hidden = false;
      embed.hidden = true;
      return;
    }

    placeholder.hidden = true;
    embed.hidden = false;
    embed.innerHTML = `
      <div class="video-frame">
        <iframe
          title="GNAI TV live stream"
          src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(payload.videoId)}?autoplay=0&rel=0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      </div>
    `;
  }

  async function init() {
    setText("site-tagline", config.siteTagline || "");

    const [health, live, uploads] = await Promise.all([
      readJson(api.health),
      readJson(api.live),
      readJson(api.uploads)
    ]);

    if (health && !health.error) {
      setStatusCard(
        "health-card",
        "status-ok",
        "System ready",
        "Platform health",
        `Environment: ${health.environment}. Functions: ${health.features.functions ? "enabled" : "unavailable"}.`
      );

      setText("status-environment", health.environment || "production");
      setText("status-platform", health.platform || "Cloudflare Pages");
    } else {
      setStatusCard("health-card", "status-warn", "Check required", "Platform health", "Health endpoint is not reachable in this preview.");
    }

    if (live && !live.error) {
      setStatusCard(
        "live-card",
        live.live ? "status-danger" : "status-warn",
        live.live ? "Live" : "Standby",
        "Breaking-news channel",
        live.message || "Live status unavailable."
      );

      setText("status-live-mode", live.live ? "Live feed active" : "Standby until verified");
      renderLivePanel(live);
    } else {
      setStatusCard("live-card", "status-warn", "Standby", "Breaking-news channel", "Live status could not be confirmed.");
    }

    if (uploads && !uploads.error) {
      setStatusCard(
        "uploads-card",
        uploads.configured ? "status-ok" : "status-warn",
        uploads.configured ? "Configured" : "Awaiting setup",
        "Recorded media feed",
        uploads.configured
          ? `Loaded ${Array.isArray(uploads.items) ? uploads.items.length : 0} recent YouTube uploads.`
          : "Add YouTube production variables in Cloudflare Pages to display recorded uploads."
      );
    } else {
      setStatusCard("uploads-card", "status-warn", "Unavailable", "Recorded media feed", "Recent uploads could not be loaded.");
    }

    renderUploads(uploads);
  }

  init();
})();
