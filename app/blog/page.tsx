import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog';
import { Container, Icon } from '@/components/ui';
import { CtaBand } from '@/components/sections';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Blog & Articles',
  description:
    'Insights on addiction, recovery, and mental health from the team at Wellness Recovery Center of New Jersey.',
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <>
      <PageHero
        eyebrow="Addiction, Recovery & Everything In Between"
        title="News & articles"
        intro="Guidance and encouragement from our clinical team to help you understand recovery and take the next step."
        image="/images/stock/calm.jpg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <section className="section">
        <Container>
          {/* Featured */}
          <Link
            href={`/blog/${featured.slug}`}
            className="reveal card card-hover group grid overflow-hidden lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="flex items-center gap-3 text-xs text-ink-500">
                <span className="rounded-full bg-clay-50 px-3 py-1 font-medium text-clay-600">
                  {featured.category}
                </span>
                <span>{featured.displayDate}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl leading-snug text-ink-900 group-hover:text-clay-700 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-ink-600">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-clay-600">
                Read article
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Rest */}
          <div className="reveal mt-8 grid gap-6 md:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card card-hover group flex flex-col overflow-hidden sm:flex-row"
              >
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-44">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-6">
                  <span className="text-xs text-ink-500">{post.displayDate}</span>
                  <h3 className="mt-2 font-display text-lg leading-snug text-ink-900 group-hover:text-clay-700">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
