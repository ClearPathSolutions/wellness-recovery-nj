'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Re-applies the first-touch campaign after every client-side navigation.
 *
 * The inline snippet in app/layout.tsx restores utm_* and gclid on the initial
 * pageview, but the App Router rewrites the URL on each <Link> click, which
 * drops the query string again. forms-capture.v1.js reads location.search at
 * submit time, so without this a visitor who lands on an ad and then clicks
 * through to /contact or /admissions converts as direct traffic.
 *
 * usePathname, not useSearchParams: the latter forces a Suspense boundary and
 * opts every static page into dynamic rendering.
 */
export default function CampaignKeeper() {
  const pathname = usePathname();

  useEffect(() => {
    window.__ftCampaign?.sync();
  }, [pathname]);

  return null;
}
