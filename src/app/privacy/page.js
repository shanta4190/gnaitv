export default function PrivacyPage() {
  return (
    <section>
      <h2>Privacy & Security</h2>
      <article className="card">
        API keys, OAuth client secrets, access tokens, and refresh tokens are never committed to
        source control. Configure secrets only in server-side environment management.
      </article>
      <article className="card">
        OAuth is optional for public read-only data. If enabled for private or write operations,
        use server-side Google OAuth with HTTPS redirect URIs, least-privilege scopes, CSRF state,
        and secure token storage.
      </article>
    </section>
  );
}
