# Skill Router Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.5 |
| Owner | 女助理 + 主持人 |
| Last Updated | 2026-05-31 |

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
| Project context | `project-context`, `source-driven-development-pro`, `project-maintenance` |
| Project memory | `project-assistant`, `project-maintenance`, `project-sync-audit` |
| Project evolution | `project-evolution`, `documentation-and-adrs`, `production-readiness-pro` |
| Source-first implementation | `source-driven-development-pro`, `source-driven-development`, `incremental-implementation-pro` |
| Specs/plans | `spec-driven-development-pro`, `planning-and-task-breakdown` |
| Architecture review/refactor | `architecture-review-pro`, `backend-design`, `code-simplification-pro` |
| Code review | `code-review`, `architecture-review-pro`, `security-review-pro` |
| Docs/ADR | `docs-rules`, `documentation-and-adrs`, `docs-index-maintainer` |
| UI design | `frontend-design-pro`, `ui-taste-pro`, `anthropic-frontend-design` |
| UI implementation | `frontend`, `anthropic-frontend-design`, `frontend-design-pro` |
| UI polish | `ui-polish-pro`, `ui-taste-pro`, `design-review-pro` |
| UI motion / React animation | `gsap-react`, `frontend`, `ui-polish-pro` |
| UI accessibility | `accessibility`, `web-design-guidelines`, `frontend-design-pro` |
| UI redesign | `redesign-existing-projects`, `ui-polish-pro`, `design-review-pro` |
| Visual mockup/image-to-code | `imagegen-frontend-web`, `imagegen-frontend-mobile`, `image-to-code` |
| shadcn/ui | `shadcn` |
| React/Next performance | `vercel-react-best-practices`, `performance` |
| Frontend engineering | `frontend`, `frontend-design-pro`, `data-fetching-state` |
| Web app | `web-app`, `auth-integration`, `data-fetching-state` |
| Desktop app | `desktop-app`, `tauri-pro`, `api-driven-app` |
| Figma usage | `figma-use`, `figma-to-code`, `figma-implement-design` |
| Figma design/library | `figma-generate-design`, `figma-generate-library`, `figma-create-design-system-rules` |
| Figma code connect | `figma-code-connect-components`, `figma-use` |
| API-driven app | `api-driven-app`, `data-fetching-state`, `error-handling` |
| NewAPI/media gateway | `newapi`, `api-integration-specialist`, `api-driven-app`, `api-client` |
| Third-party API/OAuth/webhook | `api-integration-specialist`, `api-driven-app`, `api-connector-builder`, `api-client` |
| API contract/interface | `api-and-interface-design`, `api-design`, `api-driven-app` |
| Auth/session | `auth-integration`, `security-review-pro`, `api-driven-app` |
| Data fetching/state | `data-fetching-state`, `frontend`, `api-driven-app` |
| Backend implementation | `backend`, `backend-design`, `senior-backend` |
| Backend architecture | `backend-design`, `senior-backend`, `architecture-review-pro` |
| Tauri | `tauri-pro`, `tauri`, `desktop-app` |
| Desktop native QA | `windows-desktop-e2e`, `tauri-pro`, `webapp-testing-pro` |
| Database/Postgres | `database-pro`, `postgresql-pro`, `supabase-postgres-best-practices` |
| Migration/deprecation | `migration-deprecation-pro`, `deprecation-and-migration`, `database-pro` |
| Security review | `security-review-pro`, `security-threat-model`, `security-best-practices` |
| Security scanning | `security-scan`, `security-bounty-hunter`, `security-review-pro` |
| Testing/TDD | `tdd-pro`, `testing`, `e2e-testing` |
| Debugging/error recovery | `diagnose-pro`, `debugging-and-error-recovery`, `error-handling` |
| Browser testing | `playwright`, `playwright-interactive`, `browser-testing-with-devtools` |
| UI/browser QA | `webapp-testing-pro`, `anthropic-webapp-testing`, `screenshot` |
| Performance | `performance`, `vercel-react-best-practices`, `latency-critical-systems` |
| CI/CD/deploy | `ci-cd-and-automation`, `devops`, `deployment-patterns` |
| Provider deploy | `cloudflare-deploy`, `vercel-deploy`, `netlify-deploy`, `render-deploy` |
| Release packaging | `release-packaging`, `ship-pro`, `production-readiness-pro` |
| Release QA | `qa-pro`, `production-readiness-pro`, `webapp-testing-pro` |
| Observability | `sentry`, `production-readiness-pro`, `debugging-and-error-recovery` |
| Git workflow | `git-workflow-and-versioning`, `github-ops` |
| GitHub operations | `github-ops` |
| Structured text parsing | `regex-vs-llm-structured-text` |
| Prompt/skill governance | `skill-governance`, `anthropic-skill-creator`, `skill-distillation-pro`, `yonghu-preferences` |
| Context engineering | `context-engineering-pro`, `yonghu-preferences`, `project-context` |

## Forbidden Behaviors

- Do not call UI skills for non-UI tasks.
- Do not call `gsap-react` for ordinary static UI design; use it only for React/Next.js animation implementation, GSAP, ScrollTrigger, timeline animation, parallax, complex interaction motion, or animation cleanup/debugging.
- Do not call deployment skills unless the user requests deploy/hosting/publish/setup.
- Do not use user-skills as replacement for professional skills.
- Do not eagerly read professional skill bodies just because a task is broad; route first, load only after the active role is selected.

## Acceptance Checks

- Selected skills are necessary and sufficient.
- High-risk skill use is gated.
- Missing skills are reported with fallback.
- Professional skill bodies were loaded only by the execution role that needed them.
- After changing routes, `node scripts/verify-skill-routes.mjs` passes and every route target resolves to an active `SKILL.md` name.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 professional skill router. | User requested skills routing to move out of main prompt. |
| 2026-05-30 | Trimmed routing to canonical active skills after archiving optional and duplicate skills under the 200-skill target. | User requested cleanup because 400+ installed skills were too many and largely redundant. |
| 2026-05-30 | Added role-owned, on-demand professional skill loading and restored NewAPI/media-product production routes. | User requested default non-autoload skills and role-based precise calling for lower context cost. |
| 2026-05-30 | Routed away from archived duplicate and incompatible skills, preferring `*-pro` and qianzong-NB core skills. | User approved cleanup to keep stronger usable skills as default routes. |
| 2026-05-30 | Added explicit UI implementation route to `anthropic-frontend-design` for generated web interfaces. | User asked whether UI generation can intelligently call UI skills. |
| 2026-05-30 | Filled specialist routing gaps for review, docs, accessibility, Figma, deploy providers, app state, release QA, migrations, and project context. | User requested all identified routing gaps be completed. |
| 2026-05-30 | Added reusable route-target validation as an acceptance check. | User requested all routing and skill usability gaps be fully closed. |
| 2026-05-31 | Added narrow `gsap-react` route for React/Next.js interaction animation without making ordinary UI design auto-load animation skills. | User installed GSAP React skill and requested role-trigger integration. |
