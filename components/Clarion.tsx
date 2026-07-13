import Script from 'next/script';
import { widgets } from '@/lib/site';

// Brand tokens for the Clarion chat bubble. Keep BRAND.color in sync with
// clay-500 (#c0814f) in tailwind.config.ts so the widget and site never drift.
const BRAND = {
  color: '#c0814f', // 👈 keep in sync with clay-500 (primary terracotta)
  headerText: '#ffffff', // readable contrast on the brand color
  title: 'Chat with us',
  position: 'right' as const,
  font: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
};

const { clarion } = widgets;

/**
 * Mounts the Clarion chat widget and the form-capture loader once, site-wide.
 * Place a single <Clarion /> at the bottom of <body> in app/layout.tsx.
 */
export default function Clarion() {
  return (
    <>
      {/* CSS variables so the bubble matches the brand even before the script reads data-* */}
      <style
        dangerouslySetInnerHTML={{
          __html: `:root{--clarion-chat-color:${BRAND.color};--clarion-chat-header-text:${BRAND.headerText};--clarion-chat-position:${BRAND.position};}`,
        }}
      />

      {/* Chat widget */}
      <Script
        src={clarion.widget}
        strategy="afterInteractive"
        data-site-key={clarion.siteKey}
        data-api={clarion.api}
        data-color={BRAND.color}
        data-header-text={BRAND.headerText}
        data-title={BRAND.title}
        data-position={BRAND.position}
        data-font={BRAND.font}
      />

      {/* Form capture — exposes window.ClarionForms.submit(...) */}
      <Script
        src={clarion.formsCapture}
        strategy="afterInteractive"
        data-site-key={clarion.siteKey}
        data-api={clarion.api}
      />
    </>
  );
}
