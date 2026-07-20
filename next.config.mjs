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
