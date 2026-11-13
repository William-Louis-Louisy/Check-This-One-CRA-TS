// Preview-only validation: this route MUST NEVER target a production database.
const assert = require("node:assert/strict");
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
console.log("P0 preview reverse proxy config: OK (staging upstream only)");
