import type { Metadata } from 'next';
import Link from 'next/link';
import { addictions } from '@/lib/addictions';
import { Container, SectionHeading, Icon } from '@/components/ui';
import { CtaBand } from '@/components/sections';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'What We Treat',
  description:
    'Expert, judgment-free treatment for alcohol, opioids, benzodiazepines, cocaine, heroin, fentanyl, meth, oxycodone, prescription drugs, and Xanax addiction in New Jersey.',
};

const categories = ['Opioid', 'Stimulant', 'Depressant', 'Substance'] as const;
const categoryLabels: Record<string, string> = {
  Opioid: 'Opioids',
  Stimulant: 'Stimulants',
  Depressant: 'Depressants',
  Substance: 'Alcohol & Prescriptions',
};

export default function WhatWeTreatPage() {
  return (
    <>
      <PageHero
        eyebrow="Drug & Alcohol Addiction Treatment in NJ"
        title="We help treat a number of addictions"
        intro="Whatever substance you’re facing, our program meets it with expert, evidence-based care and a plan built around you — never judgment."
        image="/images/stock/community.jpg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'What We Treat' }]}
      />

      <section className="section">
        <Container>
          {categories.map((cat) => {
            const items = addictions.filter((a) => a.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="reveal mb-14 last:mb-0">
                <h2 className="mb-6 flex items-center gap-3 font-display text-2xl text-ink-900">
                  <span className="h-px w-8 bg-clay-400" aria-hidden />
                  {categoryLabels[cat]}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/what-we-treat/${a.slug}`}
                      className="card card-hover group flex items-start gap-4 p-6"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 font-display text-lg text-rose-600">
                        {a.name.charAt(0)}
                      </span>
                      <div>
                        <h3 className="flex items-center gap-2 text-lg text-ink-900">
                          {a.name}
                          <Icon
                            name="arrow"
                            className="h-4 w-4 text-clay-500 transition-transform group-hover:translate-x-1"
                          />
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{a.short}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
