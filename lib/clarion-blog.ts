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
    bodyHtml,
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
