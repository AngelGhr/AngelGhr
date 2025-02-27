import '@root/global.css'
import { Inter } from '@next/font/google'
import LocalFont from '@next/font/local'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    default: 'AngelGhr',
    template: '%s | AngelGhr',
  },
  description: 'Small platform to display personal projects, tools and 3D models.',
  openGraph: {
    title: 'AngelGhr',
    description: 'Small platform to display personal projects, tools and 3D models.',
    url: 'https://angelghr.de',
    siteName: 'AngelGhr',
    images: [
      {
        url: 'https://angelghr.de/og.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-UK',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'angelghr',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.png',
  },
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const calSans = LocalFont({
  src: '../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' className={[inter.variable, calSans.variable].join(' ')}>
      <head>
        <script src="https://cookiechimp.com/widget/ZpMtZPM.js"></script>
        <meta name='google-adsense-account' content='ca-pub-1988332417674550' />
        <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1988332417674550' crossOrigin='anonymous' />
      </head>
      <body className='bg-black'>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
