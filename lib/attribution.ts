// First-touch campaign persistence.
//
// Why this exists: forms-capture.v1.js reads utm_* and gclid *live* from
// location.search at submit time (verified against the published script). A
// visitor who lands on an ad and then reads a second page before converting
// submits with a clean URL, so the lead files as direct traffic. It also never
// collects wbraid/gbraid — Google's gclid substitutes under iOS and consent
// mode — which CTM account 264810's own routing rules key on.
//
// Fix: snapshot the campaign on first touch and restore it into the query
// string on later pageviews, before the vendor script reads it.
//
// localStorage, not sessionStorage: a second tab is the same visit.

/** Params worth persisting. gbraid/wbraid are the gclid substitutes. */
export const CAMPAIGN_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
] as const;

export const FIRST_TOUCH_KEY = 'campaign.first_touch.v1';
export const FIRST_TOUCH_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

declare global {
  interface Window {
    /** Installed by the inline snippet below, before any bundle runs. */
    __ftCampaign?: {
      /** Capture a fresh click, or restore a saved one into the URL. */
      sync: () => void;
      /** The stored snapshot, or null when absent/expired. */
      read: () => { p: Record<string, string>; at: number } | null;
    };
  }
}

/**
 * Click identifiers the vendor script drops on the floor.
 *
 * forms-capture.v1.js sends only `utm` and `gclid`. It never reads wbraid or
 * gbraid — Google's gclid substitutes under iOS and consent mode — even when
 * they are present in the URL, and CTM account 264810's own routing rules key
 * on both. Our forms call ClarionForms.submit() directly, so we can pass them
 * through in the form data bag rather than lose them.
 *
 * Deliberately NOT copied into `gclid`: a wbraid is not a gclid, and
 * mislabelling one corrupts the field for everything downstream.
 */
export function persistedClickIds(): Record<string, string> {
  const out: Record<string, string> = {};
  if (typeof window === 'undefined') return out;

  let saved: { p?: Record<string, string>; at?: number } | null = null;
  try {
    saved = JSON.parse(localStorage.getItem(FIRST_TOUCH_KEY) || 'null');
  } catch {
    return out;
  }
  if (!saved?.p || typeof saved.at !== 'number') return out;
  if (Date.now() - saved.at >= FIRST_TOUCH_TTL_MS) return out;

  // utm_* and gclid are already sent as top-level attribution by the vendor.
  for (const k of ['wbraid', 'gbraid', 'fbclid', 'msclkid'] as const) {
    const v = saved.p[k];
    if (v) out[k] = v;
  }
  return out;
}

/**
 * Self-contained snippet, injected as a raw inline <script> at the top of
 * <body> so it runs during HTML parse — before hydration and well before
 * forms-capture.v1.js (afterInteractive) takes its own first-touch snapshot.
 *
 * It exposes window.__ftCampaign.sync() so route changes can re-run the exact
 * same logic; see components/CampaignKeeper.tsx. One implementation, no drift.
 */
export const FIRST_TOUCH_SNIPPET = `
(function () {
  var KEY = ${JSON.stringify(FIRST_TOUCH_KEY)};
  var TTL = ${FIRST_TOUCH_TTL_MS};
  var KEYS = ${JSON.stringify(CAMPAIGN_KEYS)};

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || 'null');
      return v && v.p && Date.now() - v.at < TTL ? v : null;
    } catch (e) { return null; }
  }

  function sync() {
    var here, found = {};
    try { here = new URLSearchParams(location.search); } catch (e) { return; }
    for (var i = 0; i < KEYS.length; i++) {
      var v = here.get(KEYS[i]);
      if (v) found[KEYS[i]] = v;
    }

    // A fresh click always wins — that is a new campaign, not a continuation.
    if (Object.keys(found).length) {
      try { localStorage.setItem(KEY, JSON.stringify({ p: found, at: Date.now() })); } catch (e) {}
      return;
    }

    var saved = read();
    if (!saved) return;

    var url, changed = false;
    try { url = new URL(location.href); } catch (e) { return; }
    Object.keys(saved.p).forEach(function (k) {
      if (!url.searchParams.get(k)) { url.searchParams.set(k, saved.p[k]); changed = true; }
    });
    // Pass history.state through: Next's App Router keeps its router state
    // there, and replacing it with null breaks back/forward and scroll
    // restoration on a client-side navigated site.
    if (changed) {
      try { history.replaceState(history.state, '', url.toString()); } catch (e) {}
    }
  }

  window.__ftCampaign = { sync: sync, read: read };
  sync();
})();
`.trim();
