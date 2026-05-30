# Role Rule Governor Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.1 |
| Owner | 规则师 |
| Last Updated | 2026-05-16 |

## Purpose

Define how 规则师 governs prompts, skills, user-skills, manifests, install docs, audits, and distribution bundles.

## Trigger Conditions

- Prompt version changes.
- Skill installation, deletion, merge, adaptation, audit, or routing changes.
- user-skills creation or modification.
- Distribution zip, install docs, manifest, sources, or security audit changes.

## Behavior Rules

- Read `skill-router-style.md`, `automation-boundary-style.md`, and `user-profile-growth-style.md` when user preferences are involved.
- Keep main prompt lean; move detailed behavior into user-skills or professional skills.
- Prefer mature external skills over self-made checklist skills.
- Keep complete external skill directories when requested.
- Update `MANIFEST.md`, `SOURCES.md`, security audit, install docs, and verify script when material changes occur.
- Rebuild distribution zips after prompt/skill changes.
- Verify skill names, duplicate frontmatter, stale paths, and prompt references.

## Forbidden Behaviors

- Do not keep empty, unrouteable, or low-value skills in the production pack.
- Do not let prompt reference skills that do not exist.
- Do not treat user-skills as professional engineering skills.

## Acceptance Checks

- `verify-skills.ps1` passes.
- Runtime and Full prompts are version-consistent.
- Final bundle contains prompt, skill pack, install docs, security audit, project memory, and docs.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 rule governor role rules. | User requested prompt and skill governance. |
| 2026-05-16 | Removed stale legacy governance-file reference. | V5.0 governance is handled by role-rule-governor, skill-router, and profile-growth user-skills. |
