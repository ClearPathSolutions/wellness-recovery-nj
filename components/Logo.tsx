import Link from 'next/link';

/**
 * Brand lockup for Wellness Recovery Center of NJ.
 * The mark recreates the logo's three stacked, warm-toned forms so it stays
 * crisp on both light and dark backgrounds; the wordmark colour adapts.
 */
export default function Logo({
  variant = 'dark',
  className = '',
  withText = true,
}: {
  variant?: 'dark' | 'light';
  className?: string;
  withText?: boolean;
}) {
  const textColor = variant === 'light' ? 'text-white' : 'text-ink-900';
  const subColor = variant === 'light' ? 'text-cream/70' : 'text-clay-600';

  return (
    <Link
      href="/"
      aria-label="Wellness Recovery Center of New Jersey — home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <Logomark className="h-10 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105" />
      {withText && (
        <span className="flex flex-col whitespace-nowrap leading-none">
          <span className={`font-display text-[1.05rem] font-semibold tracking-tight ${textColor}`}>
            Wellness Recovery
          </span>
          <span className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${subColor}`}>
            Center of New Jersey
          </span>
        </span>
      )}
    </Link>
  );
}

export function Logomark({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* top droplet — sand */}
      <circle cx="24" cy="9" r="8" fill="#d9c6b2" />
      {/* middle form — clay/terracotta */}
      <circle cx="20" cy="27" r="12" fill="#c0814f" />
      {/* lower form — dusty rose, overlapping */}
      <circle cx="17" cy="43" r="13" fill="#bc7c7d" />
      {/* subtle blend where clay meets rose */}
      <path
        d="M20 27a12 12 0 0 1-3 15 13 13 0 0 0 0-15 12 12 0 0 1 3 0z"
        fill="#a96b40"
        opacity="0.35"
      />
    </svg>
  );
}
