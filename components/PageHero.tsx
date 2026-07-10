import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

/** Reusable interior-page hero with breadcrumb and warm gradient. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  breadcrumb,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-cream">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/55" />
        </>
      )}
      {/* soft brand glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-clay-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-rose-500/15 blur-3xl" />

      <div className="container relative py-16 md:py-24">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/60">
              {breadcrumb.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  {b.href ? (
                    <Link href={b.href} className="hover:text-clay-300">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-cream/90">{b.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && <span className="text-cream/30">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <span className="eyebrow text-clay-300">
            <span className="h-px w-6 bg-current" aria-hidden />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] text-white sm:text-5xl md:text-[3.4rem]">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">{intro}</p>}
      </div>
    </section>
  );
}
