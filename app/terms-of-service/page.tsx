import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { Container } from '@/components/ui';
import PageHero from '@/components/PageHero';
import { legalPageBody } from '@/lib/legalPages';

// Reads the package template from disk, so it must render at build time.
export const dynamic = 'force-static';

const title = `Terms of Service | ${site.name}`;
const description = `Terms of Service governing your access to and use of the ${site.name} website.`;

export const metadata: Metadata = {
  // Absolute: the full facility name, not the short site.shortName the layout's template appends.
  title: { absolute: title },
  description,
  alternates: { canonical: '/terms-of-service' },
  openGraph: { title, description, url: '/terms-of-service' },
};

export default function TermsOfServicePage() {
  const html = legalPageBody('terms-of-service');
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
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
