# Skill Router Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.2 |
| Owner | 女助理 + 主持人 |
| Last Updated | 2026-05-30 |

## Purpose

Route to professional skills without bloating the main prompt or preloading unnecessary skill bodies.

## Trigger Conditions

- Any task that may need professional skills.
- Code, UI, API, Tauri, database, backend, security, testing, deployment, debugging, prompt/skill governance, or project memory work.

## Core Rules

- Default behavior: do not load professional `SKILL.md` bodies at 女助理 stage.
- 女助理 recommends role chain and candidate skills only; 主持人 narrows the set.
- The active execution role owns professional skill loading:
  - 架构师 loads architecture/spec/API/database/UI planning skills.
  - 编码师 loads implementation, API, frontend, backend, database, Tauri, or test skills.
  - 调试师 loads debugging and verification skills.
  - 项目助手 loads project-memory/docs skills.
  - 规则师 loads prompt/skill governance skills.
- Select the smallest useful set: normally 1 main professional skill and up to 2 supporting skills.
- Do not load same-layer duplicate skills unless the task explicitly needs comparison.
- Prefer specialized skills over broad senior-role skills for focused tasks.
- Use broad skills only for new projects, whole-codebase review, scaffolding, or cross-layer architecture.
- High-risk skills need explicit relevance and command review: deploy, shadcn CLI, screenshot, browser automation, remote package CLIs, eval scripts, destructive commands.
- If a skill is useful but archived, mention the restore option instead of silently substituting a weaker workflow.

## Professional Skill Routing

| Task | Preferred Skills |
|---|---|
| Project memory | `project-assistant`, `docs-index-maintainer`, `project-sync-audit` |
| Source-first implementation | `source-driven-development`, `incremental-implementation` |
| Specs/plans | `spec-driven-development-pro`, `spec-driven-development`, `planning-and-task-breakdown` |
| UI design | `frontend-design-pro`, `ui-taste-pro`, `design-review-pro` |
| UI polish | `ui-polish-pro`, `ui-taste-pro`, `design-review-pro` |
| shadcn/ui | `shadcn` |
| React/Next performance | `vercel-react-best-practices` |
| Frontend engineering | `frontend-ui-engineering` |
| Figma | `figma-to-code` |
| API-driven app | `api-driven-app` |
| NewAPI/media gateway | `newapi`, `api-integration-specialist`, `api-driven-app`, `api-client` |
| Third-party API/OAuth/webhook | `api-integration-specialist`, `api-driven-app`, `api-connector-builder`, `api-client` |
| API contract | `api-design`, `api-driven-app` |
| Tauri | `tauri-pro`, `tauri` |
| Desktop native QA | `windows-desktop-e2e`, `tauri-pro`, `webapp-testing-pro` |
| Backend architecture | `backend-design`, `senior-backend` for broad/backend-wide work |
| Database/Postgres | `database-pro`, `postgresql-pro`, `database` |
| Security | `security-and-hardening`, `security-threat-model`, `security-review-pro` |
| Testing/debugging | `tdd-pro`, `testing`, `debugging-and-error-recovery`, `diagnose-pro` |
| Browser testing | `playwright`, `webapp-testing-pro`, `screenshot` |
| Performance | `performance-optimization` |
| CI/CD/deploy | `ci-cd-and-automation`, `deployment-patterns`, `ship-pro`, `release-packaging` |
| Observability | `sentry`, `production-readiness-pro`, `debugging-and-error-recovery` |
| Prompt/skill governance | `skill-governance`, `skill-distillation-pro`, `context-engineering-pro`, `yonghu-preferences` |

## Forbidden Behaviors

- Do not call UI skills for non-UI tasks.
- Do not call deployment skills unless the user requests deploy/hosting/publish/setup.
- Do not use user-skills as replacement for professional skills.
- Do not eagerly read professional skill bodies just because a task is broad; route first, load only after the active role is selected.

## Acceptance Checks

- Selected skills are necessary and sufficient.
- High-risk skill use is gated.
- Missing skills are reported with fallback.
- Professional skill bodies were loaded only by the execution role that needed them.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 professional skill router. | User requested skills routing to move out of main prompt. |
| 2026-05-30 | Trimmed routing to canonical active skills after archiving optional and duplicate skills under the 200-skill target. | User requested cleanup because 400+ installed skills were too many and largely redundant. |
| 2026-05-30 | Added role-owned, on-demand professional skill loading and restored NewAPI/media-product production routes. | User requested default non-autoload skills and role-based precise calling for lower context cost. |
