# Manifest

| Field | Value |
|---|---|
| Name | qianzong-NB |
| Type | Codex skills-only pack |
| Created | 2026-05-30 |
| Includes AGENTS.md | No |
| Includes built-in prompt/template | No |
| Includes `.system` skills | No |
| Includes plugin cache | No |
| Includes personal overlay | Optional, `overlays/qianzong-personal/` |
| Skill count | 143 |
| Primary macOS install path | `$HOME/.codex/skills` |
| Primary Windows install path | `$HOME\.codex\skills` |
| Memory system | v2.2 file-first closed loop |
| Memory maintenance | Optional idempotent setup for macOS launchd, Windows Task Scheduler, and project pre-push hooks |
| Commercial default profile | Yes, owner-specific preferences are excluded from default files |
| Commercial release artifact | Build with `scripts/build-commercial-release.mjs`; excludes `overlays/` |
| Skill source audit | `skills-inventory.json` includes source review, commercial use, and redistribution status |

## Required Validation

Run:

```bash
node scripts/verify-skills.mjs
```

macOS installer smoke check:

```bash
bash scripts/install-macos.sh --codex-home /tmp/qianzong-nb-install-test --force
```

Windows fallback:

```powershell
.\scripts\verify-skills.ps1
```

And for v2.2 memory governance:

```bash
node skills/yonghu-preferences/scripts/verify-memory-bootstrap.mjs
node skills/yonghu-preferences/scripts/verify-skill-routes.mjs
node skills/yonghu-preferences/scripts/audit-skill-lifecycle.mjs
node skills/yonghu-preferences/scripts/audit-memory-system.mjs --cwd .
node skills/yonghu-preferences/scripts/audit-project-memory.mjs --cwd .
node skills/yonghu-preferences/scripts/init-project-memory.mjs --cwd . --dry-run
node skills/yonghu-preferences/scripts/setup-project-maintenance.mjs --cwd . --dry-run
bash scripts/setup-memory-maintenance-macos.sh --codex-home /tmp/qianzong-nb-install-test --dry-run
node scripts/audit-commercial-content.mjs
node scripts/audit-skill-sources.mjs
node scripts/build-commercial-release.mjs --out /tmp/qianzong-NB-commercial --force
node scripts/audit-commercial-content.mjs --root /tmp/qianzong-NB-commercial --no-require-overlay
```

Expected result:

```json
{
  "ok": true
}
```
