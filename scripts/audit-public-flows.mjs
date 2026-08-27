import fs from "node:fs";
import path from "node:path";

const root = path.resolve("client/src");
const appPath = path.join(root, "App.tsx");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  });
}

const sourceFiles = walk(root).filter((file) => /\.(tsx|ts)$/.test(file));
const source = new Map(sourceFiles.map((file) => [file, fs.readFileSync(file, "utf8")]));
const appSource = source.get(appPath) ?? "";

const routePatterns = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)].map((match) => match[1]);
const anchorsByFile = new Map();
const links = [];

for (const [file, content] of source) {
  const ids = [...content.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  anchorsByFile.set(file, ids);
  for (const match of content.matchAll(/\b(?:href|to)="([^"]+)"/g)) {
    links.push({ file: path.relative(root, file), destination: match[1] });
  }
}

function matchesRoute(destination) {
  const clean = destination.split("?")[0].split("#")[0] || "/";
  return routePatterns.some((pattern) => {
    const expression = `^${pattern.replace(/:[^/]+/g, "[^/]+")}$`;
    return new RegExp(expression).test(clean);
  });
}

const allAnchors = new Set([...anchorsByFile.values()].flat());
// `Cities.tsx` chooses these section IDs conditionally at render time.
allAnchors.add("business-cities");
const internalLinks = links.filter(({ destination }) => destination.startsWith("/") || destination.startsWith("#"));
const unresolvedRoutes = internalLinks.filter(({ destination }) => destination.startsWith("/") && !matchesRoute(destination));
const unresolvedAnchors = internalLinks.filter(({ destination }) => destination.includes("#")).filter(({ destination }) => {
  const anchor = destination.split("#")[1];
  return anchor && !allAnchors.has(anchor);
});

const report = {
  routes: routePatterns,
  linkCount: links.length,
  internalLinkCount: internalLinks.length,
  anchors: [...allAnchors].sort(),
  unresolvedRoutes,
  unresolvedAnchors,
};

console.log(JSON.stringify(report, null, 2));
if (unresolvedRoutes.length || unresolvedAnchors.length) process.exitCode = 1;
