# Wellness Recovery Center of New Jersey

A modern, mobile-first rebuild of [wellnessrecoverynj.com](https://wellnessrecoverynj.com) built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS** — optimized for deployment on **Vercel**.

## ✨ Highlights

- **Fully responsive, mobile-first** — a slide-in mobile nav drawer with grouped accordions and sticky call-to-actions; a full horizontal mega-menu on desktop with no wasted space.
- **Warm, cohesive design system** derived from the brand logo (terracotta, dusty rose, warm sand) with an editorial serif/​sans type pairing (Fraunces + Inter).
- **All content & imagery** from the original site: every program, addiction page, county, blog post, facility photo, insurance logo, and accreditation badge.
- **Static-generated (SSG)** — all 40 routes prerender to static HTML for fast loads and great SEO.
- **SEO built in** — per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD (MedicalBusiness + FAQ), and **301 redirects** from the old URL structure.
- **Accessible** — semantic landmarks, skip link, focus-visible rings, ARIA on nav/accordions, reduced-motion support, and content that is visible without JavaScript.

## 🗂 Structure

```
app/                     # App Router pages
  page.tsx               # Homepage
  about/ tour/ admissions/ contact/ faq/ privacy-policy/
  treatment/             # Overview + [slug] (5 programs)
  what-we-treat/         # Overview + [slug] (10 addictions)
  areas-we-serve/        # Overview + [slug] (6 counties)
  blog/                  # Listing + [slug] (posts)
  sitemap.ts robots.ts   # SEO
components/              # Header, Footer, Logo, PageHero, Forms, sections, ui
lib/                     # Content data: site, programs, addictions, areas, blog, content
public/images/          # logo/ facility/ stock/ insurance/ accreditation/
```

Content lives in plain data files under `lib/` — editing copy, adding a program, or a new blog post is a one-file change.

## 🚀 Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
```

## ▲ Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **Add New → Project** and import the repo. Framework preset **Next.js** is auto-detected — no configuration needed.
3. Deploy. Then add the custom domain `wellnessrecoverynj.com` under **Settings → Domains**.

Or from the CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

## 📝 Notes for going live

- **Forms** (insurance verification & contact) currently show a confirmation on submit but are not yet wired to a backend. Connect them to a Next.js Route Handler, or a service like Formspree / Resend, before launch.
- **Phone / email / address** are centralized in `lib/site.ts`.
- The original site used two email domains (`wellnessrecoverynj.com` and `wellnessrcynj.com`); this rebuild standardizes on `info@wellnessrecoverynj.com` — update `lib/site.ts` if needed.
- The old placeholder FAQ page (lorem ipsum) was replaced with real, relevant FAQs in `lib/content.ts`.

---

© Wellness Recovery Center of New Jersey. Rebuilt with Next.js.
