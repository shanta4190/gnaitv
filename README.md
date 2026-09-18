# GNAI TV

GNAI TV is a static website and Cloudflare Pages project for weather coverage, earthquake readiness, and breaking-news updates.

## Project structure

```text
gnaitv/
├── .github/workflows/stale.yml
├── assets/
│   ├── css/site.css
│   └── js/youtube-plugin.js
├── functions/
│   └── api/
│       ├── health.js
│       ├── live.js
│       └── youtube-uploads.js
├── .gitignore
├── _headers
├── channels.html
├── config.js
├── google-console.html
├── index.html
├── robots.txt
├── sitemap.xml
├── watch.html
├── wrangler.toml
└── youtube-media.html
```

The root `functions/` directory must stay at the repository root so Cloudflare Pages can detect the API routes.

## Pages

- `/` — landing page for weather, earthquake, and breaking-news coverage
- `/watch.html` — control-room style watch page
- `/channels.html` — channel lineup and coverage focus
- `/youtube-media.html` — recorded media and recent uploads
- `/google-console.html` — safe setup checklist for YouTube API credentials

## Cloudflare Pages deployment

Canonical deployment target:

- Project: `gnaitv`
- Production branch: `main`
- Build command: _empty_
- Build output directory: `.`
- Compatibility date: `2026-09-01`

Deploy from GitHub by connecting this repository in Cloudflare Pages with the settings above.

## Required Cloudflare variables

Configure these in Cloudflare Pages production variables instead of committing them:

- `YOUTUBE_API_KEY`
- `YOUTUBE_CHANNEL_ID`
- `GNAITV_LIVE_VIDEO_ID` (optional)

If the YouTube variables are not set, `/api/youtube-uploads` safely returns `{"configured":false}`.

## Local preview

Run a local Cloudflare Pages preview:

```bash
npx wrangler pages dev . --port 8788
```

Verify:

```text
http://localhost:8788/
http://localhost:8788/watch.html
http://localhost:8788/api/health
http://localhost:8788/api/live
http://localhost:8788/api/youtube-uploads
```

## Editorial guardrails

- The site can describe 24/7 monitoring, but it must not falsely claim an active live broadcast.
- `api/live` defaults to `{"live":false}` until an authorized live video is configured.
- Use only approved and authorized media sources.
- Never commit API keys, tokens, `.env`, or `.dev.vars`.
