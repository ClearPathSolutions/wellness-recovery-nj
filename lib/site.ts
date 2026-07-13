// Central site configuration — single source of truth for contact info & nav.

export const site = {
  name: 'Wellness Recovery Center of New Jersey',
  shortName: 'Wellness Recovery Center',
  tagline: 'Private Substance Abuse & Mental Health Rehab in New Jersey',
  description:
    'Wellness Recovery Center of New Jersey is a state-of-the-art, accredited addiction and mental health treatment center in West Windsor, NJ offering personalized, evidence-based care for drug and alcohol abuse.',
  url: 'https://wellnessrecoverynj.com',
  phone: '(866) 861-3449',
  phoneHref: 'tel:+18668613449',
  email: 'info@wellnessrecoverynj.com',
  emailHref: 'mailto:info@wellnessrecoverynj.com',
  address: {
    street: '231 Clarksville Road, Suite 1',
    city: 'West Windsor',
    state: 'NJ',
    zip: '08550',
    full: '231 Clarksville Road, Suite 1, West Windsor, NJ 08550',
    mapsUrl:
      'https://www.google.com/maps/place/231+Clarksville+Rd+%231,+West+Windsor+Township,+NJ+08550',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3042.866877425278!2d-74.6425724239947!3d40.300914671458564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3e1c22655c3b5%3A0x9fd69a6a2e44f6f7!2sWellness%20Recovery%20Center%20of%20New%20Jersey!5e0!3m2!1sen!2sus!4v1776954621862!5m2!1sen!2sus',
  },
  social: {
    facebook: 'https://www.facebook.com/wellnessrecoverynj/',
    instagram: 'https://www.instagram.com/wellnessrecoverynj',
  },
} as const;

// Third-party widget & tracking config — the only per-site values that change.
// See the Clarion + Tracking playbook for the full setup.
export const widgets = {
  clarion: {
    siteKey: 'cpx_gh-wYjucAl0Up0F29gqk3SU00A1p7qsQ', // 👈 only value that changes per site
    api: 'https://api.clarionlabs.ai',
    widget: 'https://www.clarionlabs.ai/widget.v1.js',
    formsCapture: 'https://www.clarionlabs.ai/forms-capture.v1.js',
    blogEmbed: 'https://www.clarionlabs.ai/blog-embed.v1.js',
    // Form keys must exist in the Clarion dashboard.
    formKeys: {
      contact: 'contact',
      insurance: 'insurance_verification',
    },
  },
  // Call-tracking pixel (tctm.co — separate vendor). Swaps/tracks phone numbers.
  callTracking: {
    src: '//264810.tctm.co/t.js',
  },
} as const;

export type ClarionFormKey = (typeof widgets.clarion.formKeys)[keyof typeof widgets.clarion.formKeys];

export type NavChild = { label: string; href: string; description?: string };
export type NavColumn = { heading: string; links: NavChild[] };
export type NavItem = {
  label: string;
  href: string;
  columns?: NavColumn[];
};

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Who We Are', href: '/about' },
  {
    label: 'Treatment',
    href: '/treatment',
    columns: [
      {
        heading: 'Programs',
        links: [
          { label: 'Partial Hospitalization (PHP)', href: '/treatment/partial-hospitalization' },
          { label: 'Intensive Outpatient (IOP)', href: '/treatment/intensive-outpatient-program' },
          { label: 'Outpatient Program', href: '/treatment/outpatient' },
          { label: 'Mental Health IOP', href: '/treatment/mental-health-iop' },
          { label: 'Dual Diagnosis', href: '/treatment/dual-diagnosis' },
        ],
      },
      {
        heading: 'What We Treat',
        links: [
          { label: 'Alcohol Addiction', href: '/what-we-treat/alcohol' },
          { label: 'Opioid Addiction', href: '/what-we-treat/opioids' },
          { label: 'Benzo Addiction', href: '/what-we-treat/benzo' },
          { label: 'Cocaine Addiction', href: '/what-we-treat/cocaine' },
          { label: 'Heroin Addiction', href: '/what-we-treat/heroin' },
          { label: 'Fentanyl Addiction', href: '/what-we-treat/fentanyl' },
        ],
      },
    ],
  },
  { label: 'Tour', href: '/tour' },
  {
    label: 'Resources',
    href: '/blog',
    columns: [
      {
        heading: 'Learn',
        links: [
          { label: 'Blog & Articles', href: '/blog' },
          { label: 'Areas We Serve', href: '/areas-we-serve' },
          { label: 'FAQ', href: '/faq' },
          { label: 'Verify Insurance', href: '/admissions' },
        ],
      },
      {
        heading: 'Counties',
        links: [
          { label: 'Mercer County', href: '/areas-we-serve/mercer-county' },
          { label: 'Hunterdon County', href: '/areas-we-serve/hunterdon-county' },
          { label: 'Somerset County', href: '/areas-we-serve/somerset-county' },
          { label: 'Morris County', href: '/areas-we-serve/morris-county' },
          { label: 'Sussex County', href: '/areas-we-serve/sussex-county' },
          { label: 'Warren County', href: '/areas-we-serve/warren-county' },
        ],
      },
    ],
  },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Contact', href: '/contact' },
];
