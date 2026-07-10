import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { addictions, getAddiction } from '@/lib/addictions';
import { Container, SectionHeading, Icon } from '@/components/ui';
import { InsuranceStrip, CtaBand } from '@/components/sections';
import PageHero from '@/components/PageHero';

export function generateStaticParams() {
  return addictions.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getAddiction(params.slug);
  if (!a) return {};
  return { title: a.h1, description: a.intro };
}

export default function AddictionPage({ params }: { params: { slug: string } }) {
  const addiction = getAddiction(params.slug);
  if (!addiction) notFound();

  const related = addictions.filter((a) => a.slug !== addiction.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="What We Treat"
        title={addiction.h1}
        intro={addiction.intro}
        image={addiction.image}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'What We Treat', href: '/what-we-treat' },
          { label: addiction.name },
        ]}
      />

      <section className="section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div className="reveal">
              <div className="space-y-4 text-ink-700">
                {addiction.body.map((para, i) => (
                  <p key={i} className={i === 0 ? 'text-lg leading-relaxed' : ''}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-ink-100 bg-sand-50 p-7">
                <h2 className="font-display text-xl text-ink-900">
                  Signs &amp; symptoms of {addiction.name.toLowerCase()} misuse
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {addiction.signs.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-ink-700">
                      <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-clay-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="reveal lg:sticky lg:top-28 lg:self-start">
              {addiction.stat && (
                <div className="rounded-3xl bg-gradient-to-br from-clay-500 to-rose-500 p-7 text-white shadow-card">
                  <p className="font-display text-4xl">{addiction.stat.value}</p>
                  <p className="mt-2 text-sm text-white/85">{addiction.stat.label}</p>
                </div>
              )}
              <div className="mt-5 rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
                <h3 className="font-display text-lg text-ink-900">How we can help</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  We treat {addiction.name.toLowerCase()} addiction across all levels of outpatient
                  care — PHP, IOP, and outpatient — with dual-diagnosis support and holistic therapies.
                </p>
                <a href="tel:+18668613449" className="btn-primary mt-6 w-full">
                  <Icon name="phone" className="h-4 w-4" />
                  Call (866) 861-3449
                </a>
                <Link href="/admissions" className="btn-outline mt-3 w-full">
                  Verify Insurance
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <InsuranceStrip />

      <section className="section">
        <Container>
          <div className="reveal">
            <SectionHeading eyebrow="What We Treat" title="Other addictions we treat" />
          </div>
          <div className="reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((a) => (
              <Link key={a.slug} href={`/what-we-treat/${a.slug}`} className="card card-hover group p-6">
                <h3 className="flex items-center gap-2 text-lg text-ink-900 group-hover:text-clay-700">
                  {a.name}
                  <Icon name="arrow" className="h-4 w-4 text-clay-500 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-2 text-sm text-ink-600 line-clamp-3">{a.short}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
