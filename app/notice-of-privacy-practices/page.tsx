import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { Container } from '@/components/ui';
import PageHero from '@/components/PageHero';
import { legalPageBody } from '@/lib/legalPages';

// Reads the package template from disk, so it must render at build time.
export const dynamic = 'force-static';

const title = `Notice of Privacy Practices | ${site.name}`;
const description = `How ${site.name} may use and disclose your protected health information, and your rights regarding it.`;

export const metadata: Metadata = {
  // Absolute: the full facility name, not the short site.shortName the layout's template appends.
  title: { absolute: title },
  description,
  alternates: { canonical: '/notice-of-privacy-practices' },
  openGraph: { title, description, url: '/notice-of-privacy-practices' },
};

export default function NoticeOfPrivacyPracticesPage() {
  const html = legalPageBody('notice-of-privacy-practices');
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Notice of Privacy Practices"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Notice of Privacy Practices' }]}
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
