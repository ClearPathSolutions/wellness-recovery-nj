import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      </body>
    </html>
  );
}
