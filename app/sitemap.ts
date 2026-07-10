import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { programs } from '@/lib/programs';
import { addictions } from '@/lib/addictions';
import { areas } from '@/lib/areas';
import { blogPosts } from '@/lib/blog';

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
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
