'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';
import { Icon } from './ui';

// The clinic's existing TrustIndex widget id (pulls their live Google reviews).
const TRUSTINDEX_SRC = 'https://cdn.trustindex.io/loader.js?c7e2512707843536b956cb3ce04';

/**
 * Embeds the practice's live TrustIndex review widget. TrustIndex's loader
 * injects the widget adjacent to its own <script> tag, so we append the script
 * into a container ref on mount. If it fails to load, a graceful fallback with a
 * link to Google/Facebook reviews remains so the section is never empty.
 */
export default function Reviews() {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.querySelector('script')) return;
    const s = document.createElement('script');
    s.src = TRUSTINDEX_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => setLoaded(true);
    el.appendChild(s);
  }, []);

  return (
    <div>
      <div ref={ref} className="min-h-[40px]" />
      {!loaded && (
        <div className="mx-auto mt-2 max-w-md text-center">
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Read Our Reviews
            <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}
