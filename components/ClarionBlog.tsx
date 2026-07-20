'use client';

import { useEffect } from 'react';
import { widgets } from '@/lib/site';

const { clarion } = widgets;

declare global {
  interface Window {
    ClarionBlog?: { render: () => void };
  }
}

/**
 * Renders Clarion's incoming blog posts into an isolated section. Drop this
 * BELOW your existing, hand-authored posts — the [data-clarion-blog] div only
 * ever fills itself, so old and new posts coexist permanently.
 *
 * Why this is a client component and not next/script:
 *   - The vendor script auto-renders exactly once (guarded by
 *     __clarionBlogLoaded) and only re-renders on `popstate`. Next.js
 *     client-side navigation uses pushState, so arriving at /blog from within
 *     the site would leave the section blank.
 *   - Loaded via next/script, `document.currentScript` is null, so it falls
 *     back to querySelectorAll("script[data-site-key]") and collides with the
 *     chat-widget / forms-capture scripts that share the same attribute.
 *
 * So we inject the script ourselves (with the right data attributes) and call
 * the exposed, idempotent window.ClarionBlog.render() on every mount.
 *
 * Note: these posts hydrate client-side, so they are not in the static HTML
 * and are not SEO-crawled the way pre-rendered posts are.
 */
export default function ClarionBlog() {
  useEffect(() => {
    // Already loaded this session (e.g. client-side nav back to /blog):
    // just re-render into the freshly-mounted div.
    if (window.ClarionBlog) {
      window.ClarionBlog.render();
      return;
    }

    const onReady = () => window.ClarionBlog?.render();

    // Inject the embed once; reuse it if a prior mount already added it.
    let script = document.querySelector<HTMLScriptElement>('script[data-clarion-blog-embed]');
    if (!script) {
      script = document.createElement('script');
      script.src = clarion.blogEmbed;
      script.async = true;
      script.setAttribute('data-clarion-blog-embed', '');
      script.setAttribute('data-site-key', clarion.siteKey);
      script.setAttribute('data-api', clarion.api);
      document.body.appendChild(script);
    }
    script.addEventListener('load', onReady, { once: true });

    return () => script?.removeEventListener('load', onReady);
  }, []);

  return <div data-clarion-blog />;
}
