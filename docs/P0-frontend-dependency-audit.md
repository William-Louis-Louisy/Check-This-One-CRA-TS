# P0 frontend — dependency security audit

This is a **read-only dependency audit baseline** for the current CRA React app.
It stacks on CTO-03b frontend PR #60. No production domain, Vercel project setting,
staging service, database or environment variable is changed.

The branch CI executes:
- `npm ci`, existing Jest security tests, and `CI=true npm run build`.
- `npm audit --json` on the complete dependency tree.
- `npm audit --omit=dev --json` on the manifest's production-tagged tree.
- A reproducible JSON summary and short-lived workflow artifacts.

Important limitation: a CRA app is compiled to **static JavaScript**. npm's
production/development distinction is *not* a reliable measure of browser
exposure. Many CRA build-only dependencies are listed under `dependencies`,
while code shipped to the browser needs an assessment of the bundled modules
and their actual reachability. Do not equate audit counts with exploitable
vulnerabilities.

## Next action, contingent on findings
Prioritize reachable application runtime dependencies (e.g. Axios), then
address build-only packages and decide whether a CRA-to-Vite migration is
warranted as a separate, explicitly tested change. Do not use
`npm audit fix --force` or perform an unreviewed major dependency migration.

For Vercel production, a separate same-origin proxy or same-site domain plan
must be verified before switching CTO-03b browser cookies. This audit does not
change that routing.
