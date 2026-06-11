'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function Hero() {
  const { t } = useLang()
  const h = t.hero
  const [langsOpen, setLangsOpen] = useState(false)
  const [photoOpen, setPhotoOpen] = useState(false)

  return (
    <>
    <section
      id="home"
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

      <div className="relative z-10 mx-auto max-w-[1080px] w-full flex items-stretch justify-between gap-16 flex-wrap py-20">

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
              href="https://drive.google.com/uc?export=download&id=1OB8HqWu4oLFK6oVP498HydNEy8tLmM4a"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-7 py-3 text-[13px] font-medium transition-opacity hover:opacity-80"
              style={{ border: '1px solid var(--cv-border)', color: 'var(--cv-text)', background: 'var(--cv-surface)' }}
            >
              {h.cta_cv}
            </a>
          </div>
        </div>

        {/* Right — glass stats card */}
        <div
          className="w-[280px] flex-shrink-0 mx-auto md:mx-0 rounded-2xl flex flex-col overflow-hidden"
          style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)', backdropFilter: 'blur(12px)' }}
        >
          <button
            onClick={() => setPhotoOpen(true)}
            className="relative block w-full flex-1 min-h-[130px] overflow-hidden transition-opacity hover:opacity-80 focus:outline-none"
            style={{ borderBottom: '1px solid var(--cv-border)' }}
          >
            <Image src="/profile.png" alt="Matías Rodríguez" fill sizes="280px" className="object-cover object-top" />
          </button>
          <div className="p-5 pt-4 flex flex-col">

          <div className="grid grid-cols-2 gap-2.5">
            {([
              { n: '7+',  l: h.stat_python, href: '#experience' },
              { n: '4+',  l: h.stat_go,     href: '#experience' },
              { n: '10+', l: h.stat_exp,    href: '#experience' },
              { n: '3',   l: h.stat_langs,  href: null },
            ] as const).map(({ n, l, href }) =>
              href ? (
                <a
                  key={l}
                  href={href}
                  className="rounded-xl p-2.5 transition-opacity hover:opacity-70 cursor-pointer"
                  style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)', display: 'block' }}
                >
                  <div className="text-xl font-black" style={{ color: 'var(--cv-heading)' }}>{n}</div>
                  <div className="text-[9px] mt-0.5" style={{ color: 'var(--cv-muted)' }}>{l}</div>
                </a>
              ) : (
                <button
                  key={l}
                  onClick={() => setLangsOpen(true)}
                  className="rounded-xl p-2.5 text-left transition-opacity hover:opacity-70 cursor-pointer"
                  style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)' }}
                >
                  <div className="text-xl font-black" style={{ color: 'var(--cv-heading)' }}>{n}</div>
                  <div className="text-[9px] mt-0.5 flex items-center gap-1" style={{ color: 'var(--cv-muted)' }}>{l} <span aria-hidden="true">→</span></div>
                </button>
              )
            )}
          </div>

          </div>

        </div>

      </div>
    </section>

    {/* Languages modal — outside section to escape backdropFilter stacking context */}
    {langsOpen && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={() => setLangsOpen(false)}
        style={{ animation: 'modal-backdrop-in 0.25s ease forwards' }}
      >
        <div
          className="relative w-[320px] rounded-2xl p-7"
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--cv-bg)',
            border: '1px solid var(--cv-border)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
            animation: 'modal-scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          <button
            onClick={() => setLangsOpen(false)}
            className="absolute top-4 right-4 text-[18px] leading-none transition-opacity hover:opacity-60"
            style={{ color: 'var(--cv-muted)' }}
          >
            ×
          </button>
          <p className="mb-5 text-[10px] uppercase tracking-[2px]" style={{ color: 'var(--cv-muted)' }}>
            {h.stat_langs}
          </p>
          <div className="flex flex-col gap-4">
            {h.langs_data.map((lang, i) => (
              <div key={lang.name} style={{ animation: `modal-item-in 0.3s ease ${i * 80}ms both` }}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[13px] font-medium" style={{ color: 'var(--cv-heading)' }}>{lang.name}</span>
                  <span className="text-[11px]" style={{ color: 'var(--cv-muted)' }}>{lang.level}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--cv-border)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${lang.pct}%`,
                      background: 'var(--cv-heading)',
                      animation: `bar-grow 0.6s ease ${i * 80 + 150}ms both`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {photoOpen && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={() => setPhotoOpen(false)}
        style={{ animation: 'modal-backdrop-in 0.25s ease forwards' }}
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
          style={{
            width: 320,
            boxShadow: '0 30px 70px rgba(0,0,0,0.3)',
            animation: 'modal-scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          <Image src="/profile.png" alt="Matías Rodríguez" width={320} height={320} className="w-full h-auto object-cover block" />
        </div>
      </div>
    )}
    </>
  )
}
