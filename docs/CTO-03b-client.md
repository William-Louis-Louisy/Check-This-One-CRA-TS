# CTO-03b — Client session using HttpOnly cookies

- The React app no longer reads or persists Bearer JWTs. On startup it requests `GET /session` with `withCredentials`, restores the account from the server and retains the returned session-bound CSRF token **only in module memory**.
- `POST /login` receives `{user,csrfToken}`; the HttpOnly host-only cookie is set by the backend and is never exposed to JavaScript.
- The Axios interceptor sends cookies and `X-CSRF-Token` only when the request URL exactly matches `REACT_APP_API_URL` or its paths, never to TMDB, YouTube or Uploadcare.
- Public routes render after the initial session check, avoiding a false 404 on refresh of a private route.
- `POST /logout` invalidates the cookie server-side; the React app shows an error rather than falsely reporting success if the API is unavailable.
- Legacy `cto.accessToken` in sessionStorage and `user` in localStorage are erased and are never considered proof of identity.

## Deployment requirement

The staging client `https://cto01-staging-web.check-this-one.com` and API `https://cto01-staging-api.check-this-one.com` are same-site siblings; configure the backend exact CORS origin and frontend API URL accordingly.

**Do not use a direct `*.check-this-one.com` API with the production `checkthisone.vercel.app` frontend**: that is a cross-site fetch and `SameSite=Lax` cookies will not work reliably. Before production either:

1. Add a verified Vercel `/api/:path*` rewrite to the *production* backend and compile `REACT_APP_API_URL=/api`, or
2. Serve production frontend and API under HTTPS siblings of one registrable domain.

The project does not yet include a hard-coded rewrite because the correct production API host and deployment policy must be verified before changing routing. A build passing is not a browser cookie test. Never copy production secrets to staging.

## Acceptance

Verify login, refresh, auth-only routes, profile/list mutations, rejection of missing/wrong CSRF, denial of cross-origin writes, multi-tab logout, admin role changes, password reset revocation, and non-disclosure of tokens in any browser storage/JSON. Run in Chrome, Safari and Firefox. Deploy together with backend CTO-03b and only after applying the earlier CTO-05 database migrations if needed.
