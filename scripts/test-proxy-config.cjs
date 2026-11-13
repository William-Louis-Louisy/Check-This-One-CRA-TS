// Preview-only validation: this route MUST NEVER target a production database.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const config = require("../vercel.json");
assert.ok(Array.isArray(config.rewrites));
assert.deepEqual(config.rewrites[0], {
  source: "/api/:path*",
  destination: "https://cto01-staging-api.check-this-one.com/:path*"
});
assert.deepEqual(config.rewrites[1], {
  source: "/:path*",
  destination: "/index.html"
});
assert.ok(!JSON.stringify(config).includes("x-vercel-enable-rewrite-caching"));
assert.ok(config.headers.some(entry =>
  entry.source === "/api/:path*" &&
  entry.headers.some(header =>
    header.key.toLowerCase() === "cache-control" &&
    header.value.includes("no-store")
  )
));
// Avoid Vercel trailing-slash routing quirks for POST-based list filtering.
const browseSource = fs.readFileSync(path.join(__dirname, "../src/pages/BrowseLists.tsx"), "utf8");
assert.ok(browseSource.includes("/lists/getAllListsFiltered?page="));
assert.ok(!browseSource.includes("/lists/getAllListsFiltered/?page="));
console.log("P0 preview reverse proxy config: OK (staging upstream only)");
