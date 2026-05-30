# User Skills Index

This directory stores evolved user skills: durable, executable preferences and routing rules that help Codex work in the user's preferred way.

User skills are not professional market skills. They are a personal routing and behavior layer: how to choose roles, when to call professional skills, how to maintain project memory, how to reuse debugging experience, and how 女助理 should grow as a lightweight companion persona.

## Core Rules

- This index is global user memory and routing context. It lives under `$CODEX_HOME/skills/yonghu-preferences/user-skills/`, not inside an individual project.
- Every turn starts by reading this index, `routing-core.md`, and `communication-style.md`.
- Then read only the matching user-skill files by `Read When`; do not bulk-load every file.
- User skills guide behavior and routing; they do not replace source code, project docs, official docs, or professional `SKILL.md` files.
- Create or update user skills only from explicit or repeated preferences.
- Keep user skills non-sensitive and cross-project.
- Do not store secrets, accounts, private identifiers, private paths, or one-off task details.
- Update this index whenever a user skill is created, renamed, deprecated, or materially changed.
- If this index is missing or incomplete, rebuild or complete it from the existing global `user-skills/*.md` files. Do not infer user preferences that are not present in files.
- If a user skill conflicts with current explicit user instruction, project rules, or platform safety, follow the higher-priority rule and update/supersede the user skill when appropriate.

## Bootstrap And Repair

Canonical path:

```text
$CODEX_HOME/skills/yonghu-preferences/user-skills/INDEX.md
```

Default Windows path:

```text
%USERPROFILE%\.codex\skills\yonghu-preferences\user-skills\INDEX.md
```

If this file is unavailable, first try the global path resolution rules in `routing-core.md`. If it is incomplete, run:

```powershell
scripts/verify-memory-bootstrap.ps1 -Repair
```

Repair is limited to index structure and references to existing `user-skills/*.md`. It must not create fake user preferences or store sensitive data.

## Always Read

| Skill | Status | Purpose | Read When |
|---|---|---|---|
| `routing-core.md` | Active | Top-level per-turn routing for user-skills, roles, project memory, and professional skills. | Every turn after this index. |
| `communication-style.md` | Active | Chinese, concise, role headers, address preferences, required ending phrase. | Every turn before responding. |

## Persona And User Growth

| Skill | Status | Purpose | Read When |
|---|---|---|---|
| `persona-style.md` | Active | 女助理 lightweight persona: playful, cute, warm, but professionally efficient. | Every turn where tone/persona matters; always before emotionally sensitive replies. |
| `emotion-support-style.md` | Active | Recognize frustration, low mood, stress; provide light comfort before continuing work. | When user sounds upset, tired, frustrated, discouraged, or asks for comfort/fun. |
| `user-profile-growth-style.md` | Active | Evolve durable user preferences, UI taste, hobbies, requirements, and work habits. | When user states stable preferences, recurring needs, hobbies, personality/tone preferences, or repeated corrections. |

## Role Behavior

| Skill | Status | Purpose | Read When |
|---|---|---|---|
| `role-host-style.md` | Active | Host responsibility: accept/correct 女助理 routing, risk gate, final loop check. | Before multi-step work, high-risk tasks, or final delivery checks. |
| `role-architect-style.md` | Active | Architecture role behavior for design, module boundaries, ADRs, tradeoffs. | Before architecture, refactor, module split, tech selection, or major feature planning. |
| `role-coder-style.md` | Active | Coder behavior and mandatory professional skill routing by code type. | Before writing or modifying code/config/tests. |
| `role-debugger-style.md` | Active | Debugger behavior, root-cause workflow, history reuse, debug report triggers. | Before debugging, fixing bugs, CI/build failures, regressions, or flaky tests. |
| `role-project-assistant-style.md` | Active | Project assistant behavior for `.ai_project.md`, `AGENTS.md`, `docs/`, Docs Index. | Before/after project file changes, docs changes, or project memory audits. |
| `role-rule-governor-style.md` | Active | Rule governor behavior for prompts, skills, user-skills, manifests, bundles. | Before modifying prompts, skills, user-skills, install docs, manifests, or distribution zips. |

## Workflow And Domain Preferences

| Skill | Status | Purpose | Read When |
|---|---|---|---|
| `project-memory-style.md` | Active | `.ai_project.md`, `AGENTS.md`, `docs/`, L0-L3 sync, Read When/Owner/Validation rules. | Before software project changes or project memory maintenance. |
| `debug-reuse-style.md` | Active | Reuse known issues and debug reports; decide when to write new reports. | Before debugging or after fixing durable/complex bugs. |
| `skill-router-style.md` | Active | Professional skill selection rules, conflicts, high-risk gates, minimal skill set. | Before any task that may need professional skills. |
| `ui-taste-style.md` | Active | UI polish, anti-generic taste, desktop/Web product visual expectations. | Before UI design, redesign, beautification, frontend screens, or visual QA. |
| `automation-boundary-style.md` | Active | When to auto-write/update, when to suggest, when to ask first. | Before actions that write files, update memory, run high-risk commands, or change persistent rules. |
| `product-context-style.md` | Active | User's main software context: API-driven desktop apps and Web apps. | Before architecture, UI, API, Tauri, backend, database, or product planning. |

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Expanded index for V5.0 user-skills core routing architecture. | User requested user-skills to guide roles, skills, project memory, debugging, and 女助理 persona. |
| 2026-05-30 | Added global path and self-repair rules for the user-skills index. | User clarified the index should be global and auto-completed when missing or incomplete. |
