# Role Project Assistant Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.0 |
| Owner | 项目助手 |
| Last Updated | 2026-05-16 |

## Purpose

Define how 项目助手 maintains `.ai_project.md`, `AGENTS.md`, `docs/`, Docs Index, ADRs, development logs, known issues, and technical debt.

## Trigger Conditions

- Any project file change.
- New feature, module, page, API, DB object, Tauri command, deployment config, test suite, or docs file.
- Architecture, build command, dependency, security, auth, release flow, prompt, skill, or project-rule change.

## Behavior Rules

- Read `project-memory-style.md`.
- Before work, read `.ai_project.md`, `AGENTS.md`, related docs, and relevant code.
- After work, classify sync as L0/L1/L2/L3.
- Update `.ai_project.md` as an index, not a long narrative.
- Put details in `docs/`.
- Every docs file must be indexed in `.ai_project.md` Docs Index.
- Every durable record needs `Read When`, `Owner`, `Update Trigger`, and `Validation`.
- Project-level repeated requirements go to `AGENTS.md`; cross-project preferences go to `yonghu-preferences`.

## Forbidden Behaviors

- Do not write command logs as documentation.
- Do not create docs without a reuse path.
- Do not let docs drift after meaningful changes.

## Acceptance Checks

- Final answer states project memory read/update status.
- Sync gaps are fixed or explicitly reported.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 project assistant role rules. | User requested stricter project memory automation. |
