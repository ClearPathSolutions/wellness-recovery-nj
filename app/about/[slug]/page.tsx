import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { teamBioPages, getTeamMember, CANONICAL_AT_PARENT } from '@/lib/content';
import { Container, SectionHeading, Icon } from '@/components/ui';
import { InsuranceStrip, CtaBand } from '@/components/sections';
import PageHero from '@/components/PageHero';
import { seoTitle } from '@/lib/site';

export function generateStaticParams() {
  return teamBioPages.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const m = getTeamMember(params.slug);
  if (!m) return {};

  // Bios shared with the parent network are canonicalised to quadranthealthgroup.com
  // so the identical text on a dozen sister sites does not compete with itself.
  const canonical = CANONICAL_AT_PARENT[params.slug];

  return {
    title: seoTitle(`${m.name} — ${m.role}`),
    description: m.bio?.[0],
    alternates: { canonical: canonical ?? `/about/${params.slug}` },
  };
}

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = getTeamMember(params.slug);
  if (!member || !member.bio) notFound();

  return (
    <>
      <PageHero
        eyebrow={member.role}
        title={member.name}
        image="/images/stock/calm.jpg"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Who We Are', href: '/about' },
          { label: member.name },
        ]}
      />

      <section className="section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div className="reveal">
              <div className="space-y-4 text-ink-700">
                {member.bio.map((para, i) => (
                  <p key={i} className={i === 0 ? 'text-lg leading-relaxed' : ''}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="reveal lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
                {member.image && (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <h2 className="mt-5 font-display text-lg text-ink-900">{member.name}</h2>
                {member.credentials && (
                  <p className="mt-1 text-xs font-semibold text-clay-600">{member.credentials}</p>
                )}
                <p className="mt-1 text-sm text-ink-600">{member.role}</p>
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
            <SectionHeading
              eyebrow="Treatment Professionals"
              title="Meet the rest of our team"
              intro="Experienced, credentialed, and deeply committed to your recovery."
            />
          </div>
          {/* Every other bio by name, so no bio depends on a single inbound link. */}
          <ul className="reveal mx-auto mt-10 grid max-w-5xl gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamBioPages
              .filter((o) => o.slug !== member.slug)
              .map((o) => (
                <li key={o.slug}>
                  <Link href={`/about/${o.slug}`} className="font-semibold text-ink-900 hover:text-clay-700">
                    {o.name}
                  </Link>
                  <span className="block text-sm text-ink-600">{o.role}</span>
                </li>
              ))}
          </ul>
          <div className="reveal mt-10 text-center">
            <Link href="/about" className="btn-primary">
              Who We Are
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
