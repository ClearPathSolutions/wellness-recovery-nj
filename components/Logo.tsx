import Link from 'next/link';
import Image from 'next/image';

/**
 * Brand lockup for Wellness Recovery Center of NJ.
 *
 * These are the supplied brand files, used unmodified — `logo.png` for light
 * backgrounds (terracotta wordmark) and `logo-white.png` for dark ones (white
 * wordmark, "NJ" stays sand in both). Don't recolour or redraw them; if the
 * brand artwork changes, replace the files.
 */
const LOCKUP = { width: 1800, height: 1021 };

export default function Logo({
  variant = 'dark',
  className = '',
  withText = true,
  priority = false,
}: {
  /** `dark` = dark wordmark for light backgrounds; `light` = the reverse. */
  variant?: 'dark' | 'light';
  className?: string;
  withText?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Wellness Recovery Center of New Jersey — home"
      className={`group inline-flex items-center ${className}`}
    >
      {withText ? (
        <Image
          src={variant === 'light' ? '/images/logo/logo-white.png' : '/images/logo/logo.png'}
          alt="Wellness Recovery Center NJ"
          width={LOCKUP.width}
          height={LOCKUP.height}
          sizes="180px"
          priority={priority}
          className="h-12 w-auto shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <Logomark className="h-12 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105" />
      )}
    </Link>
  );
}

/**
 * The mark on its own — favicons, tight spaces, social avatars.
 *
 * Traced from the brand artwork: a sand circle above a clay circle that fuses
 * into a dusty-rose one at a pinched waist, the rose laid over the clay along a
 * straight diagonal.
 */
export function Logomark({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 326 1021"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="169" cy="157" r="156.5" fill="#d9c2ae" />
      <clipPath id="wrc-pod">
        <path d={POD} />
      </clipPath>
      <path d={POD} fill="#d39d79" />
      <path d={ROSE_SPLIT} fill="#c28485" clipPath="url(#wrc-pod)" />
    </svg>
  );
}

/** Fused clay-and-rose form: two circles joined by a concave waist. */
const POD =
  'M57.31 626.13 A156.5 156.5 0 1 1 272.5 633.89 A81.89 81.89 0 0 0 268.33 752.8 ' +
  'A157 157 0 1 1 52.91 745.03 A81.89 81.89 0 0 0 57.31 626.13 Z';

/** Diagonal that hands the lower-left of the pod over to the rose. */
const ROSE_SPLIT = 'M-562.7 300 L1087.3 1200 L-200 1200 L-200 300 Z';
