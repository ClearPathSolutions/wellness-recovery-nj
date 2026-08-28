// Shared site content: team, values, amenities, FAQs, insurance carriers.

export type TeamMember = {
  name: string;
  credentials: string;
  role: string;
  /** Set only for members who have their own bio page under /about. */
  slug?: string;
  image?: string;
  bio?: string[];
};

// Clinical staff based at our West Windsor facility.
export const team: TeamMember[] = [
  {
    name: 'Michelle Szwed',
    credentials: 'LPC, LCADC, ACS',
    role: 'Clinical Director',
  },
  {
    name: 'Dr. Olivia M. Gibson-Delaney',
    credentials: 'M.D.',
    role: 'Medical Director',
  },
  {
    name: 'Ila Holgerson',
    credentials: '',
    role: 'Lead Case Manager',
  },
];

// Network-wide leadership — shared across the wider group of facilities rather
// than staffed to this location, so it is listed separately from our own team.
export const networkTeam: TeamMember[] = [
  {
    slug: 'pamela-tambini',
    name: 'Dr. Pamela Tambini',
    credentials: '',
    role: 'Medical Oversight',
    image: '/images/team/pamela-tambini.jpg',
    bio: [
      'Dr. Pamela Tambini is a board-certified physician in Internal Medicine and Addiction Medicine, entrepreneur, and healthcare executive dedicated to advancing evidence-based treatment for individuals with substance use and co-occurring mental health disorders. She is the Founder and Chief Executive Officer of The Sober Connection, a physician-led medical services organization that partners with behavioral healthcare facilities nationwide to provide comprehensive medical leadership, provider staffing, quality assurance, and regulatory compliance solutions.',
      'With extensive experience across the continuum of addiction treatment—including medical detoxification, residential treatment, partial hospitalization, intensive outpatient, and outpatient care—Dr. Tambini has developed scalable clinical programs that improve patient outcomes while helping organizations maintain regulatory excellence and operational efficiency. Her expertise includes addiction medicine, psychopharmacology, withdrawal management, medical stabilization, utilization review, physician leadership, and multi-state healthcare operations.',
      'Prior to founding The Sober Connection, Dr. Tambini served as a hospitalist within the Veterans Health Administration, where she managed medically complex patients and collaborated with multidisciplinary teams to deliver high-quality inpatient care. Her clinical expertise, combined with her operational leadership, provides a unique perspective on integrating medical excellence with sustainable healthcare systems.',
      'Under Dr. Tambini\'s leadership, The Sober Connection has grown into a multi-state organization supporting behavioral healthcare facilities through physician staffing, medical directorships, quality improvement initiatives, provider education, credentialing, policy development, and clinical oversight. She is recognized for building high-performing medical teams, implementing standardized clinical processes, and helping treatment centers navigate accreditation, licensing, and payer requirements.',
      'Dr. Tambini is passionate about raising the standard of addiction medicine by combining compassionate patient care with innovative operational strategies. Her leadership philosophy emphasizes clinical integrity, accountability, and collaboration, with a focus on creating systems that support both providers and the patients they serve.',
      'She remains actively involved in medical education, physician mentorship, and the ongoing advancement of best practices in behavioral healthcare while continuing to care for patients and advise organizations on clinical program development, healthcare operations, and quality improvement initiatives.',
    ],
  },
];

export const teamMembers: TeamMember[] = [...team, ...networkTeam];

// Members who have their own bio page (i.e. those given a slug).
export const teamBioPages = teamMembers.filter(
  (m): m is TeamMember & { slug: string } => Boolean(m.slug)
);

export const getTeamMember = (slug: string) => teamMembers.find((m) => m.slug === slug);

// Bios we publish verbatim from the parent network — the same text also runs on
// quadranthealthgroup.com and on every other facility site in the group. Without
// a canonical pointing home, a dozen near-identical pages compete with each other
// in search. Keyed by slug so only the people listed here are affected.
export const CANONICAL_AT_PARENT: Record<string, string> = {
  'pamela-tambini': 'https://www.quadranthealthgroup.com/team/pamela-tambini/',
};

export const values = [
  {
    word: 'Transform',
    text: 'We help you transform not just your relationship with substances, but your whole way of moving through the world.',
  },
  {
    word: 'Overcome',
    text: 'With the right tools and support, the obstacles that once felt insurmountable become milestones you leave behind.',
  },
  {
    word: 'Inspire',
    text: 'Recovery is contagious. Our community lifts each other up, one honest conversation at a time.',
  },
  {
    word: 'Recover',
    text: 'We believe that no matter what, recovery is always possible when you seek it.',
  },
];

export const amenities = [
  {
    title: 'Outdoor Lounge',
    caption: 'Perfect for groups',
    image: '/images/facility/facility-4463.jpg',
  },
  {
    title: 'Group Rooms',
    caption: 'A safe environment',
    image: '/images/facility/facility-4480.jpg',
  },
  {
    title: 'Private Rooms',
    caption: 'A place to call your own',
    image: '/images/facility/facility-4489.jpg',
  },
  {
    title: 'Patio Area',
    caption: 'Enjoy the views',
    image: '/images/facility/facility-4491.jpg',
  },
];

// Full facility gallery (curated ordering for a balanced grid)
export const gallery = [
  '/images/facility/facility-4463.jpg',
  '/images/facility/facility-4480.jpg',
  '/images/facility/facility-4489.jpg',
  '/images/facility/facility-4491.jpg',
  '/images/facility/facility-4461.jpg',
  '/images/facility/facility-4465.jpg',
  '/images/facility/facility-4473.jpg',
  '/images/facility/facility-4484.jpg',
  '/images/facility/facility-4458.jpg',
  '/images/facility/facility-4485.jpg',
  '/images/facility/facility-4494.jpg',
  '/images/facility/facility-4497.jpg',
];

export const whyChoose = [
  {
    title: 'Trusted by Many',
    text: 'Wellness Recovery Center of New Jersey is part of a network of facilities that has helped hundreds of people find long-term recovery from substance abuse.',
  },
  {
    title: 'Multiple Options',
    text: 'From detox referral to partial hospitalization and intensive outpatient treatment, we have you covered with the level of care that works best for you.',
  },
  {
    title: 'Modern Facilities',
    text: 'Our newly-renovated, state-of-the-art facilities were designed with your comfort in mind — a place that lives and breathes recovery.',
  },
];

export const treatmentApproaches = [
  { title: 'Evidence-Based Therapies', text: 'CBT, DBT, and other proven modalities delivered by licensed clinicians.' },
  { title: 'Dedicated Case Management', text: 'A single point of contact who coordinates every part of your care.' },
  { title: 'Medication-Assisted Therapy', text: 'Clinically appropriate medication support for alcohol and opioid recovery.' },
  { title: 'Experiential Therapies', text: 'Reiki, yoga, art, music, meditation, kayaking, hiking, and beach days.' },
  { title: 'Alumni Program', text: 'Lasting connection to a recovery community that has your back for good.' },
  { title: 'Integrated Family Program', text: 'Support and healing for the people who love you and want you well.' },
];

export const mentalHealthChallenges = [
  {
    title: 'Anxiety & Panic Disorders',
    text: 'Persistent worry, high-functioning anxiety, and sudden panic attacks can make daily life feel overwhelming. We provide practical, evidence-based tools to calm your nervous system and restore your peace of mind.',
  },
  {
    title: 'Depression & Mood Instability',
    text: 'Chronic depression can strip away your motivation, energy, and joy. Our team provides the psychiatric and therapeutic support needed to help you find your footing and look forward to the future.',
  },
  {
    title: 'Trauma & PTSD',
    text: 'Unresolved trauma or post-traumatic stress can make you feel constantly on edge. We offer gentle, trauma-informed care to help you safely process past wounds and build healthy emotional boundaries.',
  },
  {
    title: 'Chronic Stress & Burnout',
    text: 'The pressure of demanding careers, roles, and family responsibilities can leave you completely drained. Our programs help you rebuild healthy boundaries and sustainable stress-management habits.',
  },
];

export const insuranceCarriers = [
  { name: 'Anthem', logo: '/images/insurance/anthemwhite.svg' },
  { name: 'Beacon', logo: '/images/insurance/beacon-white.svg' },
  { name: 'ComPsych', logo: '/images/insurance/compsychwhite.svg' },
  { name: 'Magellan', logo: '/images/insurance/magellan-white.svg' },
  { name: 'MultiPlan', logo: '/images/insurance/multiplan-white.svg' },
  { name: 'ValueOptions', logo: '/images/insurance/valueoptions-white.svg' },
];

// Additional carriers named across program pages (text-only)
export const additionalCarriers = ['Cigna', 'Aetna', 'Wellmark BCBS', 'UMR', 'Surest'];

export const accreditations = [
  { name: 'The Joint Commission', logo: '/images/accreditation/joint-commission.png' },
  { name: 'LegitScript Certified', logo: '/images/accreditation/legitscript-seal.png' },
  { name: 'SAMHSA', logo: '/images/accreditation/samhsa.png' },
  { name: 'NJ Department of Health', logo: '/images/accreditation/njdoh.png' },
];

export const contactHighlights = [
  { title: 'Same-Day Admissions', text: 'When you’re ready, we’re ready. Many clients can begin the same day they call.' },
  { title: 'Transportation Available', text: 'Getting to treatment shouldn’t be a barrier — ask us about transportation support.' },
  { title: '24/7 Help & Support', text: 'Our caring admissions team is available around the clock, every day of the year.' },
];

export const faqs = [
  {
    q: 'What levels of care do you offer?',
    a: 'We offer a full continuum of outpatient care: Partial Hospitalization (PHP), Intensive Outpatient (IOP), standard Outpatient, a dedicated Mental Health IOP, and integrated Dual Diagnosis treatment. We also coordinate detoxification through a vetted network of trusted providers.',
  },
  {
    q: 'Do you accept insurance?',
    a: 'Yes. We work with most major private and commercial insurance carriers — including Anthem, Beacon, ComPsych, Magellan, MultiPlan, ValueOptions, Cigna, Aetna, and more — on an out-of-network basis. Depending on your policy, your benefits may cover some or all of the cost of treatment. We offer free, confidential verification of benefits.',
  },
  {
    q: 'How quickly can I start treatment?',
    a: 'Often the same day. Our admissions team is available 24/7, and many clients can begin treatment the day they reach out. Call (866) 861-3449 to get started right now.',
  },
  {
    q: 'Where are you located?',
    a: 'Our facility is at 231 Clarksville Road, Suite 1, West Windsor, NJ 08550 — conveniently located for the Princeton area, Mercer County, and communities across central and northern New Jersey.',
  },
  {
    q: 'Do you treat mental health conditions as well as addiction?',
    a: 'Absolutely. Addiction is often driven by underlying mental health conditions such as anxiety, depression, and trauma. Our dual-diagnosis approach treats both at the same time, under one roof, so your recovery addresses the whole person.',
  },
  {
    q: 'What does a typical day look like?',
    a: 'In PHP, days are built around individual and group therapy, skill-building, psychiatric support, and holistic sessions, with lunch provided. IOP and outpatient offer lighter, flexible schedules — including evening options — so treatment fits around work, school, and family.',
  },
  {
    q: 'Is treatment confidential?',
    a: 'Yes. Your privacy is protected at every step. All conversations with our admissions and clinical teams are completely confidential.',
  },
  {
    q: 'What kinds of therapy do you provide?',
    a: 'We combine evidence-based therapies — including CBT, DBT, individual, group, and family therapy — with holistic and experiential options such as reiki, yoga, meditation, art therapy, music therapy, and outdoor activities like kayaking and hiking.',
  },
];
