import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';
import { insuranceCarriers, additionalCarriers } from '@/lib/content';
import { Container, SectionHeading, Icon } from './ui';

/** Insurance carriers on a dark band — reused on home, admissions, program pages. */
export function InsuranceStrip() {
  return (
    <section className="section bg-ink-900 text-cream">
      <Container>
        <div className="reveal">
          <SectionHeading
            eyebrow="Paying for treatment"
            title="We work with most major insurance carriers"
            intro="Navigating insurance should never be a barrier to care. We work with most major private and commercial insurers on an out-of-network basis — your benefits may cover some or all of your treatment."
            light
          />
        </div>
        <div className="reveal mx-auto mt-12 grid max-w-4xl grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3">
          {insuranceCarriers.map((c) => (
            <div key={c.name} className="flex items-center justify-center">
              <Image
                src={c.logo}
                alt={c.name}
                width={150}
                height={48}
                className="h-9 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </div>
        <p className="reveal mt-10 text-center text-sm text-cream/60">
          Also accepting {additionalCarriers.join(', ')} and more.
        </p>
        <div className="reveal mt-8 flex justify-center">
          <Link href="/admissions" className="btn-primary">
            Verify Your Benefits — Free
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/** Warm callback / contact CTA band — reused across interior pages. */
export function CtaBand({
  title = 'Speak to someone right now',
  text = 'You don’t have to figure this out alone. Our caring admissions team is available 24/7 to answer your questions, verify insurance, and help you take the first step.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section">
      <Container>
        <div className="reveal relative overflow-hidden rounded-4xl bg-gradient-to-br from-clay-500 to-rose-500 px-6 py-14 text-center text-white shadow-card md:px-16 md:py-20">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-ink-900/10 blur-2xl" />
          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow text-white/80">
              <span className="h-px w-6 bg-current" aria-hidden />
              We’re here for you
            </span>
            <h2 className="mt-4 text-3xl text-white sm:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">{text}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn bg-white text-clay-700 shadow-soft hover:bg-cream">
                <Icon name="phone" className="h-4 w-4" />
                Call {site.phone}
              </a>
              <Link href="/contact" className="btn border border-white/50 bg-white/10 text-white hover:bg-white/20">
                Request a Callback
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Small trust-signal row (used under heroes). */
export function TrustRow({ light = false }: { light?: boolean }) {
  const items = [
    { icon: 'shield' as const, label: 'Accredited, evidence-based care' },
    { icon: 'clock' as const, label: '24/7 confidential admissions' },
    { icon: 'heart' as const, label: 'Most private insurance accepted' },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((it) => (
        <div
          key={it.label}
          className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${
            light ? 'border-white/15 bg-white/5 text-cream/90' : 'border-ink-100 bg-white text-ink-800 shadow-soft'
          }`}
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              light ? 'bg-clay-500/20 text-clay-300' : 'bg-clay-50 text-clay-600'
            }`}
          >
            <Icon name={it.icon} className="h-4 w-4" />
          </span>
          {it.label}
        </div>
      ))}
    </div>
  );
}
