import type { BlogPost } from './blog';
import { teamBioPages } from './content';
import { site } from './site';

/**
 * Someone a post credits. bioPath is set when their bio page is on this site;
 * url only for a bio hosted elsewhere.
 */
export type BylinePerson = {
  name: string;
  credentials: string;
  bioPath: string | null;
  url?: string | null;
};

export type Byline = {
  author: BylinePerson | null;
  /** Always set: see resolveReviewer(). */
  reviewer: BylinePerson;
  lastReviewed: string | null;
  modified: string | null;
};

function fromTeam(slug: string, field: string, postSlug: string): BylinePerson {
  const m = teamBioPages.find((t) => t.slug === slug);
  // Fail the build: a byline naming someone without a bio page is exactly what
  // the editorial policy promises never to publish.
  if (!m) throw new Error(`blog/${postSlug}: ${field} references unknown team slug "${slug}"`);
  return { name: m.name, credentials: m.credentials, bioPath: `/about/${m.slug}` };
}

/**
 * The site's medical reviewer. The client has overridden the editorial-policy
 * package's "no default reviewer" rule: every post names a reviewer, and this
 * is who it is unless the post says otherwise.
 */
export const DEFAULT_REVIEWER = {
  name: 'Dr. Pamela Tambini',
  credentials: 'M.D.',
  // The live profile URL has no trailing slash (the slash form 308s).
  url: `${site.url}/about/pamela-tambini`,
};

/**
 * A reviewer URL on this site's host (www or not, any trailing slash) becomes a
 * same-tab internal path; anything else stays an absolute external URL.
 */
function reviewerLink(raw: string): Pick<BylinePerson, 'bioPath' | 'url'> {
  let abs: URL;
  try {
    abs = new URL(raw, site.url);
  } catch {
    return { bioPath: null, url: null };
  }
  const host = (h: string) => h.replace(/^www\./, '');
  if (host(abs.hostname) === host(new URL(site.url).hostname)) {
    return { bioPath: abs.pathname.replace(/\/+$/, '') || '/', url: null };
  }
  return { bioPath: null, url: abs.href };
}

/**
 * Who reviewed a post. A local reviewedBy team slug wins; otherwise Clarion's
 * reviewer fields are kept where populated and each blank one is filled from
 * DEFAULT_REVIEWER, so posts with no reviewer data (every local post, and any
 * new Clarion post) get the default with no per-post action.
 */
function resolveReviewer(post: BlogPost): BylinePerson {
  if (post.reviewedBy) {
    const m = fromTeam(post.reviewedBy, 'reviewedBy', post.slug);
    return m.name === DEFAULT_REVIEWER.name && !m.credentials
      ? { ...m, credentials: DEFAULT_REVIEWER.credentials }
      : m;
  }
  return {
    name: post.reviewerName || DEFAULT_REVIEWER.name,
    credentials: post.reviewerCredentials || DEFAULT_REVIEWER.credentials,
    ...reviewerLink(post.reviewerUrl || DEFAULT_REVIEWER.url),
  };
}

/**
 * The byline for a post, per the package's templates/article-byline.html.
 * The author is the post's own writtenBy or existing author field (Clarion's
 * author_name for feed posts). The reviewer is always shown, per
 * resolveReviewer(); the review date only when the post has one.
 */
export function getByline(post: BlogPost): Byline {
  if (post.lastReviewed && !/^\d{4}-\d{2}-\d{2}$/.test(post.lastReviewed)) {
    throw new Error(`blog/${post.slug}: lastReviewed must be YYYY-MM-DD, got "${post.lastReviewed}"`);
  }
  const lastReviewed = post.lastReviewed || null;
  const reviewer = resolveReviewer(post);

  let author: BylinePerson | null = null;
  if (post.writtenBy) {
    author = fromTeam(post.writtenBy, 'writtenBy', post.slug);
  } else if (post.author.trim()) {
    // Existing author name; linked only if it is exactly a team member with a bio.
    const name = post.author.trim();
    const m = teamBioPages.find((t) => t.name === name);
    author = { name, credentials: m?.credentials ?? '', bioPath: m ? `/about/${m.slug}` : null };
  }

  return {
    author,
    reviewer,
    lastReviewed,
    // Posts carry no separate modified date yet.
    modified: null,
  };
}

const orgRef = { '@id': `${site.url}/#organization` };

function personNode(p: BylinePerson) {
  const url = p.bioPath ? `${site.url}${p.bioPath}` : p.url?.replace(/\/$/, '') || null;
  return {
    '@type': 'Person',
    ...(url ? { '@id': `${url}#person`, url } : {}),
    name: p.name,
    ...(p.credentials ? { honorificSuffix: p.credentials } : {}),
  };
}

/** The package's schema/clinical-article.jsonld, with unset fields omitted. */
export function articleSchema(post: BlogPost, byline: Byline) {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${url}#webpage`,
        url,
        name: post.title,
        // Every post has a reviewer (client override of the package's "No
        // default reviewer" rule); lastReviewed only when the post has a date.
        ...(byline.lastReviewed ? { lastReviewed: byline.lastReviewed } : {}),
        reviewedBy: personNode(byline.reviewer),
        publisher: orgRef,
      },
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        ...(post.date ? { datePublished: post.date } : {}),
        ...(byline.modified ? { dateModified: byline.modified } : {}),
        ...(byline.author ? { author: personNode(byline.author) } : {}),
        publisher: orgRef,
      },
    ],
  };
}
