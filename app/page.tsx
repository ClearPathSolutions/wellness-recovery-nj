import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';
import { programs } from '@/lib/programs';
import { addictions } from '@/lib/addictions';
import { blogPosts } from '@/lib/blog';
import {
  treatmentApproaches,
  whyChoose,
  mentalHealthChallenges,
  accreditations,
  amenities,
} from '@/lib/content';
import { Container, SectionHeading, Icon } from '@/components/ui';
import { InsuranceStrip, CtaBand, TrustRow } from '@/components/sections';
import Reviews from '@/components/Reviews';

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ServicesSection />
      <InsuranceStrip />
      <ApproachesSection />
      <WhyChooseSection />
      <CtaBand
        title="Speak to someone right now"
        text="Request a confidential callback and a caring admissions specialist will reach out — no pressure, no judgment, just answers."
      />
      <AddictionsSection />
      <MentalHealthSection />
      <FacilitySection />
      <ReviewsSection />
      <AccreditationsSection />
      <BlogSection />
    </>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-clay-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
          {/* Copy */}
          <div className="animate-fade-up">
            <span className="eyebrow">
              <span className="h-px w-6 bg-current" aria-hidden />
              Accredited · Evidence-Based Care
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.06] text-ink-900 sm:text-5xl lg:text-[3.5rem]">
              Private substance abuse &amp; mental health rehab in{' '}
              <span className="relative whitespace-nowrap text-clay-600">
                New Jersey
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-clay-300"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M2 9C50 3 150 3 198 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">
              Personalized, whole-person care for drug and alcohol addiction and the mental health
              struggles beneath it — delivered by an experienced team in a modern, welcoming setting.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn-primary text-base">
                <Icon name="phone" className="h-4 w-4" />
                Call {site.phone}
              </a>
              <Link href="/treatment" className="btn-outline text-base">
                Explore Our Programs
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10">
              <TrustRow />
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/facility/facility-4491.jpg"
                alt="The warm, modern lounge inside Wellness Recovery Center of New Jersey"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card sm:-left-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                <Icon name="heart" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-xl leading-none text-ink-900">Hundreds</p>
                <p className="mt-1 text-xs text-ink-600">helped toward lasting recovery</p>
              </div>
            </div>
            {/* Floating admissions badge */}
            <div className="absolute -right-2 top-6 rounded-2xl bg-ink-900 px-4 py-3 text-cream shadow-card sm:-right-4">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-clay-300">Admissions</p>
              <p className="font-display text-lg leading-tight">Open 24/7</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Intro ---------------- */

function IntroSection() {
  const stats = [
    { value: '5+', label: 'Levels of care' },
    { value: '24/7', label: 'Confidential admissions' },
    { value: '100%', label: 'Personalized plans' },
  ];
  return (
    <section className="section">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-8 aspect-[3/4] overflow-hidden rounded-3xl shadow-card">
                <Image
                  src="/images/stock/counseling.jpg"
                  alt="A counseling session at Wellness Recovery Center"
                  width={500}
                  height={667}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-3xl shadow-card">
                <Image
                  src="/images/stock/meditation.jpg"
                  alt="A client meditating during recovery"
                  width={500}
                  height={667}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="reveal order-1 lg:order-2">
            <SectionHeading
              eyebrow="Client-First Treatment"
              title="New Jersey’s leader in addiction treatment"
              align="left"
            />
            <div className="mt-6 space-y-4 text-ink-700">
              <p>
                Welcome to Wellness Recovery Center of New Jersey, a state-of-the-art addiction
                treatment center offering personalized care for drug and alcohol abuse. Our program
                stands as your partner in recovery, led by an experienced staff that deeply understands
                the disease of addiction.
              </p>
              <p>
                We understand the underlying mental health struggles that often fuel addiction, and the
                chaos it brings to your life. By addressing both the addiction and these co-occurring
                triggers under one roof, our specialized programs give each client the real-world tools
                needed to achieve lifelong sobriety.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-ink-100 bg-white p-4 text-center shadow-soft">
                  <p className="font-display text-2xl text-clay-600 sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs leading-snug text-ink-600">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/about" className="link-underline inline-flex items-center gap-2">
                Learn who we are
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Services ---------------- */

function ServicesSection() {
  const services = [
    {
      name: 'Detoxification',
      desc: 'Options for those in need of detox through a vetted network of trusted providers.',
      href: '/treatment',
      image: '/images/stock/recovery.jpg',
    },
    ...programs.slice(0, 3).map((p) => ({
      name: p.name,
      desc: p.tagline,
      href: `/treatment/${p.slug}`,
      image: p.image,
    })),
  ];
  return (
    <section className="section bg-sand-50">
      <Container>
        <div className="reveal flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="Innovative & Immersive Treatment"
            title="Highly individualized drug rehab in New Jersey"
            align="left"
            className="!max-w-xl"
          />
          <Link href="/treatment" className="btn-outline shrink-0">
            View All Services
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              className="card card-hover group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/25 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg text-ink-900">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clay-600">
                  Learn more
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Approaches ---------------- */

function ApproachesSection() {
  return (
    <section className="section">
      <Container>
        <div className="reveal">
          <SectionHeading
            eyebrow="Find Hope & Healing"
            title="Bespoke treatment options built for your needs"
            intro="Every recovery is different. We combine proven clinical therapies with holistic, whole-person care to build a plan that fits your life."
          />
        </div>
        <div className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatmentApproaches.map((a) => (
            <div key={a.title} className="card card-hover p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-50 text-clay-600">
                <Icon name="check" className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg text-ink-900">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{a.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Why Choose ---------------- */

function WhyChooseSection() {
  return (
    <section className="section bg-ink-900 text-cream">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="reveal">
            <SectionHeading
              eyebrow="A Program You Can Count On"
              title="Why choose Wellness Recovery Center?"
              intro="A modern facility, a full continuum of care, and a team that treats you as a person — never a number."
              align="left"
              light
            />
            <a href={site.phoneHref} className="btn-primary mt-8">
              <Icon name="phone" className="h-4 w-4" />
              Get Started Right Now
            </a>
          </div>
          <div className="reveal space-y-4">
            {whyChoose.map((w, i) => (
              <div
                key={w.title}
                className="flex gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <span className="font-display text-2xl text-clay-300">0{i + 1}</span>
                <div>
                  <h3 className="text-lg text-white">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/75">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Addictions ---------------- */

function AddictionsSection() {
  const featured = ['alcohol', 'opioids', 'benzo', 'cocaine', 'heroin', 'fentanyl'];
  const cards = featured
    .map((slug) => addictions.find((a) => a.slug === slug))
    .filter(Boolean)
    .slice(0, 6) as typeof addictions;
  return (
    <section className="section">
      <Container>
        <div className="reveal">
          <SectionHeading
            eyebrow="Drug & Alcohol Addiction Treatment in NJ"
            title="We help treat a number of addictions"
            intro="Whatever you’re facing, our program meets it with expert, judgment-free care and a plan built around you."
          />
        </div>
        <div className="reveal mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((a) => (
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
        <div className="reveal mt-10 text-center">
          <Link href="/what-we-treat" className="btn-secondary">
            View All Addictions We Treat
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Mental Health ---------------- */

function MentalHealthSection() {
  return (
    <section className="section bg-sand-50">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Treating the Triggers Behind Addiction"
              title="Mental health challenges we help with"
              align="left"
            />
            <p className="mt-6 text-ink-700">
              Emotional and psychological challenges can impact every area of your life. Our clinical
              team provides expert, personalized care to help you manage symptoms, navigate your
              struggles, and rediscover a sense of balance.
            </p>
            <Link href="/treatment/mental-health-iop" className="btn-primary mt-8">
              Explore Mental Health IOP
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="reveal space-y-4">
            {mentalHealthChallenges.map((c) => (
              <div key={c.title} className="card p-6">
                <h3 className="text-lg text-ink-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Facility tour teaser ---------------- */

function FacilitySection() {
  return (
    <section className="section">
      <Container>
        <div className="reveal">
          <SectionHeading
            eyebrow="Modern · Secluded · Innovative"
            title="Facilities designed for your comfort"
            intro="Our newly-renovated, state-of-the-art space was designed to feel calm, private, and welcoming — a place that lives and breathes recovery."
          />
        </div>
        <div className="reveal mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {amenities.map((a) => (
            <div
              key={a.title}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-soft"
            >
              <Image
                src={a.image}
                alt={a.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <p className="font-display text-base">{a.title}</p>
                <p className="text-xs text-cream/80">{a.caption}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-10 text-center">
          <Link href="/tour" className="btn-outline">
            Explore Our Facilities
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Reviews ---------------- */

function ReviewsSection() {
  return (
    <section className="section bg-sand-50">
      <Container>
        <div className="reveal">
          <SectionHeading
            eyebrow="What Our Clients Say"
            title="Stories of hope and healing"
            intro="Real words from the people and families we’ve had the privilege to walk alongside."
          />
        </div>
        <div className="reveal mt-12">
          <Reviews />
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Accreditations ---------------- */

function AccreditationsSection() {
  return (
    <section className="section-sm border-y border-ink-100 bg-white">
      <Container>
        <p className="reveal text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
          Our Accreditations
        </p>
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {accreditations.map((a) => (
            <Image
              key={a.name}
              src={a.logo}
              alt={a.name}
              width={120}
              height={60}
              className="h-14 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Blog ---------------- */

function BlogSection() {
  return (
    <section className="section bg-sand-50">
      <Container>
        <div className="reveal flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="Addiction, Recovery & Everything In Between"
            title="Latest news & articles"
            align="left"
            className="!max-w-xl"
          />
          <Link href="/blog" className="btn-outline shrink-0">
            See Our Blog
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
        <div className="reveal mt-12 grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card card-hover group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-ink-500">
                  <span className="rounded-full bg-clay-50 px-3 py-1 font-medium text-clay-600">
                    {post.category}
                  </span>
                  <span>{post.displayDate}</span>
                </div>
                <h3 className="mt-4 text-lg leading-snug text-ink-900 group-hover:text-clay-700">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clay-600">
                  Read more
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
