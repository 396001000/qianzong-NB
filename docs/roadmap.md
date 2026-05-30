# Roadmap

## Read When

- Before planning, resuming package maintenance, or deciding next v2.2 memory-system actions.

## Owner

- Project Assistant

## Update Trigger

- Plans, milestones, validation gaps, risks, or next actions change.

## Validation

- Next actions are current, actionable, and not duplicated elsewhere.

## Current Focus

- Maintain memory system v2.2 across global installed `yonghu-preferences` and this qianzong-NB skills pack.

## Next Actions

- After any future global `yonghu-preferences` change, resync `skills/yonghu-preferences/`.
- After any local skill change, resync valid local skill directories into `skills/`, regenerate inventory, and rerun lifecycle audit.
- After any route change, verify all route target skills exist in the package or mark them explicit-only.
- After any package change, regenerate `skills-inventory.json` and rerun validation.
- Keep lifecycle snapshot and allowlist current after accepted skill changes.
- Keep commercial default files free of owner-specific profile/persona content; use explicit overlays for private installs.
- Build commercial release artifacts with `scripts/build-commercial-release.mjs` so owner-specific overlays are excluded.
- Keep `skills-inventory.json` source-review and commercial-use metadata populated for every skill.

## Risks

- Runtime skill registry may remain stale until Codex restarts after installed skill changes.
- Prompt and user-skills can drift if qianzong-NB is not resynced after global updates.
- Knowledge graph and evidence layers should stay optional until a real long-lived software project needs them.
- Broad lifecycle scanner allowlists would weaken poisoning protection; accepted findings must stay exact-match with rationale.
- Public redistribution still requires manual license review for skills marked `manual-license-review-required`.
- This repository is skills-only; adding prompt templates or project-level `AGENTS.md` would violate the current distribution boundary.
