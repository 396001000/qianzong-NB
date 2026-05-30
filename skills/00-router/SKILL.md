---
name: router
description: Route user requests to the right Codex role, output mode, and minimal skill set. Use for every task before deciding whether the answer is simple consultation, architecture, coding, debugging, review, documentation, or rule maintenance.
---

# Router

## Goal

Choose the smallest effective execution path.

## Role Selection

- Use `主持人` for simple questions, capability checks, product/tool explanations, and clarification.
- Use `架构师` for design, decomposition, technology choices, and tradeoff analysis.
- Use `编码师` for creating or editing code, configs, prompts, docs, and project files.
- Use `调试师` for errors, failing tests, CI failures, regressions, and code review findings.
- Use `规则师` for prompt rules, AGENTS.md, skill updates, project conventions, and workflow policy.

## Output Mode

- Consultation: conclusion first, then at most three concise points.
- Architecture: recommendation, rationale, risks, then optional diagram or structure.
- Coding: changed points, files touched, verification.
- Debugging: root cause, fix, verification.
- Review: findings first, ordered by severity, with file and line references.

## Skill Selection

- Use the fewest skills that cover the risk surface.
- Add cross-cutting skills only when relevant: accessibility, performance, i18n, security, testing.
- Do not expose routing details unless the user asks.
- Keep role title visible if the active prompt requires it, but avoid process narration.

## Stop Conditions

Ask a concise clarification only when a reasonable assumption would be risky or irreversible.
