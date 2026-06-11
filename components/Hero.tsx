'use client'

import Image from 'next/image'
import { useLang } from '@/context/LanguageContext'

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <section
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden px-8 border-b"
      style={{ borderColor: 'var(--cv-border)' }}
    >
      {/* Orbs */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(148,163,184,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(100,116,139,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(var(--cv-border) 1px, transparent 1px), linear-gradient(90deg, var(--cv-border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1080px] w-full flex items-center justify-between gap-16 flex-wrap py-20">

        {/* Left */}
        <div className="flex-1 min-w-[280px]">
          {/* Available badge */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] tracking-wider"
            style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)', color: 'var(--cv-accent)' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            {h.available}
          </div>

          <h1
            className="mb-2 font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(44px, 6vw, 72px)', color: 'var(--cv-heading)' }}
          >
            Matías<br />
            <span style={{ color: 'var(--cv-accent)', fontWeight: 300 }}>Rodríguez</span>
          </h1>

          <p className="mb-7 text-[13px] uppercase tracking-[3px]" style={{ color: 'var(--cv-muted)' }}>
            {h.role}
          </p>

          <p className="mb-10 max-w-[460px] text-[15px] leading-relaxed" style={{ color: 'var(--cv-muted)' }}>
            {h.description}
          </p>

          <div className="flex gap-3 flex-wrap">
            <a
              href="#projects"
              className="rounded-lg px-7 py-3 text-[13px] font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: 'var(--cv-heading)', color: 'var(--cv-bg)' }}
            >
              {h.cta_projects}
            </a>
            <a
              href="/cv-matias.pdf"
              download
              className="rounded-lg px-7 py-3 text-[13px] font-medium transition-opacity hover:opacity-80"
              style={{ border: '1px solid var(--cv-border)', color: 'var(--cv-text)' }}
            >
              {h.cta_cv}
            </a>
          </div>
        </div>

        {/* Right — glass stats card */}
        <div
          className="w-[280px] flex-shrink-0 rounded-2xl p-7"
          style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)', backdropFilter: 'blur(12px)' }}
        >
          <div className="mb-4 h-12 w-12 rounded-full overflow-hidden" style={{ border: '1px solid var(--cv-border)' }}>
            <Image src="/profile.png" alt="Matías Rodríguez" width={48} height={48} className="object-cover w-full h-full" />
          </div>
          <p className="text-[14px] font-bold" style={{ color: 'var(--cv-heading)' }}>Matías Rodríguez</p>
          <p className="mb-5 text-[11px]" style={{ color: 'var(--cv-muted)' }}>{h.card_role}</p>

          <div className="mb-4 grid grid-cols-2 gap-2.5">
            {([
              { n: '7+', l: h.stat_python },
              { n: '4+', l: h.stat_go },
              { n: '10+', l: h.stat_exp },
              { n: '3',   l: h.stat_langs },
            ] as const).map(({ n, l }) => (
              <div
                key={l}
                className="rounded-xl p-2.5"
                style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)' }}
              >
                <div className="text-xl font-black" style={{ color: 'var(--cv-heading)' }}>{n}</div>
                <div className="text-[9px] mt-0.5" style={{ color: 'var(--cv-muted)' }}>{l}</div>
              </div>
            ))}
          </div>

          <a
            href="#skills"
            className="flex items-center justify-center gap-1.5 w-full rounded-xl py-2 text-[11px] font-medium uppercase tracking-wider transition-opacity hover:opacity-80"
            style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)', color: 'var(--cv-muted)' }}
          >
            Ver skills →
          </a>
        </div>

      </div>
    </section>
  )
}
