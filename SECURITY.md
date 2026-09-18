# Security Policy

## Scope

This repository hosts the public GNAI TV website, Cloudflare Pages functions, and a security prototype dashboard.

## Current security status

The current implementation is an **application-level security prototype**. It does **not** install kernel drivers, intercept NVMe writes, run eBPF, or quarantine files on disk.

Prototype framing:

- File hash inspection: simulation / tested
- Entropy analysis: simulation / tested
- Known-signature matching: local test registry
- Quarantine: in-memory simulation
- Privacy header filtering: application-level
- Compliance determination: not established
- Kernel I/O interception: not deployed
- eBPF monitoring: future integration
- Immutable evidence ledger: next milestone

## Incident handling

1. Restrict repository access and rotate affected credentials.
2. Review Git history, Actions logs, and Cloudflare variables.
3. Remove exposed secrets from deployment systems.
4. Document the incident and remediation steps.
5. Require owner review before restoring normal change flow.

## Reporting

Report suspected security issues privately to the repository owner. Do not publish secrets, tokens, vault phrases, or exploit details in public issues.
