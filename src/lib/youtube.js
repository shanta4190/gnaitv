const BASE_URL = "https://www.googleapis.com/youtube/v3";

async function getJson(path, params) {
  const query = new URLSearchParams(params);
  const response = await fetch(`${BASE_URL}/${path}?${query.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`YouTube API error ${response.status}: ${body}`);
  }

  return response.json();
}

async function getBroadcasts({ apiKey, channelId, eventType, maxResults = 5 }) {
  return getJson("search", {
    part: "snippet",
    channelId,
    eventType,
    maxResults: String(maxResults),
    order: "date",
    type: "video",
    videoEmbeddable: "true",
    key: apiKey,
  });
}

async function getUploads({ apiKey, channelId, maxResults = 8, pageToken }) {
  const channel = await getJson("channels", {
    part: "contentDetails",
    id: channelId,
    maxResults: "1",
    key: apiKey,
  });

  const uploadsPlaylistId =
    channel.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadsPlaylistId) {
    return { items: [], nextPageToken: null, uploadsPlaylistId: null };
  }

  const uploads = await getJson("playlistItems", {
    part: "snippet,contentDetails",
    playlistId: uploadsPlaylistId,
    maxResults: String(maxResults),
    pageToken,
    key: apiKey,
  });

  return {
    items: uploads.items ?? [],
    nextPageToken: uploads.nextPageToken ?? null,
    uploadsPlaylistId,
  };
}

export async function getYouTubeChannelSummary({ apiKey, channelId, pageToken }) {
  const [live, upcoming, uploads] = await Promise.all([
    getBroadcasts({ apiKey, channelId, eventType: "live" }),
    getBroadcasts({ apiKey, channelId, eventType: "upcoming" }),
    getUploads({ apiKey, channelId, pageToken }),
  ]);

  return {
    channelId,
    live: live.items ?? [],
    upcoming: upcoming.items ?? [],
    uploads,
  };
}
