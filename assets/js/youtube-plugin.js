(function () {
  function getConfig() {
    return window.GNAITV_CONFIG || {};
  }

  function getVideoId() {
    var params = new URLSearchParams(window.location.search);
    return params.get("video") || getConfig().defaultRecordedVideoId || "";
  }

  function createEmbedUrl(videoId) {
    var url = new URL("https://www.youtube-nocookie.com/embed/" + encodeURIComponent(videoId));
    url.searchParams.set("rel", "0");
    url.searchParams.set("modestbranding", "1");
    return url.toString();
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node) {
      node.textContent = value;
    }
  }

  function renderWatchPage() {
    var shell = document.getElementById("player-shell");
    if (!shell) {
      return;
    }

    var videoId = getVideoId();
    if (!videoId) {
      shell.innerHTML = "<div class=\"panel\"><h2>Recorded video is not configured</h2><p class=\"muted\">Add a <code>?video=YOUTUBE_VIDEO_ID</code> query parameter or set <code>defaultRecordedVideoId</code> in <code>/config.js</code>.</p></div>";
      setText("watch-status", "Offline by design until an authorized video ID is set.");
      return;
    }

    shell.innerHTML = [
      "<iframe",
      " class=\"player-frame\"",
      " src=\"" + createEmbedUrl(videoId) + "\"",
      " title=\"GNAI TV recorded playback\"",
      " loading=\"lazy\"",
      " allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\"",
      " allowfullscreen></iframe>"
    ].join("");
    setText("watch-status", "Showing recorded YouTube playback.");
  }

  async function renderLiveStatus() {
    var liveStatus = document.getElementById("live-status");
    if (!liveStatus) {
      return;
    }

    try {
      var response = await fetch((getConfig().apiBasePath || "/api") + "/live", {
        headers: { accept: "application/json" }
      });
      var payload = await response.json();
      liveStatus.textContent = payload.live ? "Live status configured." : "Offline by design.";
    } catch (error) {
      liveStatus.textContent = "Live status unavailable.";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderWatchPage();
    renderLiveStatus();
  });
})();

