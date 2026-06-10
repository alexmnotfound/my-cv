'use client'

import { useLang } from '@/context/LanguageContext'

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const f = t.footer

  return (
    <>
      <section id="contact" className="border-b px-8 py-20" style={{ borderColor: 'var(--cv-border)' }}>
        <div className="mx-auto max-w-[1080px]">

          <div className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[3px]" style={{ color: 'var(--cv-muted)' }}>
            {c.section_label}
            <div className="flex-1 h-px" style={{ background: 'var(--cv-border)' }} />
          </div>

          <div className="max-w-[600px]">
            <h2 className="mb-4 text-[36px] font-black leading-tight tracking-tight" style={{ color: 'var(--cv-heading)' }}>
              {c.heading}
            </h2>
            <p className="mb-8 text-[14px] leading-[1.7]" style={{ color: 'var(--cv-muted)' }}>
              {c.body}
            </p>

            <div className="flex flex-col gap-3">
              {c.links.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl px-5 py-4 transition-opacity hover:opacity-80"
                  style={{ background: 'var(--cv-surface)', border: '1px solid var(--cv-border)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg opacity-60">{link.icon}</span>
                    <div>
                      <div className="text-[13px] font-semibold" style={{ color: 'var(--cv-heading)' }}>{link.name}</div>
                      <div className="text-[12px]" style={{ color: 'var(--cv-muted)' }}>{link.handle}</div>
                    </div>
                  </div>
                  <span className="text-base" style={{ color: 'var(--cv-muted)' }}>→</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      <footer className="px-8 py-6" style={{ borderTop: '1px solid var(--cv-border)' }}>
        <div className="mx-auto max-w-[1080px] flex justify-between items-center">
          <span className="text-[12px]" style={{ color: 'var(--cv-muted)' }}>{f.left}</span>
          <span className="text-[12px]" style={{ color: 'var(--cv-muted)' }}>{f.right}</span>
        </div>
      </footer>
    </>
  )
}
