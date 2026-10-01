---
last_mapped_commit: 0194750739f002379bdbe9cc7ea8e408b46f546e
last_mapped_at: 2026-09-30
---
# External Integrations

**Analysis Date:** 2026-09-30

## APIs & External Services

**Runtime/build-time APIs:**

- None detected. The site is a static Astro Starlight build with no API calls, SDK imports, or server endpoints in `src/`.

**Content-referenced systems (documentation subjects, not integrations):**

- JumpTracker Pro app - The product being documented. Source lives outside this repo at `/Users/josephpascucci/GitHub/JumpTracker-Pro-App` (per `AGENTS.md`); consult it to verify behavior. Brand colors in `src/styles/custom.css` are copied from the app's `client/src/index.css`.
- Burble (logbook/transaction history export) - Documented in `src/content/docs/technical/import-burble-logbook.md` with screenshots in `src/assets/import-burble/`. Documentation only; no code integration.

## Data Storage

**Databases:**

- None

**File Storage:**

- Local filesystem only. Content in `src/content/docs/`, images in `src/assets/`, static files in `public/`.

**Caching:**

- None (Astro build cache in `.astro/` is gitignored and generated)

## Authentication & Identity

**Auth Provider:**

- None. Public, unauthenticated documentation site.

## Monitoring & Observability

**Error Tracking:**

- None

**Analytics:**

- None detected (no analytics script or Starlight `head` config in `astro.config.mjs`)

**Logs:**

- Dev server logs via `astro dev logs` (background mode)

## CI/CD & Deployment

**Hosting:**

- Not detected in repo. Site URL is `https://docs.jumptrackerpro.com` (`astro.config.mjs`). No host config files (`vercel.json`, `netlify.toml`, `wrangler.*`) and no `public/CNAME`.

**Source control:**

- GitHub: `https://github.com/three-rings-enterprises/Jumptracker-Pro-Docs-Site.git` (remote `origin`)
- Branch model documented in `docs/git-workflow.md`: work on `develop`, open PR to `main` with `gh pr create`, squash-merge (`gh pr merge --squash`), then reset `develop` from `main`. Published site = `main`.

**CI Pipeline:**

- None in repo (no `.github/workflows/`). Any deploy automation is configured outside the repository.

## Environment Configuration

**Required env vars:**

- None

**Secrets location:**

- Not applicable. `.env` and `.env.production` are gitignored in `.gitignore`; none are present.

## Webhooks & Callbacks

**Incoming:**

- None

**Outgoing:**

- None

---

*Integration audit: 2026-09-30*
