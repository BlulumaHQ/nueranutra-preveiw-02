import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";

const linkClass = "text-primary-foreground/80 hover:text-primary-foreground transition-colors";

const Footer = () => {
  const { t, lp } = useLocale();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + Desc */}
          <div>
            <img src={logo} alt={t.nav.logoAlt} className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-primary-foreground/80">{t.footer.tagline}</p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/90">{t.footer.services}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={lp("/our-services#turnkey-manufacturing")} className={linkClass}>{t.serviceNames.turnkey}</Link></li>
              <li><Link to={lp("/our-services#formulation-development")} className={linkClass}>{t.serviceNames.formulation}</Link></li>
              <li><Link to={lp("/our-services#custom-packaging")} className={linkClass}>{t.serviceNames.packaging}</Link></li>
              <li><Link to={lp("/our-services#regulatory-compliance")} className={linkClass}>{t.serviceNames.regulatory}</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/90">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={lp("/")} className={linkClass}>{t.nav.home}</Link></li>
              <li><Link to={lp("/about-us")} className={linkClass}>{t.nav.about}</Link></li>
              <li><Link to={lp("/our-services")} className={linkClass}>{t.nav.services}</Link></li>
              <li><Link to={lp("/contact-us")} className={linkClass}>{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/90">{t.footer.contact}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <a href="tel:+16042718868" className={linkClass}>+1 (604) 271-8868</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <a href="mailto:enquiry@nueranutra.com" className={linkClass}>enquiry@nueranutra.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span className="text-primary-foreground/80">{t.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/60">
          <span>© 2025 NuEra Nutraceuticals Inc.</span>
          <span>
            {t.footer.webDesignBy}{" "}
            <a
              href="https://bluluma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground transition-colors underline"
            >
              Bluluma.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
