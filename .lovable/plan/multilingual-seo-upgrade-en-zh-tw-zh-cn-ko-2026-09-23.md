# Multilingual SEO Upgrade (EN / zh-TW / zh-CN / KO)

## Route inventory (source of truth)
Current public English routes: `/`, `/our-services`, `/about-us`, `/contact-us`. No sitemap exists, no historical redirects exist beyond the SPA catch-all in `public/_redirects`. All four English URLs stay unchanged; no `/en/`.

New localized routes (same slugs): `/zh-tw/...`, `/zh-cn/...`, `/ko/...` for each of the 4 pages, which makes 16 indexable URLs in total.

## Key decision: static pre-rendering at build time
The site is a client-side app. Today every URL serves the same `index.html`, so crawlers and social previews see the same English head, and unknown URLs return 200 instead of 404. To meet the "real independent URL" requirements without a redesign:
- A post-build script writes one static HTML file per route (`dist/zh-tw/about-us/index.html`, etc.). Each file has the correct `<html lang>`, title, description, canonical, full hreflang set with x-default, og:* tags, og:locale, robots `index, follow`, JSON-LD, and pre-rendered body content captured from the built app.
- The `/* /index.html 200` catch-all is removed. Unknown paths serve a real `404.html` with HTTP 404.
- If Netlify post-processing turns out to be unavailable, the head tags are still correct per file, because they are generated at build time and do not depend on JavaScript.

## Localization
- `src/i18n/` has one dictionary per locale (`en`, `zh-TW`, `zh-CN`, `ko`), loaded lazily so only the current language is downloaded.
- A `useLocale()` hook reads the locale from the URL prefix. A `localePath()` helper keeps every internal link inside the current language.
- All visitor text is extracted from Index, Services, About, Contact, Header, Footer and NotFound into the dictionaries. This covers nav, hero slides, cards, timeline, form labels, dropdown labels, toasts, aria labels and alt text.
- Translations are written as native business copy, with no added claims:
  - **zh-TW:** Taiwan usage, e.g. 品質, 營養補充品, 聯絡我們, 送出.
  - **zh-CN:** Mainland usage, e.g. 质量, 营养补充剂, 联系我们, 提交.
  - **ko:** formal 합니다체, correct spacing.
- These terms stay in English: NuEra, NuEra Standard, Health Canada, NHP, GMP, cGMP, SOP, CoA, NPN, FDA, QA/QC, R&D.

## Language switcher
- A globe icon with the current language sits between "Contact Us" and "Request a Quote". It opens a dropdown with English / 繁體中文 / 简体中文 / 한국어, with no flags.
- It also appears inside the mobile menu.
- It maps to the same page in the chosen language.
- There are no automatic redirects by IP, browser language or localStorage.

## Form (Netlify)
- The form keeps a single `contact-inquiry` form and the same field names.
- Dropdowns show localized labels but submit the stable English values. This keeps entries consistent in Netlify.
- A hidden `locale` field is added, set from the route. The build-time hidden form in `index.html` also gets `locale`.

## SEO files (in `public/`)
- `sitemap_index.xml` points to `sitemap-en.xml`, `sitemap-zh-tw.xml`, `sitemap-zh-cn.xml` and `sitemap-ko.xml`. These use absolute `https://nueranutra.com` URLs, with no lastmod, priority or changefreq.
- `robots.txt` keeps its existing blocks and adds `Sitemap: https://nueranutra.com/sitemap_index.xml`.
- `netlify.toml` adds:
  - 301 redirects from www to the bare domain, keeping the path.
  - 301 redirects that strip trailing slashes (`/about-us/` to `/about-us`, locale roots stay `/zh-tw/`).
  - Lowercase redirects for known uppercase variants.
  - Netlify already forces HTTPS once the certificate is active.
- Canonical and og:url in `index.html` switch to per-route values. Preview domains never appear.

## Structured data
- Organization (existing facts only) and WebSite are used sitewide.
- Each page gets WebPage, AboutPage or ContactPage with a localized description.
- BreadcrumbList is added for the 3 inner pages.
- Reviews and ratings are not added.

## QA
- Build, then serve `dist/` locally and check all 16 URLs:
  - 200 status, one H1, lang, canonical, hreflang reciprocity, og:url, no noindex.
- Unknown URL returns 404.
- XML validity of the sitemaps and robots.
- Playwright on desktop and mobile: switcher, mobile menu, and a form submit payload that includes `locale`.
- Script scan of each language for the wrong script: Simplified characters in zh-TW, Traditional characters in zh-CN.

## Limits to report honestly
- www/HTTP behaviour and Netlify form capture can only be confirmed on the live Netlify deploy.
- No historical URL data beyond the current four routes exists in the project, so no legacy 301s are invented.
