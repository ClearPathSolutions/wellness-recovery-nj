'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav, site, type NavItem } from '@/lib/site';
import Logo from './Logo';
import { Icon } from './ui';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Solidify header shadow after a little scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDesktop(null);
  }, [pathname]);

  // Lock body scroll + close on Escape while the drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    }
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar — visible on large screens only, keeps mobile clean */}
      <div className="hidden bg-ink-900 text-cream/90 lg:block">
        <div className="container flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <Icon name="pin" className="h-3.5 w-3.5 text-clay-300" />
              {site.address.full}
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="clock" className="h-3.5 w-3.5 text-clay-300" />
              Confidential admissions, 24/7
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-clay-300">
              Facebook
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-clay-300">
              Instagram
            </a>
            <a href={site.emailHref} className="inline-flex items-center gap-2 hover:text-clay-300">
              <Icon name="mail" className="h-3.5 w-3.5 text-clay-300" />
              {site.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`bg-cream/95 backdrop-blur transition-shadow duration-300 ${
          scrolled ? 'shadow-soft' : 'shadow-none border-b border-ink-100'
        }`}
      >
        <div className="container flex h-[68px] items-center justify-between gap-4 lg:h-[76px]">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                active={isActive(item.href)}
                open={openDesktop === item.label}
                onOpen={() => setOpenDesktop(item.label)}
                onClose={() => setOpenDesktop((v) => (v === item.label ? null : v))}
              />
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/admissions" className="btn-outline px-5 py-2.5 text-[0.8rem]">
              Verify Insurance
            </Link>
            <a href={site.phoneHref} className="btn-primary px-5 py-2.5 text-[0.8rem]">
              <Icon name="phone" className="h-4 w-4" />
              {site.phone}
            </a>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phone}`}
              className="btn-primary h-11 w-11 !px-0"
            >
              <Icon name="phone" className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-900 transition-colors hover:border-clay-500 hover:text-clay-600"
            >
              <Burger open={mobileOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
        isActive={isActive}
      />
    </header>
  );
}

/* ---------------- Desktop nav item ---------------- */

function DesktopNavItem({
  item,
  active,
  open,
  onOpen,
  onClose,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  if (!item.columns) {
    return (
      <Link
        href={item.href}
        className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
          active ? 'text-clay-600' : 'text-ink-800 hover:text-clay-600'
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <Link
        href={item.href}
        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
          active || open ? 'text-clay-600' : 'text-ink-800 hover:text-clay-600'
        }`}
        aria-expanded={open}
      >
        {item.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* Mega dropdown */}
      <div
        className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200 ${
          open ? 'visible opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        <div className="w-[min(92vw,640px)] rounded-3xl border border-ink-100 bg-white p-6 shadow-lift">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            {item.columns.map((col) => (
              <div key={col.heading}>
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-clay-500">
                  {col.heading}
                </p>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block rounded-xl px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-clay-50 hover:text-clay-700"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Mobile drawer ---------------- */

function MobileDrawer({
  open,
  onClose,
  openAccordion,
  setOpenAccordion,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  openAccordion: string | null;
  setOpenAccordion: (v: string | null) => void;
  isActive: (href: string) => boolean;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden
      />
      {/* Panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-[100dvh] w-[min(88vw,380px)] flex-col bg-cream shadow-lift transition-transform duration-300 ease-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-ink-100 px-5">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-900"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
          <ul className="space-y-1">
            {nav.map((item) =>
              item.columns ? (
                <li key={item.label} className="border-b border-ink-100/70 pb-1">
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === item.label ? null : item.label)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[0.95rem] font-semibold ${
                      isActive(item.href) ? 'text-clay-600' : 'text-ink-900'
                    }`}
                    aria-expanded={openAccordion === item.label}
                  >
                    {item.label}
                    <svg
                      className={`h-4 w-4 text-ink-400 transition-transform ${
                        openAccordion === item.label ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openAccordion === item.label ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-3 px-3 pb-3 pt-1">
                        {item.columns.map((col) => (
                          <div key={col.heading}>
                            <p className="mb-1 px-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-clay-500">
                              {col.heading}
                            </p>
                            <ul className="space-y-0.5">
                              {col.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    onClick={onClose}
                                    className="block rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-clay-50 hover:text-clay-700"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.label} className="border-b border-ink-100/70">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block rounded-xl px-3 py-3 text-[0.95rem] font-semibold ${
                      isActive(item.href) ? 'text-clay-600' : 'text-ink-900 hover:text-clay-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-ink-100 bg-white/60 p-4">
          <a href={site.phoneHref} className="btn-primary w-full">
            <Icon name="phone" className="h-4 w-4" />
            Call {site.phone}
          </a>
          <Link href="/admissions" onClick={onClose} className="btn-outline w-full">
            Verify Insurance
          </Link>
        </div>
      </div>
    </>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-4 w-5 flex-col justify-between">
      <span
        className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
          open ? 'translate-y-[7px] rotate-45' : ''
        }`}
      />
      <span
        className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
          open ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
          open ? '-translate-y-[7px] -rotate-45' : ''
        }`}
      />
    </span>
  );
}
