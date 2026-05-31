# Project Structure

## Read When

- Before package structure changes, skill sync work, install/verify script changes, or distribution boundary changes.

## Owner

- Project Assistant

## Update Trigger

- Skill directories, install scripts, verification scripts, docs, or package metadata change.

## Validation

- Paths exist or are explicitly marked removed.
- Package validation and memory audit commands pass after structural changes.

## Top-Level Directories

- `skills/`: Codex professional skills and the `yonghu-preferences` user memory skill.
- `scripts/`: Package-level install and verification scripts.
- `docs/`: Project memory and maintenance docs for this skills pack repository.
- `overlays/`: Optional owner-specific profile/persona overlays that are not installed by default.

## Important Files

- `README.md`: User-facing package overview, install, verify, and restart instructions.
- `MANIFEST.md`: Package metadata and expected validation commands.
- `SOURCES.md`: Included source categories and redistribution caution.
- `skills-inventory.json`: Generated inventory of packaged skills.
- `skills/yonghu-preferences/SKILL.md`: Global user preference and memory governance skill entry.
- `skills/yonghu-preferences/user-skills/`: Executable global user behavior and routing rules.
- `skills/yonghu-preferences/scripts/`: Memory, routing, project-memory, and lifecycle audit helpers.
- `skills/yonghu-preferences/scripts/init-project-memory.mjs`: Single conversational initializer for `初始化本项目`; runs pre-audit, init, summary, and final audit.
- `skills/yonghu-preferences/scripts/maintain-memory.mjs`: Shared maintenance runner for daily, weekly, global, and project memory checks.
- `skills/yonghu-preferences/scripts/setup-project-maintenance.mjs`: Idempotent project maintenance setup for `docs/memory/maintenance.json` and a read-only Git pre-push audit hook.
- `skills/yonghu-preferences/references/skill-lifecycle-allowlist.json`: Exact-match accepted lifecycle scanner findings with rationale.
- `skills/yonghu-preferences/references/skill-inventory-snapshot.json`: Accepted skill inventory snapshot used to detect unreviewed add/remove/change drift.
- `scripts/install-macos.sh`: macOS installer for copying only valid skill directories into `$CODEX_HOME/skills`.
- `scripts/install.ps1`: Windows installer for copying only valid skill directories into `$CODEX_HOME\skills`.
- `scripts/setup-memory-maintenance-macos.sh`: macOS launchd setup for global daily light checks and weekly deep audits.
- `scripts/setup-memory-maintenance.ps1`: Windows Task Scheduler setup for global daily light checks and weekly deep audits.
- `scripts/verify-skills.mjs`: macOS/Node package verifier for skill frontmatter, route targets, and v2.2 memory checks.
- `scripts/audit-commercial-content.mjs`: Default-distribution lint for owner-specific markers and draft residue.
- `scripts/audit-skill-sources.mjs`: Inventory source-review and commercial-use audit.
- `scripts/build-commercial-release.mjs`: Commercial artifact builder that excludes owner-specific overlays.
- `overlays/qianzong-personal/skills/yonghu-preferences/references/owner.json`: Machine-readable owner-local identity overlay.

## Module Boundaries

- Package-level docs describe the distributable pack.
- `skills/yonghu-preferences/` owns global user memory behavior and scripts.
- `docs/` owns this repository's project memory only.
- The repository distributes skills only and must not distribute global `AGENTS.md`, project-level `AGENTS.md`, `AGENTS5.3.md`, or owner-specific system prompts.
- Default `skills/yonghu-preferences/` files must stay commercial-safe; owner-specific local behavior belongs in `overlays/qianzong-personal/`.
- Commercial release artifacts must be generated without `overlays/`; personal overlays are applied only on owner-local installs.
- Maintenance setup scripts are optional and idempotent; they must skip existing config/tasks unless force options are used.

## Avoid Editing Without Reason

- Do not add `.system` skills or plugin cache directories to this repository.
- Do not add global `AGENTS.md`, project-level `AGENTS.md`, `AGENTS5.3.md`, or owner-specific prompt content to the distribution package.
- Do not distribute empty local directories without `SKILL.md` as skills.
- Do not route new or external skills by default before safety and lifecycle review.
- Do not put owner-specific address, assistant name, or fixed ending text back into the default package files.
- Do not silently install system-level scheduled tasks; require explicit setup flags.
