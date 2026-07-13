import Script from 'next/script';
import { widgets } from '@/lib/site';

const { clarion } = widgets;

/**
 * Renders Clarion's incoming blog posts into an isolated section. Drop this
 * BELOW your existing, hand-authored posts — the data-clarion-blog div only
 * ever fills itself, so old and new posts coexist permanently.
 *
 * Note: these posts hydrate client-side, so they are not in the static HTML
 * and are not SEO-crawled the way pre-rendered posts are.
 */
export default function ClarionBlog() {
  return (
    <>
      <div data-clarion-blog />
      <Script
        src={clarion.blogEmbed}
        strategy="afterInteractive"
        data-site-key={clarion.siteKey}
        data-api={clarion.api}
      />
    </>
  );
}
