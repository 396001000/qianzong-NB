# qianzong-NB Skills Pack

This repository is a Codex skills-only distribution package.

It includes local `skills/`, installation scripts, verification scripts, project memory docs, and optional personal overlays. It intentionally does not distribute `AGENTS.md`, system prompts, runtime prompts, or built-in prompt templates.

## Contents

- `skills/` - packaged Codex user skills and professional skills.
- `skills/yonghu-preferences/` - global user-skill routing, memory bootstrap, memory stack, evidence rules, communication rules, and preference governance.
- `scripts/install-macos.sh` - macOS installer for copying skills into `$CODEX_HOME/skills`.
- `scripts/install.ps1` - Windows PowerShell installer for copying skills into `$CODEX_HOME\skills`.
- `scripts/verify-skills.mjs` - package verifier for skill metadata, route targets, lifecycle audit, source audit, commercial content, and memory checks.
- `scripts/verify-skills.ps1` - Windows wrapper for package verification.
- `overlays/qianzong-personal/` - optional owner-specific overlay, not applied by default.
- `docs/` - project memory for maintaining this skills pack repository.
- `skills-inventory.json` - generated inventory of packaged skills.

## macOS Usage

Clone the repository:

```bash
git clone https://github.com/396001000/qianzong-NB.git
cd qianzong-NB
```

Install all packaged skills into the default Codex home:

```bash
bash scripts/install-macos.sh --force
```

Default destination:

```text
$HOME/.codex/skills
```

Use a custom Codex home when needed:

```bash
bash scripts/install-macos.sh --codex-home "$HOME/.codex" --force
```

Apply the optional personal overlay only when this install is for the owner:

```bash
bash scripts/install-macos.sh --force --overlay qianzong-personal
```

Verify the package and installed memory layer:

```bash
node scripts/verify-skills.mjs
node ~/.codex/skills/yonghu-preferences/scripts/verify-memory-bootstrap.mjs
node ~/.codex/skills/yonghu-preferences/scripts/verify-skill-routes.mjs
node ~/.codex/skills/yonghu-preferences/scripts/audit-memory-system.mjs
```

Restart Codex after installing or replacing skills so the runtime skill registry refreshes.

## Windows Usage

Clone the repository in PowerShell:

```powershell
git clone https://github.com/396001000/qianzong-NB.git
cd qianzong-NB
```

Install all packaged skills into the default Codex home:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install.ps1 -Force
```

Default destination:

```text
$HOME\.codex\skills
```

Use a custom Codex home when needed:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install.ps1 -CodexHome "$HOME\.codex" -Force
```

Apply the optional personal overlay only when this install is for the owner:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install.ps1 -Force -Overlay qianzong-personal
```

Verify the package and installed memory layer:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verify-skills.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\skills\yonghu-preferences\scripts\verify-memory-bootstrap.ps1
```

Restart Codex after installing or replacing skills so the runtime skill registry refreshes.

## Project Memory Initialization

In a Codex conversation inside a software project, say:

```text
初始化本项目
```

The assistant should route that to the installed initializer:

```bash
node ~/.codex/skills/yonghu-preferences/scripts/init-project-memory.mjs --cwd .
```

The command self-checks the project, creates only missing project memory files, writes `docs/memory/retrieval-index.json`, and re-runs the project memory audit. Use `--dry-run` to inspect gaps, `--with-kg` to initialize `docs/knowledge/`, and `--force` only when the current projectless directory should become the project root.

## Package Verification

Run the full repository verification before publishing changes:

```bash
node scripts/verify-skills.mjs
node skills/yonghu-preferences/scripts/audit-project-memory.mjs --cwd .
node scripts/build-commercial-release.mjs --out /tmp/qianzong-NB-commercial --force
node scripts/audit-commercial-content.mjs --root /tmp/qianzong-NB-commercial --no-require-overlay
```

## Notes

- `.system` skills are not included because Codex provides them separately.
- Plugin cache folders are not included.
- Empty local directories without `SKILL.md` are not distributed as skills.
- Default files are commercial-safe and contain no owner-specific user address, assistant name, or fixed ending phrase.
- Owner-specific preferences are distributed only through explicit overlays.
- Memory system v2.2 is file-first: Markdown, JSON, JSONL, and Node scripts. MemPalace, ChromaDB, SQLite, and MCP memory servers are not required dependencies.
- `skills-inventory.json` records source-review and commercial-use status for every packaged skill. Public redistribution still requires manual license review where marked.
