export type LocaleCode = "en" | "zh-TW" | "zh-CN" | "ko";

export interface LocaleInfo {
  code: LocaleCode;
  prefix: string;
  htmlLang: string;
  hreflang: string;
  ogLocale: string;
  label: string;
  short: string;
}

export const SITE_URL = "https://nueranutra.com";

export const LOCALES: LocaleInfo[] = [
  { code: "en", prefix: "", htmlLang: "en", hreflang: "en", ogLocale: "en_CA", label: "English", short: "EN" },
  { code: "zh-TW", prefix: "/zh-tw", htmlLang: "zh-TW", hreflang: "zh-TW", ogLocale: "zh_TW", label: "繁體中文", short: "繁中" },
  { code: "zh-CN", prefix: "/zh-cn", htmlLang: "zh-CN", hreflang: "zh-CN", ogLocale: "zh_CN", label: "简体中文", short: "简中" },
  { code: "ko", prefix: "/ko", htmlLang: "ko", hreflang: "ko", ogLocale: "ko_KR", label: "한국어", short: "KO" },
];

/** Public English routes — the source of truth. Localized routes reuse the same slugs. */
export const PAGES = ["/", "/our-services", "/about-us", "/contact-us"] as const;
export type PagePath = (typeof PAGES)[number];

export const getLocale = (code: LocaleCode) => LOCALES.find((l) => l.code === code)!;

export function localeFromPath(pathname: string): LocaleInfo {
  const lower = pathname.toLowerCase();
  return (
    LOCALES.find((l) => l.prefix && (lower === l.prefix || lower.startsWith(l.prefix + "/"))) ?? LOCALES[0]
  );
}

/** Strip the locale prefix, returning the English base path (always starting with "/"). */
export function stripLocale(pathname: string): string {
  const loc = localeFromPath(pathname);
  const rest = loc.prefix ? pathname.slice(loc.prefix.length) : pathname;
  return rest === "" ? "/" : rest;
}

/** Build a localized href from an English href (may include ?query and #hash). */
export function localizedPath(code: LocaleCode, href: string): string {
  const loc = getLocale(code);
  const match = href.match(/^([^?#]*)(.*)$/)!;
  const path = match[1] || "/";
  const suffix = match[2];
  if (!loc.prefix) return path + suffix;
  return (path === "/" ? loc.prefix + "/" : loc.prefix + path) + suffix;
}

export const absoluteUrl = (code: LocaleCode, page: string) => SITE_URL + localizedPath(code, page);
