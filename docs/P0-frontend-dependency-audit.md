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

## Initial results (13 November 2026)

The baseline GitHub Actions run passed clean install, Jest and CRA build. NPM reported **92 affected packages: 7 critical, 40 high, 24 moderate, 21 low** both for the entire manifest and for packages marked `dependencies`. This is inflated by CRA build toolchains under the production-tagged manifest.

Axios `^0.27.2` is a **direct runtime dependency** and has high-severity advisories in the lockfile; the targeted first patch is `axios@1.21.1`. Axios v1 also changes request interceptor types; use `AxiosHeaders#set` rather than assigning a plain headers object. Validate CSRF, credential isolation, login/logout and external-provider requests.

A non-forced lockfile update can patch many transitive packages without replacing `react-scripts`. Do not accept npm's suggested `react-scripts@0.0.0` as a security fix. Evaluate remaining build-only warnings separately. A full CRA-to-Vite migration is a distinct project and is **not** included in this PR.

## Targeted dependency remediation results (13 November 2026)

The temporary GitHub Actions lockfile generator performed a **non-forced** NPM lockfile update and committed the generated `package-lock.json`. The following CI job passed clean installation, Jest tests, CRA production compilation and a targeted check that direct Axios advisories were absent.

- Before: **92 alerts** (7 critical, 40 high, 24 moderate, 21 low).
- After: **34 alerts** (0 critical, 11 high, 7 moderate, 16 low), according to the fresh lockfile's full npm audit.
- The shipped Axios dependency was upgraded to `1.21.1`, the CSRF interceptor adapted to `AxiosHeaders#set`, and its unit tests adapted to Axios v1 typed adapters.
- These are package-scanner findings, not a count of browser-exploitable vulnerabilities. The remaining high advisories need reachability and build-tool analysis before P0 can be declared ready for production.

The branch-only workflow with `contents: write` permissions was removed after generating the lockfile; future CI runs only read the repository. The audit CI checks that no **critical** advisories or direct Axios high/critical issue reappear. It intentionally does not declare an unconditional GO while the other high build-chain advisories remain.
