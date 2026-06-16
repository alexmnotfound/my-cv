'use client'

import { Mail, MessageCircle, GitBranch, Link, LucideIcon } from 'lucide-react'
import { useLang } from '@/context/LanguageContext'
import DigitalSignature from '@/components/DigitalSignature'

const ICON_MAP: Record<string, LucideIcon> = {
  Email: Mail,
  WhatsApp: MessageCircle,
  GitHub: GitBranch,
  LinkedIn: Link,
}

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const f = t.footer

  return (
    <footer id="contact" style={{ borderTop: '1px solid var(--cv-border)' }}>

      <div className="px-8 py-16 mx-auto max-w-[1080px]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">

          {/* Left */}
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[3px]" style={{ color: 'var(--cv-muted)' }}>
              {c.section_label}
            </p>
            <h2 className="text-[36px] font-black leading-tight tracking-tight" style={{ color: 'var(--cv-heading)' }}>
              {c.heading}
            </h2>
            <DigitalSignature />
          </div>

          {/* Right — contact links */}
          <div className="flex flex-col min-w-[300px]">
            {c.links.map(({ href, name, handle }) => {
              const Icon = ICON_MAP[name] ?? Link
              return (
                <a
                  key={name}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 transition-opacity hover:opacity-60"
                  style={{ borderBottom: '1px solid var(--cv-border)' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0"
                      style={{ border: '1px solid var(--cv-border)', color: 'var(--cv-muted)' }}
                    >
                      <Icon size={14} />
                    </div>
                    <div>
                      <div className="text-[13px] font-medium" style={{ color: 'var(--cv-heading)' }}>{name}</div>
                      <div className="text-[11px]" style={{ color: 'var(--cv-muted)' }}>{handle}</div>
                    </div>
                  </div>
                  <span className="text-[12px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: 'var(--cv-muted)' }}>↗</span>
                </a>
              )
            })}
          </div>

        </div>
      </div>

      <div className="px-8 py-4 mx-auto max-w-[1080px] flex justify-between items-center" style={{ borderTop: '1px solid var(--cv-border)' }}>
        <span className="text-[11px]" style={{ color: 'var(--cv-muted)' }}>{f.left}</span>
        <span className="text-[11px]" style={{ color: 'var(--cv-muted)' }}>{f.right}</span>
      </div>

    </footer>
  )
}
