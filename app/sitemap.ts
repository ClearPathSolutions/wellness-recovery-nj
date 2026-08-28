import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { programs } from '@/lib/programs';
import { addictions } from '@/lib/addictions';
import { areas } from '@/lib/areas';
import { blogPosts } from '@/lib/blog';
import { teamBioPages, CANONICAL_AT_PARENT } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

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
    ...blogPosts.map((p) => `/blog/${p.slug}`),
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

  return [...staticRoutes, ...dynamicRoutes];
}
