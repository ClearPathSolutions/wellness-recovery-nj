export type TeamMember = {
  name: string;
  credentials: string;
  role: string;
  /** Set only for members who have their own bio page under /about. */
  slug?: string;
  image?: string;
  bio?: string[];
};

/**
 * Clinical and support staff based at our West Windsor facility.
 *
 * This list is the published roster: the order below is the order the cards
 * appear in on /about, and the credentials and titles here are the ones we
 * show. Bio prose is refreshed at request time from the Quadrant support
 * portal (see `lib/staff-feed.ts`); the text below is the fallback that
 * renders when the portal is unreachable, and is what the /about/<slug> bio
 * pages are built from at compile time.
 */
export const team: TeamMember[] = [
  {
    slug: "olivia-gibson-delaney",
    name: "Dr. Olivia M. Gibson-Delaney",
    credentials: "M.D.",
    role: "Medical Director",
    image: "/images/team/olivia-gibson-delaney.jpg",
    bio: [
      "Dr. Olivia Gibson-Delaney earned her medical degree from Rutgers New Jersey Medical School in Newark, NJ. She completed her Psychiatry residency at Mount Sinai Morningside and Mount Sinai West in New York, NY, where she developed expertise in diagnosing and treating a wide range of mental health conditions.",
      "Dr. Gibson-Delaney is dedicated to providing compassionate, evidence-based care to her patients and is committed to advancing mental health awareness and treatment in her community.",
    ],
  },
  {
    slug: "michelle-szwed",
    name: "Michelle Szwed",
    credentials: "LPC, LCADC, ACS",
    role: "Clinical Director",
    image: "/images/team/michelle-szwed.jpg",
    bio: [
      "Michelle Szwed is a Licensed Professional Counselor and Licensed Clinical Alcohol and Drug Counselor with experience treating co-occurring disorders, addiction, trauma, and substance use. She has worked across private practice, partial hospitalization, and intensive outpatient settings, where she has developed a strong clinical foundation through hands-on experience, collaboration with multidisciplinary teams, and a commitment to ongoing professional growth. Michelle is known for her empathetic and grounded approach, creating a therapeutic environment where clients feel supported, understood, and empowered.",
      "Her clinical strengths include active listening, thoughtful communication, strong organizational skills, attention to detail, and the ability to foster meaningful engagement in both individual and group settings. She is especially skilled at leading interactive psychoeducational and process groups while maintaining an authentic, down-to-earth presence. In her work, Michelle draws from a range of evidence-based modalities, including DBT, Motivational Interviewing, Internal Family Systems, EMDR, Cognitive Processing Therapy, relapse prevention, and expressive arts therapies.",
      "She is trained in both EMDR and Brainspotting and specializes in supporting individuals navigating trauma, borderline personality disorder, and substance use challenges. In addition to her counseling credentials, Michelle is a board-certified life coach (BCC), nationally certified counselor (NCC), certified clinical trauma professional (CCTP), and certified behavior assistant (BA), reflecting her dedication to providing comprehensive, compassionate care.",
    ],
  },
  {
    slug: "ila-holgerson",
    name: "Ila Holgerson",
    credentials: "",
    role: "Director of Operations",
    image: "/images/team/ila-holgerson.jpg",
    bio: [
      "Ila serves as the Director of Clinical Operations at Wellness Recovery Center, where she has been a dedicated member of the team since 2023. Originally from Gilbert, Arizona, she brings a compassionate, client-centered approach to leadership, with a strong commitment to delivering high-quality, individualized care that supports lasting recovery. As Director of Clinical Operations, Ila oversees the day-to-day clinical operations of the facility, working closely with multidisciplinary teams to ensure seamless coordination of care, regulatory compliance, and exceptional client outcomes.",
      "Drawing on her background in case management, she is passionate about removing barriers to recovery and developing systems that allow both clients and staff to thrive. Known for her strong leadership, collaborative mindset, and problem-solving abilities, Ila is dedicated to fostering a supportive environment where every client feels heard, valued, and empowered throughout their treatment journey.",
    ],
  },
  {
    slug: "amy-baisden",
    name: "Amy Baisden",
    credentials: "LAMFT",
    role: "Lead Clinical Therapist",
    image: "/images/team/amy-baisden.jpg",
    bio: [
      "Amy Baisden is a Licensed Associate Marriage and Family Therapist and EMDR-trained clinician who works with adults navigating trauma, grief and loss, depression, anxiety, attachment wounds, life transitions, and recovery. She earned her Master’s degree in Marriage and Family Therapy from Touro University and brings extensive experience in community mental health, non profit settings and partial hospitalization/intensive outpatient settings, supporting individuals with co-occurring mental health and substance use disorders. Amy also has a strong background in crisis management, as well as grief and loss work, with a particular focus on complex family dynamics.",
      "Amy has worked with children, adolescents, adults, couples, and families, and approaches all clinical work through a systemic lens that considers the broader relational and environmental context. Her therapeutic style is warm, collaborative, and trauma-informed, integrating Internal Family Systems (IFS), EMDR, inner child work, and attachment-based approaches. She helps clients build insight, process unresolved experiences, and develop greater resilience, self-compassion, and emotional regulation.",
    ],
  },
  {
    slug: "jaclyn-paradise",
    name: "Jaclyn Paradise",
    credentials: "LPC, NCC, CTP",
    role: "Clinical Therapist",
    image: "/images/team/jaclyn-paradise.jpg",
    bio: [
      "Jaclyn Paradise is a Licensed Professional Counselor (LPC) and Certified Trauma Professional who works with adults navigating trauma, anxiety, life transitions, and recovery. She earned her master’s degree in Clinical Mental Health Counseling from Rider University and has extensive experience in both private practice and intensive outpatient settings, supporting individuals with co-occurring mental health and substance use challenges. Jaclyn’s approach is holistic and trauma-informed, integrating parts work, mindfulness, and body-based practices to help clients reconnect with themselves and feel safe in their own bodies.",
      "She is especially passionate about inner child healing, self-empowerment, and guiding clients through meaningful life changes. Drawing from both clinical training and personal insight, Jaclyn creates a grounded, supportive space where clients can explore, grow, and develop a deeper understanding of who they are.",
    ],
  },
  {
    slug: "zala-henry-samuel",
    name: "Zala Henry-Samuel",
    credentials: "",
    role: "Clinical Therapist",
    image: "/images/team/zala-henry-samuel.jpg",
    bio: [
      "Zala Henry-Samuels is a Clinical Therapist at Wellness Recovery Center of New Jersey, where she provides compassionate, evidence-based care to individuals navigating substance use disorders, co-occurring disorders, and mental health challenges. She is dedicated to creating a safe, supportive therapeutic environment where clients feel heard, respected, and empowered throughout their recovery journey. Zala earned her Master of Arts in Clinical Mental Health Counseling from Rider University and brings a person-centered, trauma-informed approach to therapy.",
      "She has experience working with individuals experiencing anxiety, depression, PTSD, and other behavioral health concerns, helping clients develop healthy coping strategies, increase emotional awareness, and build the skills needed for long-term wellness and recovery. Passionate about fostering hope and resilience, Zala is committed to meeting each client where they are, providing individualized support that encourages meaningful growth, healing, and lasting change.",
    ],
  },
  {
    slug: "sara-enderle",
    name: "Sara Enderle",
    credentials: "ADC Intern",
    role: "Counselor Intern",
    image: "/images/team/sara-enderle.jpg",
    bio: [
      "Sara Enderle serves asa Counselor Intern at Wellness Recovery Center of New Jersey, where she provides individualized, evidence-based therapy for individuals navigating substance use disorders, co-occurring disorders, and mental health challenges. She is dedicated to creating a safe, supportive environment where clients feel empowered to explore their experiences, build resilience, and develop the tools needed for lasting recovery. Sara brings a compassionate, authentic, and trauma-informed approach to therapy.",
      "With lived experience in recovery, she fosters meaningful therapeutic relationships rooted in empathy, trust, and respect. She is passionate about helping clients reconnect with themselves, process past experiences, and build lives grounded in purpose, self-worth, and emotional wellness. Committed to ongoing professional growth, Sara continues to expand her clinical knowledge while pursuing advanced credentials in the behavioral health field.",
      "She believes recovery is a journey of rediscovering one's strengths and that every individual deserves the opportunity to heal, grow, and create a fulfilling future.",
    ],
  },
  {
    slug: "olivia-jones",
    name: "Olivia Jones",
    credentials: "Intern",
    role: "Group Facilitator",
    image: "/images/team/olivia-jones.jpg",
    bio: [
      "Olivia is a group facilitator and intern, studying Clinical Mental Health Counseling at Rider University. I am passionate about working with individuals facing challenges related to addiction and mental health, and am committed to fostering a safe, supportive environment where clients can build insight, develop coping skills, and work toward lasting change.",
    ],
  },
  {
    slug: "kimberly-cotterell",
    name: "Kimberly Cotterell",
    credentials: "",
    role: "Group Facilitator",
    image: "/images/team/kimberly-cotterell.jpg",
    bio: [
      "Kim is a 200-hour Registered Yoga Teacher (RYT) with additional training in mobility, Yoga Nidra, Reiki Level II, and somatic methods. Since 2019, they have led workshops, events, and retreats through their business, Transformative Wellness with Kim. These offerings integrate modalities such as meditation, yoga, breathwork, sound healing, primal scream, vocal toning, somatic practices, Reiki, intuitive movement, and ecstatic dance.",
      "Kim draws on these modalities in one-on-one sessions and group facilitation at recovery centers, mental health facilities, retreats, and wellness spaces. As a sober individual, their work in recovery settings is especially meaningful. They are committed to creating supportive environments rooted in mindfulness, authenticity, and compassionate acceptance.",
    ],
  },
  {
    slug: "jordan-kane",
    name: "Jordan Kane",
    credentials: "",
    role: "Group Facilitator",
    image: "/images/team/jordan-kane.jpg",
    bio: [
      "Since earning my Bachelor’s degree in Recreational Therapy from Temple University in 2018, I have been working as a Certified Therapeutic Recreation Specialist (CTRS) in a variety of behavioral health settings. My experience includes both inpatient and outpatient care, where I have facilitated group therapy focused on supporting individuals in their mental health and substance use recovery journeys. I am passionate about integrating leisure education, team-building activities, journaling, and horticulture-based interventions into my groups to promote self-expression, coping skills, and overall well-being.",
      "I strive to create a supportive and engaging environment where individuals feel empowered to explore personal growth and build meaningful connections. In addition to my clinical work, I remain actively involved in the field of recreational therapy and currently serve as a board member for my local chapter organization.",
    ],
  },
  {
    slug: "neil-tucker",
    name: "Neil Tucker",
    credentials: "ADC Intern",
    role: "Group Facilitator",
    image: "/images/team/neil-tucker.jpg",
    bio: [
      "Drawing from his diverse background in behavioral healthcare, emergency medical services, and health education, Neil creates an engaging, supportive environment where clients feel empowered to grow both emotionally and physically. Neil holds a Master of Education and is an LCADC-Intern and Emergency Medical Technician with extensive experience in substance use disorder education, overdose prevention, and recovery support. Throughout his career, he has worked alongside healthcare providers, first responders, and community organizations to expand access to education, recovery resources, and evidence-based support for individuals and families affected by addiction.",
      "Known for his holistic approach to recovery, Neil integrates principles of mindfulness, resilience, and somatic wellness into his work. His lifelong practice of Tai Chi and Qigong has shaped his belief that lasting recovery involves healing the mind, body, and spirit together. He is also the creator of the proprietary 5 Step Protocol©, a framework designed to promote personal growth, self-awareness, and sustainable recovery.",
      "In addition to his clinical work, Neil is an active advocate for overdose prevention and recovery initiatives throughout New Jersey. His commitment to improving behavioral healthcare has earned recognition within the emergency medical services community, and he continues to educate professionals and community members through training, public speaking, and collaborative outreach. Neil is dedicated to helping every client discover hope, develop confidence, and build the skills needed for lasting recovery.",
    ],
  },
  {
    slug: "anthony-paccillo",
    name: "Anthony Paccillo",
    credentials: "ADC Intern",
    role: "Client Relations Liaison",
    image: "/images/team/anthony-paccillo.jpg",
    bio: [
      "Anthony Paccillo serves as the Client Relations Liaison at Wellness Recovery Center New Jersey, where he is dedicated to creating a welcoming, supportive experience for clients and their families throughout the treatment journey. He works closely with admissions, clinical, and operations teams to ensure clients feel informed, connected, and supported from their first interaction through their transition into ongoing recovery. Prior to joining Wellness Recovery Center, Anthony gained hands-on experience working directly with clients in the behavioral healthcare field while collaborating with multidisciplinary teams and community partners to strengthen engagement and improve the overall client experience.",
      "Known for his authentic, approachable, and compassionate nature, Anthony values transparency, accountability, and building genuine relationships founded on trust. Anthony's passion for helping others is deeply rooted in his own lived experience in recovery, which continues to shape both his personal and professional perspective. He believes that meaningful connection and consistent support can make a lasting difference in an individual's recovery journey.",
      "Through empathy, encouragement, and a commitment to serving others, Anthony strives to ensure every client feels heard, respected, and empowered as they work toward lasting healing and wellness.",
    ],
  },
  {
    slug: "dylan-kuzinski",
    name: "Dylan Kuzinski",
    credentials: "",
    role: "Medical Liaison",
    image: "/images/team/dylan-kuzinski.jpg",
    bio: [
      "Dylan Kuzinski serves as the Medical Liaison at Wellness Recovery Center of New Jersey, where he plays a key role in facilitating clear and effective communication between clients and medical providers to ensure continuity of care. In his role, Dylan oversees medication orders and coordinates timely delivery, helping clients receive the treatment they need without delay. With over five years of experience in the field, including one year in his current position, Dylan brings both knowledge and dedication to his work.",
      "As someone living with Type 1 diabetes, he has a personal understanding of the critical role medication plays in daily life, which further fuels his commitment to supporting others throughout their healthcare journey.",
    ],
  },
  {
    slug: "laura-conners",
    name: "Laura Conners",
    credentials: "",
    role: "Case Manager",
    image: "/images/team/laura-conners.jpg",
    bio: [
      "Laura Conners is a dedicated Case Manager at Wellness Recovery Center, where she has been supporting clients on their recovery journeys since 2024. In her role, Laura works closely with individuals to help them navigate the practical aspects of treatment, including discharge planning, coordination of care, and connecting clients to essential resources such as housing, employment support, and aftercare services. Laura is known for her personable and easygoing nature, which allows her to build strong, trusting relationships with clients.",
      "She has a natural ability to connect with individuals from all walks of life, helping them feel comfortable, heard, and supported throughout their time in treatment. With a compassionate and understanding approach, Laura meets clients where they are and works collaboratively with them to identify their goals and needs. She is committed to advocating for her clients and ensuring they have the tools and support necessary to continue their progress beyond treatment.",
    ],
  },
  {
    slug: "danielle-foreman",
    name: "Danielle Foreman",
    credentials: "",
    role: "Case Manager",
    image: "/images/team/danielle-foreman.jpg",
    bio: [
      "Danielle Foreman is a Case Manager at Wellness Recovery Center of New Jersey who is committed to helping individuals navigate the recovery process with compassion, encouragement, and personalized support. With more than eight years of experience in the behavioral health field, she works closely with clients to help them access resources, overcome challenges, and build a strong foundation for lasting recovery. Danielle believes every individual has the capacity for growth and positive change when provided with the right guidance, support, and opportunities.",
      "She is passionate about empowering clients to achieve their goals while fostering confidence, independence, and hope throughout their recovery journey. Known for her compassionate and client-centered approach, Danielle strives to create meaningful connections with those she serves and is dedicated to helping each individual feel supported, respected, and encouraged every step of the way. Outside of work, she enjoys reading and spending quality time with her family.",
    ],
  },
  {
    slug: "deanna-koester",
    name: "Deanna Koester",
    credentials: "",
    role: "Case Manager",
    image: "/images/team/deanna-koester.jpg",
    bio: [
      "Deanna Koester is a Case Manager at Wellness Recovery Center of New Jersey who is passionate about helping individuals navigate their recovery journey with compassion, encouragement, and personalized support. Drawing on her background in mental health and substance use recovery, she is committed to creating a safe, welcoming environment where clients feel seen, heard, and empowered to make meaningful progress. Currently pursuing a degree in Social Work, Deanna continues to expand her knowledge and clinical skills to better serve individuals and families affected by behavioral health and substance use disorders.",
      "She is known for her empathy, strong problem-solving abilities, and her talent for meeting clients where they are, recognizing that every recovery journey is unique. Deanna believes that healing begins with authentic human connection and that trust, compassion, and consistency are essential to helping individuals build confidence and lasting change. She is dedicated to supporting clients as they overcome challenges, celebrate milestones, and work toward healthier, more fulfilling lives.",
      "Outside of work and school, Deanna enjoys practicing yoga, spending time in nature, caring for her three chinchillas, and sharing great food with family and friends. She believes that maintaining balance, staying curious, and embracing a sense of humor are important both in life and in the work of helping others.",
    ],
  },
  {
    slug: "christina-lilly",
    name: "Christina Lilly",
    credentials: "",
    role: "Office Manager",
    image: "/images/team/christina-lilly.jpg",
    bio: [
      "Christina Lilly serves as the Office Manager at Wellness Recovery Center, where she plays a vital role in ensuring the day-to-day operations of the facility run smoothly and efficiently. Since joining the team in 2024, Christina has become a central point of support for all departments, helping to maintain organization, communication, and overall workflow across the organization. In her role, Christina oversees administrative operations, coordinates office procedures, and provides ongoing support to clinical, case management, and leadership teams.",
      "She is known for her strong ability to multitask, prioritize responsibilities, and respond quickly to the evolving needs of both staff and clients. A natural people-person, Christina brings empathy and approachability into every interaction. She takes pride in being accessible and responsive, fostering a supportive and collaborative environment throughout the workplace.",
      "Her problem-solving skills allow her to effectively address challenges as they arise, ensuring minimal disruption to daily operations. Christina is deeply committed to helping Wellness Recovery Center function at its highest level, consistently going above and beyond to support staff, enhance efficiency, and contribute to a positive, client-centered atmosphere.",
    ],
  },
  {
    slug: "julie-mitchell",
    name: "Julie Mitchell",
    credentials: "",
    role: "Alumni Coordinator",
    image: "/images/team/julie-mitchell.jpg",
    bio: [
      "Julie Mitchell is passionate about supporting individuals as they continue their recovery journey beyond treatment, helping alumni build meaningful connections, strengthen their support systems, and maintain long-term wellness. As Alumni Coordinator, she is dedicated to fostering a strong recovery community where individuals feel encouraged, supported, and empowered to thrive in their everyday lives. Julie earned her Bachelor of Science in Psychology from the New York Institute of Technology and her Master of Arts in Addiction Counseling from the Hazelden Betty Ford Graduate School of Addiction Studies, a nationally recognized leader in addiction treatment education.",
      "Her background in behavioral health provides her with a deep understanding of the challenges and triumphs individuals experience throughout the recovery process. In her role, Julie develops and coordinates alumni programming, recovery events, peer support initiatives, and ongoing outreach designed to help former clients stay connected long after completing treatment. She believes that lasting recovery is strengthened through community, accountability, and meaningful relationships, and she is committed to creating opportunities for alumni to celebrate milestones, share experiences, and support one another.",
      "Julie approaches every interaction with compassion, authenticity, and respect, recognizing that each recovery journey is unique. She strives to create an inclusive and welcoming environment where alumni feel valued, inspired, and confident as they continue building lives rooted in purpose, resilience, and hope.",
    ],
  },
];
