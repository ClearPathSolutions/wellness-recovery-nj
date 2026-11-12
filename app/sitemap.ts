import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { programs } from '@/lib/programs';
import { addictions } from '@/lib/addictions';
import { areas } from '@/lib/areas';
import { getMergedPosts } from '@/lib/clarion-blog';
import { teamBioPages, CANONICAL_AT_PARENT } from '@/lib/content';
import { editorialPolicyReady, EDITORIAL_POLICY_PATH } from '@/lib/editorial';

// Rendered per request. A static sitemap is frozen at deploy on Vercel, so
// Clarion posts published afterwards would never appear. The Clarion feed
// fetch keeps its own 10-minute cache (lib/clarion-blog.ts).
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const now = new Date();
  // Local posts plus Clarion posts; /blog lists both, so the sitemap must too.
  const posts = await getMergedPosts();
  const postSlugs = Array.from(new Set(posts.map((p) => p.slug)));

  const staticRoutes = [
    '',
    '/about',
    '/treatment',
    '/what-we-treat',
    '/tour',
    '/admissions',
    '/contact',
    '/areas-we-serve',
    '/blog',
    '/faq',
    '/privacy-policy',
    '/notice-of-privacy-practices',
    '/sms-terms',
    '/terms-of-service',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const dynamicRoutes = [
    ...programs.map((p) => `/treatment/${p.slug}`),
    ...addictions.map((a) => `/what-we-treat/${a.slug}`),
    ...areas.map((a) => `/areas-we-serve/${a.slug}`),
    ...postSlugs.map((slug) => `/blog/${slug}`),
    // Team bios, minus anyone whose canonical points at the parent network —
    // a sitemap should only list URLs that are canonical to this site.
    ...teamBioPages
      .filter((m) => !CANONICAL_AT_PARENT[m.slug])
      .map((m) => `/about/${m.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Listed only once the policy may be indexed (see lib/editorial.ts).
  const editorialRoutes: MetadataRoute.Sitemap = editorialPolicyReady
    ? [
        {
          url: `${base}${EDITORIAL_POLICY_PATH}`,
          lastModified: now,
          changeFrequency: 'yearly',
          priority: 0.3,
        },
      ]
    : [];

  return [...staticRoutes, ...dynamicRoutes, ...editorialRoutes];
}
