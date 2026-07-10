import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { programs, getProgram } from '@/lib/programs';
import { Container, SectionHeading, Icon } from '@/components/ui';
import { InsuranceStrip, CtaBand } from '@/components/sections';
import PageHero from '@/components/PageHero';

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProgram(params.slug);
  if (!p) return {};
  return {
    title: `${p.name} in New Jersey`,
    description: p.intro,
  };
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = getProgram(params.slug);
  if (!program) notFound();

  const others = programs.filter((p) => p.slug !== program.slug);

  return (
    <>
      <PageHero
        eyebrow={`${program.short} · ${program.hours}`}
        title={`${program.name} in New Jersey`}
        intro={program.tagline}
        image={program.image}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Treatment', href: '/treatment' },
          { label: program.name },
        ]}
      />

      {/* At a glance */}
      <section className="section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="reveal">
              <SectionHeading eyebrow="Overview" title={program.name} align="left" />
              <p className="mt-6 text-lg leading-relaxed text-ink-700">{program.intro}</p>
              <div className="mt-6 space-y-4 text-ink-700">
                {program.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* At-a-glance card */}
            <aside className="reveal lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
                <h3 className="font-display text-xl text-ink-900">At a glance</h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-clay-500" />
                    <div>
                      <dt className="font-semibold text-ink-900">Schedule</dt>
                      <dd className="text-ink-600">{program.hours}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="heart" className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                    <div>
                      <dt className="font-semibold text-ink-900">Best for</dt>
                      <dd className="text-ink-600">{program.bestFor}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-clay-500" />
                    <div>
                      <dt className="font-semibold text-ink-900">Location</dt>
                      <dd className="text-ink-600">West Windsor, NJ</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-clay-500" />
                    <div>
                      <dt className="font-semibold text-ink-900">Insurance</dt>
                      <dd className="text-ink-600">Most major carriers accepted</dd>
                    </div>
                  </div>
                </dl>
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

      {/* What's included */}
      <section className="section bg-sand-50">
        <Container>
          <div className="reveal">
            <SectionHeading
              eyebrow="What to Expect"
              title="What’s included in this program"
              intro="Every plan is individualized, but here’s what care at this level typically involves."
            />
          </div>
          <div className="reveal mt-12 grid gap-5 sm:grid-cols-2">
            {program.includes.map((inc) => (
              <div key={inc.title} className="card p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-clay-50 text-clay-600">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg text-ink-900">{inc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{inc.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <InsuranceStrip />

      {/* Other programs */}
      <section className="section">
        <Container>
          <div className="reveal">
            <SectionHeading eyebrow="Continuum of Care" title="Explore other programs" />
          </div>
          <div className="reveal mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((p) => (
              <Link key={p.slug} href={`/treatment/${p.slug}`} className="card card-hover group p-6">
                <span className="rounded-full bg-clay-50 px-3 py-1 text-xs font-semibold text-clay-600">
                  {p.short}
                </span>
                <h3 className="mt-3 text-lg text-ink-900 group-hover:text-clay-700">{p.name}</h3>
                <p className="mt-2 text-sm text-ink-600">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
