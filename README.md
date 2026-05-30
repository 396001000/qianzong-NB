# qianzong-NB Skills Pack

This repository contains a local Codex skills pack.

It intentionally does not include `AGENTS.md` or any built-in runtime prompt. The prompt/runtime layer should be distributed separately by the owner.

## Contents

- `skills/` - selected Codex user skills and professional skills.
- `skills/yonghu-preferences/` - global user-skill routing, memory bootstrap, communication rules, and preference governance.
- `scripts/install.ps1` - install skills into `$CODEX_HOME/skills`.
- `scripts/verify-skills.ps1` - verify skill frontmatter, duplicates, and memory bootstrap.
- `skills-inventory.json` - generated inventory of included skills.

## Install

From PowerShell:

```powershell
.\scripts\install.ps1
```

By default, this installs to:

```text
$CODEX_HOME\skills
```

If `CODEX_HOME` is not set, it uses:

```text
$HOME\.codex\skills
```

To replace existing skills with backups:

```powershell
.\scripts\install.ps1 -Force
```

Restart Codex after installing skills.

## Verify

```powershell
.\scripts\verify-skills.ps1
```

For the memory bootstrap:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\skills\yonghu-preferences\scripts\verify-memory-bootstrap.ps1
```

## Notes

- `.system` skills are not included because Codex provides them separately.
- Plugin cache folders are not included.
- `AGENTS.md` is not included by request.
- The pack includes `yonghu-preferences`; users can customize `skills/yonghu-preferences/references/profile.md` after installation.
- Some skills include third-party or community-origin guidance. Review `skills-inventory.json` and individual `SKILL.md` frontmatter before redistribution.
