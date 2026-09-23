import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";
import { seedDicts, type Dict } from "./i18n/dictionaries";
import { LOCALES, PAGES, localizedPath, localeFromPath, stripLocale } from "./i18n/config";
import { buildHeadHtml, buildNotFoundHead } from "./seo/head";
import en from "./i18n/locales/en";
import zhTW from "./i18n/locales/zh-TW";
import zhCN from "./i18n/locales/zh-CN";
import ko from "./i18n/locales/ko";

const dicts: Record<string, Dict> = { en, "zh-TW": zhTW, "zh-CN": zhCN, ko };
seedDicts(dicts as never);

export function render(url: string, notFound = false) {
  const loc = localeFromPath(url);
  const t = dicts[loc.code];
  const html = renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
  const head = notFound ? buildNotFoundHead(t) : buildHeadHtml(loc.code, stripLocale(url), t);
  return { html, head, htmlLang: loc.htmlLang };
}

export { LOCALES, PAGES, localizedPath };
