import type { Metadata } from 'next';
import Link from 'next/link';
import { areas, areasIntro } from '@/lib/areas';
import { Container, SectionHeading, Icon } from '@/components/ui';
import { CtaBand } from '@/components/sections';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Areas We Serve',
  description:
    'From our West Windsor facility, Wellness Recovery Center serves communities across central and northern New Jersey — Mercer, Hunterdon, Somerset, Morris, Sussex, and Warren counties.',
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Areas We Serve"
        title="Compassionate care, close to home"
        intro={areasIntro}
        image="/images/stock/nature.jpg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Areas We Serve' }]}
      />

      <section className="section">
        <Container>
          <div className="reveal">
            <SectionHeading
              eyebrow="New Jersey Counties"
              title="Serving communities across New Jersey"
              intro="Wherever you are in your recovery journey, expert outpatient care is within reach."
            />
          </div>
          <div className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/areas-we-serve/${a.slug}`}
                className="card card-hover group flex flex-col p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-50 text-clay-600">
                  <Icon name="pin" className="h-6 w-6" />
                </span>
                <h3 className="mt-5 flex items-center gap-2 text-xl text-ink-900 group-hover:text-clay-700">
                  {a.county}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{a.intro}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clay-600">
                  Learn more
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
