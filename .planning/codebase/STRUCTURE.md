---
last_mapped_commit: 0194750739f002379bdbe9cc7ea8e408b46f546e
last_mapped_at: 2026-09-30
---
# Codebase Structure

**Analysis Date:** 2026-09-30

## Directory Layout

```
Jumptracker-Pro-Docs-Site/
├── astro.config.mjs        # Astro + Starlight config, sidebar groups
├── package.json            # Scripts and deps (astro, @astrojs/starlight, sharp)
├── package-lock.json       # npm lockfile
├── tsconfig.json           # Extends astro/tsconfigs/strict
├── AGENTS.md               # Agent/project instructions (CLAUDE.md is a symlink to it)
├── README.md               # One-line repo description
├── skills-lock.json        # Installed agent skills lock (tooling, not site)
├── docs/
│   └── git-workflow.md     # develop -> main squash-merge workflow (repo doc, not published)
├── src/
│   ├── content.config.ts   # Defines the `docs` collection
│   ├── content/docs/       # ALL published pages (route = file path)
│   │   ├── index.mdx       # Landing page (splash template)
│   │   ├── start/          # "Start Here" sidebar group
│   │   ├── technical/      # "Technical Guides" sidebar group
│   │   └── case-studies/   # "Case Studies" sidebar group
│   ├── assets/             # Images processed by Astro
│   │   ├── logo.svg        # Site logo (used in astro.config.mjs)
│   │   ├── import-burble/  # Screenshots for import-burble-logbook.md
│   │   └── log-with-check-in/  # Screenshots for log-your-day-with-check-in.md
│   └── styles/
│       └── custom.css      # Brand colors + screenshot sizing
├── public/                 # Static files served at site root (favicons)
├── temporary assets/       # Empty scratch folder for unprocessed images (untracked content)
├── .vscode/                # Editor launch config and extension recommendation
├── .planning/codebase/     # GSD codebase map documents (this file)
├── .claude/ .codex/        # AI tooling (GSD install); not part of the site
├── .astro/                 # Generated types/cache (gitignored)
├── dist/                   # Build output (gitignored, created by `astro build`)
└── node_modules/           # Dependencies (gitignored)
```

## Directory Purposes

**`src/content/docs/`:**

- Purpose: Every published page. URL mirrors the path without extension.
- Contains: `.md` guides, `index.mdx` landing page.
- Key files: `src/content/docs/index.mdx`, `src/content/docs/start/welcome.md`, `src/content/docs/technical/how-totals-are-calculated.md`, `src/content/docs/technical/import-burble-logbook.md`, `src/content/docs/case-studies/log-your-day-with-check-in.md`

**`src/content/docs/start/`:**

- Purpose: Orientation; what the app does and where to go next.
- Sidebar label: "Start Here".

**`src/content/docs/technical/`:**

- Purpose: Explanations of how app features and calculations work, plus import workflows.
- Sidebar label: "Technical Guides".

**`src/content/docs/case-studies/`:**

- Purpose: Scenario-driven walkthroughs of how jumpers use the app.
- Sidebar label: "Case Studies".

**`src/assets/<guide-slug>/`:**

- Purpose: Screenshots for a single guide; folder name matches (or abbreviates) the guide slug.
- Key files: `src/assets/import-burble/*.png|jpg`, `src/assets/log-with-check-in/step-N-*.png`.

**`src/styles/`:**

- Purpose: Global CSS loaded by Starlight via `customCss` in `astro.config.mjs`.
- Key files: `src/styles/custom.css`.

**`public/`:**

- Purpose: Files served verbatim (`favicon.svg`, `favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`).

**`docs/`:**

- Purpose: Repo-maintainer documentation (not published to the site). Currently `docs/git-workflow.md`.

## Key File Locations

**Entry Points:**

- `astro.config.mjs`: Site configuration and sidebar.
- `src/content/docs/index.mdx`: Home page (`/`).

**Configuration:**

- `astro.config.mjs`: Starlight title, logo, favicon, description, sidebar, site URL `https://docs.jumptrackerpro.com`.
- `src/content.config.ts`: Content collection definition.
- `tsconfig.json`: TypeScript strict via Astro preset.
- `.vscode/launch.json`: Dev-server launch config.

**Core Logic:**

- None (no application code). Content lives in `src/content/docs/`.

**Testing:**

- Not applicable; no test framework. Verify with `npx astro build`.

## Naming Conventions

**Files:**

- Content pages: lowercase kebab-case `.md`, slug describes the topic: `import-burble-logbook.md`, `how-totals-are-calculated.md`, `log-your-day-with-check-in.md`.
- Landing page only uses `.mdx` (needed for component imports): `index.mdx`.
- Screenshots: lowercase kebab-case; step-ordered ones use `step-<n>[-<sub>]-<description>.png` (`step-3-1-log-single-jump.png`); source-labelled ones prefix the origin (`burble-download-transaction-history.png`, `jumptracker-import-menu.jpg`).
- Config/tooling files: standard names (`astro.config.mjs`, `content.config.ts`).

**Directories:**

- Content sections and asset folders: lowercase kebab-case (`case-studies`, `import-burble`, `log-with-check-in`).
- Asset folder mirrors the guide slug it serves.

**Frontmatter (every page):**

```yaml
---
title: Sentence-style page title
description: One-sentence summary for SEO and search.
---
```

## Where to Add New Code

**New guide / page in an existing section:**

- Create `src/content/docs/<start|technical|case-studies>/<kebab-slug>.md` with `title` and `description` frontmatter. The sidebar picks it up automatically.
- Screenshots: `src/assets/<guide-slug>/`, referenced as `![Alt](../../../assets/<guide-slug>/<file>)`.
- If the page should be discoverable from the home page or another page, add a link like `[Text](/technical/<slug>/)` (absolute path, trailing slash).

**New section (new sidebar group):**

- Create `src/content/docs/<new-folder>/`.
- Add `{ label: '...', items: [{ autogenerate: { directory: '<new-folder>' } }] }` to `sidebar` in `astro.config.mjs`.
- Add a `LinkCard` in `src/content/docs/index.mdx` and mention it in the "What's on this site" table in `src/content/docs/start/welcome.md`.

**Custom styling:**

- Add rules/variables to `src/styles/custom.css` (Starlight CSS variables such as `--sl-color-accent`); do not add a second stylesheet unless also registered in `customCss`.

**Custom Astro/React component (if ever needed):**

- Put in `src/components/` (does not exist yet) and import from an `.mdx` page; markdown-only `.md` pages cannot import components.

**Favicons / root static files:**

- `public/`.

**Repo maintainer docs (not published):**

- `docs/` (outside `src/content/docs/`).

**Verifying behavior before writing:**

- Check the app codebase at `/Users/josephpascucci/GitHub/JumpTracker-Pro-App` (per `AGENTS.md`).

## Special Directories

**`.astro/`:**

- Purpose: Generated type definitions and content cache.
- Generated: Yes
- Committed: No (gitignored)

**`dist/`:**

- Purpose: Production build output.
- Generated: Yes (`astro build`)
- Committed: No (gitignored)

**`node_modules/`:**

- Purpose: npm dependencies.
- Generated: Yes
- Committed: No

**`temporary assets/`:**

- Purpose: Scratch space for raw screenshots before they are moved into `src/assets/<guide-slug>/`. Currently empty. Not referenced by the site.
- Generated: No
- Committed: No files tracked (empty directory).

**`.claude/`, `.codex/`, `.planning/`:**

- Purpose: AI agent tooling (GSD workflows, hooks, agents) and planning docs.
- Generated: Yes (installed tooling)
- Committed: Yes for `.claude/`/`.codex/` tooling per git history; not part of the site build.

---

*Structure analysis: 2026-09-30*
