import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { programs } from '@/lib/programs';
import { Container, SectionHeading, Icon } from '@/components/ui';
import { InsuranceStrip, CtaBand } from '@/components/sections';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Treatment Programs',
  description:
    'Explore our full continuum of outpatient addiction and mental health treatment in New Jersey — PHP, IOP, Outpatient, Mental Health IOP, and Dual Diagnosis care.',
};

const signs = [
  'Mood swings, anger, or irritability',
  'Changes to sleeping or eating habits',
  'Neglecting personal hygiene or appearance',
  'Pulling away from friends and family',
  'Abandoning hobbies and activities',
  'Financial issues or legal troubles',
];

const additionalServices = [
  'Detoxification (via trusted referral network)',
  'Dual-diagnosis treatment',
  'Individual therapy',
  'Group therapy',
  'Medication management',
  'Family therapy',
];

export default function TreatmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Client-First Care · Bespoke Treatment"
        title="Treatment designed around you"
        intro="Innovative, immersive, and deeply personal. We offer a full continuum of outpatient care so you get exactly the level of support you need — and none you don’t."
        image="/images/stock/group-therapy.jpg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Treatment' }]}
      />

      {/* Programs */}
      <section className="section">
        <Container>
          <div className="reveal">
            <SectionHeading
              eyebrow="Levels of Care"
              title="Our treatment programs"
              intro="Research shows outpatient programs like PHP and IOP can be as effective as residential care for those who stay committed to treatment."
            />
          </div>
          <div className="reveal mt-12 space-y-6">
            {programs.map((p, i) => (
              <Link
                key={p.slug}
                href={`/treatment/${p.slug}`}
                className="card card-hover group grid gap-0 overflow-hidden md:grid-cols-[300px_1fr]"
              >
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-7">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-clay-50 px-3 py-1 text-xs font-semibold text-clay-600">
                      {p.short}
                    </span>
                    <span className="text-xs text-ink-500">{p.hours}</span>
                  </div>
                  <h3 className="mt-3 text-2xl text-ink-900">{p.name}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600">{p.intro}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clay-600">
                    Explore {p.short}
                    <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Signs + services */}
      <section className="section bg-sand-50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="reveal">
              <SectionHeading eyebrow="Knowing When to Get Help" title="Signs of addiction" align="left" />
              <p className="mt-5 text-ink-700">
                Addiction looks different for everyone — but there are common signs worth paying
                attention to, in yourself or someone you love.
              </p>
              <ul className="mt-6 space-y-3">
                {signs.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-ink-700">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-clay-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <SectionHeading eyebrow="Comprehensive Care" title="Additional services" align="left" />
              <p className="mt-5 text-ink-700">
                More than half of individuals with addiction also live with a mental health disorder.
                That’s why our care is built to treat the whole person.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {additionalServices.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-4 text-sm text-ink-700 shadow-soft"
                  >
                    <Icon name="heart" className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <InsuranceStrip />
      <CtaBand />
    </>
  );
}
