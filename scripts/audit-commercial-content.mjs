#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const defaultRoot = path.dirname(path.dirname(__filename));
const args = process.argv.slice(2);

function readArg(name, fallback = null) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] || fallback;
}

const repoRoot = path.resolve(readArg("--root", defaultRoot));
const requireOverlay = !args.includes("--no-require-overlay");

const scannedRoots = [
  "README.md",
  "MANIFEST.md",
  "SOURCES.md",
  "docs",
  "skills/yonghu-preferences"
];

const bannedPatterns = [
  { id: "personal-address", pattern: /千总/ },
  { id: "personal-assistant-name", pattern: /薇薇/ },
  { id: "personal-ending", pattern: /千总牛逼/ },
  { id: "personal-cute-tone", pattern: /\bcute\b/i },
  { id: "personal-playful-tone", pattern: /\bplayful\b/i },
  { id: "placeholder-tbd", pattern: /\bTBD\b/i },
  { id: "placeholder-copy", pattern: /\bplaceholder\b/i },
  { id: "toy-positioning", pattern: /\btoy\b/i }
];
const ownerMarkerPatterns = bannedPatterns.filter((rule) =>
  ["personal-address", "personal-assistant-name", "personal-ending"].includes(rule.id)
);

const allowedPersonalPaths = new Set([
  "overlays/qianzong-personal/README.md",
  "overlays/qianzong-personal/skills/yonghu-preferences/references/owner.json",
  "overlays/qianzong-personal/skills/yonghu-preferences/references/profile.md",
  "overlays/qianzong-personal/skills/yonghu-preferences/user-skills/communication-style.md",
  "overlays/qianzong-personal/skills/yonghu-preferences/user-skills/persona-style.md"
]);

const textExtensions = new Set([".md", ".mjs", ".json", ".ps1", ".txt"]);

function walk(target, files) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    files.push(target);
    return;
  }
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if ([".git", "node_modules", "overlays"].includes(entry.name)) continue;
    walk(path.join(target, entry.name), files);
  }
}

const files = [];
for (const rel of scannedRoots) walk(path.join(repoRoot, rel), files);
const scanned = new Set(files.map((file) => path.resolve(file)));

const findings = [];
for (const file of files) {
  const rel = path.relative(repoRoot, file);
  if (allowedPersonalPaths.has(rel)) continue;
  if (!textExtensions.has(path.extname(file))) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const rule of bannedPatterns) {
    if (rule.pattern.test(text)) {
      findings.push({ file: rel, rule: rule.id });
    }
  }
}

const skillPersonalFiles = [];
walk(path.join(repoRoot, "skills"), skillPersonalFiles);
for (const file of skillPersonalFiles) {
  const resolved = path.resolve(file);
  if (scanned.has(resolved)) continue;
  const rel = path.relative(repoRoot, file);
  if (!textExtensions.has(path.extname(file))) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const rule of ownerMarkerPatterns) {
    if (rule.pattern.test(text)) {
      findings.push({ file: rel, rule: rule.id });
    }
  }
}

function inspectPersonalOverlay() {
  if (!requireOverlay) {
    return {
      required: false,
      missing: [],
      invalid: [],
      markerFiles: []
    };
  }

  const missing = [...allowedPersonalPaths].filter((rel) => !fs.existsSync(path.join(repoRoot, rel)));
  const invalid = [];
  const markerFiles = [];
  for (const rel of allowedPersonalPaths) {
    const filePath = path.join(repoRoot, rel);
    if (!fs.existsSync(filePath)) continue;
    const text = fs.readFileSync(filePath, "utf8");
    if (text.includes("千总")) markerFiles.push(rel);
  }

  const ownerPath = path.join(
    repoRoot,
    "overlays/qianzong-personal/skills/yonghu-preferences/references/owner.json"
  );
  if (fs.existsSync(ownerPath)) {
    try {
      const owner = JSON.parse(fs.readFileSync(ownerPath, "utf8"));
      if (owner.user_display_name !== "千总") invalid.push("owner.json user_display_name must be 千总");
      if (owner.assistant_display_name !== "薇薇") invalid.push("owner.json assistant_display_name must be 薇薇");
      if (owner.fixed_ending !== "千总牛逼！") invalid.push("owner.json fixed_ending must be 千总牛逼！");
    } catch (error) {
      invalid.push(`owner.json parse error: ${error.message}`);
    }
  }

  if (markerFiles.length < 4) {
    invalid.push("personal overlay must preserve 千总 in multiple owner-specific files");
  }

  return {
    required: true,
    missing,
    invalid,
    markerFiles
  };
}

const overlay = inspectPersonalOverlay();
const ok = findings.length === 0 && overlay.missing.length === 0 && overlay.invalid.length === 0;

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      root: repoRoot,
      scannedFiles: files.length,
      skillPersonalScannedFiles: skillPersonalFiles.length,
      findings,
      personalOverlay: overlay
    },
    null,
    2
  )}\n`
);

process.exit(ok ? 0 : 1);
