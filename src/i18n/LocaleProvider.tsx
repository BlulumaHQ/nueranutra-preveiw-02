import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { localeFromPath, localizedPath, type LocaleInfo } from "./config";
import { getLoadedDict, loadDict, type Dict } from "./dictionaries";

interface LocaleCtx {
  locale: LocaleInfo;
  t: Dict;
  /** Convert an English href into the current locale's href. */
  lp: (href: string) => string;
}

const Ctx = createContext<LocaleCtx | null>(null);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const target = localeFromPath(pathname);
  const [state, setState] = useState<{ locale: LocaleInfo; t: Dict }>(() => ({
    locale: target,
    t: getLoadedDict(target.code) ?? getLoadedDict("en")!,
  }));

  useEffect(() => {
    let cancelled = false;
    const ready = getLoadedDict(target.code);
    if (ready) {
      setState({ locale: target, t: ready });
    } else {
      loadDict(target.code).then((t) => !cancelled && setState({ locale: target, t }));
    }
    return () => {
      cancelled = true;
    };
  }, [target.code]); // eslint-disable-line react-hooks/exhaustive-deps

  const value: LocaleCtx = {
    locale: state.locale,
    t: state.t,
    lp: (href) => localizedPath(state.locale.code, href),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useLocale = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLocale must be used within LocaleProvider");
  return v;
};
