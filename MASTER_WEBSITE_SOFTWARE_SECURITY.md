# GNAI TV — Master Website, Software & Security Documentation

## System baseline

GNAI TV is organized as:

- Main GNAI TV network
- Separate GNAI TV Weather channel
- Earthquake Connect / Earth Shield
- Public website plus protected admin hostname
- YouTube Data API integration with server-side secrets
- Google OAuth-ready architecture (optional)
- Cloudflare security and Access controls

## Website routes

- `/` home
- `/watch` main channel viewing
- `/weather` weather dashboard and weather channel
- `/weather/live` dedicated weather live service
- `/earthquake` Earthquake Connect / Earth Shield
- `/channels` channel directory
- `/privacy` privacy disclosures
- `/api/health` service status
- `/api/weather` weather data endpoint
- `/api/youtube/main` main channel YouTube data
- `/api/youtube/weather` weather channel YouTube data

## YouTube implementation baseline

- Use `search.list` for live/upcoming broadcast discovery only.
- Use `type=video` whenever `eventType` or `videoEmbeddable` is used.
- Do not use `search.list` as authoritative latest uploads feed.
- Resolve uploads playlist via `channels.list(part=contentDetails)` and read uploads with `playlistItems.list`.
- Preserve `nextPageToken` for pagination.
- Keep YouTube API key server-side.
- Public read-only channel data can use API key only.
- OAuth 2.0 is required for private/user-authorized/write operations.

If OAuth is enabled, use server-side Google OAuth with HTTPS redirect URIs, CSRF `state`, least-privilege scopes, secure token storage, and revocation/disconnect behavior.

## Weather and YouTube separation

Weather data must remain visually and semantically distinct from YouTube data. The implementation must not imply that weather metrics come from YouTube.

## Earthquake scientific standard

Earthquake outputs use visible evidence labels:

- LIVE
- VERIFIED
- FORECAST
- RESEARCH
- SIMULATION
- FUTURE-INTEGRATION

A 30-day output is probabilistic seismic outlook guidance, not an exact earthquake prediction.

## Cloudflare Access baseline for admin host

Application object:

- Application: **GNAI TV Secure Admin**
- Type: **Self-hosted public hostname**
- Public hostname: `admin.gnaitv.net`
- Path: blank
- Private hostname: none
- Browser rendering: disabled
- Policy: **GNAI TV Admin Only**
- Action: Allow
- Include: authorized administrator identity only
- Session duration: 8 hours
- Authentication: selected IdP + MFA/passkey when configured
- Default behavior: deny-by-default

Do not configure `Everyone` or `Bypass` for admin access.

## 0 KB admin download troubleshooting

If `admin.gnaitv.net` downloads as a zero-byte file:

1. Confirm Access destination is the correct public hostname (`admin.gnaitv.net`).
2. Confirm upstream deployment returns valid HTML.
3. Do **not** change MX/SPF/DKIM mail records for this symptom.

## Production secrets

Never commit:

- `YOUTUBE_API_KEY`
- `YOUTUBE_GNAITV_CHANNEL_ID`
- `YOUTUBE_WEATHER_CHANNEL_ID`
- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- `GOOGLE_OAUTH_REDIRECT_URI`
- `OAUTH_SESSION_SECRET`
- OAuth tokens, refresh tokens, or access tokens

## Deployment guidance

Cloudflare 2026 guidance for full-stack Next.js is Workers + vinext. Static exports can use Pages, but this project uses server-side route handlers and secret-backed API requests; full-stack deployment is the recommended production target.
