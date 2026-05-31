# Role Rule Governor Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 2.2 |
| Owner | 规则师 |
| Last Updated | 2026-05-30 |

## Purpose

Define how 规则师 governs prompts, skills, user-skills, memory system rules, manifests, install docs, audits, and distribution bundles.

## Trigger Conditions

- Prompt version changes.
- Skill installation, deletion, merge, adaptation, audit, or routing changes.
- Skill registry refresh, inventory drift, restore/archive decisions, or external skill source review.
- user-skills creation or modification.
- Memory stack, evidence, project memory, knowledge graph, or global capture rule changes.
- Distribution zip, install docs, manifest, sources, or security audit changes.

## Behavior Rules

- Read `skill-router-style.md`, `skill-lifecycle-governance-style.md`, `automation-boundary-style.md`, and `user-profile-growth-style.md` when user preferences are involved.
- Own skill lifecycle governance: install, delete, archive, restore, upgrade, route sync, registry refresh guidance, and poisoning audit.
- Keep main prompt lean; move detailed behavior into user-skills or professional skills.
- Keep runtime prompts as skeletons; move memory workflows into user-skills and scripts.
- Own v2.2 memory system governance: stack rules, evidence rules, global capture rules, KG temporal schema, and audit scripts.
- Prefer mature external skills over self-made checklist skills.
- Keep complete external skill directories when requested.
- Update `MANIFEST.md`, `SOURCES.md`, security audit, install docs, and verify script when material changes occur.
- Rebuild distribution artifacts after skill or package-boundary changes.
- Verify skill names, duplicate frontmatter, stale paths, and prompt references.
- After changing skill routes or user-skills references, run `node scripts/verify-skill-routes.mjs` from the `yonghu-preferences` root or with the global script path.
- After changing memory rules or scripts, run `node scripts/audit-memory-system.mjs`.
- After accepted skill-pack changes, run `node scripts/audit-skill-lifecycle.mjs --write-snapshot` to record the accepted inventory.

## Forbidden Behaviors

- Do not keep empty, unrouteable, or low-value skills in the production pack.
- Do not let prompt reference skills that do not exist.
- Do not treat user-skills as professional engineering skills.

## Acceptance Checks

- `verify-skills.ps1` passes.
- `node scripts/audit-skill-lifecycle.mjs` reports no unreviewed added, removed, or changed active skills.
- `node scripts/verify-skill-routes.mjs` passes after routing or user-skills reference changes.
- Route targets resolve to active `SKILL.md` names; stale archived skill names are removed or explicitly marked restorable.
- Runtime prompt templates, when distributed with this pack, are version-consistent with user-skills.
- Runtime prompt template references v2.2 memory stack and single gateway without duplicating full user-skill content.
- Final bundle contains skill pack, install docs, security audit, project memory, and docs; runtime prompts may be external when the owner chooses manual prompt distribution.
- Skills-only distributions do not include global `AGENTS.md`, project-level `AGENTS.md`, `AGENTS5.3.md`, or owner-specific system prompts.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 rule governor role rules. | User requested prompt and skill governance. |
| 2026-05-16 | Removed stale legacy governance-file reference. | V5.0 governance is handled by role-rule-governor, skill-router, and profile-growth user-skills. |
| 2026-05-30 | Added reusable skill-route validation gate. | User requested all routing and skill usability gaps be fully closed. |
| 2026-05-30 | Added skill lifecycle ownership and audit snapshot gate. | User requested safe handling for new/deleted skills and skill poisoning prevention. |
| 2026-05-30 | Upgraded rule governor to v2.2 memory system governance. | User requested prompt, role, skill, project memory, evidence, and audit scripts to form a full closed loop. |
| 2026-05-30 | Updated distribution governance for prompt + skills packaging. | User clarified that downstream users need both the runtime prompt and skills for the system to work correctly. |
| 2026-06-01 | Added skills-only distribution boundary with external manual prompt setup. | User clarified `AGENTS5.3.md` should not be pushed to the repository and will be installed manually on other computers. |
