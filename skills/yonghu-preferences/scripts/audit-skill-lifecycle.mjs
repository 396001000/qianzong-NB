#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const args = new Set(process.argv.slice(2));
const writeSnapshot = args.has("--write-snapshot");

function existingDir(...parts) {
  const candidate = path.join(...parts);
  return fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()
    ? candidate
    : null;
}

function resolveCodexHome() {
  if (process.env.CODEX_HOME && existingDir(process.env.CODEX_HOME)) {
    return process.env.CODEX_HOME;
  }
  return path.join(process.env.HOME || process.cwd(), ".codex");
}

function walk(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const current = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if ([".git", "node_modules", "__pycache__"].includes(entry.name)) continue;
      walk(current, visit);
    } else if (entry.isFile()) {
      visit(current);
    }
  }
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function hashSkillDir(skillDir) {
  const hashes = [];
  walk(skillDir, (filePath) => {
    const rel = path.relative(skillDir, filePath);
    if (rel === "references/skill-inventory-snapshot.json") return;
    const stat = fs.statSync(filePath);
    if (stat.size > 5_000_000) return;
    hashes.push(`${rel}:${sha256(fs.readFileSync(filePath))}`);
  });
  hashes.sort();
  return sha256(Buffer.from(hashes.join("\n"), "utf8"));
}

function readSkillMeta(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const name = (text.match(/^name:\s*(.+?)\s*$/m)?.[1] || "")
    .trim()
    .replace(/^['"]|['"]$/g, "");
  const description = (text.match(/^description:\s*(.+?)\s*$/m)?.[1] || "").trim();
  return { name, description };
}

function collectSkills(skillsRoot) {
  const skills = [];
  walk(skillsRoot, (filePath) => {
    if (path.basename(filePath) !== "SKILL.md") return;
    const skillDir = path.dirname(filePath);
    const meta = readSkillMeta(filePath);
    skills.push({
      name: meta.name,
      description: meta.description,
      skillDir,
      skillPath: filePath,
      relativeDir: path.relative(skillsRoot, skillDir),
      hash: hashSkillDir(skillDir)
    });
  });
  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

function loadSnapshot(snapshotPath) {
  if (!fs.existsSync(snapshotPath)) return null;
  return JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
}

function diffInventory(current, snapshot) {
  const previousByName = new Map((snapshot?.skills || []).map((skill) => [skill.name, skill]));
  const currentByName = new Map(current.map((skill) => [skill.name, skill]));
  const added = current.filter((skill) => !previousByName.has(skill.name)).map((skill) => skill.name);
  const removed = (snapshot?.skills || []).filter((skill) => !currentByName.has(skill.name)).map((skill) => skill.name);
  const changed = current
    .filter((skill) => previousByName.has(skill.name) && previousByName.get(skill.name).hash !== skill.hash)
    .map((skill) => skill.name);
  return { added, removed, changed };
}

const suspiciousRules = [
  {
    id: "instruction-override",
    pattern: /ignore\s+(all\s+)?(previous|prior|system|developer)\s+instructions/i
  },
  {
    id: "hidden-prompt-disclosure",
    pattern: /(reveal|print|dump|show).{0,80}(system prompt|developer message|hidden instructions)/i
  },
  {
    id: "secret-exfiltration",
    pattern: /(steal|exfiltrate|upload|send).{0,100}(token|secret|api key|ssh key|private key|password|credential)/i
  },
  {
    id: "remote-shell-pipe",
    pattern: /(curl|wget)[^\n|]{0,120}\|\s*(sh|bash|zsh|powershell|pwsh)/i
  },
  {
    id: "destructive-home-or-root-delete",
    pattern: /rm\s+-rf\s+(\/|\$HOME|~)/i
  },
  {
    id: "world-writable-recursive",
    pattern: /chmod\s+(-R\s+)?777/i
  },
  {
    id: "macos-persistence-hook",
    pattern: /\b(launchctl|LaunchAgents|LaunchDaemons|crontab)\b/i
  },
  {
    id: "shell-profile-modification",
    pattern: /\.(zshrc|bashrc|bash_profile|profile)\b/i
  }
];

const textExtensions = new Set([
  ".md",
  ".txt",
  ".js",
  ".mjs",
  ".ts",
  ".tsx",
  ".py",
  ".sh",
  ".ps1",
  ".json",
  ".yaml",
  ".yml",
  ".toml"
]);

function scanSkill(skill) {
  const findings = [];
  walk(skill.skillDir, (filePath) => {
    const rel = path.relative(skill.skillDir, filePath);
    if (rel === "references/skill-inventory-snapshot.json") return;
    if (rel === "scripts/audit-skill-lifecycle.mjs") return;
    const ext = path.extname(filePath);
    if (!textExtensions.has(ext)) return;
    const stat = fs.statSync(filePath);
    if (stat.size > 1_000_000) return;
    const text = fs.readFileSync(filePath, "utf8");
    for (const rule of suspiciousRules) {
      if (rule.pattern.test(text)) {
        findings.push({
          skill: skill.name,
          file: rel,
          rule: rule.id
        });
      }
    }
  });
  return findings;
}

const codexHome = resolveCodexHome();
const skillsRoot = path.join(codexHome, "skills");
const yonghuRoot =
  existingDir(skillsRoot, "yonghu-preferences") ||
  existingDir(process.env.HOME || "", ".codex", "skills", "yonghu-preferences") ||
  path.join(skillsRoot, "yonghu-preferences");
const referencesDir = path.join(yonghuRoot, "references");
const snapshotPath = path.join(referencesDir, "skill-inventory-snapshot.json");
const allowlistPath = path.join(referencesDir, "skill-lifecycle-allowlist.json");

function loadAllowlist(filePath) {
  if (!fs.existsSync(filePath)) {
    return { findings: [] };
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function findingKey(finding) {
  return `${finding.skill}\0${finding.file}\0${finding.rule}`;
}

const current = fs.existsSync(skillsRoot) ? collectSkills(skillsRoot) : [];
const snapshot = loadSnapshot(snapshotPath);
const allowlist = loadAllowlist(allowlistPath);
const allowedKeys = new Set((allowlist.findings || []).map(findingKey));
const diff = diffInventory(current, snapshot);
const changedOrAddedNames = new Set([...diff.added, ...diff.changed]);
const skillsToScan = snapshot ? current.filter((skill) => changedOrAddedNames.has(skill.name)) : current;
const scannedFindings = skillsToScan.flatMap(scanSkill);
const acceptedFindings = scannedFindings.filter((finding) => allowedKeys.has(findingKey(finding)));
const suspiciousFindings = scannedFindings.filter((finding) => !allowedKeys.has(findingKey(finding)));

let snapshotWritten = false;
let snapshotWriteBlocked = false;
if (writeSnapshot && suspiciousFindings.length > 0) {
  snapshotWriteBlocked = true;
}

if (writeSnapshot && !snapshotWriteBlocked) {
  fs.mkdirSync(referencesDir, { recursive: true });
  fs.writeFileSync(
    snapshotPath,
    `${JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        skillsRoot,
        skillCount: current.length,
        allowlistPath,
        skills: current.map((skill) => ({
          name: skill.name,
          description: skill.description,
          relativeDir: skill.relativeDir,
          hash: skill.hash
        }))
      },
      null,
      2
    )}\n`,
    "utf8"
  );
  snapshotWritten = true;
}

const cleanCurrentState =
  Boolean(snapshot) &&
  diff.added.length === 0 &&
  diff.removed.length === 0 &&
  diff.changed.length === 0 &&
  suspiciousFindings.length === 0;
const acceptedSnapshotWrite = writeSnapshot && snapshotWritten && suspiciousFindings.length === 0;
const ok = cleanCurrentState || acceptedSnapshotWrite;

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      snapshotExists: Boolean(snapshot),
      snapshotWritten,
      snapshotWriteBlocked,
      snapshotPath,
      activeSkillCount: current.length,
      added: diff.added,
      removed: diff.removed,
      changed: diff.changed,
      scannedSkillCount: skillsToScan.length,
      acceptedFindings,
      suspiciousFindings
    },
    null,
    2
  )}\n`
);

process.exit(ok ? 0 : 1);
