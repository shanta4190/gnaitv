# Incident Response Policy

## Goals

- contain unauthorized changes quickly
- preserve audit evidence
- keep Cloudflare deployment controls owner-approved

## Response phases

1. **Identify** the affected repository, workflow, domain, or credential.
2. **Contain** by disabling risky workflows, revoking tokens, and limiting access.
3. **Preserve evidence** with timestamps, hashes, screenshots, and log references.
4. **Eradicate** by removing malicious files, secrets, or misconfigurations.
5. **Recover** only after owner approval and post-incident review.

## Deployment safeguards

- Treat Cloudflare Pages as the only production deployment path.
- Do not enable alternate deploy targets such as GitHub Pages, Vercel, Netlify, or arbitrary Workers for production.
- Require owner review for workflow changes, secrets, branch protection, and DNS-related files.
