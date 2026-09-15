# GNAI TV Website

Official static website for **gnaitv.net**, deployed with **GitHub Pages** and protected by **Cloudflare**.

## Pages

- `/` (Home)
- `/about.html`
- `/services.html`
- `/contact.html`

## Stack

- HTML/CSS/JavaScript
- GitHub Pages (Jekyll-compatible repository)
- GitHub Actions CI/CD
- Cloudflare DNS + SSL/TLS + caching

## Local checks

```bash
npm test
npm run build
```

## GitHub Pages setup

1. In repository settings, open **Pages**.
2. Set source to **GitHub Actions**.
3. Ensure `CNAME` contains `gnaitv.net`.

## Cloudflare setup

1. Add `gnaitv.net` zone in Cloudflare.
2. Apply DNS records from `/cloudflare/cloudflare-config.yml`.
3. Set SSL/TLS mode to `Full (strict)` and enable HTTPS redirect.
4. Configure secrets in GitHub repository:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_ZONE_ID`

## Deployment workflow

Workflow file: `/.github/workflows/deploy.yml`

- Validates site files (`npm test`)
- Runs build script (`npm run build`)
- Deploys to GitHub Pages
- Optionally deploys to Cloudflare Pages when Cloudflare secrets are configured
