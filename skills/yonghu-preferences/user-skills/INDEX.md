# User Skills Index

This directory stores evolved user skills: durable, executable preferences and routing rules that help Codex work in the user's preferred way.

User skills are not professional market skills. They are a routing and behavior layer: how to choose roles, when to call professional skills, how to maintain project memory, how to reuse debugging experience, and how 女助理 should remain useful without bloating the runtime prompt.

## Core Rules

- This index is global user memory and routing context. It lives under `$CODEX_HOME/skills/yonghu-preferences/user-skills/`, not inside an individual project.
- Every turn starts by reading this index, `routing-core.md`, and `communication-style.md`.
- Use `memory-reliability-style.md` as the single managed memory gateway whenever global memory, project memory, or project root discovery is involved.
- Use `memory-stack-style.md` to choose L0-L3 read depth and avoid loading more memory than the turn needs.
- Use `memory-evidence-style.md` whenever durable project memory or knowledge graph entries need evidence, source hashes, invalidation, or superseding.
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

If this file is unavailable, first try the global path resolution rules in `routing-core.md`. On macOS, if it is incomplete, run:

```bash
node scripts/verify-memory-bootstrap.mjs --repair
```

On Windows, use the PowerShell fallback:

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
| `persona-style.md` | Active | 女助理 lightweight persona: warm, concise, and professionally efficient. | Every turn where tone/persona matters; always before emotionally sensitive replies. |
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
| `project-agents-style.md` | Active | Project `AGENTS.md` rules-only generation, refresh, audit, and maintenance boundary. | When creating, refreshing, auditing, or maintaining project `AGENTS.md`, or when project-local rules, user requirements, safety gates, or verification gates change. |
| `memory-stack-style.md` | Active | L0-L3 memory read stack, context budget, and downgrade/upgrade rules. | Every non-trivial turn before project docs, knowledge graph, or professional skill reads. |
| `memory-evidence-style.md` | Active | Evidence, source hash, invalidation, superseding, and verification rules for durable memory. | Before writing durable project memory, docs, debug reports, ADRs, roadmap items, or KG nodes/edges. |
| `knowledge-graph-memory-style.md` | Active | Normalized project knowledge graph activation, schema, ownership, and update rules. | When project work may need relationship lookup, impact analysis, long-term continuity, or cross-layer memory. |
| `memory-reliability-style.md` | Active | Single gateway that keeps global memory and project memory separate. | When resolving global/project memory, project roots, or memory bootstrap repair. |
| `global-memory-capture-style.md` | Active | Active/passive global memory capture with write gates and final-response memory status. | Every non-trivial turn before final response; always when user asks to remember or sets defaults. |
| `debug-reuse-style.md` | Active | Reuse known issues and debug reports; decide when to write new reports. | Before debugging or after fixing durable/complex bugs. |
| `skill-router-style.md` | Active | Professional skill selection rules, conflicts, high-risk gates, minimal skill set. | Before any task that may need professional skills. |
| `skill-lifecycle-governance-style.md` | Active | Govern installs, deletions, registry refreshes, routing sync, lifecycle audit, and skill poisoning checks. | Before installing, deleting, archiving, restoring, updating, auditing, or routing skills. |
| `ui-taste-style.md` | Active | UI polish, anti-generic taste, desktop/Web product visual expectations. | Before UI design, redesign, beautification, frontend screens, or visual QA. |
| `automation-boundary-style.md` | Active | When to auto-write/update, when to suggest, when to ask first. | Before actions that write files, update memory, run high-risk commands, or change persistent rules. |
| `product-context-style.md` | Active | User's main software context: API-driven desktop apps and Web apps. | Before architecture, UI, API, Tauri, backend, database, or product planning. |

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Expanded index for V5.0 user-skills core routing architecture. | User requested user-skills to guide roles, skills, project memory, debugging, and 女助理 persona. |
| 2026-05-30 | Added global path and self-repair rules for the user-skills index. | User clarified the index should be global and auto-completed when missing or incomplete. |
| 2026-05-30 | Added single memory gateway and macOS Node repair script routing. | User requested one memory entry and correct separation of global/project memory across multiple projects on macOS. |
| 2026-05-30 | Added skill lifecycle governance routing. | User requested safe handling for new/deleted skills and protection against skill poisoning. |
| 2026-05-30 | Added active/passive global memory capture routing. | User identified incomplete global memory as a serious defect. |
| 2026-05-30 | Added knowledge graph memory activation routing. | User asked 女助理 to decide when knowledge graph is needed for software development and long-term project updates. |
| 2026-05-30 | Added v2.2 memory stack and evidence routing. | User requested a complete closed-loop memory system with correct read, write, invalidation, verification, and reuse. |
| 2026-05-31 | Added project `AGENTS.md` rules-only governance routing. | User clarified project `AGENTS.md` should store project-local rules and user requirements, not project structure, roadmap, or long docs. |
