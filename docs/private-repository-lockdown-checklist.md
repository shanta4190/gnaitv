# Private Repository Lockdown Checklist

- make the repository private when operational content requires restricted access
- limit admin access to the owner and explicitly approved collaborators
- require pull requests for `main`
- require owner review through `CODEOWNERS`
- enable secret scanning and push protection where available
- review Actions permissions and use least privilege
- store credentials only in GitHub or Cloudflare secret stores
- verify Cloudflare custom domains and DNS records after changes
- disable unused integrations and unused deploy destinations
- document and review incidents before restoring broad access
