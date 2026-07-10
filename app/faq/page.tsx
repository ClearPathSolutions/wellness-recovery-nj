import type { Metadata } from 'next';
import { faqs } from '@/lib/content';
import { Container, SectionHeading } from '@/components/ui';
import { CtaBand } from '@/components/sections';
import PageHero from '@/components/PageHero';
import Accordion from '@/components/Accordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about treatment, insurance, admissions, and what to expect at Wellness Recovery Center of New Jersey.',
};

export default function FaqPage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Answers to your questions"
        intro="Everything you need to know about treatment, insurance, and getting started. Don’t see your question? Give us a call — we’re happy to help."
        image="/images/stock/therapy-session.jpg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />

      <section className="section">
        <Container>
          <div className="reveal">
            <SectionHeading eyebrow="Common Questions" title="How can we help?" />
          </div>
          <div className="reveal mt-12">
            <Accordion items={faqs} />
          </div>
        </Container>
      </section>

      <CtaBand />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
