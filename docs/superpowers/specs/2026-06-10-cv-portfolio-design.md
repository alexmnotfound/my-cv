# CV Portfolio v2 — Design Spec

**Date:** 2026-06-10  
**Owner:** Matías Rodríguez  
**Status:** Approved

---

## 1. Overview

Single-page personal CV + portfolio site. Goal: present Matías as an AI/Backend engineer — original, elegant, memorable. Not a plain resume dump.

---

## 2. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + `next export` |
| Styling | Tailwind CSS + shadcn/ui |
| Components | 21st.dev interactive-image-accordion, hero-section-6 as reference |
| Theming | `next-themes` — dark/light toggle, `dark` class on `<html>` |
| Deploy | Firebase Hosting (static export) |
| Animations | Tailwind transitions + shadcn primitives |

No SSR needed. Static export matches v1 Firebase deploy workflow.

---

## 3. Visual Design

### Palette — Slate Monochrome (Dark + Light)

**Dark mode:**
- **Background:** `#07080a`
- **Surface:** `rgba(255,255,255,0.03)` glass cards
- **Borders:** `rgba(255,255,255,0.07)`
- **Text primary:** `#f8fafc` · **Text muted:** `rgba(255,255,255,0.3)`
- **Accent:** `#94a3b8` (slate-400)
- **Button primary:** white bg, dark text

**Light mode:**
- **Background:** `#f8fafc`
- **Surface:** `rgba(0,0,0,0.02)` glass cards
- **Borders:** `rgba(0,0,0,0.07)`
- **Text primary:** `#0f172a` · **Text muted:** `rgba(0,0,0,0.35)`
- **Accent:** `#64748b` (slate-500)
- **Button primary:** dark bg, white text

**No color accents in either mode.** Hierarchy via opacity and weight only.

### Style
- Glassmorphism cards: `backdrop-filter: blur`, low-opacity borders, near-transparent backgrounds
- Background: subtle grid lines + two soft orbs (slate, no saturation)
- Typography: Inter — 800 weight for headings, 300/400 for body. Tight letter-spacing on large text.
- Max-width: `1080px` centered. `32px` horizontal padding.
- Section labels: `10px`, `3px` letter-spacing, uppercase, with a `1px` divider line extending right.

---

## 4. Layout — Single Page Scroll

### Nav (sticky)
- Logo: `MR` — 800 weight, 3px letter-spacing
- Links: About · Experiencia · Proyectos · Contacto (smooth scroll)
- Language toggle: 🇦🇷 / 🇺🇸 flag buttons. Active state: `rgba(255,255,255,0.08)` bg.
- Theme toggle: sun/moon icon button (right of language toggle). Uses `next-themes` `setTheme`.
- Backdrop blur on scroll.

### Hero
- Left: availability badge (green pulse dot) → H1 name → role → description → CTAs (Ver proyectos, Descargar CV)
- Right: glass card with avatar initials, name, role, 2×2 stats grid (6+ Python, 3+ Go, 10+ exp, 3 idiomas), skill tags
- Background: two desaturated orbs, subtle grid

### 01 — About
- 2-col grid: heading + paragraph (left) | 3 highlight cards (right)
- Highlights: 🤖 AI & LLMs · ⚙️ Backend Scalable · ☁️ Cloud & DevOps

### 02 — Experience
- Vertical timeline: date (right-aligned) | `1px` line with dot | content
- Each entry: role, company, description, tech tags
- Entries (newest first):
  1. AI Engineer — Sonder (Apr 2025 – Nov 2025)
  2. Technical Lead AI — Slingr (Dec 2021 – Jan 2025)
  3. Trader & Developer — Freelance (brief, de-emphasized)
  4. ERP Consultant — Softland (brief)

### 03 — Skills
- 3-col card grid: Lenguajes · AI/ML · Cloud & Infra
- Each card: category label + skill rows with thin progress bars (white fill)

### 04 — Projects
- Interactive image accordion (21st.dev component)
- 3 panels, first expanded by default:
  1. **AI Chatbot Platform** — LLM automation, Python, GPT-4, AWS (mock screenshots)
  2. **Trading Bot** — algo trading, Python, strategy automation (mock screenshots)
  3. **Full-stack SaaS** — Next.js, Supabase, auth, dashboard (mock screenshots)
- Each panel: project image background, tag badge (top-left), title + stack (bottom overlay)
- Expanded panel shows: description, key features, tech stack, "Ver demo" / "Ver código" buttons

### 05 — Contact
- Heading: "Trabajemos juntos"
- Subtext: availability statement
- 3 link rows: Email · GitHub · LinkedIn — each with icon, name, handle, `→` arrow

### Footer
- Left: `© 2026 Matías Rodríguez`
- Right: `Built with Next.js · Deployed on Firebase`

---

## 5. Bilingual (ES/EN)

- All content in a single `data/content.ts` file exporting `{ es: {...}, en: {...} }`.
- `LanguageContext` (React context) wraps the app. Toggle in Nav switches context.
- No routing change on language switch — pure state.
- Both keys must stay in sync on every content edit.

---

## 6. Content (mock → real later)

Real data from `/Users/mrcap/Documents/CV Rodriguez Matias.pdf`.  
Focus: AI/Backend/LLMs. Trading de-emphasized (one brief entry in timeline, not featured in projects).  
Skills to add (not on CV yet): React, Next.js, Supabase.  
Contact: `rodriguez.ma@protonmail.com` · `github.com/alexmnotfound`  
LinkedIn URL: TBD — replace placeholder before launch.

---

## 7. File Structure

```
my-cv-v2/
├── app/
│   ├── layout.tsx          # root layout, fonts, metadata
│   └── page.tsx            # single page, all sections
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx        # wraps 21st.dev accordion
│   ├── Contact.tsx
│   └── ui/                 # shadcn primitives
├── data/
│   └── content.ts          # all bilingual text
├── context/
│   └── LanguageContext.tsx
├── public/
│   └── cv-matias.pdf       # for download button
└── Makefile                # dev (port 3013), deploy
```

---

## 8. Out of Scope (v1)

- Blog
- Contact form (links only)
- CMS / dynamic data
- Analytics
