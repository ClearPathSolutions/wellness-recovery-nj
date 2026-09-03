// Server-side fetch of Clarion-hosted blog posts, normalized into the site's
// BlogPost shape so they merge seamlessly with the hand-authored local posts.
//
// Why server-side (not the browser embed): the Clarion feed API rejects any
// request carrying a browser Origin header (403, no CORS headers), but a
// server-side fetch has no Origin and returns 200. Fetching here also makes the
// posts server-rendered and SEO-crawlable, and lets them share the site's own
// card + article UI instead of the vendor's embed markup.

import { widgets } from './site';
import { blogPosts, type BlogPost } from './blog';

const { clarion } = widgets;
const REVALIDATE = 600; // re-check Clarion at most every 10 minutes
const CLARION_CATEGORY = 'Recovery'; // the feed carries no category; sensible default

type FeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string;
  author_name: string;
  published_at: string; // ISO
  seo_meta?: { title?: string; description?: string };
};
type FeedResponse = { posts?: FeedPost[]; next_cursor?: string | null };
type PostDetail = FeedPost & { body_html: string };

const displayDateFmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function displayDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : displayDateFmt.format(d);
}

/* ------------------------------------------------------------------ */
/* Table-of-contents anchors                                           */
/* ------------------------------------------------------------------ */

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/** Decode the few entities Clarion actually emits, then flatten whitespace. */
function normalizeText(html: string): string {
  return stripTags(html)
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function slugify(text: string): string {
  return normalizeText(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Give the body's headings the ids its own table of contents already links to.
 *
 * Clarion emits a TOC of `<a href="#some-slug">Heading text</a>` but renders the
 * matching headings as bare `<h2>` with no id, so every TOC link is a dead
 * anchor and clicking one does nothing.
 *
 * The ids are read back off those TOC links rather than re-derived from the
 * heading text: matching each link's own label to the heading it names cannot
 * drift from whatever slug rule Clarion used. Slugifying is only the fallback
 * for a heading the TOC does not list.
 */
function withHeadingIds(html: string): string {
  const fromToc = new Map<string, string>();
  const anchors = html.matchAll(/<a\b[^>]*href="#([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi);
  for (const [, slug, label] of anchors) {
    const key = normalizeText(label);
    if (key && !fromToc.has(key)) fromToc.set(key, slug);
  }

  const used = new Set<string>();
  return html.replace(
    /<(h[2-4])\b([^>]*)>([\s\S]*?)<\/\1>/gi,
    (whole, tag: string, attrs: string, inner: string) => {
      if (/\sid\s*=/i.test(attrs)) return whole;
      const text = normalizeText(inner);
      let id = fromToc.get(text) || slugify(inner);
      if (!id) return whole;
      // Two headings with the same wording would otherwise share an anchor and
      // every link to the second would land on the first.
      if (used.has(id)) {
        let n = 2;
        while (used.has(`${id}-${n}`)) n += 1;
        id = `${id}-${n}`;
      }
      used.add(id);
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
    },
  );
}

/**
 * Give the references list the ids the citation markers link to.
 *
 * The same fault as the headings, one level down: Clarion renders inline
 * citations as `<a href="#ref1">[1]</a>` but the references list is plain
 * `<li>` with no ids, so clicking a footnote marker does nothing. `#refN`
 * means the Nth entry of that list.
 */
function withReferenceIds(html: string): string {
  if (!/href="#ref\d+"/i.test(html)) return html;

  // Run after withHeadingIds, so the references heading already carries its id.
  const heading =
    html.search(/<h[2-4][^>]*\bid="references"/i) !== -1
      ? html.search(/<h[2-4][^>]*\bid="references"/i)
      : html.search(/<h[2-4][^>]*>\s*references\s*<\/h[2-4]>/i);
  if (heading === -1) return html;

  const start = html.indexOf('<ol', heading);
  const end = html.indexOf('</ol>', start);
  if (start === -1 || end === -1) return html;

  let n = 0;
  const list = html.slice(start, end).replace(/<li\b([^>]*)>/gi, (whole, attrs: string) => {
    if (/\sid\s*=/i.test(attrs)) return whole;
    n += 1;
    return `<li${attrs} id="ref${n}">`;
  });
  return html.slice(0, start) + list + html.slice(end);
}

function toBlogPost(p: FeedPost, bodyHtml?: string): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    date: p.published_at,
    displayDate: displayDate(p.published_at),
    author: p.author_name || '',
    category: CLARION_CATEGORY,
    image: p.cover_image_url,
    excerpt: p.excerpt,
    body: [],
    source: 'clarion',
    bodyHtml: bodyHtml ? withReferenceIds(withHeadingIds(bodyHtml)) : bodyHtml,
  };
}

function feedUrl(): string {
  return `${clarion.api}/blog/public/feed?site_key=${encodeURIComponent(clarion.siteKey)}`;
}

/** All Clarion posts as normalized BlogPosts (listing data only — no body). */
export async function getClarionPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(feedUrl(), { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    const data = (await res.json()) as FeedResponse;
    return (data.posts ?? []).map((p) => toBlogPost(p));
  } catch {
    return [];
  }
}

/** A single Clarion post, including its rendered body_html. null if not found. */
export async function getClarionPost(slug: string): Promise<BlogPost | null> {
  try {
    const url = `${clarion.api}/blog/public/post?site_key=${encodeURIComponent(
      clarion.siteKey,
    )}&slug=${encodeURIComponent(slug)}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    const p = (await res.json()) as PostDetail;
    if (!p?.slug) return null;
    return toBlogPost(p, p.body_html);
  } catch {
    return null;
  }
}

/** Local + Clarion posts, newest first — the unified blog list. */
export async function getMergedPosts(): Promise<BlogPost[]> {
  const clarionPosts = await getClarionPosts();
  return [...blogPosts, ...clarionPosts].sort((a, b) => b.date.localeCompare(a.date));
}
