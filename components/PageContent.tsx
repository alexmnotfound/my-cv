'use client'

import { useNavMode } from '@/context/NavModeContext'

export default function PageContent({ children }: { children: React.ReactNode }) {
  const { navMode } = useNavMode()

  const marginLeft = navMode === 'top' ? '0px' : navMode === 'sidebar' ? '240px' : '60px'

  return (
    <div style={{ marginLeft, transition: 'margin-left 0.3s ease' }}>
      {children}
    </div>
  )
}
