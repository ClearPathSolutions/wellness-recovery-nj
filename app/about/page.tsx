import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { team, networkTeam, values } from '@/lib/content';
import { mergedTeam } from '@/lib/staff-feed';
import { Container, SectionHeading, Icon } from '@/components/ui';
import { InsuranceStrip, CtaBand } from '@/components/sections';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Who We Are',
  description:
    'Wellness Recovery Center of New Jersey is an addiction treatment center rooted in client-centered care. Learn about our mission, values, and expert clinical team.',
};

export default async function AboutPage() {
  // `team` bios are paragraph arrays so the /about/<slug> pages can render them
  // as real paragraphs; the portal feed returns a single string. Flatten on the
  // way in so the merge sees one shape — the cards below only ever show the
  // opening lines, clamped, with the full text living on the bio page.
  const roster = await mergedTeam(
    'wellness-recovery-nj',
    team.map((m) => ({ ...m, bio: m.bio?.join('\n\n') })),
  );

  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="A beacon of hope in the chaos"
        intro="We are a New Jersey addiction treatment center rooted in client-centered care — built on the belief that no matter what, recovery is always possible when you seek it."
        image="/images/stock/hope.jpg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Who We Are' }]}
      />

      {/* Mission */}
      <section className="section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="reveal order-2 lg:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
                <Image
                  src="/images/facility/facility-4461.jpg"
                  alt="Inside Wellness Recovery Center of New Jersey"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="reveal order-1 lg:order-2">
              <SectionHeading eyebrow="Our Promise to You" title="Working together to transform treatment" align="left" />
              <div className="mt-6 space-y-4 text-ink-700">
                <p>
                  Wellness Recovery Center of New Jersey is a state-of-the-art addiction treatment
                  center offering personalized treatment for drug and alcohol abuse. We are a partner
                  in your recovery — with a staff that understands the disease of addiction and the
                  chaos it can bring to your life.
                </p>
                <p>
                  Our specialized programs are designed to give each and every client the tools needed
                  to achieve life-long recovery. Our vision was to create a space where those struggling
                  with addiction can find a beacon of hope in the chaos.
                </p>
              </div>
              <div className="mt-8 rounded-3xl border-l-4 border-clay-500 bg-sand-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay-600">Our Mission</p>
                <p className="mt-2 font-display text-lg leading-relaxed text-ink-900">
                  “To offer those struggling with addiction access to high-quality treatment in a safe
                  and supportive community that fosters long-term, sustainable recovery.”
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section bg-ink-900 text-cream">
        <Container>
          <div className="reveal">
            <SectionHeading
              eyebrow="What We Stand For"
              title="Transform · Overcome · Inspire · Recover"
              intro="Four words that shape every plan we build and every conversation we have."
              light
            />
          </div>
          <div className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.word} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <span className="font-display text-3xl text-clay-300">0{i + 1}</span>
                <h3 className="mt-4 text-xl text-white">{v.word}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="section">
        <Container>
          <div className="reveal">
            <SectionHeading
              eyebrow="Treatment Professionals"
              title="Meet our team"
              intro="Experienced, credentialed, and deeply committed to your recovery."
            />
          </div>
          <div className="reveal mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roster.map((m) => {
              const card = (
                <>
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand-100">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center font-display text-4xl text-clay-600">
                        {m.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg text-ink-900">{m.name}</h3>
                    {m.credentials && (
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-clay-600">
                        {m.credentials}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-medium text-ink-600">{m.role}</p>
                    {m.bio && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-600">
                        {m.bio}
                      </p>
                    )}
                    {m.slug && (
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-600 group-hover:text-clay-700">
                        Read bio
                        <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </div>
                </>
              );

              return m.slug ? (
                <Link
                  key={m.name}
                  href={`/about/${m.slug}`}
                  className="card card-hover group flex flex-col overflow-hidden"
                >
                  {card}
                </Link>
              ) : (
                <div key={m.name} className="card group flex flex-col overflow-hidden">
                  {card}
                </div>
              );
            })}
          </div>

          {/* Network leadership — not staffed to this facility, so listed on its own */}
          <div className="reveal mx-auto mt-16 max-w-3xl">
            <SectionHeading eyebrow="Medical Oversight" title="Network medical leadership" />
            <div className="mt-8 space-y-6">
              {networkTeam.map((m) => (
                <div key={m.name} className="card p-7 sm:flex sm:items-center sm:gap-7">
                  {m.image && (
                    <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-2xl sm:mx-0">
                      <Image src={m.image} alt={m.name} fill sizes="128px" className="object-cover" />
                    </div>
                  )}
                  <div className="mt-5 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg text-ink-900">{m.name}</h3>
                    {m.credentials && (
                      <p className="mt-1 text-xs font-semibold text-clay-600">{m.credentials}</p>
                    )}
                    <p className="mt-1 text-sm text-ink-600">{m.role}</p>
                    {m.bio && (
                      <p className="mt-3 text-sm leading-relaxed text-ink-600 line-clamp-3">{m.bio[0]}</p>
                    )}
                    {m.slug && (
                      <Link
                        href={`/about/${m.slug}`}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clay-600 hover:text-clay-700"
                      >
                        Read full bio
                        <Icon name="arrow" className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal mt-10 text-center">
            <Link href="/admissions" className="btn-primary">
              How Do I Get Started?
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <InsuranceStrip />
      <CtaBand />
    </>
  );
}
