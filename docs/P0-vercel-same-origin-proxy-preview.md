# P0 — Vercel same-origin API proxy (PREVIEW ONLY, NOT FOR MERGE)

This experimental branch `security/p0-vercel-api-proxy-preview` is stacked on
the audited frontend dependency branch #61. It is intentionally limited to
an isolated Vercel preview. **DO NOT MERGE THE STAGING UPSTREAM INTO MAIN.**

The branch-specific Vercel variable `REACT_APP_API_URL=/api` is configured
**only** for this preview Git branch. The existing Vercel production,
development and general preview values were not changed.

Vercel's documented external rewrite forwards:
- `https://<preview>.vercel.app/api/session` →
  `https://cto01-staging-api.check-this-one.com/session`.
- `/api/:path*` has priority over the CRA `/:path*` → `/index.html`
  SPA fallback.
- Explicit `Cache-Control: private, no-store`. Do not enable Vercel rewrite
  caching for authenticated responses.

## What this proves
A successful preview build confirms CRA can compile with a relative `/api`
base URL. If `GET /api/session` returns **401** (not HTML/200), the Vercel
rewrite reaches the staging API. This is a routing smoke check, not an
authentication or cookie acceptance test.

## Remaining browser acceptance
The staging API currently allows the staging-web origin, not automatically
every dynamic `*.vercel.app` preview. Before real login/CSRF testing,
add the **single exact preview origin** to staging-only
`CORS_ALLOWED_ORIGINS`; verify the browser `Origin` is accepted by
`requireTrustedBrowserOrigin`. Never allow `*.vercel.app` wildcard.

In a real browser:
- POST /api/login sets a host-only `__Host-cto_session` cookie on the
  **Vercel preview origin**, with HttpOnly, Secure, SameSite=Lax, Path=/.
- GET /api/session restores identity after navigation, returns CSRF in JSON
  without revealing the JWT.
- Authenticated POST/PUT sends same-origin cookies and X-CSRF-Token.
- Forbidden cross-user operations and logout revocation work as on CapRover.
- External services never receive authentication cookie or CSRF.
- Test Chrome, Firefox and Safari where available.

Before any production merge or release, **replace the temporary
`cto01-staging-api` rewrite destination** by the verified production API
endpoint, configure the production frontend with `REACT_APP_API_URL=/api`,
and perform a paired pre-production browser acceptance on the precise target.
Neither production routing nor production DB has been changed.
