import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts, getPost } from '@/lib/blog';
import { Container, Icon } from '@/components/ui';
import { CtaBand } from '@/components/sections';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPost(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: { title: p.title, description: p.excerpt, images: [p.image] },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      {/* Article header */}
      <section className="bg-ink-900 text-cream">
        <Container className="py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/60">
              <li>
                <Link href="/" className="hover:text-clay-300">Home</Link>
              </li>
              <li className="text-cream/30">/</li>
              <li>
                <Link href="/blog" className="hover:text-clay-300">Blog</Link>
              </li>
            </ol>
          </nav>
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-clay-500/20 px-3 py-1 font-medium text-clay-300">
              {post.category}
            </span>
            <span className="text-cream/70">{post.displayDate}</span>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl leading-tight text-white sm:text-4xl md:text-[2.9rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-sm text-cream/70">By {post.author}</p>
        </Container>
      </section>

      {/* Cover image */}
      <Container className="-mt-8 md:-mt-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-lift">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      </Container>

      {/* Body */}
      <article className="section">
        <Container>
          <div className="mx-auto max-w-prose space-y-6 text-lg leading-relaxed text-ink-700">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mx-auto mt-12 flex max-w-prose flex-col items-start gap-4 rounded-3xl border border-clay-200 bg-clay-50 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg text-ink-900">Ready to talk to someone?</p>
              <p className="mt-1 text-sm text-ink-600">Confidential, judgment-free, available 24/7.</p>
            </div>
            <a href="tel:+18668613449" className="btn-primary shrink-0">
              <Icon name="phone" className="h-4 w-4" />
              Call (866) 861-3449
            </a>
          </div>
        </Container>
      </article>

      {/* Related */}
      <section className="section-sm bg-sand-50">
        <Container>
          <h2 className="font-display text-2xl text-ink-900">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card card-hover group flex flex-col overflow-hidden sm:flex-row"
              >
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-44">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-6">
                  <span className="text-xs text-ink-500">{p.displayDate}</span>
                  <h3 className="mt-2 font-display text-lg leading-snug text-ink-900 group-hover:text-clay-700">
                    {p.title}
                  </h3>
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
