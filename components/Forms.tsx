'use client';

import { useState, FormEvent } from 'react';
import { Icon } from './ui';
import { widgets } from '@/lib/site';
import { captureLead } from '@/lib/clarion';

const fieldClass =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-clay-500';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink-800';

function SuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-clay-200 bg-clay-50 p-8 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-clay-500 text-white">
        <Icon name="check" className="h-7 w-7" />
      </span>
      <h3 className="mt-4 font-display text-xl text-ink-900">Thank you — we’ve got it.</h3>
      <p className="mt-2 text-sm text-ink-600">
        A caring member of our admissions team will reach out to you shortly. Need to talk right now?
        Call us anytime at{' '}
        <a href="tel:+18668613449" className="font-semibold text-clay-700">
          (866) 861-3449
        </a>
        .
      </p>
      <button type="button" onClick={onReset} className="btn-outline mt-6">
        Submit another response
      </button>
    </div>
  );
}

export function InsuranceForm() {
  const [sent, setSent] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // Fire-and-forget capture — never blocks the user's submission.
    await captureLead(widgets.clarion.formKeys.insurance, { ...data, variant: 'insurance' });
    setSent(true);
  };
  if (sent) return <SuccessCard onReset={() => setSent(false)} />;

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="fname">First name</label>
          <input id="fname" name="fname" required className={fieldClass} placeholder="Jane" />
        </div>
        <div>
          <label className={labelClass} htmlFor="lname">Last name</label>
          <input id="lname" name="lname" required className={fieldClass} placeholder="Doe" />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required className={fieldClass} placeholder="(555) 555-5555" />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className={fieldClass} placeholder="you@email.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="provider">Insurance provider</label>
          <input id="provider" name="provider" className={fieldClass} placeholder="e.g. Cigna, Aetna" />
        </div>
        <div>
          <label className={labelClass} htmlFor="memberid">Member ID</label>
          <input id="memberid" name="memberid" className={fieldClass} placeholder="Optional" />
        </div>
      </div>
      <div className="mt-4">
        <label className={labelClass} htmlFor="ins-message">How can we help?</label>
        <textarea
          id="ins-message"
          name="message"
          rows={3}
          className={fieldClass}
          placeholder="Tell us a little about your situation (optional)"
        />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-500">
        Your information is completely confidential. Submitting this form does not create any
        obligation, and verifying your benefits is always free.
      </p>
      <button type="submit" className="btn-primary mt-5 w-full sm:w-auto">
        Verify My Benefits — Free
        <Icon name="arrow" className="h-4 w-4" />
      </button>
    </form>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // Fire-and-forget capture — never blocks the user's submission.
    await captureLead(widgets.clarion.formKeys.contact, { ...data, variant: 'contact' });
    setSent(true);
  };
  if (sent) return <SuccessCard onReset={() => setSent(false)} />;

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="c-name">Full name</label>
          <input id="c-name" name="name" required className={fieldClass} placeholder="Jane Doe" />
        </div>
        <div>
          <label className={labelClass} htmlFor="c-phone">Phone</label>
          <input id="c-phone" name="phone" type="tel" required className={fieldClass} placeholder="(555) 555-5555" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" required className={fieldClass} placeholder="you@email.com" />
        </div>
      </div>
      <div className="mt-4">
        <label className={labelClass} htmlFor="c-message">Message</label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          required
          className={fieldClass}
          placeholder="How can we help you today?"
        />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-500">
        All messages are confidential. For immediate help, call{' '}
        <a href="tel:+18668613449" className="font-semibold text-clay-700">(866) 861-3449</a> — we’re here 24/7.
      </p>
      <button type="submit" className="btn-primary mt-5 w-full sm:w-auto">
        Send Message
        <Icon name="arrow" className="h-4 w-4" />
      </button>
    </form>
  );
}
