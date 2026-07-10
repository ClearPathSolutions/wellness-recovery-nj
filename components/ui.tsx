import Link from 'next/link';
import { ReactNode } from 'react';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  light = false,
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'center' | 'left';
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left'} ${className}`}
    >
      {eyebrow && (
        <span className={`eyebrow ${light ? 'text-clay-300' : ''}`}>
          <span className="h-px w-6 bg-current" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl leading-tight sm:text-4xl md:text-[2.6rem] ${
          light ? 'text-white' : 'text-ink-900'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? 'text-cream/80' : 'text-ink-700'}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

type IconName = 'phone' | 'arrow' | 'check' | 'shield' | 'heart' | 'clock' | 'pin' | 'mail';

export function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  const common = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  };
  switch (name) {
    case 'phone':
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case 'arrow':
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
  }
}

export function CallButton({
  className = '',
  variant = 'primary',
  label,
}: {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost-light';
  label?: string;
}) {
  const cls =
    variant === 'secondary'
      ? 'btn-secondary'
      : variant === 'outline'
      ? 'btn-outline'
      : variant === 'ghost-light'
      ? 'btn-ghost-light'
      : 'btn-primary';
  return (
    <a href="tel:+18668613449" className={`${cls} ${className}`}>
      <Icon name="phone" className="h-4 w-4" />
      {label ?? 'Call (866) 861-3449'}
    </a>
  );
}

export function PrimaryLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn-primary ${className}`}>
      {children}
      <Icon name="arrow" className="h-4 w-4" />
    </Link>
  );
}
