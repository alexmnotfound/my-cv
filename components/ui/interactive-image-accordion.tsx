'use client'

import { useState } from 'react'

export type AccordionItemData = {
  id: string | number
  title: string
  subtitle: string
  imageUrl: string
  tag?: string
  description?: string
  features?: string[]
}

type AccordionItemProps = {
  item: AccordionItemData
  isActive: boolean
  onMouseEnter: () => void
}

const AccordionItem = ({ item, isActive, onMouseEnter }: AccordionItemProps) => {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out flex-shrink-0
        ${isActive ? 'flex-[4]' : 'flex-[1]'}
      `}
      style={{ minHeight: '420px' }}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = 'https://placehold.co/400x420/0f1015/94a3b8?text=Project'
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />

      {/* Tag badge */}
      {item.tag && (
        <div className="absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-medium"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }}>
          {item.tag}
        </div>
      )}

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className={`text-white font-bold whitespace-nowrap transition-all duration-500
            ${isActive ? 'text-lg opacity-100' : 'text-sm opacity-70 rotate-90 origin-bottom-left translate-x-6 -translate-y-4'}`}
        >
          {item.title}
        </p>
        {isActive && (
          <p className="mt-1 text-[12px] text-white/60 transition-opacity duration-500">
            {item.subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

type LandingAccordionItemProps = {
  items: AccordionItemData[]
  defaultActive?: number
}

export function LandingAccordionItem({ items, defaultActive = 0 }: LandingAccordionItemProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActive)

  return (
    <div className="flex flex-row items-stretch gap-3 w-full" style={{ minHeight: '420px' }}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          onMouseEnter={() => setActiveIndex(index)}
        />
      ))}
    </div>
  )
}
