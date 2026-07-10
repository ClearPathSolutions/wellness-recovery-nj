export type Area = {
  slug: string;
  county: string;
  intro: string;
  body: string[];
  towns: string[];
};

export const areasIntro =
  'From our West Windsor facility we serve individuals and families across central and northern New Jersey. Wherever you are in your recovery journey, compassionate, evidence-based care is close to home — with Partial Hospitalization, Intensive Outpatient, Outpatient, Mental Health IOP, and Dual Diagnosis programs, and most major insurance accepted.';

export const areas: Area[] = [
  {
    slug: 'mercer-county',
    county: 'Mercer County',
    intro:
      'Serving Trenton, Hamilton, Ewing, and the surrounding communities, our nearby facility provides customized addiction and mental health treatment for all of Mercer County.',
    body: [
      'Mercer County communities — including Trenton, Hamilton Township, and Ewing Township — carry a significant need for accessible, high-quality addiction care. Our West Windsor center sits right in the heart of the county, making expert treatment easy to reach.',
      'We treat alcohol and heroin dependence along with opioids, cocaine, and other substances through personalized plans that combine individual, group, and experiential therapy. Flexible IOP, outpatient, PHP, and dual-diagnosis options let care fit your schedule.',
      'The vast majority of local clients use insurance benefits to pay for treatment. Our team verifies your coverage at intake so you can focus on getting well, not on paperwork.',
    ],
    towns: ['Trenton', 'Hamilton Township', 'Ewing Township', 'Princeton', 'Lawrence Township', 'West Windsor'],
  },
  {
    slug: 'hunterdon-county',
    county: 'Hunterdon County',
    intro:
      'Compassionate, evidence-based drug and alcohol treatment for Flemington, Raritan, Clinton, and the wider Hunterdon County community.',
    body: [
      'Substance abuse touches every demographic across Hunterdon County. Our program meets that need with personalized treatment plans that address the whole person — not just the addiction.',
      'Care may include medication-assisted treatment, individual and group therapy, CBT, DBT, and experiential therapy. Three outpatient levels — PHP, IOP, and traditional outpatient — let us match the intensity of care to exactly where you are.',
      'Whether you’re just beginning to consider treatment or stepping down from a higher level of care, our team is here to guide you through every phase of recovery.',
    ],
    towns: ['Flemington', 'Raritan Township', 'Clinton Township', 'Lambertville', 'Readington Township'],
  },
  {
    slug: 'somerset-county',
    county: 'Somerset County',
    intro:
      'Specialized addiction treatment for Franklin, Bridgewater, Somerville, North Plainfield, and communities throughout Somerset County.',
    body: [
      'Somerset County communities — including Franklin Township, Bridgewater, Somerville, and North Plainfield — have real and growing treatment needs. Our conveniently located facility offers specialized care built around each client.',
      'Every client begins with a thorough assessment of physical and mental health and family history. From there we build a tailored plan that may include dual-diagnosis care, family involvement, individual therapy such as CBT, and medication management.',
      'Multiple outpatient options — from the intensive structure of PHP to the flexibility of IOP and traditional outpatient — mean your care can adjust as you progress.',
    ],
    towns: ['Franklin Township', 'Bridgewater Township', 'Somerville', 'North Plainfield', 'Hillsborough'],
  },
  {
    slug: 'morris-county',
    county: 'Morris County',
    intro:
      'Individualized outpatient care for Morristown, Parsippany, Roxbury, Dover, Mount Olive, and the greater Morris County area.',
    body: [
      'Several Morris County municipalities — Morristown, Parsippany-Troy Hills, Roxbury, Dover, and Mount Olive — see elevated rates of substance abuse, with alcohol and heroin among the most common reasons for treatment.',
      'We provide individualized outpatient care across three levels: PHP for intensive daily structure, IOP for flexible weekly support, and standard outpatient for ongoing care. Treatment blends individual, group, holistic, and family therapy.',
      'Flexible scheduling makes recovery achievable for working professionals and those with family obligations, so you never have to choose between getting well and keeping your life together.',
    ],
    towns: ['Morristown', 'Parsippany-Troy Hills', 'Roxbury Township', 'Dover', 'Mount Olive'],
  },
  {
    slug: 'sussex-county',
    county: 'Sussex County',
    intro:
      'Flexible, confidential treatment for Newton, Sparta, Vernon, Hopatcong, Wantage, and the Sussex County community.',
    body: [
      'Sussex County faces meaningful substance abuse challenges, and more than half of local treatment seekers turn to outpatient programs that let them keep up with work and family.',
      'We offer three outpatient levels — PHP with full-day individual, group, and holistic care; IOP with flexible scheduling that eases as you progress; and traditional outpatient centered on group support and community connection.',
      'You don’t need to hit “rock bottom” to get help. Reaching out early can prevent the far more serious consequences of untreated addiction — and it’s always confidential.',
    ],
    towns: ['Newton', 'Sparta Township', 'Vernon Township', 'Hopatcong', 'Wantage Township'],
  },
  {
    slug: 'warren-county',
    county: 'Warren County',
    intro:
      'Free, confidential assessments and personalized outpatient treatment for Phillipsburg, Hackettstown, Washington, Blairstown, and Warren County.',
    body: [
      'You don’t have to reach rock bottom to seek treatment. We offer free, confidential assessments so you can understand your options without pressure or judgment.',
      'Warren County sees elevated treatment admission rates, with heroin and alcohol the most common reasons people seek help. Our care meets that need with PHP, IOP, and traditional outpatient programs.',
      'Every plan incorporates individual and group therapy, family support, and practical coping-skill development — because addiction affects not only your life, but the lives of everyone around you.',
    ],
    towns: ['Phillipsburg', 'Hackettstown', 'Washington Borough', 'Blairstown Township', 'Belvidere'],
  },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
