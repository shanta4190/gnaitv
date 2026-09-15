# Contributing

## Workflow

1. Create a feature branch.
2. Make focused changes.
3. Run local checks:
   - `npm test`
   - `npm run build`
4. Open a pull request with a clear description.

## Deployment notes

- Changes to `main` trigger `/.github/workflows/deploy.yml`.
- For optional Cloudflare Pages deployment, configure these repository secrets:
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ZONE_ID`
