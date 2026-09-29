Skills are organised into bucket folders under `skills/`:

- `engineering/`: daily code work
- `productivity/`: daily non-code workflow tools

Every skill in `engineering/` or `productivity/` must have a reference in the top-level `README.md`. Skills in other directories must not appear in either.

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.

- Add skills under `skills/<category>/<skill-name>/SKILL.md`.
- Keep skill names globally unique, lowercase, and kebab-case.
- Keep instructions harness-neutral.
- Keep each skill self-contained. Reference only files inside its own directory.
- Run `pnpm check` after changing skill files.
- No em-dashes anywhere in this repo's prose (SKILL.md files, docs, README.md, CHANGELOG.md, ADRs, changesets, code comments). Where a sentence reaches for one, rewrite it instead with a comma, colon, period, parentheses, or a conjunction, whichever the sentence actually wants; never do a blind character substitution.
