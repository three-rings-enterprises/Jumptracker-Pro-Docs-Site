---
last_mapped_commit: 0194750739f002379bdbe9cc7ea8e408b46f546e
last_mapped_at: 2026-09-30
---
<!-- refreshed: 2026-09-30 -->

# Architecture

**Analysis Date:** 2026-09-30

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                  Authored Content (Markdown)                 │
├──────────────────┬──────────────────┬───────────────────────┤
│   Start Here     │ Technical Guides │    Case Studies       │
│ `src/content/    │ `src/content/    │ `src/content/docs/    │
│  docs/start/`    │  docs/technical/`│  case-studies/`       │
│ + Landing page `src/content/docs/index.mdx`                  │
└────────┬─────────┴────────┬─────────┴──────────┬────────────┘
         │                  │                     │
         ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│     Astro Content Collection `docs`                          │
│     `src/content.config.ts` (Starlight docsLoader + schema)  │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  Starlight integration + sidebar autogeneration              │
│  `astro.config.mjs`  (theme: `src/styles/custom.css`)        │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  Static HTML site in `dist/` (gitignored)                    │
│  Published at https://docs.jumptrackerpro.com                │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Astro config | Site URL, Starlight title/logo/favicon/description, custom CSS, sidebar groups | `astro.config.mjs` |
| Content collection | Registers the `docs` collection using Starlight's loader and frontmatter schema | `src/content.config.ts` |
| Landing page | Splash hero + `CardGrid` of `LinkCard`s to each section | `src/content/docs/index.mdx` |
| Start Here section | Orientation page for the app | `src/content/docs/start/welcome.md` |
| Technical Guides section | Explanations of app mechanics and import workflows | `src/content/docs/technical/how-totals-are-calculated.md`, `src/content/docs/technical/import-burble-logbook.md` |
| Case Studies section | Real-world, step-by-step usage scenarios | `src/content/docs/case-studies/log-your-day-with-check-in.md` |
| Theme overrides | Brand accent colors (from the app's `client/src/index.css`) and screenshot sizing | `src/styles/custom.css` |
| Image assets | Screenshots per guide, processed by Astro/`sharp` | `src/assets/<guide-slug>/` |
| Static files | Favicons copied verbatim | `public/` |

## Pattern Overview

**Overall:** Static documentation site. Content-driven, file-system-routed, built on Astro + Starlight. No custom components, pages, layouts, middleware, or server code.

**Key Characteristics:**

- Content is the product. Every page is a Markdown/MDX file in `src/content/docs/`; the file path determines the URL (`src/content/docs/technical/import-burble-logbook.md` -> `/technical/import-burble-logbook/`).
- Navigation is convention-based. The sidebar autogenerates from three folders, so adding a page needs no config change.
- Presentation is delegated to Starlight; the only customization is CSS variables in `src/styles/custom.css`.
- Documented subject (the JumpTracker Pro app) lives in a separate repo at `/Users/josephpascucci/GitHub/JumpTracker-Pro-App`; behavior claims should be verified there (see `AGENTS.md`).

## Layers

**Content layer:**

- Purpose: Author documentation pages.
- Location: `src/content/docs/`
- Contains: `.md` guides with YAML frontmatter (`title`, `description`), one `.mdx` landing page.
- Depends on: Starlight frontmatter schema, image files in `src/assets/`.
- Used by: The `docs` content collection.

**Collection/schema layer:**

- Purpose: Load and validate content.
- Location: `src/content.config.ts`
- Contains: Single `docs` collection: `defineCollection({ loader: docsLoader(), schema: docsSchema() })`.
- Depends on: `@astrojs/starlight/loaders`, `@astrojs/starlight/schema`.
- Used by: Starlight's built-in routing.

**Site configuration layer:**

- Purpose: Configure Starlight, sidebar, branding.
- Location: `astro.config.mjs`, `src/styles/custom.css`
- Depends on: `@astrojs/starlight`, `astro/config`.
- Used by: Astro build and dev server.

**Asset layer:**

- Purpose: Images referenced by content.
- Location: `src/assets/` (processed, referenced by relative path) and `public/` (served as-is, referenced by absolute URL like `/favicon.svg`).

## Data Flow

### Primary Build/Request Path

1. Author adds or edits a Markdown file under `src/content/docs/<section>/` (`src/content/docs/technical/*.md`).
2. `docsLoader()` in `src/content.config.ts` ingests the file and `docsSchema()` validates frontmatter.
3. Starlight's injected route renders the entry; the sidebar entry is produced by `autogenerate: { directory: '<section>' }` in `astro.config.mjs`.
4. `astro build` emits static HTML to `dist/`; relative-path images are optimized via `sharp`.
5. Merging to `main` publishes (see `docs/git-workflow.md`; deploy mechanism not present in repo).

### Image Reference Flow

1. Place image in `src/assets/<guide-slug>/` (e.g. `src/assets/import-burble/jumptracker-import-menu.jpg`).
2. Reference from the page with a relative path: `![Alt text](../../../assets/import-burble/jumptracker-import-menu.jpg)`.
3. `src/styles/custom.css` caps `.sl-markdown-content img` at `min(100%, 320px)` wide (phone screenshots).

### Cross-linking Flow

- Internal links use absolute site paths with trailing slash: `[Import Your Burble Logbook](/technical/import-burble-logbook/)` in `src/content/docs/start/welcome.md`.

**State Management:**

- None. No client state, no runtime data; all content is static at build time.

## Key Abstractions

**Docs entry (page):**

- Purpose: One Markdown file = one page.
- Examples: `src/content/docs/case-studies/log-your-day-with-check-in.md`
- Pattern: Frontmatter (`title`, `description`) + body headed by `##` sections (the page `title` renders as H1, so body starts at `##`).

**Sidebar group:**

- Purpose: Map a folder to a labeled sidebar section.
- Examples: `astro.config.mjs` entries `Start Here` -> `start`, `Technical Guides` -> `technical`, `Case Studies` -> `case-studies`.
- Pattern: `{ label, items: [{ autogenerate: { directory } }] }`.

**Starlight components (MDX only):**

- Purpose: `CardGrid`, `LinkCard` imported from `@astrojs/starlight/components` in `src/content/docs/index.mdx`.

## Entry Points

**Site config:**

- Location: `astro.config.mjs`
- Triggers: `astro dev`, `astro build`, `astro preview` (`package.json` scripts).
- Responsibilities: Registers Starlight and defines the sidebar.

**Landing page:**

- Location: `src/content/docs/index.mdx`
- Triggers: Request to `/`.
- Responsibilities: Splash hero with "Get started" action to `/start/welcome/` and `LinkCard`s to each section.

**Dev server:**

- Launch config: `.vscode/launch.json` (`./node_modules/.bin/astro dev`); agents use `astro dev --background` (`AGENTS.md`).

## Architectural Constraints

- **Threading:** Not applicable; static build, no runtime server code.
- **Global state:** None. No module-level singletons; `src/content.config.ts` only exports the collections map.
- **Circular imports:** None; there are no application modules beyond config.
- **Sidebar is hardcoded to three folders:** A new top-level section folder requires a new entry in `astro.config.mjs` and a matching `LinkCard` in `src/content/docs/index.mdx`.
- **Content config location:** `src/content.config.ts` (Astro 5+ convention); `docs` collection name is required by Starlight.
- **Ordering:** Autogenerated sidebar sorts alphabetically by filename unless `sidebar.order` frontmatter is set; no page currently sets it.
- **Tooling directories are not part of the site:** `.claude/`, `.codex/`, `.planning/`, `skills-lock.json` belong to AI agent workflows and do not affect the build.

## Anti-Patterns

### Adding pages outside the docs collection

**What happens:** A `.astro` page under `src/pages/` for documentation content.
**Why it's wrong:** Bypasses Starlight layout, sidebar, search, and the content schema. `src/pages/` does not exist.
**Do this instead:** Add a `.md` file under `src/content/docs/<section>/`.

### Hand-maintaining sidebar items

**What happens:** Listing individual pages in `sidebar` in `astro.config.mjs`.
**Why it's wrong:** Duplicates what `autogenerate` does and goes stale (see the comment in `astro.config.mjs`).
**Do this instead:** Keep `autogenerate: { directory }` and just add files to the folder.

### Screenshots in `public/`

**What happens:** Placing guide images in `public/` and linking by absolute URL.
**Why it's wrong:** Skips Astro image optimization and the repo's per-guide folder convention.
**Do this instead:** Put them in `src/assets/<guide-slug>/` and reference with relative paths like `../../../assets/<guide-slug>/file.png`.

### Mirroring duplicate H1 in body

**What happens:** Starting a page body with `# Title`.
**Why it's wrong:** Starlight renders `title` frontmatter as H1; a second H1 breaks heading hierarchy.
**Do this instead:** Start body sections at `##` as in `src/content/docs/technical/how-totals-are-calculated.md`.

## Error Handling

**Strategy:** Build-time only. Invalid frontmatter fails `astro build` via `docsSchema()`; missing image paths fail the build; broken internal links are not validated (no link-check plugin installed).

**Patterns:**

- Run `npx astro build` before opening a PR (`docs/git-workflow.md`).

## Cross-Cutting Concerns

**Logging:** Not applicable (dev server logs via `astro dev logs`).
**Validation:** Starlight `docsSchema()` frontmatter validation; TypeScript strict config via `tsconfig.json` (`astro/tsconfigs/strict`).
**Authentication:** None; public site.
**Branch/release flow:** `develop` -> squash-merged PR -> `main` (`docs/git-workflow.md`).

---

*Architecture analysis: 2026-09-30*
