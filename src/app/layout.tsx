import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { LogoSprite } from '@/components/ui/logo-sprite';
import { RevealObserver } from '@/components/ui/reveal-observer';
import { SiteEffects } from '@/components/ui/site-effects';
import { brandColors } from '@/config/brand-colors';
import { site } from '@/config/site';
import { graph, organizationLd, SITE_URL, websiteLd } from '@/lib/seo';
import { StoreProvider } from '@/store/StoreProvider';
import '@/styles/globals.css';
import { dmSans, inter } from './fonts';

const DEFAULT_TITLE = 'MaamulPlus: Business management software for Somaliland';
const DEFAULT_DESCRIPTION =
  'MaamulPlus is business management software for traders in Somaliland: sales, stock, credit, payments and accounting in USD and SLSH, in two editions.';

const google = process.env.GOOGLE_SITE_VERIFICATION;
const bing = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: '%s · MaamulPlus' },
  description: DEFAULT_DESCRIPTION,
  applicationName: site.name,
  keywords: [
    'business management software Somaliland',
    'ERP Somaliland',
    'inventory and accounting software Hargeisa',
    'MaamulPlus',
  ],
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: '/', languages: { en: '/', 'x-default': '/' } },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    ...(site.twitterHandle ? { site: site.twitterHandle } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: {
    ...(google ? { google } : {}),
    ...(bing ? { other: { 'msvalidate.01': bing } } : {}),
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: brandColors.bg.light },
    { media: '(prefers-color-scheme: dark)', color: brandColors.bg.dark },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${inter.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <StoreProvider>
            <LogoSprite />
            {children}
            <RevealObserver />
            <SiteEffects />
          </StoreProvider>
        </ThemeProvider>
        <JsonLd data={graph(organizationLd(), websiteLd())} />
      </body>
    </html>
  );
}
