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
          imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
        },
        {
          id: 'trading',
          tag: 'Algo Trading',
          title: 'Trading Bot Engine',
          subtitle: 'Python · Backtesting · AWS Lambda',
          description:
            'Motor de estrategias algorítmicas con backtester integrado. Soporta múltiples exchanges y timeframes con ejecución serverless.',
          features: ['Backtesting histórico', 'Múltiples estrategias', 'Risk management', 'Alertas en tiempo real'],
          imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
        },
        {
          id: 'saas',
          tag: 'Full-stack SaaS',
          title: 'SaaS Platform',
          subtitle: 'Next.js · Supabase · TypeScript',
          description:
            'Plataforma SaaS con auth, dashboard y gestión de datos en tiempo real. Arquitectura full-stack con Row Level Security en Supabase.',
          features: ['Auth con roles', 'Dashboard en tiempo real', 'API REST + WebSockets', 'Deploy en Vercel'],
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
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
          imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
        },
        {
          id: 'trading',
          tag: 'Algo Trading',
          title: 'Trading Bot Engine',
          subtitle: 'Python · Backtesting · AWS Lambda',
          description:
            'Algorithmic strategy engine with integrated backtester. Supports multiple exchanges and timeframes with serverless execution.',
          features: ['Historical backtesting', 'Multiple strategies', 'Risk management', 'Real-time alerts'],
          imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
        },
        {
          id: 'saas',
          tag: 'Full-stack SaaS',
          title: 'SaaS Platform',
          subtitle: 'Next.js · Supabase · TypeScript',
          description:
            'SaaS platform with auth, dashboard, and real-time data management. Full-stack with Row Level Security on Supabase.',
          features: ['Role-based auth', 'Real-time dashboard', 'REST API + WebSockets', 'Vercel deploy'],
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
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
