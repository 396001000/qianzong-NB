#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const scriptsRoot = path.dirname(__filename);
const args = process.argv.slice(2);

function arg(name, fallback = "") {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] || fallback : fallback;
}

function has(name) {
  return args.includes(`--${name}`);
}

function run(scriptName, extraArgs) {
  const result = spawnSync(process.execPath, [path.join(scriptsRoot, scriptName), ...extraArgs], {
    cwd: startDir,
    encoding: "utf8"
  });
  let parsed = null;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    parsed = { parseError: true, stdout: result.stdout, stderr: result.stderr };
  }
  return { ok: result.status === 0, status: result.status, parsed };
}

const startDir = path.resolve(arg("cwd", process.cwd()));
const dryRun = has("dry-run");
const force = has("force");
const withKnowledge = has("with-kg") || has("knowledge");

const preAudit = run("audit-project-memory.mjs", ["--cwd", startDir]);
if (dryRun) {
  process.stdout.write(
    `${JSON.stringify(
      {
        ok: true,
        mode: "dry-run",
        cwd: startDir,
        preAuditOk: preAudit.ok,
        wouldInitialize: !preAudit.ok,
        withKnowledge,
        preAudit: preAudit.parsed
      },
      null,
      2
    )}\n`
  );
  process.exit(0);
}

const initArgs = ["--cwd", startDir, "--init"];
if (force) initArgs.push("--force");
if (withKnowledge) initArgs.push("--knowledge");
const init = run("audit-project-memory.mjs", initArgs);

let summary = { ok: false, skipped: true };
if (init.ok && !init.parsed?.projectless) {
  summary = run("summarize-project-memory.mjs", ["--cwd", init.parsed.projectRoot || startDir, "--write"]);
}

const finalAudit = run("audit-project-memory.mjs", ["--cwd", init.parsed?.projectRoot || startDir]);
const ok = init.ok && summary.ok && finalAudit.ok;

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      mode: "init",
      cwd: startDir,
      withKnowledge,
      force,
      preAudit: preAudit.parsed,
      init: init.parsed,
      summary: summary.parsed || summary,
      finalAudit: finalAudit.parsed
    },
    null,
    2
  )}\n`
);

process.exit(ok ? 0 : 1);
