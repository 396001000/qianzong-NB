# Project Memory Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.1 |
| Owner | 项目助手 |
| Last Updated | 2026-05-16 |

## Purpose

Define user preferences for durable project memory and structured modular development.

## Trigger Conditions

- Before and after software project changes.
- When `.ai_project.md`, `AGENTS.md`, `docs/`, ADRs, debug reports, or development logs may need updates.

## Behavior Rules

- Favor structured, modular project development.
- Keep files preferably under 1000 lines.
- Maintain `.ai_project.md` as project index.
- Maintain `docs/` for detailed architecture, features, API, database, desktop, deployment, decisions, maintenance, roadmap, and changelog.
- Maintain `AGENTS.md` for project-level AI collaboration rules.
- Classify changes as L0/L1/L2/L3.
- Every durable record must include a future read path.
- New docs must be reflected in `.ai_project.md` Docs Index.

## L0-L3 Sync

| Level | Meaning | Action |
|---|---|---|
| L0 | No long-term project knowledge changed | State no update needed. |
| L1 | Small file/module/test/progress change | Update `.ai_project.md` if useful. |
| L2 | Feature/API/DB/Tauri/UI/test/docs addition | Update `.ai_project.md` and matching docs. |
| L3 | Architecture/security/deployment/permission/data migration/rule change | Update `.ai_project.md`, docs, and ADR. |

## Task-Specific Memory Rules

| Task | Minimum Sync | Required Memory |
|---|---|---|
| UI screen or visual redesign | L2 | `.ai_project.md` feature/status entry; `docs/features/` or UI/design doc when behavior or design system changes |
| API route, API client, webhook, OAuth | L2 | `docs/api/` contract, errors, auth, pagination/retry notes as relevant |
| Database schema, migration, index, transaction | L3 | `docs/database/` plus ADR if model, consistency, or migration strategy changes |
| Tauri command, permission, updater, native capability | L2/L3 | `docs/desktop/` and security/permission notes; ADR for permission model changes |
| Build, deploy, packaging, environment | L2/L3 | `docs/deployment/`, commands, rollback, env requirements |
| Bug fix | L1 | `.ai_project.md` risk/progress if useful; debug report for complex/repeated/cross-module issues |
| New module or directory | L2 | Directory/module boundary in `.ai_project.md`; docs if future developers need design context |
| Prompt, skill, user-skill, install package | L2 | `MANIFEST.md`/`SOURCES.md`/install docs as applicable; `.ai_project.md` current progress |
| Security/auth/permission change | L3 | Security notes, threat/risk record, ADR when model changes |

## Project Memory Final Report

For code, prompt, skill, docs, or project-file changes, final answer should include:

```markdown
项目记忆：
- 读取：...
- 更新：...
- 同步等级：L0/L1/L2/L3
- 复用入口：...
```

If no update is needed, state the reason:

```markdown
项目记忆：
- 未更新：L0，本次未改变可复用项目知识。
```

## Forbidden Behaviors

- Do not write meaningless logs.
- Do not create docs without `Read When`.
- Do not mix project-specific rules into cross-project user preferences.

## Acceptance Checks

- Project memory status is reported in final answer when relevant.
- Docs Index has correct paths and read conditions.
- Missing updates are explained.
- Task-specific memory rule was applied.
- Final answer includes sync level and reuse entry for meaningful changes.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 project memory style. | User requested stronger `.ai_project.md` / AGENTS / docs rules. |
| 2026-05-16 | Added task-specific memory rules and final report template. | User asked how to strengthen the automated closed loop. |
