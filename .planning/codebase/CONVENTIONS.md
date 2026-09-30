---
last_mapped_commit: 0194750739f002379bdbe9cc7ea8e408b46f546e
last_mapped_at: 2026-09-30
---
# Coding Conventions

**Analysis Date:** 2026-09-30

This repository is an Astro 7 + Starlight documentation site (`astro.config.mjs`, `package.json`). There is almost no hand-written code. The "code" is Markdown/MDX content in `src/content/docs/`, one content-collection config, one CSS file and one Astro config. Conventions below therefore cover content authoring first, then the small amount of TypeScript/JS/CSS, then the git workflow.

There is no linter, formatter or pre-commit hook configured. Conventions are enforced by review and by `astro build` (Starlight frontmatter schema validation).

## Naming Patterns

**Content files (`src/content/docs/**`):**

- Use lowercase kebab-case `.md` filenames that mirror the page title and become the URL slug: `src/content/docs/technical/import-burble-logbook.md` -> `/technical/import-burble-logbook/`.
- Use `.md` for normal pages. Use `.mdx` only when a page imports Starlight components (only `src/content/docs/index.mdx` does).
- Place a page in exactly one of the section folders: `start/`, `technical/`, `case-studies/`. Folder names are lowercase kebab-case and match the `autogenerate.directory` values in `astro.config.mjs`.
- Case study filenames are action phrases: `log-your-day-with-check-in.md`. Technical guide filenames are either "how-..." or an imperative task: `how-totals-are-calculated.md`, `import-burble-logbook.md`.

**Image assets (`src/assets/`):**

- One subfolder per page, named after the page slug: `src/assets/import-burble/`, `src/assets/log-with-check-in/`.
- Filenames are lowercase kebab-case and descriptive. Ordered walkthrough shots are prefixed `step-N-` or `step-N-M-`: `step-3-1-log-single-jump.png`, `step-4-2-edit-day-end-time.png`. Source-app shots are prefixed with the app name: `burble-download-transaction-history.png`, `jumptracker-import-menu.jpg`.
- Shared site assets live at the top of `src/assets/` (`src/assets/logo.svg`).

**Frontmatter keys:** lowercase, as defined by Starlight's `docsSchema()` (`title`, `description`, `template`, `hero`, etc.).

**CSS custom properties:** use Starlight's `--sl-*` variable names (`--sl-color-accent`, `--sl-color-accent-low`, `--sl-color-accent-high`) in `src/styles/custom.css`.

**Config/collection exports:** `collections` object with key `docs` in `src/content.config.ts` (Astro's required shape).

## Code Style

**Formatting:**

- No Prettier/Biome/EditorConfig present. Follow the existing style of the file being edited.
- JS/TS/CSS files use **tab indentation** (`astro.config.mjs`, `src/content.config.ts`, `src/styles/custom.css`), single quotes, semicolons, trailing commas in multi-line objects.
- `package.json` and `tsconfig.json` use 2-space JSON indentation.
- Markdown uses no hard wrapping: one paragraph per line.
- MDX component children use 2-space indentation (`src/content/docs/index.mdx`).
- YAML frontmatter uses 2-space nesting (`hero.actions` in `src/content/docs/index.mdx`).

**Linting / type checking:**

- No ESLint. TypeScript strictness comes from `tsconfig.json` extending `astro/tsconfigs/strict`.
- `astro.config.mjs` starts with `// @ts-check`; keep it.
- Type-check/validation command: `npx astro build` (also validates frontmatter against the Starlight schema). `astro check` is not installed.

## Content Authoring Conventions

These are the real house style used across all pages in `src/content/docs/`.

**Frontmatter (required on every page):**

```yaml
---
title: Import Your Burble Logbook
description: Bring your Burble Transaction History into JumpTracker Pro, step by step, and undo it if something looks wrong.
---
```

- `title` is Title Case (or a natural phrase) and is the only H1; never add a `# H1` in the body.
- `description` is one full sentence ending in a period.
- The home page adds `template: splash` and a `hero` block (`src/content/docs/index.mdx`).

**Page structure:**

1. Opening paragraph (no heading) that states what the page helps the reader do.
2. `## H2` sections; `### H3` only for sub-scenarios (`### Scenario A: ...` in `src/content/docs/case-studies/log-your-day-with-check-in.md`).
3. Case studies: a bold `**The scenario:**` line, then `## The idea`, numbered `## Step N: ...` sections, `## What you end up with`, `## Tips`.
4. Technical guides: explain rules with a table, then `## What each number includes`-style bullet lists.

**Voice:**

- Address the reader as "you". Use plain, friendly, task-oriented language for professional skydivers (tandem instructors, packers), not developers.
- Describe the app from the user's perspective only (Logbook, Log Day, Settings); never reference app source code paths in published text.
- Verify every claim against the app at `/Users/josephpascucci/GitHub/JumpTracker-Pro-App` (per `AGENTS.md`) before publishing.

**UI labels and literal values:**

- Bold every on-screen label, button, menu item, tab and page name: `**Log Day**`, `**Edit Day**`, `**Start Time**`, `**Update Day**`.
- Use inline code for values the user types or file contents: `` `Check in` ``, `` `0` ``, and CSV column names `` `Load` ``, `` `Date` ``, `` `Item` ``, `` `Amount` ``.
- Use `**⋮**` for the kebab menu icon.

**Lists and steps:**

- Numbered lists for sequential steps; bullets for unordered facts.
- For multi-step instructions that include an image after a step, either use bold-numbered paragraphs (`**1. Open Transaction History.** ...` in `src/content/docs/technical/import-burble-logbook.md`) or a numbered list with a screenshot between items (`src/content/docs/case-studies/log-your-day-with-check-in.md`).
- Bullets that introduce a rule start with a bold lead-in ending in a period or colon: `- **Jump count:** only services of type *Jump*.`

**Tables:** use GitHub-style pipe tables with bold first-column labels and a `|---|---|` separator row, for comparing categories (`src/content/docs/technical/how-totals-are-calculated.md`, `src/content/docs/start/welcome.md`).

**Images:**

- Reference with a relative path to `src/assets/` and descriptive alt text that describes what the screenshot shows (not "screenshot"):
  ```markdown
  ![The Logbook page with the import menu open, showing Import CSV, Export CSV and View Import History](../../../assets/import-burble/jumptracker-import-menu.jpg)
  ```
- Relative depth is always `../../../assets/` from `src/content/docs/<section>/<page>.md`. Use relative imports (not `/src/assets/...`) so Astro optimizes the image via `sharp`.
- Screenshots are phone-sized; `src/styles/custom.css` caps `.sl-markdown-content img` at `min(100%, 320px)`. Do not add width attributes.
- Put files from `public/` only for favicons/static icons referenced by absolute URL (`favicon: '/favicon.svg'`).

**Internal links:** use absolute site paths with a trailing slash, never file paths: `[Import Your Burble Logbook](/technical/import-burble-logbook/)`. Trailing slash is required (matches Starlight's generated routes and the `href`s in `src/content/docs/index.mdx`).

**Review markers:** unverified pages end with an italic note, e.g. `_Reviewed against the app's invoice reporting documentation. Check the wording against the current app before publishing._` (`src/content/docs/technical/how-totals-are-calculated.md`). Remove the note once verified against the app.

**Proofreading:** there is no spellchecker. Re-read new pages for typos before committing; existing pages contain slips to avoid repeating (for example "qucker", "ambiguos", "let's" for "lets", trailing whitespace in `## Some Notes ` in `src/content/docs/technical/import-burble-logbook.md`).

## Import Organization (JS/TS/MDX)

**Order (as in `astro.config.mjs` and `src/content.config.ts`):**

1. `astro/*` and `astro:*` framework imports
2. `@astrojs/*` integration imports
3. Local relative imports / CSS paths

**Path Aliases:** none configured; `tsconfig.json` only extends `astro/tsconfigs/strict`.

**MDX component imports** go immediately after the frontmatter and before the JSX, with a blank line between:

```mdx
import { CardGrid, LinkCard } from '@astrojs/starlight/components';

<CardGrid>
  <LinkCard title="Start Here" description="A quick orientation to the app." href="/start/welcome/" />
</CardGrid>
```

## Configuration Conventions

- Sidebar is **autogenerated per folder** in `astro.config.mjs`; do not hand-list pages. To add a page, drop a `.md` file in the section folder.
- Keep explanatory `//` comments in `astro.config.mjs` and `src/styles/custom.css` for non-obvious decisions (see the sidebar comment and the phone-screenshot comment).
- Brand colors are declared once in `src/styles/custom.css` with separate dark (default `:root`) and light (`:root[data-theme='light']`) blocks; change both together. Values are HSL (`hsl(207, 90%, 45%)`).
- Site URL is `https://docs.jumptrackerpro.com` (`astro.config.mjs`); update only there.

## Error Handling

No runtime error-handling code exists. Failure surface is the build:

- Invalid frontmatter or a missing/misspelled image path fails `npx astro build`. Run it before opening a PR.
- Do not silence Astro/Starlight warnings; fix them.

## Logging

Not applicable (static site, no runtime logging). Dev server logs are read with `astro dev logs` (see `AGENTS.md`).

## Comments

**When to Comment:** only for config intent (sidebar autogeneration, brand color source, screenshot sizing). No comments needed in Markdown content.

**JSDoc/TSDoc:** not used.

## Function / Module Design

- No custom functions or components exist. If one is added, put Astro components in `src/components/` and register overrides through the Starlight `components` option in `astro.config.mjs`.
- `src/content.config.ts` uses a single named export `collections`; extend `docsSchema()` rather than replacing it if custom frontmatter fields are needed.
- No barrel files.

## Git and Commit Conventions

Documented in `docs/git-workflow.md`:

- Work on `develop`; `main` is the published site and only receives squash-merged PRs.
- Commit messages use Conventional Commit prefixes: `docs:` for content (`docs: add initial documentation for the JumpTracker Pro app`), `fix:` for config fixes (`fix: update site URL in Astro configuration`), `chore:` for tooling (`chore: install GSD tooling for Claude Code and Codex`).
- Reset `develop` to `main` after every squash merge (commands in `docs/git-workflow.md`).
- Never `git reset --hard` or force-push `main`.

## AI Tooling Directories

`.claude/`, `.codex/`, `.planning/`, and `skills-lock.json` are agent tooling. Do not edit them by hand when changing site content. `CLAUDE.md` is a symlink to `AGENTS.md`; edit `AGENTS.md`.

---

*Convention analysis: 2026-09-30*
