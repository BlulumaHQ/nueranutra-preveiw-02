import type { LocaleCode } from "./config";
import en from "./locales/en";

export type Dict = typeof en;

const cache: Partial<Record<LocaleCode, Dict>> = { en };

const loaders: Record<LocaleCode, () => Promise<{ default: Dict }>> = {
  en: async () => ({ default: en }),
  "zh-TW": () => import("./locales/zh-TW"),
  "zh-CN": () => import("./locales/zh-CN"),
  ko: () => import("./locales/ko"),
};

export const getLoadedDict = (code: LocaleCode): Dict | undefined => cache[code];

export async function loadDict(code: LocaleCode): Promise<Dict> {
  const hit = cache[code];
  if (hit) return hit;
  const mod = await loaders[code]();
  cache[code] = mod.default;
  return mod.default;
}

/** Used by the build-time pre-renderer to make every dictionary available synchronously. */
export function seedDicts(dicts: Partial<Record<LocaleCode, Dict>>) {
  Object.assign(cache, dicts);
}

export const fmt = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
