import { Link, useLocation } from "react-router-dom";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, PAGES, localizedPath, stripLocale } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";

/** Equivalent page in another language; falls back to that language's homepage. */
export const useAlternateHref = () => {
  const { pathname, hash } = useLocation();
  const base = stripLocale(pathname);
  const known = (PAGES as readonly string[]).includes(base);
  return (code: (typeof LOCALES)[number]["code"]) =>
    known ? localizedPath(code, base) + hash : localizedPath(code, "/");
};

const LanguageSwitcher = () => {
  const { locale, t } = useLocale();
  const hrefFor = useAlternateHref();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`${t.nav.language}: ${locale.label}`}
      >
        <Globe size={16} aria-hidden="true" />
        <span>{locale.short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {LOCALES.map((l) => (
          <DropdownMenuItem key={l.code} asChild>
            <Link to={hrefFor(l.code)} lang={l.htmlLang} hrefLang={l.hreflang} className="flex items-center justify-between gap-3">
              {l.label}
              {l.code === locale.code && <Check size={14} className="text-primary" aria-hidden="true" />}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/** Inline list for the mobile menu. */
export const MobileLanguageList = ({ onSelect }: { onSelect: () => void }) => {
  const { locale, t } = useLocale();
  const hrefFor = useAlternateHref();
  return (
    <div className="border-t border-border pt-4">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <Globe size={14} aria-hidden="true" /> {t.nav.language}
      </p>
      <div className="flex flex-wrap gap-2">
        {LOCALES.map((l) => (
          <Link
            key={l.code}
            to={hrefFor(l.code)}
            onClick={onSelect}
            lang={l.htmlLang}
            hrefLang={l.hreflang}
            aria-current={l.code === locale.code ? "true" : undefined}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              l.code === locale.code ? "border-primary text-primary" : "border-border text-foreground/80 hover:text-primary"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
