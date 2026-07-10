export type Addiction = {
  slug: string;
  name: string;
  h1: string;
  category: 'Substance' | 'Opioid' | 'Stimulant' | 'Depressant';
  short: string;
  intro: string;
  image: string;
  body: string[];
  signs: string[];
  stat?: { value: string; label: string };
};

export const addictions: Addiction[] = [
  {
    slug: 'alcohol',
    name: 'Alcohol',
    h1: 'Alcohol Rehab in New Jersey',
    category: 'Substance',
    short: 'Expert, compassionate treatment for alcohol use disorder — the most socially normalized and accessible addiction.',
    intro:
      'Because alcohol is socially accepted and everywhere we go, recovery comes with unique challenges — bars, restaurants, and gatherings can all be triggers. Our program teaches the coping skills and support systems you need to navigate stress and stay grounded in sobriety.',
    image: '/images/stock/reflection.jpg',
    body: [
      'An estimated 29.5 million Americans have alcohol use disorder, and it carries a heavy toll — both on health and on daily life. Alcohol harms nearly every system in the body, from short-term risks like injury and poisoning to long-term complications including heart disease, liver disease, and certain cancers.',
      'What makes alcohol so difficult to overcome is how normalized it is. Drinking often starts socially and slowly becomes a way to cope — until it begins affecting relationships, work, and well-being in ways that are easy to overlook.',
      'At Wellness Recovery Center, we deliver outpatient alcohol treatment that lets you heal within your own environment, supported by evidence-based therapy and holistic options like yoga, reiki, and outdoor activities.',
    ],
    signs: [
      'Drinking more, or for longer, than intended',
      'Building tolerance and needing more to feel the effect',
      'Withdrawal symptoms when not drinking',
      'Being unable to cut back or stop',
      'New or worsening health concerns',
      'Legal issues such as a DWI, or trouble at work',
      'Hiding or concealing how much you drink',
    ],
    stat: { value: '29.5M', label: 'Americans living with alcohol use disorder' },
  },
  {
    slug: 'opioids',
    name: 'Opioids',
    h1: 'Opioid Rehab in New Jersey',
    category: 'Opioid',
    short: 'Client-first opioid addiction treatment across multiple levels of care.',
    intro:
      'The opioid epidemic has made overdose one of the leading causes of injury-related death in the United States. Our program meets it with a client-first philosophy and a full continuum of care — from partial hospitalization to outpatient services.',
    image: '/images/stock/counseling.jpg',
    body: [
      'Opioids — including oxycodone, hydrocodone, morphine, and fentanyl — bind to receptors in the brain that govern pain and emotion, producing relief and calm. Over time, tolerance builds and higher doses are needed, which is how dependence takes hold.',
      'Opioid withdrawal is rarely as immediately dangerous as alcohol or benzo withdrawal, but overdose can be fatal. Naloxone can reverse an overdose without clearing opioids from the body, so professional medical support remains essential.',
      'We treat opioid addiction with PHP, IOP, and outpatient care, medication-assisted treatment, and dual-diagnosis support, complemented by holistic therapies including reiki, yoga, art, music, and meditation.',
    ],
    signs: [
      'Constricted pupils and slurred speech',
      'Drowsiness or "nodding out"',
      'Withdrawing from family and friends',
      'Doctor shopping to obtain more medication',
      'Irritability and mood changes',
      'Financial trouble and difficulties at work',
      'Lying, manipulating, or stealing',
    ],
  },
  {
    slug: 'benzo',
    name: 'Benzodiazepines',
    h1: 'Benzo Rehab in New Jersey',
    category: 'Depressant',
    short: 'Whether it began with anxiety or insomnia, we can help you break free from benzo dependence.',
    intro:
      'Roughly 19% of U.S. adults experience an anxiety disorder each year, and benzodiazepines are among the most commonly prescribed treatments. Effective recovery combines careful medical support with therapy that addresses the anxiety underneath.',
    image: '/images/stock/wellness.jpg',
    body: [
      'Benzodiazepines are Schedule IV depressants used to treat anxiety, panic, insomnia, and epilepsy. They raise GABA levels in the brain to produce a calming effect — but that same mechanism can slow heart rate and breathing, and dependence can develop, especially with non-prescribed use.',
      'Because benzo withdrawal can be medically serious, treatment intensity is carefully matched to your symptoms, withdrawal needs, mental health, and substance history.',
      'Our program offers PHP, IOP, and outpatient care with full dual-diagnosis capability, so the anxiety or insomnia that led to benzo use is treated right alongside the dependence itself.',
    ],
    signs: [
      'Dilated pupils and glazed eyes',
      'Slurred speech and poor coordination',
      'Moodiness and defensiveness about use',
      'Continued use despite consequences',
      'Impairment at work, school, or home',
      'Memory challenges and cognitive decline',
      'Cravings and difficulty stopping',
    ],
    stat: { value: '19.1%', label: 'of U.S. adults face an anxiety disorder each year' },
  },
  {
    slug: 'cocaine',
    name: 'Cocaine',
    h1: 'Cocaine Rehab in New Jersey',
    category: 'Stimulant',
    short: 'Real solutions for cocaine addiction at our New Jersey treatment center.',
    intro:
      'Cocaine is a powerful Schedule II stimulant, and its short-lived high drives a cycle of repeated use. When mixed with opioids like fentanyl, the risk of fatal overdose rises sharply.',
    image: '/images/stock/recovery.jpg',
    body: [
      'About 4.8 million Americans used cocaine in the past year, and 1.4 million have a cocaine use disorder. Cocaine disrupts the brain’s dopamine system to produce euphoria, energy, and reduced appetite — but effects last only 5 to 30 minutes, fueling compulsive redosing.',
      'Long-term use damages the cardiovascular system and can lead to heart attack, stroke, and seizures. Over 24,000 cocaine-related overdose deaths were recorded in 2021, many involving fentanyl contamination.',
      'We treat cocaine addiction through detox referral, PHP, and intensive outpatient care, combining psychoeducation, individual and group therapy, DBT, trauma-focused groups, and holistic modalities.',
    ],
    signs: [
      'Dilated pupils and elevated heart rate',
      'Restlessness, anxiety, and paranoia',
      'Increased body temperature',
      'Tremors and muscle twitches',
      'Bizarre or high-risk behavior',
      'Lying, stealing, or manipulation',
      'Hyperactivity followed by crashes',
    ],
    stat: { value: '1.4M', label: 'Americans living with cocaine use disorder' },
  },
  {
    slug: 'heroin',
    name: 'Heroin',
    h1: 'Heroin Rehab in New Jersey',
    category: 'Opioid',
    short: 'Recovery from heroin addiction is achievable with the right treatment and support.',
    intro:
      'Heroin addiction often grows out of costly prescription-opioid dependence, and it can bring profound chaos to a person’s life. With proper treatment and genuine support, lasting recovery is absolutely within reach.',
    image: '/images/stock/hope.jpg',
    body: [
      'Heroin is a Schedule I opioid that can be snorted, smoked, or injected. Because it’s cheaper than other opioids and often cut with dangerous substances like fentanyl, it carries an especially high overdose risk — one that naloxone can’t always reverse.',
      'Heroin binds to receptors in the brain and floods it with dopamine, but repeated use suppresses the body’s natural opioid production, hijacking the reward system and driving deeper addiction.',
      'Our program provides personalized outpatient treatment with dual-diagnosis care, relapse-prevention groups, and complementary therapies including yoga, art, and music — meeting you wherever you are.',
    ],
    signs: [
      'Warm, flushed skin and dry mouth',
      'Drowsiness and mental cloudiness',
      'Slowed breathing and heart rate',
      'Nausea, itching, and constipation',
      'Weight and appetite loss',
      'Wearing long sleeves to hide marks',
      'Mood swings and financial problems',
    ],
  },
  {
    slug: 'fentanyl',
    name: 'Fentanyl',
    h1: 'Fentanyl Rehab in New Jersey',
    category: 'Opioid',
    short: 'Specialized, evidence-based treatment for one of the most dangerous drugs in the opioid crisis.',
    intro:
      'Fentanyl has become a driving force behind the opioid crisis. Fifty to one hundred times stronger than morphine, it’s often mixed into other drugs without the user’s knowledge — making overdose a constant danger.',
    image: '/images/stock/meditation.jpg',
    body: [
      'Fentanyl is a Schedule II synthetic opioid with an extremely high potential for addiction. Illicit versions are frequently combined with other substances, so people may take it without ever realizing it — a major reason overdose deaths have surged.',
      'It binds to opioid receptors and rewires the brain’s reward system until continued use becomes the only source of relief or pleasure. Breaking that cycle requires expert, coordinated care.',
      'We offer evidence-based fentanyl treatment across PHP, IOP, and outpatient programs, with dual-diagnosis support, DBT skills training, gender-specific trauma groups, and holistic therapies. Recommended outpatient treatment typically runs from six months to a year.',
    ],
    signs: [
      'Running out of medication early',
      'Inability to fulfill responsibilities',
      'Financial concerns and borrowing money',
      'Social withdrawal and isolation',
      'Dishonesty or theft',
      'Defensiveness about substance use',
      'Drowsiness and slowed breathing',
    ],
    stat: { value: '50–100×', label: 'more potent than morphine' },
  },
  {
    slug: 'meth',
    name: 'Methamphetamine',
    h1: 'Meth Rehab in New Jersey',
    category: 'Stimulant',
    short: 'Judgment-free, comprehensive treatment for methamphetamine addiction.',
    intro:
      'Meth addiction affects millions of Americans, and stigma too often keeps people from getting help. We meet you with compassion, not judgment — and with a full program built for lasting recovery.',
    image: '/images/stock/group-therapy.jpg',
    body: [
      'Methamphetamine is a synthetic stimulant with a high potential for addiction. It triggers a powerful dopamine surge — euphoria, energy, wakefulness — but is manufactured with toxic chemicals that damage the body over time.',
      'NIDA documented 1.6 million people with meth addiction in 2021 and roughly 32,000 overdose deaths primarily involving meth. Long-term use can cause anhedonia, paranoia, hallucinations, and lasting cognitive harm.',
      'Our outpatient programs — PHP, IOP, and standard outpatient — pair evidence-based care with dual-diagnosis treatment and holistic therapies including reiki, yoga, art, music, and family programming.',
    ],
    signs: [
      'Scabs or scarring from injection sites',
      'Rapid, unintended weight loss',
      'Significant dental damage',
      'Burns on the fingers or lips',
      'Dishonesty and stealing',
      'Social withdrawal',
      'Paranoia, insomnia, and agitation',
    ],
    stat: { value: '1.6M', label: 'Americans living with meth addiction (2021)' },
  },
  {
    slug: 'oxycodone',
    name: 'Oxycodone',
    h1: 'Oxycodone Rehab in New Jersey',
    category: 'Opioid',
    short: 'Treatment for oxycodone dependence — before it leads to cheaper, deadlier opioids.',
    intro:
      'Oxycodone (OxyContin, Percocet) is a Schedule II opioid with high addiction and overdose risk. Many people begin with a legitimate prescription and, as dependence grows, move toward cheaper opioids like heroin and fentanyl.',
    image: '/images/stock/therapy-session.jpg',
    body: [
      'Oxycodone is prescribed for severe pain that doesn’t respond to other medications. It acts as a central nervous system depressant, binding to brain receptors to relieve pain and produce euphoria — but extended use creates both physical and psychological dependence.',
      'As tolerance builds, the risk of misuse and overdose climbs. Recognizing the signs early — and getting professional help — can prevent the progression toward more dangerous street opioids.',
      'We treat oxycodone addiction with PHP (up to 8 hours a day, 5 days a week), IOP (3 hours, 3–4 days a week), and routine outpatient care, alongside holistic therapies and relapse-prevention groups.',
    ],
    signs: [
      'Constricted pupils',
      'Running out of medication early',
      'Preoccupation with the next dose',
      'Loss of interest in activities',
      'Mood, sleep, and appetite changes',
      'Social distancing and isolation',
      'Tolerance and withdrawal symptoms',
    ],
  },
  {
    slug: 'prescription-drugs',
    name: 'Prescription Drugs',
    h1: 'Prescription Drug Rehab in New Jersey',
    category: 'Substance',
    short: 'Help for the misuse of opioids, stimulants, sedatives, and other controlled prescriptions.',
    intro:
      'Prescription medications help millions manage pain, anxiety, and ADHD — but controlled substances carry real addiction risk. Misuse can be unintentional or intentional, and it often begins as an attempt to self-medicate emotional distress.',
    image: '/images/stock/community.jpg',
    body: [
      'The most commonly misused prescriptions include amphetamines, benzodiazepines, opioids, sedatives, and stimulants — medications like Adderall, Ativan, Morphine, Oxycodone, Ritalin, Vicodin, and Xanax. Risk rises with prior substance use, family history, and co-occurring mental health concerns.',
      'Each class affects the body differently: opioids cause nodding out and constricted pupils, depressants cause slurred speech and confusion, and stimulants disrupt sleep and appetite. Overdose is the most serious acute danger, and long-term misuse causes lasting organ and mental-health damage.',
      'We treat prescription drug addiction with PHP, IOP, and outpatient care, dual-diagnosis treatment, DBT skills training, and holistic therapies that address the whole person.',
    ],
    signs: [
      'Taking more than prescribed',
      'Running out of medication early',
      'Doctor shopping for more prescriptions',
      'Defensiveness about medication use',
      'Cravings and withdrawal symptoms',
      'Mood swings and irritability',
      'Changes in appearance and hygiene',
    ],
    stat: { value: '16.3M', label: 'Americans misuse prescriptions each year' },
  },
  {
    slug: 'xanax',
    name: 'Xanax',
    h1: 'Xanax Rehab in New Jersey',
    category: 'Depressant',
    short: 'Compassionate treatment for Xanax (alprazolam) dependence and the anxiety beneath it.',
    intro:
      'Xanax (alprazolam) is a Schedule IV benzodiazepine prescribed for anxiety, panic, and sleep. Its abuse risk is lower than higher-scheduled drugs, but it still poses genuine physical and psychological dependence — and stopping abruptly can be dangerous.',
    image: '/images/stock/nature.jpg',
    body: [
      'Xanax works by increasing GABA in the brain, slowing neural activity to ease anxiety and panic. Misuse — taking it differently than prescribed — causes poor concentration, slurred speech, confusion, memory problems, and rising tolerance.',
      'Overdose can lead to unconsciousness and respiratory failure, and abrupt cessation risks seizures, which is why medical support matters. Long-term abuse is linked to memory impairment and cognitive decline.',
      'Our program treats Xanax dependence alongside the anxiety that so often drives it, using dual-diagnosis care, evidence-based therapy, and a level of care matched to your needs.',
    ],
    signs: [
      'Inability to control or limit use',
      'Cravings and preoccupation with use',
      'Changes in appetite, hygiene, or weight',
      'Distancing from family and friends',
      'Difficulties at work and legal concerns',
      'Rebound or worsening anxiety',
      'Others expressing concern about you',
    ],
  },
];

export const getAddiction = (slug: string) => addictions.find((a) => a.slug === slug);
