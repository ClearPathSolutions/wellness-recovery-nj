import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { contactHighlights } from '@/lib/content';
import { Container, SectionHeading, Icon } from '@/components/ui';
import PageHero from '@/components/PageHero';
import { ContactForm } from '@/components/Forms';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Wellness Recovery Center of New Jersey. Same-day admissions, transportation available, and 24/7 help and support. Call (866) 861-3449.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We’re Here for You"
        title="Contact us"
        intro="Reaching out takes courage. Whenever you’re ready, our caring team is here — confidentially, around the clock."
        image="/images/stock/wellness.jpg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      {/* Highlights */}
      <section className="section-sm">
        <Container>
          <div className="reveal grid gap-5 sm:grid-cols-3">
            {contactHighlights.map((h, i) => (
              <div key={h.title} className="card flex items-start gap-4 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-clay-50 text-clay-600">
                  <Icon name={i === 0 ? 'clock' : i === 1 ? 'pin' : 'heart'} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base text-ink-900">{h.title}</h3>
                  <p className="mt-1 text-sm text-ink-600">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact details + form */}
      <section className="section pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="reveal">
              <SectionHeading eyebrow="Contact Info" title="Let’s talk" align="left" />
              <p className="mt-5 text-ink-700">
                Call, email, or send us a message — whatever feels most comfortable. Everything you
                share is completely confidential.
              </p>
              <div className="mt-8 space-y-4">
                <a href={site.phoneHref} className="card card-hover flex items-center gap-4 p-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-500 text-white">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-ink-500">Call us 24/7</p>
                    <p className="font-display text-lg text-ink-900">{site.phone}</p>
                  </div>
                </a>
                <a href={site.emailHref} className="card card-hover flex items-center gap-4 p-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-ink-500">Email us</p>
                    <p className="font-display text-lg text-ink-900">{site.email}</p>
                  </div>
                </a>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover flex items-center gap-4 p-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white">
                    <Icon name="pin" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-ink-500">Visit us</p>
                    <p className="text-base text-ink-900">{site.address.full}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="reveal">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section aria-label="Map" className="relative h-[420px] w-full bg-sand-100">
        <iframe
          src={site.address.embedUrl}
          title="Map to Wellness Recovery Center of New Jersey"
          className="h-full w-full border-0 grayscale-[0.15]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
