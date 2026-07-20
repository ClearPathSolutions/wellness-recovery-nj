export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO
  displayDate: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  body: string[];
  // Set on posts sourced from the Clarion feed. bodyHtml holds the rendered
  // article HTML (local posts use the `body` paragraph array instead).
  source?: 'local' | 'clarion';
  bodyHtml?: string;
};

// Ordered newest-first so the homepage can feature the three most recent.
export const blogPosts: BlogPost[] = [
  {
    slug: 'benefits-of-mental-health-iop',
    title: 'How a Mental Health IOP Can Help You Build Stability Without Leaving Home',
    date: '2026-06-17',
    displayDate: 'June 17, 2026',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/wellness.jpg',
    excerpt:
      'A Mental Health IOP offers a middle ground between weekly therapy and inpatient care — structured support several times a week while you keep living your life.',
    body: [
      'When mental health symptoms begin interfering with daily life, many people assume their only options are weekly therapy or inpatient treatment. In reality, there is often a middle ground.',
      'A Mental Health Intensive Outpatient Program (IOP) delivers structured care several times a week while clients continue living at home. It helps people navigating anxiety, depression, trauma, and emotional dysregulation through a blend of individual therapy, group sessions, and skills-based treatment.',
      'One of the biggest advantages of this level of care is the ability to apply new coping strategies to real-world situations right away — reinforcing progress and strengthening long-term emotional resilience. Because you stay connected to your daily routine, the skills you build in session get tested and strengthened in real life.',
      'If weekly therapy no longer feels like enough but inpatient care feels like too much, Mental Health IOP may be the right fit. Reach out to learn whether this level of care is right for you.',
    ],
  },
  {
    slug: 'how-alcohol-addiction-affects-daily-life',
    title: 'How Alcohol Addiction Can Gradually Take Over Daily Life',
    date: '2026-06-03',
    displayDate: 'June 3, 2026',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/reflection.jpg',
    excerpt:
      'Alcohol dependence rarely happens overnight. Understanding the gradual changes can help you recognize when support may be needed.',
    body: [
      'Alcohol addiction rarely happens overnight. For many individuals, drinking begins as a social activity, a way to unwind after work, or a coping mechanism during stressful periods.',
      'Because alcohol is widely accepted and easily accessible, it can be difficult to recognize when drinking has become something more serious. Over time, however, alcohol use can begin affecting emotional health, relationships, physical well-being, and daily responsibilities in ways that are easy to overlook.',
      'Early warning signs often include needing alcohol to cope with stress and finding it difficult to cut back. As dependence grows, it can quietly erode mental health, strain relationships, reduce concentration, disrupt sleep, and create emotional distance from the people you love.',
      'Understanding these changes can help individuals recognize when support may be needed. Comprehensive professional treatment that addresses both the addiction and any underlying mental health concerns offers the best path to lasting recovery.',
    ],
  },
  {
    slug: 'how-php-helps-early-recovery',
    title: 'How a Partial Hospitalization Program Helps During Early Recovery',
    date: '2026-05-20',
    displayDate: 'May 20, 2026',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/group-therapy.jpg',
    excerpt:
      'PHP provides structured, full-day treatment with the accountability and clinical support that early recovery demands.',
    body: [
      'Early recovery can feel overwhelming for many individuals leaving active addiction. Even after detox or initial stabilization, many people still struggle with cravings, emotional instability, stress and triggers, and the difficulty of rebuilding healthy routines.',
      'A Partial Hospitalization Program (PHP) provides structured, full-day outpatient treatment with therapy and support, while clients return home each day. Compared with traditional outpatient care, PHP offers more clinical hours, greater accountability, and more intensive support.',
      'This level of care is especially valuable for those recently out of detox or managing co-occurring mental health conditions. It lets people practice recovery skills in real-world settings — under professional oversight — before stepping down to less intensive care.',
      'If early recovery feels shaky, PHP can provide the structure and support needed to build a stable foundation. Our team can help you determine whether PHP is the right starting point for you.',
    ],
  },
  {
    slug: 'how-xanax-addiction-develops',
    title: 'Why Xanax Addiction Can Develop Faster Than People Expect',
    date: '2026-05-08',
    displayDate: 'May 8, 2026',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/nature.jpg',
    excerpt:
      'Though Xanax is commonly prescribed for anxiety, it carries a high risk of dependence — and many people are surprised by how quickly their bodies come to rely on it.',
    body: [
      'Xanax, the brand name for alprazolam, is a benzodiazepine prescribed for anxiety disorders, panic attacks, and sometimes insomnia. It works by slowing central nervous system activity to create calm — but because it acts so quickly, it can also produce a strong psychological and physical reliance over time.',
      'Xanax acts on the neurotransmitters that regulate stress and emotional responses. With repeated use, the brain adapts by depending on the drug to manage anxiety and dialing down its own natural calming responses, so larger doses are needed for the same effect. This tolerance is often one of the first signs that dependence is forming.',
      'Many people don’t realize they’ve become dependent until they try to stop. Signs include feeling anxious between doses, taking more than prescribed, needing Xanax to sleep or relax, memory fog, mood swings, running out of medication early, and experiencing withdrawal when a dose is missed.',
      'Xanax withdrawal can be medically serious without supervision — severe anxiety, tremors, insomnia, a racing heart, and in severe cases seizures — which is why many people benefit from medically supervised detox and structured treatment.',
      'Recovery usually requires more than simply stopping. Treatment can include medically supervised detox referrals, individual therapy, dual-diagnosis treatment, relapse-prevention planning, and flexible outpatient support that addresses both the addiction and any underlying mental health concerns.',
    ],
  },
  {
    slug: 'signs-of-prescription-drug-abuse',
    title: 'Signs of Prescription Drug Abuse in Adults',
    date: '2026-04-21',
    displayDate: 'April 21, 2026',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/therapy-session.jpg',
    excerpt:
      'Prescription drug misuse often develops quietly, which makes it hard to detect. Recognizing the early warning signs allows for intervention before dependency takes hold.',
    body: [
      'Prescription drug abuse is often harder to spot than illicit drug use because it tends to happen quietly. People may keep working and meeting responsibilities, hold a valid prescription, and conceal behavioral changes — making it difficult to recognize when use has become a problem.',
      'Behavioral changes are usually the first indicators: taking more medication than prescribed, running out of prescriptions early, visiting multiple doctors for more medication, becoming defensive about use, and withdrawing from family, friends, or activities. Physical signs can include drowsiness, appetite changes, poor coordination, sleep disturbances, and declining hygiene.',
      'Prescription drug abuse also produces emotional shifts — mood swings, increased anxiety or depression, difficulty concentrating, and emotional numbness. Some people keep using to cope with those very symptoms, reinforcing the cycle. This is often compounded by “high-functioning” abuse, in which someone maintains a career while privately experiencing cravings and growing reliance.',
      'Repeated misuse can progress into physical and psychological dependence, marked by needing higher doses, withdrawal symptoms, and feeling unable to function without the medication. Because prescription drug abuse carries risks of overdose and long-term health complications, earlier intervention makes recovery easier.',
      'Treatment typically involves a structured, supportive approach — individual therapy, group therapy, dual-diagnosis care, and flexible outpatient programs. Recognizing the signs is the first step toward change, and support is available for anyone experiencing these patterns.',
    ],
  },
  {
    slug: 'opioid-withdrawal-symptoms',
    title: 'Opioid Withdrawal Symptoms: Timeline, Risks, and What to Expect',
    date: '2026-04-08',
    displayDate: 'April 8, 2026',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/counseling.jpg',
    excerpt:
      'Quitting opioids triggers withdrawal symptoms that are intensely uncomfortable but usually not life-threatening. Understanding the timeline helps people prepare for recovery.',
    body: [
      'Opioids bind to brain receptors that control pain and reward, and prolonged use creates physical dependence. When the drug is stopped, the body must readjust — producing withdrawal. Common opioids include oxycodone, hydrocodone, heroin, and fentanyl, and extended use builds tolerance that deepens dependence.',
      'Early withdrawal (roughly 6 to 12 hours after the last dose) brings anxiety, restlessness, muscle aches, runny nose, watery eyes, sweating, and insomnia — much like a severe case of the flu — along with strong cravings.',
      'Peak withdrawal (days 1 to 3) is the most severe stage, with nausea, vomiting, diarrhea, abdominal cramping, rapid heart rate, and powerful cravings. Although rarely fatal, dehydration from gastrointestinal symptoms can cause complications if unmanaged.',
      'In the subacute phase (days 4 to 10), physical symptoms gradually ease but fatigue, low mood, poor sleep, and reduced appetite linger, keeping relapse risk high. Post-acute withdrawal can then stretch on for weeks to months, producing lingering anxiety, depression, and sleep disturbances — which is why ongoing support matters so much.',
      'Even though opioid withdrawal is typically not deadly, the combination of physical misery and intense cravings makes it a major barrier to recovery. Professional treatment — often medication-assisted treatment plus individual and group therapy and dual-diagnosis care — stabilizes symptoms, reduces cravings, and builds a foundation for lasting recovery.',
    ],
  },
  {
    slug: 'mental-health-treatment-new-jersey-2',
    title: 'Mental Health Treatment in New Jersey: Flexible Care That Fits Your Life',
    date: '2026-03-24',
    displayDate: 'March 24, 2026',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/calm.jpg',
    excerpt:
      'Outpatient programs in New Jersey provide structured mental health support while letting people keep up with work, family, and personal responsibilities.',
    body: [
      'Mental health conditions span a wide spectrum — from mild symptoms to serious challenges that disrupt daily functioning — including depression, anxiety, trauma and PTSD, bipolar disorder, and other mood disorders. They arise from a mix of biological and environmental factors, and many people experience substance use alongside them.',
      'People often delay seeking help, hoping symptoms will resolve on their own. Warning signs include persistent sadness or emotional numbness, high anxiety, sleep difficulties or low energy, loss of interest in activities, withdrawal from relationships, and trouble focusing. When these begin interfering with daily life, professional support becomes essential.',
      'Outpatient treatment works well because it provides structured care while allowing people to stay home. The center offers multiple outpatient levels, including partial hospitalization and intensive outpatient programs, with flexible scheduling, structured weekly therapy, and the chance to apply coping skills in real-world situations.',
      'Mental health and substance use are tightly linked — people frequently use drugs or alcohol to cope with emotional pain, which leads to dependence while worsening the underlying symptoms. Dual-diagnosis treatment addresses both conditions together for stronger, more sustainable outcomes.',
      'Care is personalized to each individual’s needs, history, and goals — individual therapy, group therapy, evidence-based approaches like CBT, and holistic support such as mindfulness. With the right support, people can regain stability and move forward with confidence.',
    ],
  },
  {
    slug: 'mental-health-treatment-new-jersey',
    title: 'Mental Health Treatment in New Jersey',
    date: '2026-03-09',
    displayDate: 'March 9, 2026',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/hope.jpg',
    excerpt:
      'Mental health challenges can strain relationships and undermine work — but effective, personalized professional treatment is available.',
    body: [
      'Mental health conditions affect millions of Americans and range widely in severity, from depression and anxiety to bipolar disorder and trauma-related conditions. Symptoms may build gradually or appear suddenly after a stressful event.',
      'Common warning signs include persistent sadness or hopelessness, trouble concentrating or staying motivated, changes in sleep or appetite, rising anxiety or panic attacks, loss of interest in activities, and emotional instability.',
      'Mental health and addiction are closely connected, and co-occurring disorders are common. People coping with anxiety or depression may turn to substances to ease emotional pain and eventually develop a dependency. Because untreated symptoms of one condition can trigger relapse in the other, integrated treatment that addresses both is essential.',
      'Effective treatment is delivered through personalized plans that combine individual therapy, group counseling, medication management, stress-management training, CBT, and family support. Partial hospitalization and intensive outpatient programs provide multiple sessions each week without requiring a residential stay.',
      'The center emphasizes a holistic approach that treats the whole person — incorporating mindfulness, yoga therapy, and other supportive services. Long-term progress is sustained by strong support networks, including family therapy, peer groups, and continued counseling.',
    ],
  },
  {
    slug: 'west-windsor-addiction-treatment-guide',
    title: 'What to Expect from Addiction Treatment in West Windsor, New Jersey',
    date: '2026-02-23',
    displayDate: 'February 23, 2026',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/facility/facility-4461.jpg',
    excerpt:
      'Evidence-based addiction treatment in West Windsor for substance use disorders and co-occurring mental health conditions, with individualized plans for every stage.',
    body: [
      'Starting treatment is one of the most important steps toward lasting recovery. In West Windsor, Wellness Recovery Center of New Jersey provides evidence-based programs that help people overcome substance use disorders and co-occurring mental health challenges through structured clinical care and supportive therapies.',
      'Treatment begins with a thorough assessment of the person’s history, symptoms, and needs, which determines the appropriate level of care. The center offers a Partial Hospitalization Program (a structured day program with intensive therapy and no overnight stays), an Intensive Outpatient Program (therapy several days per week while living at home), and Outpatient Care for ongoing counseling and group therapy during reintegration.',
      'Choosing treatment close to home carries real advantages. Clients stay near family and community support while receiving professional care from licensed clinicians experienced in both addiction and mental health. West Windsor’s central location provides ready access to local recovery resources and support networks.',
      'New clients can expect a defined path: an initial clinical evaluation, personalized care planning around their goals and clinical needs, and continuous therapeutic support that encourages growth, self-reflection, and resilience.',
      'Recovery doesn’t end when a structured program does. Aftercare planning connects clients to support groups, community services, and continued outpatient therapy — essential for maintaining sobriety over time.',
    ],
  },
  {
    slug: 'understanding-dual-diagnosis-treatment-in-new-jersey',
    title: 'Understanding Dual Diagnosis Treatment in New Jersey',
    date: '2026-02-13',
    displayDate: 'February 13, 2026',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/reflection.jpg',
    excerpt:
      'Dual diagnosis is the simultaneous presence of a substance use disorder and a mental health condition. Treating them together is essential to prevent relapse.',
    body: [
      'Dual diagnosis, also called co-occurring disorders, describes struggling with substance use and a mental health condition at the same time. The two frequently feed each other, which makes recovery far harder without specialized care. Common pairings include alcohol addiction with depression, opioid addiction with anxiety, cocaine addiction with bipolar disorder, and substance abuse alongside PTSD.',
      'Dual-diagnosis care differs from traditional programs, which focus primarily on the substance use itself. Integrated treatment targets the underlying causes through a comprehensive psychiatric evaluation, individual therapy, medication management when warranted, trauma-informed care, and behavioral therapies such as CBT and DBT.',
      'Many people enter treatment without realizing that a mental health condition is fueling their addiction. Warning signs include using substances to manage anxiety, depression, or trauma; extreme mood swings; panic attacks; repeated inability to stay sober; and chronic emotional numbness or irritability.',
      'The benefits of dual-diagnosis treatment include one unified plan built by mental health and addiction specialists, reduced relapse risk by addressing root symptoms, safe medication management when indicated, a holistic recovery model, and long-term stability through durable coping skills.',
      'Treatment typically follows a clear arc: a comprehensive assessment, medical detox if needed, structured daily therapy covering emotional regulation and relapse prevention, and aftercare planning. Living with both addiction and a mental health disorder can feel overwhelming, but recovery is achievable with compassionate, whole-person care.',
    ],
  },
  {
    slug: 'when-willpower-isnt-enough-healing-the-hidden-drivers-of-addiction-in-new-jersey',
    title: 'When Willpower Isn’t Enough: Healing the Hidden Drivers of Addiction',
    date: '2026-01-27',
    displayDate: 'January 27, 2026',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/recovery.jpg',
    excerpt:
      'Many people relapse despite strong willpower because untreated anxiety, depression, and trauma quietly drive their substance use. Integrated dual-diagnosis care offers a real path forward.',
    body: [
      'Addiction is rarely a simple failure of willpower. For most people, substance use starts as an attempt to feel normal rather than to get high. When someone lives with an untreated mental health condition, their brain sits in a state of chemical imbalance, and drugs or alcohol become a temporary way to feel relief. The real question isn’t “Why are you using?” but “What pain are you trying to soothe?”',
      'Three recurring patterns illustrate this self-medication. In the “anxiety loop,” people with social anxiety or panic attacks use alcohol to quiet overwhelming feelings. In the “depression trap,” those struggling with depression reach for stimulants to find enough energy to get through the day. And in the “trauma echo,” people with PTSD use substances to numb intrusive memories and calm constant hypervigilance.',
      'Integrated care treats the substance use disorder and the underlying condition at the same time. It rests on three pillars: psychiatric stabilization to find medications that support mental health without triggering cravings; CBT and DBT skills training so clients can recognize emotional triggers before they become cravings; and holistic regulation practices such as yoga and meditation that help the nervous system settle without chemicals.',
      'The center offers two levels of outpatient intensity. PHP is the most intensive — full-day, physician-led monitoring and frequent therapy — ideal for people stepping down from a hospital stay, while still returning home in the evening. IOP offers more flexible scheduling for high-functioning professionals and students, delivering several hours of clinical therapy per week while clients process real-world stressors in real time.',
      'If willpower alone hasn’t been enough, that isn’t a personal failing — it’s a sign the underlying drivers need care too. A confidential consultation and free insurance verification are available 24/7.',
    ],
  },
  {
    slug: 'new-year-new-routine-how-iop-helps-you-build-stability-in-early-recovery',
    title: 'New Year, New Routine: How IOP Helps You Build Stability in Early Recovery',
    date: '2025-12-31',
    displayDate: 'December 31, 2025',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/community.jpg',
    excerpt:
      'An Intensive Outpatient Program delivers structured support during early recovery while letting you keep up with work, family, and daily life.',
    body: [
      'An Intensive Outpatient Program (IOP) is a flexible treatment option for people in early recovery, typically following a residential program. Participants attend sessions several times a week for a few hours at a time, gaining stability without needing round-the-clock care. IOP bridges the gap between inpatient treatment and everyday life.',
      'The benefits are substantial: personalized treatment plans, flexibility to accommodate everyday responsibilities, coping strategies for stress and triggers, access to professional therapists, and a supportive peer community. The bonds formed among participants provide emotional support and motivation essential to long-term recovery.',
      'Building a stable routine is central to what IOP provides. When regular therapy and group sessions become part of a weekly schedule, the resulting predictability reduces anxiety and lets people focus on recovery. The accountability built into IOP helps participants develop resilience and regain a sense of control.',
      'IOP is adaptable to different types of addiction, with programs tailored to substances such as alcohol, opioids, and benzodiazepines. Because roughly half of individuals with substance use disorders also have a co-occurring mental health condition, programs incorporate mental health treatment as well.',
      'At Wellness Recovery Center, the process begins with a clinical assessment of substance use history, emotional well-being, home environment, and goals. The center offers same-day admissions and 24/7 availability — a new year can be the start of a new, stable routine.',
    ],
  },
  {
    slug: 'wellness-recovery-center-pioneering-holistic-recovery-in-new-jersey',
    title: 'Wellness Recovery Center: Pioneering Holistic Recovery in New Jersey',
    date: '2024-04-04',
    displayDate: 'April 4, 2024',
    author: 'Nick Petrillo',
    category: 'Recovery',
    image: '/images/facility/facility-4465.jpg',
    excerpt:
      'Comprehensive addiction treatment that pairs medical supervision with holistic therapies, guiding clients toward sustainable recovery and whole-person well-being.',
    body: [
      'Nestled in New Jersey, Wellness Recovery Center is a facility for individuals working to overcome substance abuse. It provides a safe, supportive environment where clients begin a transformative journey toward sobriety, backed by medical supervision and a wide array of therapeutic modalities.',
      'Comprehensive medical support is a cornerstone of the program, combining professional oversight from addiction specialists with the compassion essential to a successful start in recovery, and managing withdrawal with care through a network of trusted detox providers.',
      'Because addiction is experienced differently by each person, the center builds tailored plans. Every plan follows a thorough assessment of the client’s history with substance use, health background, and personal goals, so the care matches the individual.',
      'Beyond the physical process, the center provides holistic support and counseling that addresses the emotional and spiritual dimensions of recovery — individual and group therapy, family counseling, and therapeutic activities aimed at the underlying causes of addiction.',
      'A focus on holistic well-being ties the program together, integrating meditation, yoga, nutritional counseling, and fitness alongside clinical care — enhancing overall health and empowering clients to lead fulfilling, substance-free lives.',
    ],
  },
  {
    slug: 'discovering-purpose-and-meaning-in-life-after-addiction-a-guide-to-wellness-recovery-nj',
    title: 'Discovering Purpose and Meaning in Life After Addiction',
    date: '2024-02-23',
    displayDate: 'February 23, 2024',
    author: 'Sam Staples',
    category: 'Recovery',
    image: '/images/stock/hero-landscape.jpg',
    excerpt:
      'Finding purpose after overcoming addiction is a deeply personal journey — through self-reflection, clarifying values, setting goals, and contributing to community.',
    body: [
      'Rediscovering purpose after overcoming addiction is one of the most significant parts of the recovery journey. It’s about rebuilding a meaningful life, not simply staying sober.',
      'The first foundation is self-reflection and acceptance — honestly examining your journey, acknowledging both past struggles and personal growth, and practicing self-forgiveness. From there, clarifying core values becomes a compass for navigating decisions after recovery.',
      'With values established, the next step is setting intentional goals across personal development, relationships, career, and community engagement. Supporting all of this is the need to nurture physical and mental well-being through self-care such as exercise, mindfulness, therapy, and healthy lifestyle choices.',
      'Recovery also opens space to explore passions and interests. Rediscovering activities that bring joy — art, music, time in nature, volunteering — helps a person reconnect with themselves outside the context of addiction, and supportive relationships reinforce that progress.',
      'Finally, contributing to something greater gives recovery deeper meaning. Giving back to the community and supporting causes aligned with your values reinforces the positive impact of recovery — and Wellness Recovery NJ offers support and resources to help navigate this transformative journey.',
    ],
  },
  {
    slug: 'exploring-different-treatment-modalities',
    title: 'Understanding Different Treatment Modalities for Recovery',
    date: '2023-12-28',
    displayDate: 'December 28, 2023',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/group-therapy.jpg',
    excerpt:
      'Understanding the full range of treatment approaches is crucial to overcoming addiction — each modality offers distinct benefits and can be personalized to the individual.',
    body: [
      'Treatment modalities encompass a range of methods used to address the emotional and psychological aspects of addiction. Because addiction affects everyone differently, finding an approach tailored to personal needs is essential to a successful recovery.',
      'Conventional approaches form the foundation of most programs: individual therapy to uncover the underlying causes of addiction and build coping mechanisms, group therapy to connect with peers who share similar experiences, and structured levels of care with continuous support.',
      'Alternative modalities complement these through practices such as acupuncture to ease withdrawal, yoga and meditation to build mindfulness, and art and music therapy as outlets for emotional expression. Holistic treatment views the mind, body, and spirit as interconnected — adding nutritional support, physical activity, and breathing exercises.',
      'Each category carries its own advantages. Traditional methods offer evidence-based approaches within safe environments; alternative approaches help those who didn’t succeed with conventional methods alone; and holistic approaches address the whole person to improve overall health and sense of purpose.',
      'Wellness Recovery Center provides a comprehensive slate of options — individual and group therapy, 12-step participation, acupuncture, yoga, meditation, art and music therapy, nutritional counseling, mindfulness, CBT, DBT, PHP, and outpatient services — and specializes in dual-diagnosis treatment. Recovery depends on finding the right personalized approach; there is no one-size-fits-all solution.',
    ],
  },
  {
    slug: 'how-addiction-affects-families-and-relationships',
    title: 'How Addiction Affects Families and Relationships',
    date: '2023-11-28',
    displayDate: 'November 28, 2023',
    author: 'Nick Petrillo',
    category: 'For Families',
    image: '/images/stock/community.jpg',
    excerpt:
      'Addiction is a disease that reaches far beyond the individual, affecting the entire family system — and family therapy can help repair the damage.',
    body: [
      'Addiction affects not only a person’s physical and psychological well-being but also their family. Family members and close friends bear substantial consequences when someone they love battles substance dependency, which is why addiction is often described as a family disease.',
      'There are recognizable signs loved ones may notice — sometimes before the individual does — including depression, declining performance at work or school, changes in appearance and hygiene, diminished interest in activities, money-seeking behavior, altered sleep, and social withdrawal.',
      'The disease reshapes the family in several ways. Relationship dynamics shift as members assume unplanned caregiving roles, communication frequently breaks down, and family members can inadvertently contribute to addictive patterns without realizing their impact.',
      'Family therapy offers tailored solutions by allowing every member to participate. It opens communication lines, creates safe spaces for sharing, builds mutual understanding of addiction as a disease, and helps develop healthier dynamics that support recovery.',
      'Wellness Recovery Center emphasizes whole-person care, recognizing that recovery involves the mind, body, and soul as well as family and relationships. With professional support, families can navigate these complex dynamics while helping their loved one sustain lasting recovery.',
    ],
  },
  {
    slug: 'adventure-therapy',
    title: 'Adventure Therapy: Overcoming Fears and Building Confidence in Recovery',
    date: '2023-10-27',
    displayDate: 'October 27, 2023',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/hero-landscape.jpg',
    excerpt:
      'Adventure therapy pairs outdoor activities with psychotherapy to strengthen physical, psychological, social, and spiritual well-being in recovery.',
    body: [
      'Adventure therapy is a form of psychotherapy that combines nature, community, and challenging activities to improve a person’s physical, psychological, social, and spiritual well-being. Paired with traditional methods such as DBT and CBT, it becomes an especially effective part of a recovery program.',
      'At its core, adventure therapy helps individuals overcome fears and build confidence through outdoor pursuits that push them beyond their comfort zones — cooperative games, trust exercises, and wilderness experiences such as kayaking, hiking, paddle boarding, rock climbing, and group ropes courses.',
      'The therapy is often delivered in group or family settings that emphasize team building. After each activity, the group debriefs together to process what happened and connect the experience back to their therapeutic goals, while individual activities encourage personal resilience and self-reliance.',
      'The primary goal is to help people connect what they learn outdoors to their broader life. Benefits include greater confidence, stronger social skills, self-awareness, resilience, healthier relationships, reduced anxiety and depression, and greater emotional openness.',
      'Adventure therapy can benefit people dealing with anxiety, depression, trauma, PTSD, and grief, across all age groups. Wellness Recovery Center blends it with reiki, yoga, meditation, breathwork, art therapy, and music therapy as part of whole-person care.',
    ],
  },
  {
    slug: 'how-to-help-a-loved-one-battling-addiction',
    title: 'How to Help a Loved One Battling Addiction',
    date: '2023-10-13',
    displayDate: 'October 13, 2023',
    author: 'Nick Petrillo',
    category: 'For Families',
    image: '/images/stock/support-group.jpg',
    excerpt:
      'Watching someone you love struggle with addiction is painful — but your steady support can be the deciding factor in their long-term recovery.',
    body: [
      'Witnessing a loved one battle addiction is one of the hardest experiences a family can face, and addiction often leaves the person feeling isolated. The encouraging news is that proven methods of support exist, and a family member’s steady involvement can make the difference.',
      'Drug intervention often follows a structured process. It starts with a plan — ideally with help from a professional such as an interventionist or counselor — so the family is prepared for a range of outcomes. Next comes forming a team of caring people who will genuinely reach the person.',
      'From there, the family decides on meaningful consequences ahead of time if the person refuses treatment, chooses a location and holds the conversation, and — crucially — follows up regularly, checking in consistently while being careful not to slip into enabling behaviors that could trigger a relapse.',
      'Family support groups are another powerful resource. They educate members about the dynamics of addiction, relapse prevention, and behavioral warning signs — helping supporters better understand what their loved one is going through, which makes their support more effective.',
      'Wellness Recovery Center supports both patients and families through offerings such as yoga, meditation, art and music therapy, and DBT, and encourages alumni to mentor current clients — reinforcing the community connections that sustain long-term recovery.',
    ],
  },
  {
    slug: 'role-of-therapy-in-addiction-recovery',
    title: 'The Role of Therapy in Addiction Recovery',
    date: '2023-10-05',
    displayDate: 'October 5, 2023',
    author: 'Nick Petrillo',
    category: 'Treatment and Therapy',
    image: '/images/stock/meditation.jpg',
    excerpt:
      'No two people experience addiction the same way, so therapy must be tailored to the individual. Finding the right approach — and sticking with it — is essential to lasting sobriety.',
    body: [
      'Because no two people are alike, experiences with addiction and with therapy vary widely. Some individuals do well with traditional talk therapy, while others gravitate toward holistic care. Some prefer the privacy of one-on-one sessions, and others feel more comfortable learning coping strategies alongside peers. Finding a fitting modality and maintaining it is what makes the difference.',
      'Cognitive Behavioral Therapy (CBT) is a structured form of talk therapy that helps a person identify and cope with challenges specific to their experience. In recovery, it lets individuals unpack personal history and respond more constructively to negative thoughts — managing symptoms, working through trauma, treating co-occurring conditions, and preventing relapse.',
      'Group therapy brings together several people under the guidance of mental health professionals, all working through similar issues. While some find it intimidating at first, many are surprised by how rewarding it becomes — offering a safe space, peer support, reduced isolation, and fresh perspective.',
      'Holistic therapies serve as an alternative or complement to traditional treatment — yoga paired with breathwork and meditation, art therapy, spiritual care, and attention to physical health. Reported benefits include reduced stress, improved overall health, higher self-esteem, and healthy coping skills.',
      'Wellness Recovery Center of New Jersey offers individualized treatment that blends traditional and holistic approaches, including art therapy, music therapy, experiential learning, meditation, breathwork, and yoga therapy.',
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

// Categories for optional filtering / display.
export const blogCategories = Array.from(new Set(blogPosts.map((p) => p.category)));
