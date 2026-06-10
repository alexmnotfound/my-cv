# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

v2 of a static personal CV + portfolio page for Matias Rodriguez. No build step, no framework — static HTML/CSS/JS deployed to Firebase Hosting.

See v1 for reference: `/Users/mrcap/projects/my-cv`

## Commands

```bash
make dev      # serve locally on port 3013
make open     # open browser (run alongside dev)
make deploy   # firebase deploy --only hosting
make init     # first-time Firebase setup
```

## Architecture (from v1 — carry forward to v2)

- `index.html` — single page entry point
- `css/colors_and_type.css` — design tokens: CSS variables, typography, light/dark themes
- `css/kit.css` — reusable components: shell, sidebar, topbar, buttons, badges
- `css/site.css` — page-specific layout sections
- `js/data.js` — ALL bilingual content (ES/EN) as `window.CV_DATA` with `es`/`en` keys
- `js/app.js` — render engine: DOM injection, scrollspy, reveal animations, skill bars

`data.js` is the single source of truth for all visible text. Edit both `es` and `en` keys in sync.

`app.js` re-renders the full DOM on load and on language toggle, then re-initializes `IntersectionObserver`s and calls `lucide.createIcons()`.

Icons via Lucide from unpkg CDN. Animations via `IntersectionObserver`. Scrollspy uses `rootMargin: "-40% 0px -55% 0px"`.

## Owner data

Real CV at `/Users/mrcap/Documents/CV Rodriguez Matias.pdf`. AI/LLM work is the primary focus — de-emphasize trading background.
