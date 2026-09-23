import { LOCALES, SITE_URL, absoluteUrl, getLocale, type LocaleCode } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type PageKey = "home" | "services" | "about" | "contact";

export const pageKeyFor = (base: string): PageKey | null =>
  ({ "/": "home", "/our-services": "services", "/about-us": "about", "/contact-us": "contact" } as const)[
    base as "/"
  ] ?? null;

const ORG_ID = `${SITE_URL}/#organization`;

function jsonLd(code: LocaleCode, base: string, key: PageKey, t: Dict) {
  const loc = getLocale(code);
  const url = absoluteUrl(code, base);
  const homeUrl = absoluteUrl(code, "/");
  const pageType = key === "about" ? "AboutPage" : key === "contact" ? "ContactPage" : "WebPage";
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "NuEra Nutraceuticals Inc.",
      url: SITE_URL + "/",
      telephone: "+1-604-271-8868",
      email: "enquiry@nueranutra.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "12031 No.5 Road",
        addressLocality: "Richmond",
        addressRegion: "BC",
        addressCountry: "CA",
      },
      foundingDate: "2008",
    },
    {
      "@type": "WebSite",
      "@id": `${homeUrl}#website`,
      url: homeUrl,
      name: t.seo.siteName,
      inLanguage: loc.htmlLang,
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": pageType,
      "@id": `${url}#webpage`,
      url,
      name: t.seo[key].title,
      description: t.seo[key].description,
      inLanguage: loc.htmlLang,
      isPartOf: { "@id": `${homeUrl}#website` },
      about: { "@id": ORG_ID },
    },
  ];
  if (key !== "home") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.seo.breadcrumbHome, item: homeUrl },
        { "@type": "ListItem", position: 2, name: t.nav[key === "services" ? "services" : key], item: url },
      ],
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

/** Head tags for an indexable page. Every tag carries data-seo so the client can replace them on navigation. */
export function buildHeadHtml(code: LocaleCode, base: string, t: Dict): string {
  const key = pageKeyFor(base);
  if (!key) return buildNotFoundHead(t);
  const loc = getLocale(code);
  const url = absoluteUrl(code, base);
  const { title, description } = t.seo[key];
  const tags = [
    `<title data-seo>${esc(title)}</title>`,
    `<meta data-seo name="description" content="${esc(description)}">`,
    `<meta data-seo name="robots" content="index, follow">`,
    `<link data-seo rel="canonical" href="${url}">`,
    ...LOCALES.map((l) => `<link data-seo rel="alternate" hreflang="${l.hreflang}" href="${absoluteUrl(l.code, base)}">`),
    `<link data-seo rel="alternate" hreflang="x-default" href="${absoluteUrl("en", base)}">`,
    `<meta data-seo property="og:type" content="website">`,
    `<meta data-seo property="og:site_name" content="${esc(t.seo.siteName)}">`,
    `<meta data-seo property="og:title" content="${esc(title)}">`,
    `<meta data-seo property="og:description" content="${esc(description)}">`,
    `<meta data-seo property="og:url" content="${url}">`,
    `<meta data-seo property="og:locale" content="${loc.ogLocale}">`,
    ...LOCALES.filter((l) => l.code !== code).map(
      (l) => `<meta data-seo property="og:locale:alternate" content="${l.ogLocale}">`,
    ),
    `<meta data-seo name="twitter:card" content="summary_large_image">`,
    `<meta data-seo name="twitter:title" content="${esc(title)}">`,
    `<meta data-seo name="twitter:description" content="${esc(description)}">`,
    `<script data-seo type="application/ld+json">${jsonLd(code, base, key, t)}</script>`,
  ];
  return tags.join("\n    ");
}

export function buildNotFoundHead(t: Dict): string {
  return [
    `<title data-seo>${esc(t.seo.notFound.title)}</title>`,
    `<meta data-seo name="description" content="${esc(t.seo.notFound.description)}">`,
    `<meta data-seo name="robots" content="noindex, follow">`,
  ].join("\n    ");
}
