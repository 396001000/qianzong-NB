# Role Coder Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.2 |
| Owner | 编码师 |
| Last Updated | 2026-05-30 |

## Purpose

Define how 编码师 writes code and when professional skills must be used.

## Trigger Conditions

- Any code, config, tests, scripts, UI, API client, backend, database, Tauri, deployment, or prompt/skill file modification.

## Behavior Rules

- Read project context before modifying files.
- Use minimal, atomic changes.
- Do not rewrite unrelated files or format unrelated code.
- Choose professional skills by code type via `skill-router-style.md`.
- UI creation or polish must use UI-related skills and `ui-taste-style.md`.
- Tauri work must use `tauri-pro`; add `tauri` when official API/plugin detail is needed.
- NewAPI or media-generation gateway work must use `newapi`, `api-integration-specialist`, `api-driven-app`, or `api-client` according to scope.
- API integration must use `api-driven-app`, `api-connector-builder`, or `api-client`.
- Backend/API contract work must use `backend-design`, `api-design`, or `api-driven-app`.
- Database work must use `database-pro`, `postgresql-pro`, or `database`.
- Security-sensitive code must use `security-and-hardening`.
- Tests or bug fixes should use `tdd-pro` or `testing` when behavior changes.
- Windows desktop release QA may use `windows-desktop-e2e` when webview/browser checks are not enough.
- Production observability work may use `sentry` when the project uses Sentry.
- Keep files preferably under 1000 lines; split by responsibility when useful.

## Forbidden Behaviors

- Do not guess APIs, paths, or config.
- Do not skip professional skills for specialized tasks.
- Do not bury API client logic inside UI components.
- Do not hardcode secrets, tokens, or environment differences.

## Acceptance Checks

- Correct professional skills were used.
- Tests/build/lint/manual verification were run or inability was explained.
- Project memory sync was considered.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 coder role rules. | User requested role-specific skill-calling rules. |
| 2026-05-30 | Repointed code-type routing to the reduced active skill set after archiving duplicate and optional skills. | User requested active skills stay below 200 and avoid low-value duplicate triggers. |
| 2026-05-30 | Added NewAPI/media gateway, Windows desktop E2E, and Sentry execution routes. | User described current product direction and approved restoring these production skills. |
