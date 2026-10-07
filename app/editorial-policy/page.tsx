import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import PageHero from '@/components/PageHero';
import { site } from '@/lib/site';
import {
  editorial,
  editorialPolicyBody,
  editorialPolicyReady,
  editorialPolicyServed,
  EDITORIAL_POLICY_PATH,
  EDITORIAL_POLICY_URL,
  ORGANIZATION_ID,
} from '@/lib/editorial';

// Reads the package template from disk, so it must render at build time.
export const dynamic = 'force-static';

const title = `Editorial Policy | ${editorial.facilityName}`;
const description = `How ${editorial.facilityName} researches, writes, clinically reviews and updates the health information on ${editorial.domain}.`;

export const metadata: Metadata = {
  // Absolute: the package specifies the full facility name, not the short
  // site.shortName the layout's title template appends.
  title: { absolute: title },
  description,
  alternates: { canonical: EDITORIAL_POLICY_PATH },
  openGraph: { title, description, url: EDITORIAL_POLICY_PATH },
  // Reviewable on local/preview builds, but kept out of the index until ready.
  ...(editorialPolicyReady ? {} : { robots: { index: false, follow: false } }),
};

export default function EditorialPolicyPage() {
  if (!editorialPolicyServed) notFound();
  const html = editorialPolicyBody();

  return (
    <>
      {/* schema/editorial-policy-page.jsonld */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${EDITORIAL_POLICY_URL}#webpage`,
            url: EDITORIAL_POLICY_URL,
            name: 'Editorial Policy',
            description,
            // The template's isPartOf points at a #website node this site does
            // not have, so it is left out rather than referencing nothing.
            about: { '@id': ORGANIZATION_ID },
            ...(editorial.lastReviewed ? { lastReviewed: editorial.lastReviewed } : {}),
            inLanguage: 'en-US',
          }),
        }}
      />
      <PageHero
        eyebrow={site.name}
        title="Editorial Policy"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Editorial Policy' }]}
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
