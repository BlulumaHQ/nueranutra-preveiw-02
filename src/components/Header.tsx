import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLocale } from "@/i18n/LocaleProvider";
import LanguageSwitcher, { MobileLanguageList } from "./LanguageSwitcher";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t, lp } = useLocale();

  const navLinks = [
    { label: t.nav.home, path: lp("/") },
    { label: t.nav.services, path: lp("/our-services") },
    { label: t.nav.about, path: lp("/about-us") },
    { label: t.nav.contact, path: lp("/contact-us") },
  ];
  const isActive = (p: string) => location.pathname === p || location.pathname + "/" === p;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to={lp("/")} className="flex items-center gap-2">
          <img src={logo} alt={t.nav.logoAlt} className="h-14 md:h-20 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.path) ? "text-primary" : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Button asChild>
            <Link to={lp("/contact-us?type=manufacturing")}>{t.nav.quote}</Link>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t.nav.toggleMenu}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="container flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="w-fit">
              <Link to={lp("/contact-us?type=manufacturing")} onClick={() => setMobileOpen(false)}>
                {t.nav.quote}
              </Link>
            </Button>
            <MobileLanguageList onSelect={() => setMobileOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
