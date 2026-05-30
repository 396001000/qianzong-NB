# Routing Core

| Field | Value |
|---|---|
| Status | Active |
| Version | 2.2 |
| Owner | 女助理 |
| Last Updated | 2026-05-30 |

## Purpose

Define the per-turn routing workflow. This is the first executable user skill after `INDEX.md`.

## Trigger Conditions

- Read every turn after the global `INDEX.md`.
- Use before selecting roles, professional skills, project memory files, or user preference files.

## Global User-Skills Location

`user-skills` is the only managed global user memory and routing context for V5.0. It is not project-local.

Canonical root:

```text
$CODEX_HOME/skills/yonghu-preferences/
```

Default macOS install path:

```text
$HOME/.codex/skills/yonghu-preferences/
```

Default Windows install path:

```text
%USERPROFILE%\.codex\skills\yonghu-preferences\
```

Resolve user-skills in this order:

1. `$CODEX_HOME/skills/yonghu-preferences/`
2. `$HOME/.codex/skills/yonghu-preferences/`
3. A searched `.codex/skills/yonghu-preferences/` directory if the first paths are unavailable
4. `%USERPROFILE%\.codex\skills\yonghu-preferences\` on Windows

Do not treat a missing project-local `yonghu-preferences/` directory as missing memory.
Do not create or use a project-local `yonghu-preferences/` as a second global memory entry.

## Read Failure Recovery

If `user-skills/INDEX.md` cannot be read:

1. Try the global paths above before answering.
2. On macOS, run `node scripts/verify-memory-bootstrap.mjs --repair` from the resolved `yonghu-preferences/` root when the script exists.
3. Use `scripts/verify-memory-bootstrap.ps1 -Repair` only as a Windows fallback.
4. Read `routing-core.md`, `communication-style.md`, `memory-reliability-style.md`, and `references/profile.md` directly if they exist.
5. Inspect `user-skills/*.md` to reconstruct the missing index without inventing preferences.
6. Report any file that remains missing; do not claim memory was loaded when it was not.

An index is incomplete when it lacks the always-read entries, omits existing active user-skill files, or lacks basic routing/read-when sections.

## Behavior Rules

- Always read `communication-style.md`.
- Read `memory-reliability-style.md` when memory, project context, project root discovery, or bootstrap repair is involved.
- Read `memory-stack-style.md` on every non-trivial turn to select L0/L1/L2/L3 and control context budget.
- Read `memory-evidence-style.md` before durable project memory writes, knowledge graph updates, debug reports, ADRs, or invalidating stale memory.
- Read `global-memory-capture-style.md` before final response on every non-trivial turn and immediately when the user asks to remember, forget, set a default, or correct future behavior.
- Read `persona-style.md` unless the task is purely mechanical and short.
- If the user shows frustration, fatigue, sadness, anxiety, impatience, or asks for comfort, read `emotion-support-style.md`.
- If the task involves code, config, tests, build, UI, API, database, Tauri, deployment, prompt, skills, or docs, read `skill-router-style.md` for routing only.
- If the task changes project files or long-lived project state, read `memory-reliability-style.md`, `memory-stack-style.md`, `project-memory-style.md`, `memory-evidence-style.md`, and the matching role file.
- If the user says `初始化本项目`, route to 项目助手 and use `init-project-memory.mjs --cwd .` after 主持人 confirms no high-risk overwrite; this entrypoint performs pre-audit, fill, summary, and final audit.
- If project work may need relationship lookup, impact analysis, cross-layer continuity, or long-term project updates, read `knowledge-graph-memory-style.md` so 女助理 can choose KG0/KG1/KG2/KG3.
- If the task is debugging, read `role-debugger-style.md` and `debug-reuse-style.md`.
- If the task changes prompt, skills, user-skills, manifest, install docs, or distribution zips, read `role-rule-governor-style.md`, `skill-router-style.md`, and `automation-boundary-style.md`.
- If the task installs, deletes, archives, restores, updates, audits, or routes skills, also read `skill-lifecycle-governance-style.md`.
- If the task involves UI, product screens, design, beautification, or visual QA, read `ui-taste-style.md`.
- If the task involves the user's durable preferences, hobbies, personality, communication style, or repeated corrections, read `user-profile-growth-style.md`.
- Do not load professional `SKILL.md` bodies at routing time. 女助理 suggests candidate skills, 主持人 narrows them, and the selected execution role loads only the needed professional skill body.

## Routing Output

女助理 should internally produce:

```text
Task type:
User-skills to read:
Memory stack level:
Suggested role chain:
Suggested professional skills:
Project memory to read:
KG level:
Risk/clarification:
```

The host decides whether to accept or correct the suggestion.

## Forbidden Behaviors

- Do not read every user-skill by default.
- Do not let user preference override current explicit instruction, project rules, facts, or safety.
- Do not use persona or emotion support to delay urgent technical work.

## Acceptance Checks

- Relevant user-skills were read.
- Global user-skills path was used or recovered when relative lookup failed.
- Memory writes went through one gateway: global preferences to `yonghu-preferences`, project memory to the detected project root.
- Active/passive memory capture was considered before final response on non-trivial turns.
- Missing or incomplete `INDEX.md` was repaired or explicitly reported.
- The selected role and professional skills match the task.
- Project-memory and safety gates were considered when relevant.
- L0-L3 memory read level was selected for non-trivial work.
- Evidence and invalidation rules were considered for durable project memory or KG writes.
- Knowledge graph activation was skipped or selected deliberately for project work, not used automatically for simple consultations.
- Professional skill bodies are deferred until the execution role needs them.
- Skill lifecycle tasks route to 规则师 with lifecycle audit and poisoning checks before default routing.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 routing core. | User requested 女助理 + user-skills as the routing center. |
| 2026-05-16 | Removed stale legacy governance-file reference from routing. | V5.0 consolidated governance into role and router user-skills. |
| 2026-05-30 | Added defer-by-default professional skill loading. | User requested role-owned skill calling to reduce context and improve precision. |
| 2026-05-30 | Added global user-skills path resolution and index self-repair rules. | User clarified user-skills index should be global and auto-completed if missing or incomplete. |
| 2026-05-30 | Added single memory gateway routing, macOS-first Node repair, and project/global memory separation. | User requested one memory entry and reliable multi-project memory distinction on Mac. |
| 2026-05-30 | Added skill lifecycle governance route. | User requested safe handling for new/deleted skills and skill poisoning prevention. |
| 2026-05-30 | Added active/passive global memory capture route. | User identified incomplete global memory capture as a serious defect. |
| 2026-05-30 | Added knowledge graph activation route. | User asked 女助理 to decide whether knowledge graph is needed depending on task depth and project longevity. |
| 2026-05-30 | Upgraded routing to v2.2 memory stack and evidence governance. | User requested a complete memory loop with correct read, write, invalidation, verification, and reuse. |
