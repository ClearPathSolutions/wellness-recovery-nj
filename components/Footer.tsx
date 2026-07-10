import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';
import { accreditations } from '@/lib/content';
import Logo from './Logo';
import { Icon } from './ui';

const treatmentLinks = [
  { label: 'Partial Hospitalization', href: '/treatment/partial-hospitalization' },
  { label: 'Intensive Outpatient', href: '/treatment/intensive-outpatient-program' },
  { label: 'Outpatient Program', href: '/treatment/outpatient' },
  { label: 'Mental Health IOP', href: '/treatment/mental-health-iop' },
  { label: 'Dual Diagnosis', href: '/treatment/dual-diagnosis' },
];

const companyLinks = [
  { label: 'Who We Are', href: '/about' },
  { label: 'Tour the Facility', href: '/tour' },
  { label: 'Areas We Serve', href: '/areas-we-serve' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Blog & Articles', href: '/blog' },
];

const treatLinks = [
  { label: 'Alcohol', href: '/what-we-treat/alcohol' },
  { label: 'Opioids', href: '/what-we-treat/opioids' },
  { label: 'Benzodiazepines', href: '/what-we-treat/benzo' },
  { label: 'Cocaine', href: '/what-we-treat/cocaine' },
  { label: 'Fentanyl', href: '/what-we-treat/fentanyl' },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-cream/80">
      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="container flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-display text-2xl text-white sm:text-3xl">
              Your journey to wellness begins right now.
            </h2>
            <p className="mt-2 max-w-xl text-cream/70">
              Speak with a caring admissions specialist today — confidential, judgment-free, and available 24/7.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={site.phoneHref} className="btn-primary">
              <Icon name="phone" className="h-4 w-4" />
              Call {site.phone}
            </a>
            <Link href="/admissions" className="btn-ghost-light">
              Verify Insurance
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <Logo variant="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
            An accredited, state-of-the-art addiction and mental health treatment center in West Windsor, NJ.
            Personalized, evidence-based care that treats the whole person.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <a href={site.phoneHref} className="flex items-center gap-3 hover:text-clay-300">
              <Icon name="phone" className="h-4 w-4 text-clay-300" />
              {site.phone}
            </a>
            <a href={site.emailHref} className="flex items-center gap-3 hover:text-clay-300">
              <Icon name="mail" className="h-4 w-4 text-clay-300" />
              {site.email}
            </a>
            <a
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 hover:text-clay-300"
            >
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />
              {site.address.full}
            </a>
          </div>
        </div>

        <FooterCol title="Programs" links={treatmentLinks} />
        <FooterCol title="What We Treat" links={treatLinks} />
        <FooterCol title="Company" links={companyLinks} />
      </div>

      {/* Accreditations */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-cream/50">Accredited & Certified</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {accreditations.map((a) => (
              <span
                key={a.name}
                className="flex h-12 items-center rounded-lg bg-white/95 px-3 py-1.5"
                title={a.name}
              >
                <Image
                  src={a.logo}
                  alt={a.name}
                  width={80}
                  height={40}
                  className="h-full w-auto object-contain"
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-clay-300">
              Privacy Policy
            </Link>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-clay-300">
              Facebook
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-clay-300">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-cream/70 transition-colors hover:text-clay-300">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
