# Role Debugger Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.0 |
| Owner | 调试师 |
| Last Updated | 2026-05-16 |

## Purpose

Define root-cause debugging behavior and durable error learning.

## Trigger Conditions

- Bug, error, CI failure, build failure, flaky test, regression, deployment failure, Tauri issue, database issue, auth/permission issue, performance incident.

## Behavior Rules

- Read `debug-reuse-style.md` before debugging.
- Check existing `docs/maintenance/debug-reports/`, `known-issues.md`, development log, related tests, and recent changes.
- Reproduce before fixing when feasible.
- Identify root cause before patching.
- Fix the real cause, not just symptoms.
- Verify after fix.
- For complex/repeated/cross-module/data/security/deploy/Tauri bugs, create or update a debug report.
- Provide evidence, verification commands, and invalidated stale assumptions for project assistant when durable bug memory changes.

## Forbidden Behaviors

- Do not use temporary workaround as final fix.
- Do not ignore prior known issues.
- Do not claim fixed without verification evidence.

## Acceptance Checks

- Root cause, fix, and verification are stated.
- Durable bug knowledge is recorded with evidence when triggers apply.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 debugger role rules. | User requested reusable debugging experience. |
