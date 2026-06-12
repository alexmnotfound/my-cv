import type { Metadata } from 'next'
import { Inter, Caveat } from 'next/font/google'
import Providers from '@/components/Providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const caveat = Caveat({ subsets: ['latin'], weight: '500', variable: '--font-hand' })

export const metadata: Metadata = {
  title: 'Matías Rodríguez — AI Engineer & Technical Lead',
  description: 'Portfolio of Matías Rodríguez — AI Engineer, Technical Lead. Python, Go, LLMs, multi-agent systems, cloud-native backends.',
  openGraph: {
    title: 'Matías Rodríguez — AI Engineer & Technical Lead',
    description: 'Portfolio of Matías Rodríguez — AI Engineer, Technical Lead. Python, Go, LLMs, multi-agent systems, cloud-native backends.',
    url: 'https://matias-rodriguez.web.app',
    siteName: 'Matías Rodríguez',
    images: [
      {
        url: 'https://matias-rodriguez.web.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Matías Rodríguez — AI Engineer & Technical Lead',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matías Rodríguez — AI Engineer & Technical Lead',
    description: 'Portfolio of Matías Rodríguez — AI Engineer, Technical Lead.',
    images: ['https://matias-rodriguez.web.app/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${caveat.variable}`}>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
