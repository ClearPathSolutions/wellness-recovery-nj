import { NextResponse } from 'next/server';
import { resolveVisitorSid, sanitizeRecord, sanitizeSession, text } from '@/lib/session-server';

/**
 * Clarion lead relay for this site's forms.
 *
 * The only destination for a form submission. CallTrackingMetrics still runs on
 * the page for the number swap and the visitor session, but receives no leads —
 * Clarion attaches this one to the CTM visit itself, via `ctm_visitor_sid`.
 *
 * Reports the truth back to the browser: a 502 here makes the form show an
 * error and the phone number rather than a confirmation, because a lead that
 * silently vanished is worse than a visitor who knows to call.
 *
 * CLARION_SITE_KEY is server-side only and must never gain a NEXT_PUBLIC_
 * prefix. The widget's own key is a separate, deliberately public variable.
 */

export const runtime = 'nodejs';
// Posts to a third party per request — never cache or prerender it.
export const dynamic = 'force-dynamic';

const CLARION_ENDPOINT = 'https://api.clarionlabs.ai/forms/public/submit';

/**
 * How submissions are grouped on Clarion's side.
 *
 * An allowlist, not a passthrough: this route is public and unauthenticated, so
 * the browser does not get to name an arbitrary destination form. These two
 * values are the ones already configured in the Clarion dashboard.
 */
const FORM_KEYS = new Set(['contact', 'insurance_verification']);
const DEFAULT_FORM_KEY = 'insurance_verification';

/** Clarion wants utm as a nested object, keyed without the `utm_` prefix. */
const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const;

export async function POST(request: Request) {
  const siteKey = process.env.CLARION_SITE_KEY;
  if (!siteKey) {
    // Nothing the visitor can do about this, and we must not claim success.
    console.error('[verify-insurance] CLARION_SITE_KEY is not set — lead not delivered');
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const requestedFormKey = text(body.form_key, 64);
  const formKey = FORM_KEYS.has(requestedFormKey) ? requestedFormKey : DEFAULT_FORM_KEY;
  if (requestedFormKey && requestedFormKey !== formKey) {
    console.warn(`[verify-insurance] unknown form_key "${requestedFormKey}" — using ${formKey}`);
  }

  const data = sanitizeRecord(body.data);
  if (!Object.keys(data).length) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const utmIn = sanitizeRecord(body.utm, { maxKeys: UTM_KEYS.length });
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    if (utmIn[key]) utm[key] = utmIn[key];
  }

  const payload: Record<string, unknown> = {
    site_key: siteKey,
    form_key: formKey,
    data,
    page_url: text(body.page_url, 2048) || null,
    landing_page_url: text(body.landing_page_url, 2048) || null,
    referrer: text(body.referrer, 2048) || null,
    utm: Object.keys(utm).length ? utm : null,
    gclid: text(body.gclid) || null,
    // This exact key name, flat and top-level, or Clarion drops it and the lead
    // attaches to no visit.
    ctm_visitor_sid: resolveVisitorSid(body.ctm_visitor_sid, request) || null,
    user_agent: request.headers.get('user-agent'),
    // Neither form has an opt-in control, so consent is never asserted. Only
    // wire this to true alongside a real checkbox the visitor ticked.
    email_consent: false,
  };

  // Rebuilt from the client's version, never passed through. Null when absent
  // or unsafe, and omitted entirely rather than sent as null.
  const session = sanitizeSession(body.session);
  if (session) payload.session = session;

  const post = (payloadToSend: Record<string, unknown>) =>
    fetch(CLARION_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadToSend),
      cache: 'no-store',
    });

  try {
    let res = await post(payload);

    // `session` is a key Clarion was not explicitly asked to accept. If their
    // validation is strict, an unknown field would turn every lead into an
    // error — so on a 4xx, drop it and try once more. Losing admissions
    // enquiries to gain context is not a trade worth making.
    if (!res.ok && res.status >= 400 && res.status < 500 && session) {
      const rejection = await res.text().catch(() => '');
      console.warn(
        '[verify-insurance] Clarion rejected the payload',
        res.status,
        rejection,
        '— retrying without `session`',
      );
      const { session: _dropped, ...withoutSession } = payload;
      res = await post(withoutSession);
    }

    if (!res.ok) {
      console.error(
        '[verify-insurance] Clarion responded',
        res.status,
        await res.text().catch(() => ''),
      );
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[verify-insurance] Clarion request failed', error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
