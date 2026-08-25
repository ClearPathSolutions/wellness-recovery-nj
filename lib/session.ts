/**
 * Visit session, paid attribution, and CTM visitor identity.
 *
 * Lead delivery goes to Clarion and nowhere else. CallTrackingMetrics still
 * runs on the page — t.js owns the dynamic number swap and mints the visitor
 * session — but no form submission is ever sent to CTM. Clarion attaches the
 * lead to that CTM visit itself, via the `ctm_visitor_sid` we pass through.
 *
 * Everything here is best-effort: private browsing, an ad-blocker, or a CTM
 * outage must degrade attribution, never block a submission.
 */

declare global {
  interface Window {
    __ctm?: {
      config?: { aid?: number; sid?: string };
    };
  }
}

/** Stored values are forwarded to a third party, so cap what we keep. */
const MAX_VALUE_LENGTH = 512;

function capped(value: string): string {
  return value.slice(0, MAX_VALUE_LENGTH);
}

/**
 * localStorage, not sessionStorage: opening the form in a second tab is the
 * same visit, and CTM itself remembers the visitor for 30 days.
 *
 * Private browsing can throw on any Storage access, so every read and write is
 * guarded and falls back to an in-memory copy that at least survives
 * client-side navigation within the tab.
 */
const memory = new Map<string, string>();

function readRaw(key: string): string | null {
  try {
    const value = window.localStorage.getItem(key);
    if (value !== null) return value;
  } catch {
    // Unavailable — fall through to the in-memory copy.
  }
  return memory.get(key) ?? null;
}

function writeRaw(key: string, value: string): void {
  memory.set(key, value);
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private browsing or quota — the in-memory copy is all we get.
  }
}

function readJson<T>(key: string): T | null {
  const raw = readRaw(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** The previous internal page is not a traffic source. */
function externalReferrer(): string {
  const referrer = document.referrer;
  if (!referrer) return '';
  try {
    return new URL(referrer).host === window.location.host ? '' : referrer;
  } catch {
    return '';
  }
}

/* ------------------------------------------------------------------ */
/* Paid attribution                                                    */
/* ------------------------------------------------------------------ */

const ATTRIBUTION_KEY = 'wrnj_attribution.v1';

/** Ad-click and campaign params worth preserving from the landing URL. */
const ATTRIBUTION_PARAMS = [
  'gclid',
  'gbraid',
  'wbraid',
  'msclkid',
  'fbclid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'campaign_id',
  'adgroup_id',
  'creative_id',
];

/**
 * Matches the 30-day lifetime of CTM's own `__ctmid` cookie. Past that, a
 * returning visitor is a new visit rather than a continuation of the old click.
 */
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export type Attribution = Record<string, string>;

type StoredAttribution = { p: Attribution; at: number };

function freshAttribution(value: StoredAttribution | null): StoredAttribution | null {
  if (!value || typeof value.at !== 'number' || !value.p) return null;
  return Date.now() - value.at < ATTRIBUTION_TTL_MS ? value : null;
}

function readAttribution(): StoredAttribution | null {
  return freshAttribution(readJson<StoredAttribution>(ATTRIBUTION_KEY));
}

/**
 * Record attribution for the current pageview.
 *
 * Runs on every route change, not just first paint: internal navigation drops
 * the query string, so a visitor who reads a second page before converting
 * would otherwise submit as direct traffic while the record still looks
 * populated. Returns true when a fresh ad click was just seen.
 */
function captureAttribution(): boolean {
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const value = params.get(key);
    if (value) found[key] = capped(value);
  }

  const referrer = externalReferrer();

  // A fresh ad click always wins. It is a new campaign, not a continuation of
  // the old one, so this must overwrite — first-write-wins would credit a
  // second click on a different ad to the first ad the visitor ever clicked.
  if (Object.keys(found).length > 0) {
    found.landing_page = capped(window.location.href);
    if (referrer) found.referrer = capped(referrer);
    writeRaw(ATTRIBUTION_KEY, JSON.stringify({ p: found, at: Date.now() }));
    return true;
  }

  // No click params. Record entry page and referrer so an organic or direct
  // lead still carries where it came from, but never overwrite an existing
  // record — the first page of the visit is the landing page, not this one.
  if (readAttribution()) return false;

  const firstTouch: Attribution = { landing_page: capped(window.location.href) };
  if (referrer) firstTouch.referrer = capped(referrer);
  writeRaw(ATTRIBUTION_KEY, JSON.stringify({ p: firstTouch, at: Date.now() }));
  return false;
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  return readAttribution()?.p ?? {};
}

/* ------------------------------------------------------------------ */
/* Visit session                                                       */
/* ------------------------------------------------------------------ */

const SESSION_KEY = 'wrnj_session.v1';

/** Standard analytics inactivity window: 30 minutes idle ends the visit. */
const SESSION_IDLE_MS = 30 * 60 * 1000;

/** Enough to see the path through the page; bounded so the payload cannot grow. */
const MAX_TRACKED_PAGES = 20;

export type VisitSession = {
  /**
   * Our own id for this visit. Deliberately a UUID so it can never be mistaken
   * for CTM's 24-hex session id — substituting one for the other is the classic
   * way to file a lead against no visit at all.
   */
  id: string;
  started_at: number;
  last_active_at: number;
  pageviews: number;
  /** Paths only, never full URLs: a query string would repeat the ad params. */
  pages: string[];
};

function newSessionId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    // Fall through to the manual form below.
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function startSession(now: number): VisitSession {
  return {
    id: newSessionId(),
    started_at: now,
    last_active_at: now,
    pageviews: 0,
    pages: [],
  };
}

function validSession(value: VisitSession | null, now: number): VisitSession | null {
  if (!value || typeof value.id !== 'string' || typeof value.last_active_at !== 'number') {
    return null;
  }
  return now - value.last_active_at < SESSION_IDLE_MS ? value : null;
}

/**
 * Advance the session for the current pageview, starting a new one after 30
 * minutes of inactivity.
 *
 * A fresh ad click mid-visit re-attributes but does NOT split the session: it
 * is the same person continuing to browse, and breaking the visit in two would
 * make the pageview count read lower than the journey actually was.
 */
function touchSession(): VisitSession {
  const now = Date.now();
  const session = validSession(readJson<VisitSession>(SESSION_KEY), now) ?? startSession(now);

  session.last_active_at = now;

  // Count a pageview only when the path actually changed. React StrictMode
  // double-invokes effects in development, and a remount or Fast Refresh can
  // fire the tracker again on the same route — without this the count arrives
  // at Clarion inflated, here by 2x. The cost is that reloading the same URL
  // is not counted twice, which is the better error of the two.
  const path = window.location.pathname;
  if (session.pages[session.pages.length - 1] !== path) {
    session.pages = [...session.pages, path].slice(-MAX_TRACKED_PAGES);
    session.pageviews += 1;
  }

  writeRaw(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession(): VisitSession | null {
  if (typeof window === 'undefined') return null;
  return validSession(readJson<VisitSession>(SESSION_KEY), Date.now());
}

/**
 * The one call the page-level tracker makes, on every route change.
 * Attribution first: a fresh ad click should be stored before the pageview that
 * carried it is counted.
 */
export function recordPageview(): void {
  if (typeof window === 'undefined') return;
  try {
    captureAttribution();
    touchSession();
  } catch {
    // Never let tracking break a page render.
  }
}

/* ------------------------------------------------------------------ */
/* CTM visitor identity                                                */
/* ------------------------------------------------------------------ */

/**
 * CTM session ids are 24 hex characters with no dashes. Anything else — most
 * dangerously a UUID from our own session store above — would file the lead
 * against the wrong visit, or against none while looking correct.
 */
const CTM_SID_PATTERN = /^[0-9a-f]{24}$/i;

function ctmIdCookie(): string {
  const cookie = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('__ctmid='));
  if (!cookie) return '';
  const raw = cookie.slice('__ctmid='.length);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

/**
 * Read from the live tracker first, then CTM's own first-party `__ctmid`
 * cookie, which persists for 30 days and survives a full page load.
 *
 * Deliberately not cached in our own storage: CTM already persists this, so a
 * stashed copy can only ever be staler than the cookie.
 */
export function getVisitorSid(): string {
  if (typeof window === 'undefined') return '';
  try {
    const fromTracker = window.__ctm?.config?.sid ?? '';
    if (CTM_SID_PATTERN.test(fromTracker)) return fromTracker;

    const fromCookie = ctmIdCookie();
    if (CTM_SID_PATTERN.test(fromCookie)) return fromCookie;

    // Neither is CTM-shaped. Pass through what we found so the server can log
    // the mismatch, but never substitute our own session id: an empty value is
    // the correct answer when CTM's id is unavailable.
    return fromTracker || fromCookie;
  } catch {
    return '';
  }
}

/* ------------------------------------------------------------------ */
/* Lead delivery                                                       */
/* ------------------------------------------------------------------ */

/**
 * The visitor's own answers, exactly as the form names them.
 *
 * Deliberately not renamed on the way through: Clarion already receives these
 * field names from this site, and the point of moving delivery to our own route
 * is to change where the request comes from, not what Clarion stores.
 */
export type LeadData = Record<string, string>;

/**
 * No trailing slash: this app does not set `trailingSlash`, so adding one would
 * make every lead pay a 308 redirect first.
 */
const CLARION_ROUTE = '/api/verify-insurance';

const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const;

/** Reshape the stored flat params into the payload Clarion expects. */
function attributionPayload() {
  const stored = getAttribution();

  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = stored[`utm_${key}`];
    if (value) utm[key] = value;
  }

  return {
    page_url: window.location.href,
    // The real entry page with its campaign on it, not wherever the form sits.
    landing_page_url: stored.landing_page || window.location.href,
    referrer: stored.referrer || null,
    utm: Object.keys(utm).length ? utm : null,
    // wbraid / gbraid are what Google substitutes for gclid under iOS and
    // consent mode. CTM's own routing rules key on all three, so a lead that
    // only carries gclid loses exactly those clicks.
    gclid: stored.gclid || stored.wbraid || stored.gbraid || null,
  };
}

/**
 * The visit context that goes alongside the answers: how long this person has
 * been reading, how many pages they saw, what brought them here, and which CTM
 * visit they are.
 */
function sessionPayload(visitorSid: string) {
  const session = getSession();
  const attribution = getAttribution();
  if (!session) return null;

  return {
    id: session.id,
    started_at: new Date(session.started_at).toISOString(),
    last_active_at: new Date(session.last_active_at).toISOString(),
    duration_seconds: Math.max(0, Math.round((Date.now() - session.started_at) / 1000)),
    pageviews: session.pageviews,
    pages: session.pages,
    entry_page: attribution.landing_page || null,
    referrer: attribution.referrer || null,
    // The full flat set, including the params the top-level fields don't carry
    // (msclkid, fbclid, campaign_id, adgroup_id, creative_id).
    attribution,
    // Repeated here for context only. The flat top-level copy is the one
    // Clarion reads.
    ctm_visitor_sid: visitorSid || null,
    ctm_account_id: window.__ctm?.config?.aid ?? null,
  };
}

/**
 * Deliver a lead to Clarion through our own route, which holds the site key.
 *
 * Resolves false on any failure so the caller shows an error instead of a
 * confirmation — a silently dropped admissions enquiry is the worst outcome
 * available here.
 */
export async function submitLead(formKey: string, data: LeadData): Promise<boolean> {
  const visitorSid = getVisitorSid();

  try {
    const res = await fetch(CLARION_ROUTE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Which Clarion form this is. The route validates it against an
        // allowlist — this endpoint is public, so the browser does not get to
        // name an arbitrary destination form.
        form_key: formKey,
        data,
        ...attributionPayload(),
        // Flat and top-level under this exact name, or Clarion drops it.
        ctm_visitor_sid: visitorSid || null,
        session: sessionPayload(visitorSid),
      }),
      // Lets the request finish if the visitor navigates away mid-submit.
      keepalive: true,
    });

    const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return res.ok && json?.ok === true;
  } catch {
    return false;
  }
}
