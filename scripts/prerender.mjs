// Build-time pre-rendering: writes one static HTML file per language/page so every
// URL has its own <html lang>, title, description, canonical, hreflang and body content.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const dist = resolve("dist");
const ssrDir = resolve("dist-ssr");
const { render, LOCALES, PAGES, localizedPath } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);

const template = readFileSync(resolve(dist, "index.html"), "utf8");

function page(url, notFound = false) {
  const { html, head, htmlLang } = render(url, notFound);
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${htmlLang}">`)
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head)
    .replace("<!--app-html-->", html);
}

function outFile(url) {
  // "/" -> index.html, "/zh-tw/" -> zh-tw/index.html, "/zh-tw/about-us" -> zh-tw/about-us.html
  if (url.endsWith("/")) return resolve(dist, "." + url, "index.html");
  return resolve(dist, "." + url + ".html");
}

let count = 0;
for (const loc of LOCALES) {
  for (const base of PAGES) {
    const url = localizedPath(loc.code, base);
    const file = outFile(url);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, page(url));
    count++;
  }
}
writeFileSync(resolve(dist, "404.html"), page("/__not-found__", true));
rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerendered ${count} pages + 404.html`);
