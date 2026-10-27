import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { Container } from '@/components/ui';
import PageHero from '@/components/PageHero';
import { legalPageBody } from '@/lib/legalPages';

// Reads the package template from disk, so it must render at build time.
export const dynamic = 'force-static';

const title = `SMS Terms | ${site.name}`;
const description = `Terms for text-message communications from ${site.name}: program description, cost, opt-out, and privacy.`;

export const metadata: Metadata = {
  // Absolute: the full facility name, not the short site.shortName the layout's template appends.
  title: { absolute: title },
  description,
  alternates: { canonical: '/sms-terms' },
  openGraph: { title, description, url: '/sms-terms' },
};

export default function SmsTermsPage() {
  const html = legalPageBody('sms-terms');
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="SMS Terms"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'SMS Terms' }]}
      />

      <section className="section">
        <Container>
          {/* suppressHydrationWarning: CTM rewrites the phone link inside. */}
          <div
            className="article-html mx-auto max-w-prose"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>
      </section>
    </>
  );
}
