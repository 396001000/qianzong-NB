# Development Log

## Read When

- Before handoff, project review, or resuming old work.

## Owner

- Project Assistant

## Update Trigger

- Meaningful project state, architecture, feature, release, or docs changes.

## Validation

- Entries are durable summaries, not raw command logs.

## Log

- 2026-05-30: Implemented memory system v2.2 package support: synced `skills/yonghu-preferences/`, initialized project memory, added evidence-layer files, added missing route-target skills, and created Node package verification. Validation is tracked through `docs/memory/evidence/index.jsonl`.
- 2026-05-30: Hardened the commercial closed loop: package verification now includes lifecycle audit, commercial-content lint, route checks, memory-system audit, and project-memory evidence hash checks; default owner-specific profile/persona content moved into `overlays/qianzong-personal/`.
- 2026-05-30: Closed review gaps for commercial readiness: lifecycle snapshot writes are blocked on unreviewed suspicious findings, personal overlays require forced backup installs, source-review metadata is audited, release artifacts exclude overlays, and project-memory index coverage includes JSON and JSONL files.
- 2026-05-30: Fixed global memory routing for projectless explicit preference requests: `resolve-memory-context.mjs` now routes "remember/default/future preference" tasks to global memory while keeping explicit project-memory tasks routed to project docs.
- 2026-05-30: Added `init-project-memory.mjs` as the single conversational entrypoint for "初始化本项目"; it runs pre-audit, initializes missing project memory files, writes the retrieval summary, and re-runs final project memory audit.
- 2026-05-30: Updated the repository as a skills-only package: synced all valid local skill directories, skipped the empty non-skill local runtime directory, removed built-in prompt distribution, added macOS installer usage, and kept Windows installer usage documented.
- 2026-05-30: Added idempotent memory maintenance setup across macOS and Windows: global launchd/Task Scheduler setup scripts, project maintenance config, pre-push hook setup, and `init-project-memory.mjs --setup-maintenance`.
