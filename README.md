# GNAI TV — Next.js Baseline

This repository contains the GNAI TV website/software baseline implemented with Next.js App Router.

## Routes

- `/`
- `/watch`
- `/weather`
- `/weather/live`
- `/earthquake`
- `/channels`
- `/privacy`
- `/simulator`
- `/api/health`
- `/api/weather`
- `/api/youtube/main`
- `/api/youtube/weather`

## YouTube API design

- `search.list` is used only for live (`eventType=live`) and upcoming (`eventType=upcoming`) discovery.
- Latest uploads are fetched by resolving uploads playlist ID from `channels.list(part=contentDetails)` and reading with `playlistItems.list`.
- Pagination is supported through `nextPageToken`.
- `type=video` is set whenever `eventType` and `videoEmbeddable` are used.
- YouTube API key is server-side only.

## Channel separation

- `YOUTUBE_GNAITV_CHANNEL_ID` → main channel
- `YOUTUBE_WEATHER_CHANNEL_ID` → weather channel only

## Environment variables

Set in deployment environment (never commit real values):

- `YOUTUBE_API_KEY`
- `YOUTUBE_GNAITV_CHANNEL_ID`
- `YOUTUBE_WEATHER_CHANNEL_ID`
- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- `GOOGLE_OAUTH_REDIRECT_URI`
- `OAUTH_SESSION_SECRET`

## Local run

```bash
npm install
npm run dev
```

## Deployment target

Use Cloudflare full-stack Next.js deployment (Workers + vinext guidance) for production server-side routes and secret-backed API usage.

See `/MASTER_WEBSITE_SOFTWARE_SECURITY.md` for complete deployment/security baseline.
