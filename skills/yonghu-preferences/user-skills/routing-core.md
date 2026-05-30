# Routing Core

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.3 |
| Owner | 女助理 |
| Last Updated | 2026-05-30 |

## Purpose

Define the per-turn routing workflow. This is the first executable user skill after `INDEX.md`.

## Trigger Conditions

- Read every turn after the global `INDEX.md`.
- Use before selecting roles, professional skills, project memory files, or user preference files.

## Global User-Skills Location

`user-skills` is global user memory and routing context. It is not project-local.

Canonical root:

```text
$CODEX_HOME/skills/yonghu-preferences/
```

Default Windows install path:

```text
%USERPROFILE%\.codex\skills\yonghu-preferences\
```

Resolve user-skills in this order:

1. `$CODEX_HOME/skills/yonghu-preferences/`
2. `$HOME/.codex/skills/yonghu-preferences/`
3. `%USERPROFILE%\.codex\skills\yonghu-preferences\`
4. A searched `.codex/skills/yonghu-preferences/` directory if the first paths are unavailable.

Do not treat a missing project-local `yonghu-preferences/` directory as missing memory.

## Read Failure Recovery

If `user-skills/INDEX.md` cannot be read:

1. Try the global paths above before answering.
2. Read `routing-core.md`, `communication-style.md`, and `references/profile.md` directly if they exist.
3. Inspect `user-skills/*.md` to reconstruct the missing index.
4. For prompt, skills, memory, or routing governance tasks, auto-repair the index when the global directory is writable and no sensitive data is involved.
5. Prefer `scripts/verify-memory-bootstrap.ps1 -Repair` when available.
6. Report any file that remains missing; do not claim memory was loaded when it was not.

An index is incomplete when it lacks the always-read entries, omits existing active user-skill files, or lacks basic routing/read-when sections.

## Behavior Rules

- Always read `communication-style.md`.
- Read `persona-style.md` unless the task is purely mechanical and short.
- If the user shows frustration, fatigue, sadness, anxiety, impatience, or asks for comfort, read `emotion-support-style.md`.
- If the task involves code, config, tests, build, UI, API, database, Tauri, deployment, prompt, skills, or docs, read `skill-router-style.md` for routing only.
- If the task changes project files or long-lived project state, read `project-memory-style.md` and the matching role file.
- If the task is debugging, read `role-debugger-style.md` and `debug-reuse-style.md`.
- If the task changes prompt, skills, user-skills, manifest, install docs, or distribution zips, read `role-rule-governor-style.md`, `skill-router-style.md`, and `automation-boundary-style.md`.
- If the task involves UI, product screens, design, beautification, or visual QA, read `ui-taste-style.md`.
- If the task involves the user's durable preferences, hobbies, personality, communication style, or repeated corrections, read `user-profile-growth-style.md`.
- Do not load professional `SKILL.md` bodies at routing time. 女助理 suggests candidate skills, 主持人 narrows them, and the selected execution role loads only the needed professional skill body.

## Routing Output

女助理 should internally produce:

```text
Task type:
User-skills to read:
Suggested role chain:
Suggested professional skills:
Project memory to read:
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
- Missing or incomplete `INDEX.md` was repaired or explicitly reported.
- The selected role and professional skills match the task.
- Project-memory and safety gates were considered when relevant.
- Professional skill bodies are deferred until the execution role needs them.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 routing core. | User requested 女助理 + user-skills as the routing center. |
| 2026-05-16 | Removed stale legacy governance-file reference from routing. | V5.0 consolidated governance into role and router user-skills. |
| 2026-05-30 | Added defer-by-default professional skill loading. | User requested role-owned skill calling to reduce context and improve precision. |
| 2026-05-30 | Added global user-skills path resolution and index self-repair rules. | User clarified user-skills index should be global and auto-completed if missing or incomplete. |
