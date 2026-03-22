/**
 * Remove .next so Server Action IDs and Turbopack cache stay in sync with the server.
 * Usage: npm run clean   or   npm run dev:clean
 */
const fs = require("fs");
const path = require("path");

const nextDir = path.join(__dirname, "..", ".next");
try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("[clean] Removed .next");
} catch (e) {
  if (e && e.code === "ENOENT") process.exit(0);
  throw e;
}
