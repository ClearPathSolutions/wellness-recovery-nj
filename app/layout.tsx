import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { site, widgets } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Clarion from '@/components/Clarion';
import SessionTracker from '@/components/SessionTracker';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz'],
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Addiction & Mental Health Rehab`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    'addiction treatment New Jersey',
    'drug rehab NJ',
    'alcohol rehab NJ',
    'mental health IOP',
    'partial hospitalization program',
    'intensive outpatient program',
    'dual diagnosis treatment',
    'West Windsor rehab',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Addiction & Mental Health Rehab`,
    description: site.description,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: 'US',
    },
    openingHours: 'Mo-Su 00:00-23:59',
    sameAs: [site.social.facebook, site.social.instagram],
  };

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        {/*
          Call-tracking pixel (tctm.co). MUST stay `async` — do not "fix" this
          to a synchronous tag to make the swap land earlier.

          CTM's number scan defaults its root to document.body. A synchronous
          tag executes while the body is still being parsed, so the scan finds
          none of the page's phone numbers and silently no-ops: every visitor
          then sees the hardcoded number and CTM can only guess which web
          session an inbound call belongs to. Confirmed live — a blocking tag
          here left __ctm_tracked_numbers empty on every page.

          There is a second failure on React: a sync tag rewrites numbers
          before hydration, and React then reverts the swap when it replaces
          the server HTML.
        */}
        <script async src={widgets.callTracking.src} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
        {/* Records the visit + ad attribution on every route change */}
        <SessionTracker />
        {/* Clarion chat widget + form-capture loader — mounted once, site-wide */}
        <Clarion />
      </body>
    </html>
  );
}
