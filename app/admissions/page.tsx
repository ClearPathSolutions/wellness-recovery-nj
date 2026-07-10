import type { Metadata } from 'next';
import Image from 'next/image';
import { insuranceCarriers, additionalCarriers } from '@/lib/content';
import { Container, SectionHeading, Icon } from '@/components/ui';
import { CtaBand } from '@/components/sections';
import PageHero from '@/components/PageHero';
import { InsuranceForm } from '@/components/Forms';

export const metadata: Metadata = {
  title: 'Admissions & Insurance',
  description:
    'Navigating insurance should never be a barrier to care. Verify your benefits for free — we work with most major private and commercial insurance carriers on an out-of-network basis.',
};

const steps = [
  {
    title: 'Reach out',
    text: 'Call us or submit the confidential form. We’ll listen, answer your questions, and understand your situation — no pressure, no judgment.',
  },
  {
    title: 'Verify benefits',
    text: 'We’ll check your insurance coverage for free and explain exactly what your plan covers so there are no surprises.',
  },
  {
    title: 'Build your plan',
    text: 'Our clinical team designs a personalized treatment plan matched to the right level of care for you.',
  },
  {
    title: 'Begin healing',
    text: 'Many clients can start the same day. We’ll handle the logistics — including transportation support — so you can focus on recovery.',
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions & Insurance"
        title="Getting started is simpler than you think"
        intro="Navigating insurance should never be a barrier to getting the care you need. We work with most major private and commercial insurers on an out-of-network basis to make treatment as accessible as possible."
        image="/images/stock/counseling.jpg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Admissions' }]}
      />

      {/* Steps */}
      <section className="section">
        <Container>
          <div className="reveal">
            <SectionHeading eyebrow="How It Works" title="Four simple steps to care" />
          </div>
          <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-3xl border border-ink-100 bg-white p-7 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-clay-500 font-display text-lg text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Form + carriers */}
      <section className="section bg-sand-50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="reveal">
              <SectionHeading
                eyebrow="Free Verification of Benefits"
                title="Check your coverage"
                align="left"
              />
              <p className="mt-5 text-ink-700">
                Depending on your specific policy, your benefits may cover some or all of the cost of our
                Partial Hospitalization (PHP), Intensive Outpatient (IOP), Mental Health IOP, and
                dual-diagnosis programs. Fill out the form and our team will reach out shortly.
              </p>

              <div className="mt-8 rounded-3xl bg-ink-900 p-7 text-cream">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay-300">
                  We work with
                </p>
                <div className="mt-5 grid grid-cols-3 items-center gap-6">
                  {insuranceCarriers.map((c) => (
                    <Image
                      key={c.name}
                      src={c.logo}
                      alt={c.name}
                      width={120}
                      height={40}
                      className="h-8 w-auto object-contain opacity-85"
                    />
                  ))}
                </div>
                <p className="mt-5 text-sm text-cream/60">
                  Plus {additionalCarriers.join(', ')} and more.
                </p>
              </div>
            </div>

            <div className="reveal">
              <InsuranceForm />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Prefer to talk it through?"
        text="Call our admissions team any time — day or night. We’ll walk you through your options and answer every question."
      />
    </>
  );
}
