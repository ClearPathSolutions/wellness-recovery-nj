'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { recordPageview } from '@/lib/session';

/**
 * Advances the visit session and records ad attribution on every route change,
 * not just first paint.
 *
 * Mounted in the root layout rather than next to the form: a visitor can enter
 * on any route, and capturing only where the form happens to mount means an
 * entry on /privacy-policy?gclid=... records nothing at all.
 *
 * `usePathname` rather than `useSearchParams` — the latter forces a Suspense
 * boundary and opts every otherwise-static page into dynamic rendering. The
 * pathname is only the trigger; the query string is read straight off
 * `window.location` inside the effect.
 */
export default function SessionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    recordPageview();
  }, [pathname]);

  return null;
}
