# CV Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page bilingual (ES/EN) CV + portfolio site for Matías Rodríguez using Next.js static export, Tailwind, shadcn, and a dark/light slate monochrome theme.

**Architecture:** Single `app/page.tsx` assembles all section components in scroll order. All bilingual text lives in `data/content.ts` keyed `{ es, en }`. A `LanguageContext` provides the active locale to all components. `next-themes` handles dark/light via a `dark` class on `<html>`.

**Tech Stack:** Next.js 15 (App Router, static export), TypeScript, Tailwind CSS v4, shadcn/ui, next-themes, 21st.dev interactive-image-accordion, Firebase Hosting.

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout — ThemeProvider, fonts (Inter), metadata |
| `app/page.tsx` | Assembles all sections in order |
| `app/globals.css` | Tailwind base + CSS variables for dark/light |
| `context/LanguageContext.tsx` | ES/EN toggle context + hook |
| `data/content.ts` | All bilingual text: `{ es: {...}, en: {...} }` |
| `components/Nav.tsx` | Sticky nav — logo, links, lang toggle 🇦🇷/🇺🇸, theme toggle |
| `components/Hero.tsx` | Hero — name, role, desc, CTAs, glass stats card |
| `components/About.tsx` | 2-col — paragraph left, 3 highlight cards right |
| `components/Experience.tsx` | Vertical timeline — role, company, desc, tech tags |
| `components/Skills.tsx` | 3-col cards — category label + skill bars |
| `components/Projects.tsx` | Wraps 21st.dev accordion, maps 3 mock projects |
| `components/Contact.tsx` | Heading + 3 link rows (email, GitHub, LinkedIn) |
| `components/ui/interactive-image-accordion.tsx` | Installed via 21st.dev npx command |
| `public/cv-matias.pdf` | CV file for download button |
| `Makefile` | `dev` (port 3013), `build`, `deploy` targets |
| `next.config.ts` | `output: 'export'`, `trailingSlash: true` |
| `.firebaserc` + `firebase.json` | Firebase Hosting config pointing to `out/` |

---

## Task 1: Scaffold project

**Files:**
- Create: entire project scaffold

- [ ] **Step 1: Run create-next-app**

```bash
cd /Users/mrcap/projects/my-cv-v2
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

- [ ] **Step 2: Install additional dependencies**

```bash
npm install next-themes
npm install -D @types/node
```

- [ ] **Step 3: Init shadcn**

```bash
npx shadcn@latest init --defaults
```

When prompted: choose "New York" style, "zinc" base color (we'll override with slate).

- [ ] **Step 4: Install accordion from 21st.dev**

```bash
npx shadcn@latest add "https://21st.dev/r/minhxthanh/interactive-image-accordion"
```

- [ ] **Step 5: Install lucide-react (accordion dependency)**

```bash
npm install lucide-react
```

- [ ] **Step 6: Configure static export in next.config.ts**

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
```

- [ ] **Step 7: Verify build works**

```bash
npm run build
```

Expected: `out/` directory created with no errors.

- [ ] **Step 8: Create Makefile**

```makefile
PORT := 3013

.PHONY: dev build deploy help

dev: ## Serve locally on port $(PORT)
	npx next dev --port $(PORT)

build: ## Build static export
	npx next build

deploy: ## Deploy to Firebase Hosting
	npm run build && firebase deploy --only hosting

help:
	@grep -E '^[a-zA-Z_-]+:.*##' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*##"}; {printf "  %-10s %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
```

- [ ] **Step 9: Create Firebase config**

```json
// firebase.json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "cleanUrls": true
  }
}
```

```json
// .firebaserc
{
  "projects": {
    "default": "my-cv-v2"
  }
}
```

- [ ] **Step 10: Add .gitignore entries**

```bash
echo ".superpowers/" >> .gitignore
echo "out/" >> .gitignore
```

- [ ] **Step 11: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js project with Tailwind, shadcn, next-themes"
```

---

## Task 2: Global styles + theme setup

**Files:**
- Modify: `app/globals.css`
- Create: `app/layout.tsx`

- [ ] **Step 1: Replace globals.css with slate monochrome theme**

```css
/* app/globals.css */
@import "tailwindcss";

:root {
  --bg: #f8fafc;
  --bg-surface: rgba(0, 0, 0, 0.02);
  --border: rgba(0, 0, 0, 0.07);
  --text: #1e293b;
  --text-muted: rgba(0, 0, 0, 0.35);
  --accent: #64748b;
  --heading: #0f172a;
}

.dark {
  --bg: #07080a;
  --bg-surface: rgba(255, 255, 255, 0.03);
  --border: rgba(255, 255, 255, 0.07);
  --text: #e2e8f0;
  --text-muted: rgba(255, 255, 255, 0.3);
  --accent: #94a3b8;
  --heading: #f8fafc;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Inter', system-ui, sans-serif;
  transition: background-color 0.2s, color 0.2s;
}
```

- [ ] **Step 2: Write layout.tsx with ThemeProvider**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/context/LanguageContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Matías Rodríguez — AI Engineer & Technical Lead',
  description: 'Portfolio of Matías Rodríguez — AI Engineer, Technical Lead. Python, Go, LLMs, Cloud.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        ThemeProvider>
      </body>
    </html>
  )
}
```

Note: `suppressHydrationWarning` is required by `next-themes` to avoid SSR mismatch.

- [ ] **Step 3: Verify dev server starts**

```bash
make dev
```

Open http://localhost:3013 — expect blank white/dark page, no errors.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: global styles + ThemeProvider setup"
```

---

## Task 3: Bilingual content + LanguageContext

**Files:**
- Create: `data/content.ts`
- Create: `context/LanguageContext.tsx`

- [ ] **Step 1: Create content.ts**

```ts
// data/content.ts
export type Lang = 'es' | 'en'

export const content = {
  es: {
    nav: {
      about: 'Sobre mí',
      experience: 'Experiencia',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      available: 'Disponible para trabajar',
      role: 'AI Engineer · Technical Lead · Backend',
      description:
        'Diseño y construyo sistemas backend escalables impulsados por IA. Especializado en LLMs, APIs de ML y arquitecturas cloud-native.',
      cta_projects: 'Ver proyectos',
      cta_cv: 'Descargar CV',
      card_role: 'AI Engineer & Tech Lead · Argentina',
      stat_python: 'años Python',
      stat_go: 'años Go',
      stat_exp: 'años exp.',
      stat_langs: 'idiomas',
    },
    about: {
      section_label: '01 — Sobre mí',
      heading: 'Backend engineer con foco en IA aplicada',
      body: 'Especializado en construir sistemas escalables que integran LLMs y servicios de ML. Trabajo principalmente en Python y Go, con experiencia liderando equipos técnicos y colaborando con producto y datos.',
      highlights: [
        {
          icon: '🤖',
          title: 'AI & LLMs',
          desc: 'Chatbots, agentes y pipelines de automatización con GPT, Claude y modelos locales.',
        },
        {
          icon: '⚙️',
          title: 'Backend Scalable',
          desc: 'APIs REST/gRPC en Python/Go. Arquitecturas event-driven, microservicios, IaC.',
        },
        {
          icon: '☁️',
          title: 'Cloud & DevOps',
          desc: 'AWS (Lambda, S3, DynamoDB), GCP, Terraform, Docker, CI/CD.',
        },
      ],
    },
    experience: {
      section_label: '02 — Experiencia',
      items: [
        {
          role: 'AI Engineer — Guest Experience Automation',
          company: 'Sonder',
          period: 'Abr 2025 – Nov 2025',
          desc: 'LLM-based chatbots para automatizar operaciones de huéspedes e integración con APIs cloud.',
          tags: ['Python', 'LLMs', 'AWS', 'GCP'],
        },
        {
          role: 'Technical Lead — AI Projects',
          company: 'Slingr',
          period: 'Dic 2021 – Ene 2025',
          desc: 'Lideré equipo en herramientas AI. ML APIs para image/video recognition, speech-to-text, text analysis.',
          tags: ['Python', 'Go', 'JavaScript', 'ML APIs'],
        },
        {
          role: 'Trader & Developer',
          company: 'Freelance',
          period: 'Feb 2020 – presente',
          desc: 'Desarrollo de algoritmos de trading y automatización de estrategias.',
          tags: ['Python', 'Backtesting'],
        },
        {
          role: 'Technical & Functional ERP Consultant',
          company: 'Softland & Freelance',
          period: 'Jul 2015 – Ene 2021',
          desc: 'Consultoría, implementación de ERP y scripts de automatización para múltiples clientes.',
          tags: ['ERP', 'SQL', 'Python'],
        },
      ],
    },
    skills: {
      section_label: '03 — Skills',
      categories: [
        {
          label: 'Lenguajes',
          items: [
            { name: 'Python', level: 95 },
            { name: 'Go', level: 80 },
            { name: 'TypeScript', level: 70 },
          ],
        },
        {
          label: 'AI / ML',
          items: [
            { name: 'LLMs / Agents', level: 90 },
            { name: 'FastAPI', level: 88 },
            { name: 'Next.js', level: 72 },
          ],
        },
        {
          label: 'Cloud & Infra',
          items: [
            { name: 'AWS', level: 85 },
            { name: 'GCP', level: 75 },
            { name: 'Terraform', level: 70 },
          ],
        },
      ],
    },
    projects: {
      section_label: '04 — Proyectos',
      items: [
        {
          id: 'chatbot',
          tag: 'AI · LLMs',
          title: 'AI Chatbot Platform',
          subtitle: 'Python · GPT-4 · AWS · FastAPI',
          description:
            'Plataforma de automatización de soporte basada en LLMs. Reduce el volumen de tickets en un 40% mediante agentes conversacionales contextuales.',
          features: ['Agentes LLM multi-turn', 'Integración con APIs de CRM', 'Dashboard de métricas', 'Fallback a agente humano'],
          image: '/projects/chatbot.jpg',
        },
        {
          id: 'trading',
          tag: 'Algo Trading',
          title: 'Trading Bot Engine',
          subtitle: 'Python · Backtesting · AWS Lambda',
          description:
            'Motor de estrategias algorítmicas con backtester integrado. Soporta múltiples exchanges y timeframes con ejecución serverless.',
          features: ['Backtesting histórico', 'Múltiples estrategias', 'Risk management', 'Alertas en tiempo real'],
          image: '/projects/trading.jpg',
        },
        {
          id: 'saas',
          tag: 'Full-stack SaaS',
          title: 'SaaS Platform',
          subtitle: 'Next.js · Supabase · TypeScript',
          description:
            'Plataforma SaaS con auth, dashboard y gestión de datos en tiempo real. Arquitectura full-stack con Row Level Security en Supabase.',
          features: ['Auth con roles', 'Dashboard en tiempo real', 'API REST + WebSockets', 'Deploy en Vercel'],
          image: '/projects/saas.jpg',
        },
      ],
    },
    contact: {
      section_label: '05 — Contacto',
      heading: 'Trabajemos juntos',
      body: 'Abierto a roles remotos, proyectos freelance y consultoría en AI/Backend. Respuesta rápida garantizada.',
      links: [
        { icon: '✉️', name: 'Email', handle: 'rodriguez.ma@protonmail.com', href: 'mailto:rodriguez.ma@protonmail.com' },
        { icon: '🐙', name: 'GitHub', handle: 'github.com/alexmnotfound', href: 'https://github.com/alexmnotfound' },
        { icon: '💼', name: 'LinkedIn', handle: 'linkedin.com/in/matias-rodriguez', href: 'https://linkedin.com/in/matias-rodriguez' },
      ],
    },
    footer: {
      left: '© 2026 Matías Rodríguez',
      right: 'Built with Next.js',
    },
  },
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      available: 'Available for work',
      role: 'AI Engineer · Technical Lead · Backend',
      description:
        'I design and build scalable AI-powered backend systems. Specialized in LLMs, ML APIs, and cloud-native architectures.',
      cta_projects: 'View projects',
      cta_cv: 'Download CV',
      card_role: 'AI Engineer & Tech Lead · Argentina',
      stat_python: 'yrs Python',
      stat_go: 'yrs Go',
      stat_exp: 'yrs exp.',
      stat_langs: 'languages',
    },
    about: {
      section_label: '01 — About',
      heading: 'Backend engineer focused on applied AI',
      body: 'Specialized in building scalable systems that integrate LLMs and ML services. Primarily working in Python and Go, with experience leading technical teams and collaborating with product and data.',
      highlights: [
        {
          icon: '🤖',
          title: 'AI & LLMs',
          desc: 'Chatbots, agents, and automation pipelines with GPT, Claude, and local models.',
        },
        {
          icon: '⚙️',
          title: 'Scalable Backend',
          desc: 'REST/gRPC APIs in Python/Go. Event-driven architectures, microservices, IaC.',
        },
        {
          icon: '☁️',
          title: 'Cloud & DevOps',
          desc: 'AWS (Lambda, S3, DynamoDB), GCP, Terraform, Docker, CI/CD.',
        },
      ],
    },
    experience: {
      section_label: '02 — Experience',
      items: [
        {
          role: 'AI Engineer — Guest Experience Automation',
          company: 'Sonder',
          period: 'Apr 2025 – Nov 2025',
          desc: 'LLM-based chatbots to automate guest operations and integrate with cloud APIs.',
          tags: ['Python', 'LLMs', 'AWS', 'GCP'],
        },
        {
          role: 'Technical Lead — AI Projects',
          company: 'Slingr',
          period: 'Dec 2021 – Jan 2025',
          desc: 'Led AI tooling team. ML APIs for image/video recognition, speech-to-text, text analysis.',
          tags: ['Python', 'Go', 'JavaScript', 'ML APIs'],
        },
        {
          role: 'Trader & Developer',
          company: 'Freelance',
          period: 'Feb 2020 – present',
          desc: 'Developed algorithmic trading strategies and automation tools.',
          tags: ['Python', 'Backtesting'],
        },
        {
          role: 'Technical & Functional ERP Consultant',
          company: 'Softland & Freelance',
          period: 'Jul 2015 – Jan 2021',
          desc: 'ERP consulting, implementation, and automation scripts for multiple clients.',
          tags: ['ERP', 'SQL', 'Python'],
        },
      ],
    },
    skills: {
      section_label: '03 — Skills',
      categories: [
        {
          label: 'Languages',
          items: [
            { name: 'Python', level: 95 },
            { name: 'Go', level: 80 },
            { name: 'TypeScript', level: 70 },
          ],
        },
        {
          label: 'AI / ML',
          items: [
            { name: 'LLMs / Agents', level: 90 },
            { name: 'FastAPI', level: 88 },
            { name: 'Next.js', level: 72 },
          ],
        },
        {
          label: 'Cloud & Infra',
          items: [
            { name: 'AWS', level: 85 },
            { name: 'GCP', level: 75 },
            { name: 'Terraform', level: 70 },
          ],
        },
      ],
    },
    projects: {
      section_label: '04 — Projects',
      items: [
        {
          id: 'chatbot',
          tag: 'AI · LLMs',
          title: 'AI Chatbot Platform',
          subtitle: 'Python · GPT-4 · AWS · FastAPI',
          description:
            'LLM-based support automation platform. Reduces ticket volume by 40% through contextual conversational agents.',
          features: ['Multi-turn LLM agents', 'CRM API integration', 'Metrics dashboard', 'Human agent fallback'],
          image: '/projects/chatbot.jpg',
        },
        {
          id: 'trading',
          tag: 'Algo Trading',
          title: 'Trading Bot Engine',
          subtitle: 'Python · Backtesting · AWS Lambda',
          description:
            'Algorithmic strategy engine with integrated backtester. Supports multiple exchanges and timeframes with serverless execution.',
          features: ['Historical backtesting', 'Multiple strategies', 'Risk management', 'Real-time alerts'],
          image: '/projects/trading.jpg',
        },
        {
          id: 'saas',
          tag: 'Full-stack SaaS',
          title: 'SaaS Platform',
          subtitle: 'Next.js · Supabase · TypeScript',
          description:
            'SaaS platform with auth, dashboard, and real-time data management. Full-stack with Row Level Security on Supabase.',
          features: ['Role-based auth', 'Real-time dashboard', 'REST API + WebSockets', 'Vercel deploy'],
          image: '/projects/saas.jpg',
        },
      ],
    },
    contact: {
      section_label: '05 — Contact',
      heading: "Let's work together",
      body: 'Open to remote roles, freelance projects, and AI/Backend consulting. Fast response guaranteed.',
      links: [
        { icon: '✉️', name: 'Email', handle: 'rodriguez.ma@protonmail.com', href: 'mailto:rodriguez.ma@protonmail.com' },
        { icon: '🐙', name: 'GitHub', handle: 'github.com/alexmnotfound', href: 'https://github.com/alexmnotfound' },
        { icon: '💼', name: 'LinkedIn', handle: 'linkedin.com/in/matias-rodriguez', href: 'https://linkedin.com/in/matias-rodriguez' },
      ],
    },
    footer: {
      left: '© 2026 Matías Rodríguez',
      right: 'Built with Next.js',
    },
  },
} as const
```

- [ ] **Step 2: Create LanguageContext.tsx**

```tsx
// context/LanguageContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { content, Lang } from '@/data/content'

type LanguageContextType = {
  lang: Lang
  t: typeof content['es']
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  const toggleLang = () => setLang(l => (l === 'es' ? 'en' : 'es'))

  return (
    <LanguageContext.Provider value={{ lang, t: content[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add data/content.ts context/LanguageContext.tsx
git commit -m "feat: bilingual content data + LanguageContext"
```

---

## Task 4: Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create Nav.tsx**

```tsx
// components/Nav.tsx
'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'

const NAV_IDS = ['about', 'experience', 'projects', 'contact'] as const

export default function Nav() {
  const { t, lang, toggleLang } = useLang()
  const { theme, setTheme } = useTheme()

  const navLabels = [t.nav.about, t.nav.experience, t.nav.projects, t.nav.contact]

  return (
    <nav className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ background: 'rgba(var(--bg-rgb, 7 8 10) / 0.85)', borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-[1080px] px-8 py-3.5 flex items-center justify-between">

        {/* Logo */}
        <span className="text-[13px] font-black tracking-[3px]" style={{ color: 'var(--heading)' }}>
          MR
        </span>

        {/* Links */}
        <div className="hidden md:flex gap-8">
          {NAV_IDS.map((id, i) => (
            <a key={id} href={`#${id}`}
              className="text-[11px] uppercase tracking-widest transition-colors hover:opacity-100"
              style={{ color: 'var(--text-muted)' }}>
              {navLabels[i]}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <div className="flex gap-0.5 rounded-lg p-0.5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <button onClick={toggleLang}
              className={`px-1.5 py-1 rounded-md text-base transition-all ${lang === 'es' ? 'opacity-100' : 'opacity-30'}`}
              style={lang === 'es' ? { background: 'var(--bg-surface)' } : {}}
              aria-label="Español">
              🇦🇷
            </button>
            <button onClick={toggleLang}
              className={`px-1.5 py-1 rounded-md text-base transition-all ${lang === 'en' ? 'opacity-100' : 'opacity-30'}`}
              style={lang === 'en' ? { background: 'var(--bg-surface)' } : {}}
              aria-label="English">
              🇺🇸
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg transition-colors hover:opacity-80"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
            aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Add Nav to page.tsx temporarily and verify**

```tsx
// app/page.tsx
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main>
      <Nav />
      <div style={{ height: '200vh', padding: '2rem', color: 'var(--text)' }}>
        Scaffold — sections coming soon
      </div>
    </main>
  )
}
```

```bash
make dev
```

Open http://localhost:3013 — verify Nav renders, lang toggle switches, theme toggle flips dark/light.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx app/page.tsx
git commit -m "feat: Nav component with lang + theme toggle"
```

---

## Task 5: Hero section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
// components/Hero.tsx
'use client'

import { useLang } from '@/context/LanguageContext'

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden px-8 border-b"
      style={{ borderColor: 'var(--border)' }}>

      {/* Orbs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(148,163,184,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(100,116,139,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* Grid bg */}
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 mx-auto max-w-[1080px] w-full flex items-center justify-between gap-16 flex-wrap">

        {/* Left */}
        <div className="flex-1 min-w-[280px]">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] tracking-wider"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--accent)' }}>
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            {h.available}
          </div>

          <h1 className="mb-1.5 text-[clamp(44px,6vw,72px)] font-black leading-none tracking-tight"
            style={{ color: 'var(--heading)' }}>
            Matías<br />
            <span style={{ color: 'var(--accent)', fontWeight: 300 }}>Rodríguez</span>
          </h1>

          <p className="mb-7 text-[13px] uppercase tracking-[3px]" style={{ color: 'var(--text-muted)' }}>
            {h.role}
          </p>

          <p className="mb-10 max-w-[460px] text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {h.description}
          </p>

          <div className="flex gap-3 flex-wrap">
            <a href="#projects"
              className="rounded-lg px-7 py-3 text-[13px] font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: 'var(--heading)', color: 'var(--bg)' }}>
              {h.cta_projects}
            </a>
            <a href="/cv-matias.pdf" download
              className="rounded-lg px-7 py-3 text-[13px] font-medium transition-opacity hover:opacity-80"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}>
              {h.cta_cv}
            </a>
          </div>
        </div>

        {/* Right — glass card */}
        <div className="w-[280px] flex-shrink-0 rounded-2xl p-7"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', backdropFilter: 'blur(12px)' }}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full text-[16px] font-black"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--heading)' }}>
            MR
          </div>
          <p className="text-[14px] font-bold" style={{ color: 'var(--heading)' }}>Matías Rodríguez</p>
          <p className="mb-5 text-[11px]" style={{ color: 'var(--text-muted)' }}>{h.card_role}</p>

          <div className="mb-4 grid grid-cols-2 gap-2.5">
            {[
              { n: '6+', l: h.stat_python },
              { n: '3+', l: h.stat_go },
              { n: '10+', l: h.stat_exp },
              { n: '3', l: h.stat_langs },
            ].map(({ n, l }) => (
              <div key={l} className="rounded-xl p-2.5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <div className="text-xl font-black" style={{ color: 'var(--heading)' }}>{n}</div>
                <div className="text-[9px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{l}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['LLMs', 'FastAPI', 'Next.js', 'AWS', 'Supabase'].map(tag => (
              <span key={tag} className="rounded text-[10px] px-2 py-0.5"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--accent)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to page.tsx and verify**

```tsx
// app/page.tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
    </main>
  )
}
```

Check http://localhost:3013 — orbs visible, glass card on right, CTAs work, theme toggle updates hero colors.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: Hero section with glass card and CTAs"
```

---

## Task 6: About section

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Create About.tsx**

```tsx
// components/About.tsx
'use client'

import { useLang } from '@/context/LanguageContext'

export default function About() {
  const { t } = useLang()
  const a = t.about

  return (
    <section id="about" className="border-b px-8 py-20" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-[1080px]">

        {/* Section label */}
        <div className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[3px]"
          style={{ color: 'var(--text-muted)' }}>
          {a.section_label}
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <h2 className="mb-5 text-[36px] font-black leading-tight tracking-tight"
              style={{ color: 'var(--heading)' }}>
              {a.heading}
            </h2>
            <p className="text-[14px] leading-[1.9]" style={{ color: 'var(--text-muted)' }}>
              {a.body}
            </p>
          </div>

          {/* Right — highlights */}
          <div className="flex flex-col gap-4">
            {a.highlights.map((h) => (
              <div key={h.title} className="flex gap-4 items-start rounded-xl p-5"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <span className="text-xl flex-shrink-0 mt-0.5">{h.icon}</span>
                <div>
                  <div className="mb-1 text-[13px] font-bold" style={{ color: 'var(--heading)' }}>{h.title}</div>
                  <div className="text-[12px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{h.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/About.tsx app/page.tsx
git commit -m "feat: About section"
```

---

## Task 7: Experience section

**Files:**
- Create: `components/Experience.tsx`

- [ ] **Step 1: Create Experience.tsx**

```tsx
// components/Experience.tsx
'use client'

import { useLang } from '@/context/LanguageContext'

export default function Experience() {
  const { t } = useLang()
  const e = t.experience

  return (
    <section id="experience" className="border-b px-8 py-20" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-[1080px]">

        <div className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[3px]"
          style={{ color: 'var(--text-muted)' }}>
          {e.section_label}
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        <div className="flex flex-col">
          {e.items.map((item, i) => (
            <div key={i} className="grid pb-10" style={{ gridTemplateColumns: '200px 1px 1fr', gap: '0 28px' }}>

              {/* Date */}
              <div className="text-right text-[11px] tracking-wide pt-1" style={{ color: 'var(--text-muted)' }}>
                {item.period}
              </div>

              {/* Line */}
              <div className="relative" style={{ background: 'var(--border)' }}>
                <div className="absolute -left-[3px] top-1 h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
              </div>

              {/* Content */}
              <div>
                <div className="mb-0.5 text-[15px] font-bold" style={{ color: 'var(--heading)' }}>{item.role}</div>
                <div className="mb-2.5 text-[12px]" style={{ color: 'var(--text-muted)' }}>{item.company}</div>
                <div className="mb-3 text-[13px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>{item.desc}</div>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(tag => (
                    <span key={tag} className="rounded text-[10px] px-2 py-0.5"
                      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<Experience />` after `<About />` in `app/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/Experience.tsx app/page.tsx
git commit -m "feat: Experience timeline section"
```

---

## Task 8: Skills section

**Files:**
- Create: `components/Skills.tsx`

- [ ] **Step 1: Create Skills.tsx**

```tsx
// components/Skills.tsx
'use client'

import { useLang } from '@/context/LanguageContext'

export default function Skills() {
  const { t } = useLang()
  const s = t.skills

  return (
    <section id="skills" className="border-b px-8 py-20" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-[1080px]">

        <div className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[3px]"
          style={{ color: 'var(--text-muted)' }}>
          {s.section_label}
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {s.categories.map(cat => (
            <div key={cat.label} className="rounded-2xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <div className="mb-4 text-[10px] uppercase tracking-[2px]" style={{ color: 'var(--text-muted)' }}>
                {cat.label}
              </div>
              <div className="flex flex-col gap-3">
                {cat.items.map(skill => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="text-[13px]" style={{ color: 'var(--text)' }}>{skill.name}</span>
                    <div className="w-20 h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${skill.level}%`, background: 'var(--heading)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify**

Add `<Skills />` after `<Experience />` in `app/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/Skills.tsx app/page.tsx
git commit -m "feat: Skills section with progress bars"
```

---

## Task 9: Projects accordion

**Files:**
- Create: `components/Projects.tsx`
- Create: `public/projects/chatbot.jpg`, `trading.jpg`, `saas.jpg` (placeholder images)

- [ ] **Step 1: Verify accordion component was installed**

```bash
ls components/ui/interactive-image-accordion.tsx
```

If missing, re-run:
```bash
npx shadcn@latest add "https://21st.dev/r/minhxthanh/interactive-image-accordion"
```

- [ ] **Step 2: Create placeholder project images**

Download 3 dark abstract placeholder images from Unsplash (no login needed):

```bash
mkdir -p public/projects
curl -L "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80" -o public/projects/chatbot.jpg
curl -L "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80" -o public/projects/trading.jpg
curl -L "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" -o public/projects/saas.jpg
```

- [ ] **Step 3: Inspect the accordion component API**

```bash
head -60 components/ui/interactive-image-accordion.tsx
```

Note the props interface — typically expects `items` array with `title`, `image`, `description`, etc. Adapt the Projects component below to match the actual props.

- [ ] **Step 4: Create Projects.tsx**

```tsx
// components/Projects.tsx
'use client'

import { useLang } from '@/context/LanguageContext'
import { LandingAccordionItem } from '@/components/ui/interactive-image-accordion'

export default function Projects() {
  const { t } = useLang()
  const p = t.projects

  return (
    <section id="projects" className="border-b px-8 py-20" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-[1080px]">

        <div className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[3px]"
          style={{ color: 'var(--text-muted)' }}>
          {p.section_label}
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        <LandingAccordionItem />

      </div>
    </section>
  )
}
```

Note: After seeing the accordion component's actual API (step 3), replace `<LandingAccordionItem />` with the correct usage passing `p.items` data. The accordion expects at minimum `title`, `image`, and a description or similar. Map `p.items` accordingly.

- [ ] **Step 5: Add to page.tsx and verify accordion renders**

Add `<Projects />` after `<Skills />` in `app/page.tsx`. Check that the accordion expands panels on hover/click.

- [ ] **Step 6: Commit**

```bash
git add components/Projects.tsx public/projects/ app/page.tsx
git commit -m "feat: Projects accordion section with mock data"
```

---

## Task 10: Contact + Footer

**Files:**
- Create: `components/Contact.tsx`

- [ ] **Step 1: Create Contact.tsx (includes footer)**

```tsx
// components/Contact.tsx
'use client'

import { useLang } from '@/context/LanguageContext'

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const f = t.footer

  return (
    <>
      <section id="contact" className="border-b px-8 py-20" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-[1080px]">

          <div className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[3px]"
            style={{ color: 'var(--text-muted)' }}>
            {c.section_label}
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <div className="max-w-[600px]">
            <h2 className="mb-4 text-[36px] font-black leading-tight tracking-tight"
              style={{ color: 'var(--heading)' }}>
              {c.heading}
            </h2>
            <p className="mb-8 text-[14px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
              {c.body}
            </p>

            <div className="flex flex-col gap-3">
              {c.links.map(link => (
                <a key={link.name} href={link.href}
                  className="flex items-center justify-between rounded-xl px-5 py-4 transition-opacity hover:opacity-80"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg opacity-60">{link.icon}</span>
                    <div>
                      <div className="text-[13px] font-semibold" style={{ color: 'var(--heading)' }}>{link.name}</div>
                      <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{link.handle}</div>
                    </div>
                  </div>
                  <span className="text-base" style={{ color: 'var(--text-muted)' }}>→</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      <footer className="px-8 py-6" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto max-w-[1080px] flex justify-between items-center">
          <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{f.left}</span>
          <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{f.right}</span>
        </div>
      </footer>
    </>
  )
}
```

- [ ] **Step 2: Finalize page.tsx**

```tsx
// app/page.tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 3: Full visual check**

```bash
make dev
```

Walk through all sections at http://localhost:3013:
- Nav smooth-scrolls to each section
- Lang toggle re-renders all text in ES/EN
- Theme toggle flips dark/light everywhere
- All sections render without hydration errors (check browser console)

- [ ] **Step 4: Commit**

```bash
git add components/Contact.tsx app/page.tsx
git commit -m "feat: Contact section + footer — complete single page"
```

---

## Task 11: Build + Firebase deploy

**Files:**
- Modify: `.firebaserc` (add real project ID if needed)

- [ ] **Step 1: Copy CV PDF to public**

```bash
cp "/Users/mrcap/Documents/CV Rodriguez Matias.pdf" public/cv-matias.pdf
```

- [ ] **Step 2: Run production build**

```bash
make build
```

Expected: `out/` directory created, no TypeScript or build errors.

- [ ] **Step 3: Verify static output**

```bash
ls out/
```

Expected: `index.html`, `_next/`, `cv-matias.pdf`, `projects/`.

- [ ] **Step 4: Firebase login + init (first time only)**

```bash
firebase login
firebase init hosting
```

When prompted:
- Public directory: `out`
- Single-page app: `No` (Next.js static export has its own routing)
- Overwrite `out/index.html`: `No`

- [ ] **Step 5: Deploy**

```bash
make deploy
```

- [ ] **Step 6: Final commit**

```bash
git add .firebaserc firebase.json Makefile
git commit -m "feat: Firebase deploy config + Makefile"
```

---

## Self-Review Notes

- **Spec coverage:** All 6 sections (Nav, Hero, About, Experience, Skills, Projects, Contact) covered. Dark/light theme via `next-themes` covered in Task 2. Bilingual ES/EN via `LanguageContext` covered in Task 3. Static export + Firebase deploy in Task 11. ✓
- **Accordion API:** Task 9 Step 3 explicitly reads the accordion component before using it — avoids prop mismatch.
- **LinkedIn URL:** Placeholder `linkedin.com/in/matias-rodriguez` in `content.ts` — replace with real URL before deploy.
- **next-themes hydration:** `suppressHydrationWarning` on `<html>` included in layout.tsx. ✓
- **CSS variables:** All components use `style={{ color: 'var(--heading)' }}` pattern — consistent across tasks. ✓
