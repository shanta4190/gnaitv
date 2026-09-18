(() => {
  const config = window.GNAITV_CONFIG || {};
  const api = config.api || {};

  function text(target, message) {
    if (target) {
      target.textContent = message;
    }
  }

  async function readJson(url) {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json'
      }
    });

    let payload = {};
    try {
      payload = await response.json();
    } catch {
      payload = {};
    }

    if (!response.ok) {
      throw new Error(payload.error || `Request failed with ${response.status}`);
    }

    return payload;
  }

  function renderEmbed(target, videoId, title) {
    if (!target || !videoId) {
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`;
    iframe.title = title;
    target.innerHTML = '';
    target.appendChild(iframe);
  }

  function renderUploads(target, uploads) {
    if (!target) {
      return;
    }

    if (!Array.isArray(uploads) || uploads.length === 0) {
      target.innerHTML = '<li>No upload metadata is available yet.</li>';
      return;
    }

    const list = document.createElement('ul');
    list.className = 'upload-list';

    uploads.forEach((item) => {
      const entry = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.textContent = item.title;

      const meta = document.createElement('small');
      meta.className = 'meta';
      meta.textContent = `${item.publishedAt || 'Unknown date'} · ${item.channelTitle || 'GNAI TV'}`;

      entry.append(link, meta);
      list.appendChild(entry);
    });

    target.innerHTML = '';
    target.appendChild(list);
  }

  async function loadLiveStatus() {
    const statusTarget = document.querySelector('[data-live-status]');
    const liveTarget = document.querySelector('[data-youtube-live-target]');
    if (!statusTarget && !liveTarget) {
      return;
    }

    try {
      const payload = await readJson(api.live || '/api/live');
      if (payload.live && payload.videoId && liveTarget) {
        text(statusTarget, 'Live broadcast is configured.');
        renderEmbed(liveTarget, payload.videoId, 'GNAI TV live broadcast');
      } else {
        text(statusTarget, 'Offline by design until an authorized live video ID is configured.');
      }
    } catch (error) {
      text(statusTarget, `Live status unavailable: ${error.message}`);
    }
  }

  async function loadUploads() {
    const uploadsTarget = document.querySelector('[data-youtube-uploads-target]');
    if (!uploadsTarget) {
      return;
    }

    try {
      const payload = await readJson(api.uploads || '/api/youtube-uploads');
      if (!payload.configured) {
        uploadsTarget.innerHTML = '<li>Upload listing is not configured in Cloudflare yet.</li>';
        return;
      }
      renderUploads(uploadsTarget, payload.uploads);
    } catch (error) {
      uploadsTarget.innerHTML = `<li>Upload listing unavailable: ${error.message}</li>`;
    }
  }

  function loadFeaturedVideo() {
    const featuredTarget = document.querySelector('[data-youtube-featured-target]');
    const featuredVideoId = featuredTarget?.dataset.youtubeVideoId || config.youtube?.featuredVideoId;
    if (!featuredTarget || !featuredVideoId) {
      return;
    }

    renderEmbed(featuredTarget, featuredVideoId, 'GNAI TV featured video');
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedVideo();
    loadLiveStatus();
    loadUploads();
  });
})();
