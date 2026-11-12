# CTO-01 — Frontend JWT transport

This branch is paired with the backend branch `security/cto-01-jwt-rbac`.

- Login stores the returned JWT in `sessionStorage` and Axios includes it only for URLs under `REACT_APP_API_URL`.
- No authorization header is added to TMDB or other third-party requests.
- Logout clears the cached identity and JWT.
- The administrative route uses the server-provided `role` rather than comparing a mutable username.
- On a browser restart the previously cached user is not treated as authenticated unless a token exists in the session.

This is an interim compatibility solution. CTO-03 must replace it with hardened session handling, token expiry behavior and CSRF protections. The backend remains authoritative for all permissions; hiding a route in React is not an authorization measure.
