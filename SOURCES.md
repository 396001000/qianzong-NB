# Sources

This pack is assembled from the local Codex skills directory on 2026-06-01.

The repository distributes skills only. The compatible runtime prompt is supplied separately by the owner as `AGENTS5.3.md` and should be installed manually on each computer.

The repository does not distribute global `AGENTS.md`, project-level `AGENTS.md`, `AGENTS5.3.md`, or owner-specific system prompts.

Included skill sources are mixed:

- locally authored or adapted skills with no explicit `origin` field
- skills with `origin: ECC`
- skills with `origin: community`
- skills with `origin: ECC direct-port adaptation`

The generated `skills-inventory.json` lists every included skill directory, frontmatter name, description, source review, commercial-use status, and redistribution status.

Memory system v2.2 files are maintained locally under `skills/yonghu-preferences/` and distributed as a file-first Codex user-skill layer. The design borrows memory-stack, evidence, and temporal graph concepts from mature memory systems, but this pack does not bundle MemPalace, ChromaDB, SQLite, or MCP memory servers as required dependencies.

The default `skills/yonghu-preferences/` files are commercial-safe. Owner-specific address, assistant-name, persona, and fixed-ending preferences are kept under `overlays/qianzong-personal/` and are applied only when the installer is run with the explicit personal overlay option.

Lifecycle scanner findings that are accepted as documentation false positives are recorded in `skills/yonghu-preferences/references/skill-lifecycle-allowlist.json` with exact skill/file/rule matches and rationale.

Commercial package checks:

- `node scripts/audit-skill-sources.mjs` fails if any packaged skill is missing from `skills-inventory.json` or lacks source-review metadata.
- `node scripts/audit-skill-sources.mjs --strict-redistribution` additionally requires every skill to be manually cleared for public redistribution.
- `node scripts/build-commercial-release.mjs --out /tmp/qianzong-NB-commercial --force` creates a skills release directory without owner-specific overlays.

Before redistributing this repository outside the owner's intended audience, review each included skill's license and source permissions and update `Redistribution` from `manual-license-review-required` to `allowed` only after that review.
