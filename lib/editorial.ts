import { readFileSync } from 'node:fs';
import path from 'node:path';
import { site } from '@/lib/site';

/**
 * Editorial policy — the portfolio-wide page from the editorial policy dev
 * package (Clear Path, Sept 2026).
 *
 * The copy is shared by every site in the portfolio and must not be reworded
 * here; only the five merge fields below differ per site. Values mirror this
 * site's row (SITE_ID 7) in the package's facilities.csv — update both together.
 *
 * Until every field is filled and the CSV's CONTENT_SIGNOFF is recorded, the
 * policy is withheld from production: the route 404s there, nothing links to
 * it, it is left out of the sitemap, and the Organization schema does not point
 * at it. Local and Vercel preview builds still render it (noindex) so it can be
 * reviewed.
 *
 * TO GO LIVE: fill `lastReviewed` and `contentSignoff` below. Nothing else.
 */
export const editorial = {
  /** Brand name as in the site footer. */
  facilityName: site.name,
  domain: new URL(site.url).hostname,
  /**
   * Corrections inbox. The source-of-truth sheet's EDITORIAL_EMAIL is blank for
   * this site; this is its PUBLIC_EMAIL, as supplied for the rollout.
   */
  editorialEmail: 'info@wellnessrecoverynj.com',
  /** As given in facilities.csv (the site itself displays "(866) 861-3449"). */
  phone: '866-861-3449',
  phoneTel: '+18668613449',
  /** YYYY-MM-DD. Blank until the content team reviews the policy. */
  lastReviewed: '2026-10-07',
  /** Copy of the CSV's CONTENT_SIGNOFF cell. Blank until signed off. */
  contentSignoff: '2026-10-15',
};

// No trailing slash: the site's routes have none, and Next redirects the
// package's /editorial-policy/ form here, so this is the canonical URL.
export const EDITORIAL_POLICY_PATH = '/editorial-policy';
export const EDITORIAL_POLICY_URL = `${site.url}${EDITORIAL_POLICY_PATH}`;
export const CORRECTIONS_ANCHOR = 'content-updates-and-corrections';
export const ORGANIZATION_ID = `${site.url}/#organization`;

export const editorialMissing: string[] = [
  !editorial.editorialEmail && 'EDITORIAL_EMAIL',
  !/^\d{4}-\d{2}-\d{2}$/.test(editorial.lastReviewed) && 'LAST_REVIEWED',
  !editorial.contentSignoff && 'CONTENT_SIGNOFF',
].filter((f): f is string => Boolean(f));

/** Every field filled and signed off: the policy may be public and indexed. */
export const editorialPolicyReady = editorialMissing.length === 0;

/** Whether this build serves the page at all (local and previews do, for review). */
export const editorialPolicyServed =
  editorialPolicyReady || process.env.VERCEL_ENV !== 'production';

/** "2026-09-30" -> "September 2026". */
function monthYear(iso: string): string {
  const [y, m] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * The policy body, read at build time from data/editorial-policy.html — an
 * unedited copy of the package's templates/editorial-policy.html (the package
 * folder itself is not committed). When the master copy changes, replace that
 * file wholesale; never hand-edit it. A blank field renders as a highlighted
 * "FIELD not yet set" so it is impossible to miss in a preview.
 */
export function editorialPolicyBody(): string {
  const file = path.join(process.cwd(), 'data/editorial-policy.html');
  const fields: Record<string, string> = {
    FACILITY_NAME: editorial.facilityName,
    DOMAIN: editorial.domain,
    EDITORIAL_EMAIL: editorial.editorialEmail,
    PHONE: editorial.phone,
    PHONE_TEL: editorial.phoneTel,
    LAST_REVIEWED: editorial.lastReviewed && monthYear(editorial.lastReviewed),
  };

  const html = readFileSync(file, 'utf8')
    // Header comment is dev notes, not page content.
    .replace(/<!--[\s\S]*?-->/g, '')
    // PageHero renders the page's single H1.
    .replace(/<h1>[\s\S]*?<\/h1>/, '')
    // The package allows adjusting this href to the site's About URL.
    .replace(/href="\/about\/"/g, 'href="/about"')
    .replace(/\{\{([A-Z_]+)\}\}/g, (token, name: string) => {
      if (fields[name]) return escapeHtml(fields[name]);
      // A known field that is still blank: flag it visibly for reviewers on
      // preview builds. (Once "ready", every known field is filled, so this
      // only ever runs on a page that production never serves.) An unknown
      // token is left as-is so the check below catches it.
      return name in fields && !editorialPolicyReady
        ? `<mark class="editorial-missing">${name} not yet set</mark>`
        : token;
    })
    .trim();

  if (editorialPolicyReady && html.includes('{{')) {
    // README: "Any hit blocks launch." Fail the build rather than ship it.
    throw new Error(
      `Editorial policy still contains a placeholder: ${html.match(/\{\{[^}]*\}\}/)?.[0]}`,
    );
  }

  return html;
}
