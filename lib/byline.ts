import type { BlogPost } from './blog';
import { teamBioPages } from './content';
import { site } from './site';

/** Someone a post credits. bioPath is set only when they have a bio page here. */
export type BylinePerson = {
  name: string;
  credentials: string;
  bioPath: string | null;
};

export type Byline = {
  author: BylinePerson | null;
  /** Set only when the post has both a reviewer and a review date. */
  reviewer: BylinePerson | null;
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
 * The byline for a post, per the package's templates/article-byline.html.
 * Nothing here is invented: the author is the post's own writtenBy or existing
 * author field (Clarion's author_name for feed posts), and the reviewer appears
 * only when the post itself names one and a review date.
 */
export function getByline(post: BlogPost): Byline {
  if (post.lastReviewed && !/^\d{4}-\d{2}-\d{2}$/.test(post.lastReviewed)) {
    throw new Error(`blog/${post.slug}: lastReviewed must be YYYY-MM-DD, got "${post.lastReviewed}"`);
  }
  const lastReviewed = post.lastReviewed || null;
  // Resolved even when undated, so a typo'd slug still fails the build.
  const reviewer = post.reviewedBy ? fromTeam(post.reviewedBy, 'reviewedBy', post.slug) : null;

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
    reviewer: lastReviewed ? reviewer : null,
    lastReviewed,
    // Posts carry no separate modified date yet.
    modified: null,
  };
}

const orgRef = { '@id': `${site.url}/#organization` };

function personNode(p: BylinePerson) {
  return p.bioPath
    ? { '@type': 'Person', '@id': `${site.url}${p.bioPath}#person`, name: p.name, url: `${site.url}${p.bioPath}` }
    : { '@type': 'Person', name: p.name };
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
        // Only with a reviewer and date: never a default one (README "No default reviewer").
        ...(byline.reviewer && byline.lastReviewed
          ? { lastReviewed: byline.lastReviewed, reviewedBy: personNode(byline.reviewer) }
          : {}),
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
