export type Program = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  intro: string;
  image: string;
  hours: string;
  bestFor: string;
  body: string[];
  includes: { title: string; text: string }[];
};

export const programs: Program[] = [
  {
    slug: 'partial-hospitalization',
    name: 'Partial Hospitalization Program',
    short: 'PHP',
    tagline: 'Structured, full-day care without the overnight stay',
    intro:
      'Our Partial Hospitalization Program offers the benefits of inpatient treatment without the 24/7 stay at a residential facility. PHP delivers the highest level of structured, clinically intensive care we offer on an outpatient basis.',
    image: '/images/stock/group-therapy.jpg',
    hours: '30–40 hours a week · full days, 5 days a week',
    bestFor:
      'Clients stepping down from detox or inpatient care, or those who need intensive daily support while living at home or in supportive housing.',
    body: [
      'Partial hospitalization is designed for clients who need substantial daily structure and clinical support but are stable enough to spend evenings at home or in our supportive housing. It bridges the gap between round-the-clock inpatient care and the flexibility of outpatient treatment.',
      'Each day is built around individual therapy, group counseling, psychiatric support, and skill-building sessions that address both addiction and the underlying mental health conditions that so often fuel it. Our clinical team continually adjusts your plan as you progress.',
      'By treating the whole person — not just the symptoms — PHP helps you stabilize early recovery, build a foundation of coping skills, and prepare for a confident step down into intensive outpatient care.',
    ],
    includes: [
      { title: 'Daily individual therapy', text: 'One-on-one sessions with a licensed clinician to work through the root causes of addiction.' },
      { title: 'Group counseling', text: 'Process and psychoeducational groups that build connection, accountability, and coping skills.' },
      { title: 'Psychiatric care', text: 'Medication management and dual-diagnosis support from our medical team.' },
      { title: 'Case management', text: 'A dedicated case manager coordinates your care, housing, and aftercare planning.' },
    ],
  },
  {
    slug: 'intensive-outpatient-program',
    name: 'Intensive Outpatient Program',
    short: 'IOP',
    tagline: 'Flexible, focused treatment built around your life',
    intro:
      'We offer flexible intensive outpatient treatment designed around our clients’ needs, with continued care and support. IOP delivers meaningful clinical structure while allowing you to keep up with work, school, and family responsibilities.',
    image: '/images/stock/counseling.jpg',
    hours: '9–15 hours a week · 3 hours a day, 3–5 days',
    bestFor:
      'Clients who have completed PHP or detox, or those whose situation calls for real structure without a full-day commitment.',
    body: [
      'Our Intensive Outpatient Program provides a powerful middle ground: enough clinical intensity to drive real change, with enough flexibility to let you live at home and keep your responsibilities intact. Sessions are typically scheduled in the morning or evening to fit around your day.',
      'IOP focuses on relapse prevention, emotional regulation, and the practical, real-world tools needed to sustain long-term sobriety. You’ll work in both individual and group settings, supported by a clinical team that knows your story.',
      'For many clients, IOP is the phase where recovery becomes sustainable — where new skills are tested against everyday life and reinforced week after week.',
    ],
    includes: [
      { title: 'Group therapy', text: 'Small, focused groups that build community and reinforce recovery skills.' },
      { title: 'Individual sessions', text: 'Regular one-on-one therapy to keep your plan personal and on track.' },
      { title: 'Relapse prevention', text: 'Practical strategies to recognize triggers and stay grounded under pressure.' },
      { title: 'Flexible scheduling', text: 'Daytime and evening tracks so treatment fits your work and family life.' },
    ],
  },
  {
    slug: 'outpatient',
    name: 'Outpatient Program',
    short: 'OP',
    tagline: 'Ongoing support that keeps recovery strong',
    intro:
      'Our standard outpatient program provides continued care and accountability for clients who have built a solid foundation in recovery and are ready for a lighter, sustainable level of support.',
    image: '/images/stock/therapy-session.jpg',
    hours: '1–2 sessions per week',
    bestFor:
      'Clients transitioning out of IOP, or those who need steady, ongoing support to protect their recovery long-term.',
    body: [
      'Outpatient treatment is the natural continuation of care for clients who have progressed through more intensive levels and are ready to stand more independently. It keeps you connected to your clinical team and your recovery community while you rebuild the rhythms of daily life.',
      'Sessions focus on maintaining progress, navigating real-world challenges, and reinforcing the coping strategies you’ve developed. It’s a flexible, right-sized level of care that grows with you.',
      'Combined with our alumni program and aftercare planning, outpatient care helps make recovery a lasting way of life rather than a single milestone.',
    ],
    includes: [
      { title: 'Weekly counseling', text: 'Continued individual and group sessions to keep you accountable and supported.' },
      { title: 'Aftercare planning', text: 'A clear, personalized roadmap for sustaining recovery beyond treatment.' },
      { title: 'Alumni community', text: 'Ongoing connection to a network of people who understand the journey.' },
      { title: 'Life-first flexibility', text: 'The lightest structured level of care, designed to fit fully into your routine.' },
    ],
  },
  {
    slug: 'mental-health-iop',
    name: 'Mental Health IOP',
    short: 'MH-IOP',
    tagline: 'Structured mental health care that fits your daily routine',
    intro:
      'A structured Mental Health IOP in NJ for anxiety, depression, and trauma that fits your daily routine. When symptoms begin interfering with daily life, there is often a middle ground between weekly therapy and inpatient treatment — and this is it.',
    image: '/images/stock/wellness.jpg',
    hours: '3 hours a day, 3–5 days a week',
    bestFor:
      'Adults managing anxiety, depression, trauma, or mood instability who need more than weekly therapy but don’t require inpatient care.',
    body: [
      'Our Mental Health Intensive Outpatient Program is built for people whose emotional and psychological challenges have started to affect work, relationships, and everyday functioning. It provides intensive, structured clinical support while allowing you to stay home and keep your daily life intact.',
      'Care is delivered by an expert clinical team through a blend of individual therapy, group work, and psychiatric support. We help you build practical tools to calm your nervous system, regulate your emotions, and rediscover a sense of balance and stability.',
      'Whether you’re navigating anxiety, depression, unresolved trauma, or chronic stress and burnout, Mental Health IOP offers the depth of support you need without leaving your life behind.',
    ],
    includes: [
      { title: 'Evidence-based therapy', text: 'CBT, DBT, and trauma-informed approaches tailored to your symptoms.' },
      { title: 'Psychiatric support', text: 'Assessment and medication management from our psychiatric team.' },
      { title: 'Group process work', text: 'Connect with others facing similar challenges in a safe, guided setting.' },
      { title: 'Stability without disruption', text: 'Build lasting mental-health skills while staying in your own home.' },
    ],
  },
  {
    slug: 'dual-diagnosis',
    name: 'Dual Diagnosis Treatment',
    short: 'Dual Diagnosis',
    tagline: 'Treating addiction and mental health together, under one roof',
    intro:
      'Addiction and mental health struggles are deeply intertwined. Our dual-diagnosis program addresses substance use and co-occurring mental health conditions at the same time — because treating one without the other rarely lasts.',
    image: '/images/stock/reflection.jpg',
    hours: 'Integrated across all levels of care',
    bestFor:
      'Clients whose substance use is entangled with anxiety, depression, trauma, PTSD, or other mental health conditions.',
    body: [
      'For many people, addiction is fueled by an underlying mental health condition — anxiety, depression, trauma, or unresolved emotional pain. When only the substance use is treated, those root causes remain, and relapse becomes far more likely.',
      'Our integrated dual-diagnosis approach treats both at once. A single, coordinated clinical team addresses your addiction and your mental health together, so your care plan reflects the full picture of what you’re facing.',
      'By treating the whole person — the addiction and the triggers behind it — dual-diagnosis care gives you the real-world tools needed to achieve lasting, lifelong recovery.',
    ],
    includes: [
      { title: 'Integrated clinical team', text: 'Addiction and mental health specialists working from one shared plan.' },
      { title: 'Psychiatric evaluation', text: 'Thorough assessment to accurately identify co-occurring conditions.' },
      { title: 'Trauma-informed care', text: 'Gentle, expert therapy to process underlying wounds safely.' },
      { title: 'Whole-person recovery', text: 'A plan that addresses the addiction and the reasons behind it.' },
    ],
  },
];

export const getProgram = (slug: string) => programs.find((p) => p.slug === slug);
