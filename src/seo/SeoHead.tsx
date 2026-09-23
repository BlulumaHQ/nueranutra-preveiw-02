import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleProvider";
import { stripLocale } from "@/i18n/config";
import { buildHeadHtml } from "./head";

/** Keeps <html lang> and SEO head tags in sync during client-side navigation. */
const SeoHead = () => {
  const { pathname } = useLocation();
  const { locale, t } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale.htmlLang;
    document.head.querySelectorAll("[data-seo], title").forEach((el) => el.remove());
    const tpl = document.createElement("template");
    tpl.innerHTML = buildHeadHtml(locale.code, stripLocale(pathname), t);
    tpl.content.childNodes.forEach((node) => {
      if (node.nodeType !== 1) return;
      const el = node as Element;
      if (el.tagName === "SCRIPT") {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.setAttribute("data-seo", "");
        s.textContent = el.textContent;
        document.head.appendChild(s);
      } else {
        document.head.appendChild(el.cloneNode(true));
      }
    });
  }, [pathname, locale, t]);

  return null;
};

export default SeoHead;
