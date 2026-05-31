#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

function existingDir(...parts) {
  const candidate = path.join(...parts);
  return fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()
    ? candidate
    : null;
}

function homeDir() {
  return process.env.HOME || process.env.USERPROFILE || "";
}

function resolveCodexHome() {
  if (process.env.CODEX_HOME && existingDir(process.env.CODEX_HOME)) {
    return path.resolve(process.env.CODEX_HOME);
  }
  const home = homeDir();
  const defaultHome = home ? existingDir(home, ".codex") : null;
  return defaultHome || path.join(home || process.cwd(), ".codex");
}

function readSkillMeta(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const name = (text.match(/^name:\s*(.+?)\s*$/m)?.[1] || "")
    .trim()
    .replace(/^['"]|['"]$/g, "");
  const description = (text.match(/^description:\s*(.+?)\s*$/m)?.[1] || "").trim();
  return { name, description };
}

function walk(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const current = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(current, visit);
    } else if (entry.isFile()) {
      visit(current);
    }
  }
}

function collectSkills(skillsRoot) {
  const byName = new Map();
  const invalid = [];
  walk(skillsRoot, (filePath) => {
    if (path.basename(filePath) !== "SKILL.md") return;
    const meta = readSkillMeta(filePath);
    if (!meta.name || !meta.description) {
      invalid.push({ path: filePath, name: meta.name, hasDescription: Boolean(meta.description) });
    }
    if (meta.name) {
      const paths = byName.get(meta.name) || [];
      paths.push(filePath);
      byName.set(meta.name, paths);
    }
  });
  const duplicateSkillNames = [...byName.entries()]
    .filter(([, paths]) => paths.length > 1)
    .map(([name, paths]) => ({ name, paths }));
  return { byName, invalid, duplicateSkillNames };
}

function userSkillIgnoreSet(userSkillsDir) {
  const names = new Set([
    "SKILL.md",
    "AGENTS.md",
    "INDEX.md",
    "README",
    "docs",
    "user-skills",
    "yonghu-preferences",
    ".ai_project.md",
    "known-issues.md",
    "development-log.md",
    "CHANGELOG.md",
    "package.json",
    "pnpm-workspace.yaml",
    "Cargo.toml",
    "pyproject.toml",
    "go.mod",
    "tauri.conf.json",
    "src-tauri",
    "Read When",
    "Owner",
    "Update Trigger",
    "Validation",
    "L0",
    "L1",
    "L2",
    "L3",
    "V5.0",
    "CODEX_HOME",
    "HOME",
    "KG0",
    "KG1",
    "KG2",
    "KG3",
    "feature",
    "module",
    "file",
    "api",
    "db_table",
    "doc",
    "adr",
    "test",
    "command",
    "config",
    "risk",
    "issue",
    "task",
    "implements",
    "uses",
    "depends_on",
    "documented_by",
    "tested_by",
    "configured_by",
    "validated_by",
    "changed_by",
    "blocked_by",
    "mitigates",
    "supersedes",
    "related_to",
    "evidence",
    "id",
    "type",
    "name",
    "source",
    "source_hash",
    "last_verified",
    "valid_from",
    "valid_to",
    "superseded_by",
    "invalidation_reason",
    "captured_at",
    "invalidated_at",
    "target_id",
    "reason",
    "linked_ids",
    "sensitivity",
    "global",
    "project",
    "none",
    "summary",
    "status",
    "confidence",
    "confirmed",
    "inferred"
  ]);

  if (fs.existsSync(userSkillsDir)) {
    for (const fileName of fs.readdirSync(userSkillsDir)) {
      if (fileName.endsWith(".md")) {
        names.add(fileName);
        names.add(fileName.replace(/\.md$/, ""));
      }
    }
  }
  return names;
}

function extractBacktickSkillRefs(filePath, ignoreSet) {
  const text = fs.readFileSync(filePath, "utf8");
  const refs = [];
  const ignorePatterns = [
    /^[./~$%]/,
    /\//,
    /\.(md|json|ps1|mjs|yaml|yml|toml|ts|tsx|js|jsx|py|rs|sh|txt|log)$/,
    /^[A-Z0-9_]+$/,
    /^\d/,
    /^docs\//,
    /^scripts\//
  ];

  for (const match of text.matchAll(/`([^`\n]{2,80})`/g)) {
    const ref = match[1].trim();
    if (ignoreSet.has(ref)) continue;
    if (ignorePatterns.some((pattern) => pattern.test(ref))) continue;
    if (/^[a-z0-9][a-z0-9-]+$/.test(ref)) refs.push(ref);
  }

  return refs;
}

function inspectUserSkillRefs(userSkillsDir, skillNames) {
  const ignoreSet = userSkillIgnoreSet(userSkillsDir);
  const unresolved = [];
  if (!fs.existsSync(userSkillsDir)) return unresolved;

  for (const fileName of fs.readdirSync(userSkillsDir).filter((name) => name.endsWith(".md"))) {
    const filePath = path.join(userSkillsDir, fileName);
    for (const ref of extractBacktickSkillRefs(filePath, ignoreSet)) {
      if (!skillNames.has(ref)) unresolved.push({ file: fileName, ref });
    }
  }

  return unresolved;
}

function inspectRouterTargets(routerPath, skillNames) {
  if (!fs.existsSync(routerPath)) {
    return [{ file: routerPath, ref: "(missing skill-router-style.md)" }];
  }
  const ignoreSet = userSkillIgnoreSet(path.dirname(routerPath));
  return extractBacktickSkillRefs(routerPath, ignoreSet)
    .filter((ref) => !skillNames.has(ref))
    .map((ref) => ({ file: path.basename(routerPath), ref }));
}

const codexHome = resolveCodexHome();
const skillsRoot = path.join(codexHome, "skills");
const home = homeDir();
const yonghuRoot =
  existingDir(skillsRoot, "yonghu-preferences") ||
  (home ? existingDir(home, ".codex", "skills", "yonghu-preferences") : null) ||
  path.join(skillsRoot, "yonghu-preferences");
const userSkillsDir = path.join(yonghuRoot, "user-skills");
const routerPath = path.join(userSkillsDir, "skill-router-style.md");

const missingRequired = [skillsRoot, yonghuRoot, userSkillsDir, routerPath].filter((target) => !fs.existsSync(target));
const skills = fs.existsSync(skillsRoot)
  ? collectSkills(skillsRoot)
  : { byName: new Map(), invalid: [], duplicateSkillNames: [] };
const skillNames = new Set(skills.byName.keys());
const missingRouterTargets = inspectRouterTargets(routerPath, skillNames);
const unresolvedUserSkillRefs = inspectUserSkillRefs(userSkillsDir, skillNames);

const ok =
  missingRequired.length === 0 &&
  skills.invalid.length === 0 &&
  skills.duplicateSkillNames.length === 0 &&
  missingRouterTargets.length === 0 &&
  unresolvedUserSkillRefs.length === 0;

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      platform: process.platform,
      codexHome,
      skillsRoot,
      yonghuRoot,
      userSkillsDir,
      skillNameCount: skillNames.size,
      missingRequired,
      invalidSkills: skills.invalid,
      duplicateSkillNames: skills.duplicateSkillNames,
      missingRouterTargets,
      unresolvedUserSkillRefs
    },
    null,
    2
  )}\n`
);

process.exit(ok ? 0 : 1);
