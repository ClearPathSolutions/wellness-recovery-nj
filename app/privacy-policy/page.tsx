import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { Container } from '@/components/ui';
import PageHero from '@/components/PageHero';
import { legalPageBody } from '@/lib/legalPages';

// Reads the package template from disk, so it must render at build time.
export const dynamic = 'force-static';

const title = `Privacy Policy | ${site.name}`;
const description = `How ${site.name} collects, uses, discloses, and protects information you provide through our website and when you contact us.`;

export const metadata: Metadata = {
  // Absolute: the full facility name, not the short site.shortName the layout's template appends.
  title: { absolute: title },
  description,
  alternates: { canonical: '/privacy-policy' },
  openGraph: { title, description, url: '/privacy-policy' },
};

export default function PrivacyPage() {
  const html = legalPageBody('privacy-policy');
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
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
