import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { Container } from '@/components/ui';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Wellness Recovery Center of New Jersey collects, uses, and protects your information.',
};

const sections = [
  {
    h: 'Our Commitment to Your Privacy',
    p: [
      'Wellness Recovery Center of New Jersey is committed to protecting the privacy of every person who contacts us or visits our website. We understand that reaching out for help with addiction or mental health is deeply personal, and we treat your information with the utmost confidentiality and care.',
    ],
  },
  {
    h: 'Information We Collect',
    p: [
      'We may collect information you voluntarily provide — such as your name, phone number, email address, insurance details, and any message you send us through our forms — so we can respond to your inquiry, verify your benefits, and coordinate care.',
      'We may also collect limited, non-identifying technical information (such as browser type and pages visited) to help us improve our website.',
    ],
  },
  {
    h: 'How We Use Your Information',
    p: [
      'Your information is used solely to communicate with you, verify insurance coverage, provide and coordinate treatment services, and respond to your requests. We do not sell your personal information.',
    ],
  },
  {
    h: 'Protected Health Information',
    p: [
      'As a healthcare provider, we handle protected health information (PHI) in accordance with applicable federal and state laws, including HIPAA. Your treatment records are confidential and are only shared as permitted or required by law, or with your written consent.',
    ],
  },
  {
    h: 'Data Security',
    p: [
      'We take reasonable administrative, technical, and physical measures to safeguard the information we collect against unauthorized access, use, or disclosure.',
    ],
  },
  {
    h: 'Contact Us',
    p: [
      `If you have any questions about this Privacy Policy or how your information is handled, please contact us at ${site.phone} or ${site.email}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro="Your privacy matters to us. Here’s how we collect, use, and protect your information."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />

      <section className="section">
        <Container>
          <div className="mx-auto max-w-prose space-y-10">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-2xl text-ink-900">{s.h}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-ink-700">
                  {s.p.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-sm text-ink-500">Last updated: {new Date().getFullYear()}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
