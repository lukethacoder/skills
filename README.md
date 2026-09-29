# 💼 @lukethacoder/skills

[![skills.sh](https://skills.sh/b/lukethacoder/skills)](https://skills.sh/lukethacoder/skills)

Personal collection of portable skills for Claude Code, OpenCode, Codex, and other harnesses that support the [Agent Skills format](https://agentskills.io/).

Skills are plain directories containing a `SKILL.md`. The repository keeps one canonical copy of each skill and leaves harness-specific installation to the [`skills` CLI](https://skills.sh/docs/cli).

## Install

```bash
pnpm dlx skills@latest add lukethacoder/skills
```

The installer discovers available skills and lets the user choose a target harness. No generated Claude, OpenCode, or Codex copies are committed here.

## Layout

```text
skills/
  <category>/
    <skill-name>/
      SKILL.md
      reference.md      # optional
      scripts/          # optional deterministic helpers
scripts/
  skills.mjs            # lists and validates skills
```

Categories organize the repository only. Skill names must remain unique across categories because harnesses install them into a flat skill directory.

## Add A Skill

Create `skills/<category>/<skill-name>/SKILL.md`:

```md
---
name: skill-name
description: Does one specific job. Use when the user asks for that job or mentions its concrete triggers.
---

# Skill Name

Write concise, harness-neutral instructions here.
```

Then validate it:

```bash
pnpm check
pnpm skills:list
```

Keep core instructions in `SKILL.md`. Put branch-specific detail in sibling Markdown files and link to them with relative paths. Put repeatable deterministic work in `scripts/` inside the skill directory.

## Portability Rules

- Use standard `SKILL.md` frontmatter and relative paths.
- Describe capabilities, not a specific model's personality.
- Avoid harness-only tools unless the skill checks availability and provides a portable fallback.
- Keep all files needed by a skill inside its directory.
- Use lowercase kebab-case for directory and frontmatter names.
- Run `pnpm check` before publishing.
