import type { Metadata } from 'next';
import Image from 'next/image';
import { amenities, gallery, accreditations } from '@/lib/content';
import { Container, SectionHeading } from '@/components/ui';
import { CtaBand } from '@/components/sections';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Tour Our Facilities',
  description:
    'Take a tour of Wellness Recovery Center of New Jersey — a modern, secluded, and innovative treatment facility in West Windsor, NJ designed for comfort and healing.',
};

export default function TourPage() {
  return (
    <>
      <PageHero
        eyebrow="Modern · Secluded · Innovative"
        title="Tour our facilities"
        intro="A clean, modern, private space designed with your comfort in mind — a place that lives and breathes recovery."
        image="/images/facility/facility-4465.jpg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Tour' }]}
      />

      {/* Amenities */}
      <section className="section">
        <Container>
          <div className="reveal">
            <SectionHeading
              eyebrow="Healing Happens Here"
              title="Spaces designed for comfort"
              intro="From private rooms to outdoor lounges, every space was created to help you feel safe, calm, and cared for."
            />
          </div>
          <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((a) => (
              <div key={a.title} className="group overflow-hidden rounded-3xl shadow-soft">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="bg-white p-5">
                  <h3 className="text-lg text-ink-900">{a.title}</h3>
                  <p className="mt-1 text-sm text-ink-600">{a.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="section bg-sand-50">
        <Container>
          <div className="reveal">
            <SectionHeading eyebrow="Gallery" title="A closer look inside" />
          </div>
          <div className="reveal mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            {gallery.map((src, i) => (
              <div key={src} className="overflow-hidden rounded-2xl shadow-soft break-inside-avoid">
                <Image
                  src={src}
                  alt={`Wellness Recovery Center facility photo ${i + 1}`}
                  width={650}
                  height={i % 3 === 0 ? 800 : 500}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Accreditations */}
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

      <CtaBand
        title="See it for yourself"
        text="The best way to understand our approach is to experience it. Reach out to schedule a conversation or an in-person visit."
      />
    </>
  );
}
