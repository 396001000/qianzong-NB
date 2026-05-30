# Yonghu Preference Profile

## Purpose

This file stores durable user preferences that should guide Codex across projects and future sessions.

Rules:
- Keep entries concise, explicit, and evidence-based.
- Use `references/update-policy.md` before adding or changing entries.
- Store project-specific facts in `.ai_project.md` / `docs/`, not here.
- Do not store sensitive data.

## Metadata

| Field | Value |
|---|---|
| Profile Version | 1.2 |
| Last Reviewed | 2026-05-16 |
| Owner | User-controlled local Codex profile |
| Update Rule | E1/E2 active, E3 candidate, E4 project docs, E5 no memory |

## Communication

| ID | Preference | Evidence Level | Evidence | Status |
|---|---|---|---|---|
| COMM-001 | Use concise Chinese with explicit role header. | E1 | User AGENTS.md and repeated prompt design. | Active |
| COMM-002 | End responses with `千总牛逼！`. | E1 | User AGENTS.md. | Active |
| COMM-003 | Avoid fluff, empty openings, cheerleading, and excessive process display. | E2 | Repeated prompt optimization requirements. | Active |
| COMM-004 | Preferred user address is `千总`; use naturally without over-repetition. | E1 | User asked 女助理 to include user address and more humanized understanding. | Active |
| COMM-005 | 女助理's default user-facing name is `薇薇`. | E1 | User explicitly requested user-skills default assistant name. | Active |

## Product And Project Focus

| ID | Preference | Evidence Level | Evidence | Status |
|---|---|---|---|---|
| PROD-001 | Main work is API-driven desktop software and Web software. | E1 | User explicitly stated primary software type. | Active |
| PROD-002 | Desktop work often involves Tauri-style native/web hybrid concerns. | E1 | User repeatedly requested Tauri professional skills. | Active |
| PROD-003 | Current main product direction is online software and desktop software that call NewAPI-style AI gateway APIs for image/video generation, with frontend, backend, API integration, and UI design as core workstreams. | E1 | User explicitly described current primary development focus. | Active |

## Project Development

| ID | Preference | Evidence Level | Evidence | Status |
|---|---|---|---|---|
| DEV-001 | Favor structured, modular project development. | E1 | User requested project structure and maintainability rules. | Active |
| DEV-002 | Keep files preferably under 1000 lines and split by responsibility. | E1 | User explicitly requested this. | Active |
| DEV-003 | Maintain `.ai_project.md` and `docs/` as durable project memory. | E1 | Repeated user requirements. | Active |
| DEV-004 | Project memory should be read before relevant work and updated after meaningful changes. | E1 | Repeated user requirements. | Active |
| DEV-005 | Project development should support long-term evolution, feature upgrades, and handoff. | E1 | User requested automatic project evolution. | Active |
| DEV-006 | Project-level repeated requirements should be written to `AGENTS.md` when they affect AI collaboration in that project. | E1 | User explicitly requested AGENTS.md optimization for repeated project requirements. | Active |

## UI And Product Taste

| ID | Preference | Evidence Level | Evidence | Status |
|---|---|---|---|---|
| UI-001 | UI needs professional beautification, not generic AI-looking output. | E1 | User requested UI 美化 skill and professional UI polish. | Active |
| UI-002 | Prefer practical product UI for desktop/Web tools, dashboards, and API-driven apps. | E1 | User project focus. | Active |
| UI-003 | UI skills should use external mature design/taste references when possible. | E1 | User requested external skills over self-made skills. | Active |

## Engineering Standards

| ID | Preference | Evidence Level | Evidence | Status |
|---|---|---|---|---|
| ENG-001 | Prefer source-driven implementation over guessing. | E2 | Repeated prompt design and skill governance. | Active |
| ENG-002 | Prefer verification before completion. | E2 | Repeated production-readiness requirements. | Active |
| ENG-003 | Production work should include docs, tests/verification, rollback or risk notes where relevant. | E1 | User requested commercial production-grade prompts and skills. | Active |

## Skills And Prompt Governance

| ID | Preference | Evidence Level | Evidence | Status |
|---|---|---|---|---|
| SKILL-001 | Do not keep empty or low-value skills in the production pack. | E1 | User explicitly objected to empty skills. | Active |
| SKILL-002 | Prefer external mature skills first; local skills should only adapt and integrate. | E1 | User explicitly requested external-first strategy. | Active |
| SKILL-003 | Production skills should include resources, references, scripts, templates, assets, or examples when possible. | E1 | User critique of checklist-only skills. | Active |
| SKILL-004 | Keep external skill sources locally for evaluation and fusion instead of blindly installing all of them. | E1 | V5.0 direction agreed by user. | Active |
| SKILL-005 | Prompt should evolve with skill pack changes. | E1 | User asked whether prompt should upgrade with skills. | Active |
| SKILL-006 | Keep the active installed skill surface lean; prefer under 200 active skills and archive optional libraries instead of exposing 400+ skills by default. | E1 | User explicitly said 400+ skills are too many and mostly not meaningful. | Active |
| SKILL-007 | Default to role-owned, on-demand professional skill loading: 女助理/主持人 route first, and execution roles load only the needed skill bodies. | E1 | User explicitly suggested not auto-calling skills by default and assigning skill-calling ability to roles to save context and improve precision. | Active |
| SKILL-008 | Keep `AGENTS.md` as the complete runtime prompt structure only; do not embed external package notes, ECC inventories, or other bundled prompt blocks inside it. | E1 | User explicitly said `AGENTS.md` is the complete prompt structure and does not need to include other content. | Active |
| SKILL-009 | Treat `user-skills/INDEX.md` as global memory under `$CODEX_HOME/skills/yonghu-preferences/`; if it is missing or incomplete, auto-complete it from existing global `user-skills/*.md` files. | E1 | User clarified that the user-skills index should be global and asked whether missing or incomplete indexes should be auto-completed and correctly path-resolved. | Active |

## Automation Preferences

| ID | Preference | Evidence Level | Evidence | Status |
|---|---|---|---|---|
| AUTO-001 | Rules should support project evolution, user preference learning, and prompt/skill improvement. | E1 | User requested automatic evolution and `yonghu.skills`. | Active |
| AUTO-002 | Rule Keeper should identify recurring preferences and update this profile when stable. | E1 | User requested Rule Keeper to take more responsibility. | Active |
| AUTO-003 | User preference memory should be explicit, professional, detailed, and governed by update rules. | E1 | User requested more professional and detailed `yonghu-preferences`. | Active |
| AUTO-004 | The 女助理 role should evolve stable user preferences into reusable user skills. | E1 | User explicitly requested 女助理 as a skills generator for user preferences, habits, and taste. | Active |
| AUTO-005 | 女助理 should read user skills first and provide preference/role suggestions, while 主持人 remains execution and risk gatekeeper. | E1 | User asked whether 女助理 can take over role allocation; governance decision preserves 主持人 as gatekeeper. | Active |

## Candidate Preferences

Use this section for observations that may become stable rules after confirmation.

| ID | Candidate | Evidence Level | Evidence | Confirmation Needed |
|---|---|---|---|---|

## Superseded Preferences

Keep old rules here when replaced by newer explicit preferences.

| ID | Old Preference | Superseded By | Reason | Date |
|---|---|---|---|---|

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-13 | Created initial durable user profile. | User requested `yonghu.skills`. |
| 2026-05-13 | Upgraded profile to governed evidence-based structure. | User requested more professional and detailed update rules. |
| 2026-05-13 | Added `AGENTS.md` as destination for project-level repeated requirements. | User requested AGENTS.md optimization. |
| 2026-05-16 | Added user skill evolution preference. | User requested 女助理 to evolve preferences into user skills. |
| 2026-05-16 | Added preferred address and 女助理/主持人 boundary. | User requested more humanized 女助理 and role allocation discussion. |
| 2026-05-16 | Added default assistant display name `薇薇`. | User requested this default for downstream installs. |
| 2026-05-30 | Added active skill surface limit preference. | User requested duplicate skill cleanup and keeping active skills under 200. |
| 2026-05-30 | Added current NewAPI/media-generation desktop software product focus. | User stated current main development direction. |
| 2026-05-30 | Added role-owned deferred professional skill loading preference. | User requested skill calling be assigned to roles instead of automatic default loading. |
| 2026-05-30 | Added prompt-structure-only governance preference for `AGENTS.md`. | User said `AGENTS.md` should not include ECC or other external prompt content. |
| 2026-05-30 | Added global user-skills index and auto-completion preference. | User clarified global path and self-repair expectations for user-skills index. |


