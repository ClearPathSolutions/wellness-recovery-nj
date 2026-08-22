// Client-side helper for Clarion form capture.
//
// The forms-capture.v1.js script (mounted once in <Clarion />) exposes
// window.ClarionForms.submit(...). That call routes through the same internal
// path as the script's own auto-capture, so it attaches ctm_visitor_sid,
// landing_page_url, referrer, utm and gclid for us — nothing to rebuild here.
//
// Our forms deliberately carry no data-clarion-form attribute: that attribute
// is what opts a form into the script's auto-hook, and combining it with the
// manual submit below would POST every lead twice.

import type { ClarionFormKey } from './site';

type ClarionForms = {
  submit: (payload: { form_key: ClarionFormKey; data: Record<string, unknown> }) => Promise<unknown>;
};

declare global {
  interface Window {
    ClarionForms?: ClarionForms;
  }
}

// forms-capture.v1.js loads afterInteractive, so a visitor who submits quickly
// (or on a slow connection) can beat it. Optional-chaining straight past a
// missing window.ClarionForms loses the enquiry outright, not just its
// attribution — so wait briefly for the script instead of dropping the lead.
const READY_TIMEOUT_MS = 10_000;
const READY_POLL_MS = 100;

function whenReady(): Promise<ClarionForms | null> {
  if (window.ClarionForms) return Promise.resolve(window.ClarionForms);

  return new Promise((resolve) => {
    const deadline = Date.now() + READY_TIMEOUT_MS;
    const tick = () => {
      if (window.ClarionForms) return resolve(window.ClarionForms);
      if (Date.now() >= deadline) return resolve(null);
      setTimeout(tick, READY_POLL_MS);
    };
    setTimeout(tick, READY_POLL_MS);
  });
}

/**
 * Forwards a lead to Clarion. Never throws: the caller shows its success state
 * optimistically and must not be blocked by vendor availability. The underlying
 * fetch uses keepalive, so it survives the visitor navigating away.
 *
 * @returns whether the submission was handed to Clarion.
 */
export async function captureLead(
  formKey: ClarionFormKey,
  data: Record<string, unknown>,
): Promise<boolean> {
  try {
    const forms = await whenReady();
    if (!forms) {
      console.warn('[clarion] forms-capture.v1.js never loaded — lead not forwarded');
      return false;
    }
    await forms.submit({ form_key: formKey, data });
    return true;
  } catch {
    // Best-effort forwarding — swallow so the user's submission still completes.
    return false;
  }
}
