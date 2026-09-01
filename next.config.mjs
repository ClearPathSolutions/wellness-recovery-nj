/**
 * Content-Security-Policy.
 *
 * Every host below was observed loading on the deployed site — enumerated by
 * driving /, /blog, a post, /contact, /admissions, /tour, /about, /faq and a
 * county page in a browser and recording each request by resource type. Do not
 * add a host speculatively, and do not remove one without re-running that
 * sweep: a missing entry fails silently in the visitor's browser, which is the
 * exact class of bug this policy exists to prevent.
 */
const SELF = "'self'";

// Clarion: chat widget + forms-capture (www), lead/webchat API and post images (api).
const CLARION = 'https://www.clarionlabs.ai';
const CLARION_API = 'https://api.clarionlabs.ai';

// CallTrackingMetrics — t.js, plus the p.js that t.js injects itself.
const CTM = 'https://264810.tctm.co';

// Google Maps embed on the contact and about pages. It pulls scripts, map
// tiles, an iframe document and its own Roboto webfont.
const GMAPS = [
  'https://maps.googleapis.com',
  'https://maps.gstatic.com',
  'https://places.googleapis.com',
  'https://www.google.com',
];
const GFONTS_CSS = 'https://fonts.googleapis.com';
const GFONTS_FILES = 'https://fonts.gstatic.com';

// Trustindex review widget.
const TRUSTINDEX = 'https://cdn.trustindex.io';

// Post covers. They go through next/image today, so the browser only fetches
// them from 'self' — listed so a raw <img> in Clarion post body HTML also
// renders if one ever appears.
const UNSPLASH = 'https://images.unsplash.com';

const csp = [
  `default-src ${SELF}`,
  // Next inlines its bootstrap and RSC payload scripts and the layout carries
  // inline JSON-LD, so 'unsafe-inline' is unavoidable without a nonce — and a
  // nonce needs middleware, which would opt all 57 static pages into dynamic
  // rendering.
  `script-src ${SELF} 'unsafe-inline' ${CTM} ${CLARION} ${TRUSTINDEX} ${GMAPS.join(' ')}`,
  // next/font and Tailwind emit <style> tags and style attributes. Trustindex
  // pulls its own preset stylesheet from its CDN — it loads late, after the
  // widget boots, so it is easy to miss on a quick page sweep.
  `style-src ${SELF} 'unsafe-inline' ${GFONTS_CSS} ${TRUSTINDEX}`,
  `img-src ${SELF} data: blob: ${CLARION_API} ${CLARION} ${UNSPLASH} ${CTM} ${TRUSTINDEX} ${GMAPS.join(' ')} https://*.googleusercontent.com`,
  `font-src ${SELF} data: ${GFONTS_FILES}`,
  `connect-src ${SELF} ${CLARION_API} ${CLARION} ${CTM} ${TRUSTINDEX} ${GMAPS.join(' ')}`,
  `frame-src ${SELF} ${CLARION} ${TRUSTINDEX} https://www.google.com`,
  `media-src ${SELF}`,
  `worker-src ${SELF} blob:`,
  `manifest-src ${SELF}`,
  `base-uri ${SELF}`,
  `object-src 'none'`,
  // Forms post to our own /api/verify-insurance, never off-origin.
  `form-action ${SELF}`,
  `frame-ancestors ${SELF}`,
  'upgrade-insecure-requests',
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Clarion-hosted post cover images come from external CDNs (Unsplash today,
    // Clarion uploads later). Allow any https host so posts never break on a
    // new image source — the content itself is first-party (our Clarion feed).
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Content-Security-Policy', value: csp }],
      },
    ];
  },
  async redirects() {
    const addictions = [
      'alcohol', 'benzo', 'cocaine', 'fentanyl', 'heroin',
      'meth', 'opioids', 'oxycodone', 'prescription-drugs', 'xanax',
    ];
    const posts = [
      'benefits-of-mental-health-iop',
      'how-alcohol-addiction-affects-daily-life',
      'how-php-helps-early-recovery',
      'how-xanax-addiction-develops',
      'signs-of-prescription-drug-abuse',
      'opioid-withdrawal-symptoms',
      'mental-health-treatment-new-jersey-2',
      'mental-health-treatment-new-jersey',
      'west-windsor-addiction-treatment-guide',
      'understanding-dual-diagnosis-treatment-in-new-jersey',
      'when-willpower-isnt-enough-healing-the-hidden-drivers-of-addiction-in-new-jersey',
      'new-year-new-routine-how-iop-helps-you-build-stability-in-early-recovery',
      'wellness-recovery-center-pioneering-holistic-recovery-in-new-jersey',
      'discovering-purpose-and-meaning-in-life-after-addiction-a-guide-to-wellness-recovery-nj',
      'exploring-different-treatment-modalities',
      'how-addiction-affects-families-and-relationships',
      'adventure-therapy',
      'how-to-help-a-loved-one-battling-addiction',
      'role-of-therapy-in-addiction-recovery',
    ];
    return [
      // Old addiction pages lived at the root — move under /what-we-treat
      ...addictions.map((slug) => ({
        source: `/${slug}`,
        destination: `/what-we-treat/${slug}`,
        permanent: true,
      })),
      // Blog posts lived at the root — move under /blog
      ...posts.map((slug) => ({
        source: `/${slug}`,
        destination: `/blog/${slug}`,
        permanent: true,
      })),
      // Areas: singular -> plural, preserving the county slug
      { source: '/area-we-serve', destination: '/areas-we-serve', permanent: true },
      { source: '/area-we-serve/:slug', destination: '/areas-we-serve/:slug', permanent: true },
      // Renamed pages
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/faq-page', destination: '/faq', permanent: true },
      { source: '/treatment/intensive-outpatient', destination: '/treatment/intensive-outpatient-program', permanent: true },
    ];
  },
};

export default nextConfig;
