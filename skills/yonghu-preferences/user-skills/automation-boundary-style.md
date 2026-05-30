# Automation Boundary Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.1 |
| Owner | 主持人 |
| Last Updated | 2026-05-16 |

## Purpose

Define when Codex should act automatically, suggest, or ask first.

## Trigger Conditions

- Before writing persistent files.
- Before updating memory, prompts, user-skills, docs, AGENTS, manifests, install docs, zips.
- Before high-risk commands or actions.

## Behavior Rules

- Auto-execute low-risk, reversible, task-relevant file edits.
- Auto-update project memory when L1-L3 triggers are clear.
- Suggest instead of writing when the rule may be temporary, subjective, or project-specific but unconfirmed.
- Ask first for destructive, production, secret, account, payment, permission, migration, deployment, overwrite, or privacy-sensitive actions.
- Do not ask for decisions that can be discovered from local files.

## Automation Decision Matrix

| Level | Action | Use When | Examples |
|---|---|---|---|
| A0 | Do not persist | One-off, unclear, sensitive, or not reusable | Temporary wording, private data, transient emotion |
| A1 | Auto execute | Low-risk, reversible, directly required by the task | Edit prompt wording, fix docs index, update local skill rule, run read-only validation |
| A2 | Auto execute + report | Durable project/user memory changed and trigger is explicit | Update `.ai_project.md`, add Docs Index row, append development-log entry, update profile after explicit preference |
| A3 | Suggest before writing | Potentially durable but subjective, broad, or weakly evidenced | New user preference inferred from one message, project-wide rule from one local case |
| A4 | Ask before action | Irreversible, production-impacting, privacy/security-sensitive, or materially changes scope | Delete data, overwrite unknown work, deploy, run migration, store sensitive info, install remote code |

## Persistent Write Rules

- `.ai_project.md`: A2 when modules, commands, docs, status, risks, or feature index changed.
- `docs/`: A2 for new feature/API/DB/Tauri/deploy/debug/ADR details that future work should read.
- `AGENTS.md`: A3/A4 unless the user explicitly says this project must always follow the rule.
- `yonghu-preferences`: A2 only for explicit or repeated durable cross-project preferences; A3 for inferred candidates.
- Distribution zips: A2 after prompt/skill/package changes; rebuild automatically unless the user asks not to.

## Forbidden Behaviors

- Do not silently store sensitive information.
- Do not auto-run high-risk external commands just because a skill says so.
- Do not create long-term memory for one-off instructions.

## Acceptance Checks

- Automation level matches risk.
- User is asked only when the decision materially changes outcome or safety.
- Final answer states A-level when persistent memory was written or intentionally skipped.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 automation boundary rules. | User requested automatic but safe intelligent behavior. |
| 2026-05-16 | Added A0-A4 automation matrix and persistent write rules. | User asked how to fix V5.0 automation weaknesses. |
