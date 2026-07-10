import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { areas, getArea } from '@/lib/areas';
import { programs } from '@/lib/programs';
import { Container, SectionHeading, Icon } from '@/components/ui';
import { InsuranceStrip, CtaBand } from '@/components/sections';
import PageHero from '@/components/PageHero';

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArea(params.slug);
  if (!a) return {};
  return {
    title: `${a.county} Drug & Alcohol Rehab`,
    description: a.intro,
  };
}

export default function AreaPage({ params }: { params: { slug: string } }) {
  const area = getArea(params.slug);
  if (!area) notFound();

  const others = areas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <PageHero
        eyebrow="Areas We Serve"
        title={`${area.county} Drug & Alcohol Rehab`}
        intro={area.intro}
        image="/images/stock/recovery.jpg"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Areas We Serve', href: '/areas-we-serve' },
          { label: area.county },
        ]}
      />

      <section className="section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div className="reveal">
              <div className="space-y-4 text-ink-700">
                {area.body.map((para, i) => (
                  <p key={i} className={i === 0 ? 'text-lg leading-relaxed' : ''}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-10">
                <h2 className="font-display text-xl text-ink-900">Communities we serve nearby</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {area.towns.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-white px-4 py-2 text-sm text-ink-700 shadow-soft"
                    >
                      <Icon name="pin" className="h-3.5 w-3.5 text-clay-500" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="reveal lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
                <h3 className="font-display text-lg text-ink-900">Programs available</h3>
                <ul className="mt-4 space-y-2.5">
                  {programs.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/treatment/${p.slug}`}
                        className="flex items-center gap-2 text-sm text-ink-700 hover:text-clay-700"
                      >
                        <Icon name="check" className="h-4 w-4 text-clay-500" />
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <a href="tel:+18668613449" className="btn-primary mt-6 w-full">
                  <Icon name="phone" className="h-4 w-4" />
                  Call (866) 861-3449
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <InsuranceStrip />

      <section className="section">
        <Container>
          <div className="reveal">
            <SectionHeading eyebrow="Areas We Serve" title="Other areas we serve" />
          </div>
          <div className="reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((a) => (
              <Link key={a.slug} href={`/areas-we-serve/${a.slug}`} className="card card-hover group p-5 text-center">
                <Icon name="pin" className="mx-auto h-6 w-6 text-clay-500" />
                <h3 className="mt-3 text-sm font-semibold text-ink-900 group-hover:text-clay-700">
                  {a.county}
                </h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
