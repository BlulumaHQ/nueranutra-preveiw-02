import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + Desc */}
          <div>
            <img src={logo} alt="NuEra Nutraceuticals Inc." className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-primary-foreground/80">
              GMP-certified nutraceutical contract manufacturer delivering precision production and regulatory confidence since 2007.
            </p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/90">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services#turnkey-manufacturing" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Turnkey Manufacturing Solutions</Link></li>
              <li><Link to="/services#formulation-development" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Formulation & Development Support</Link></li>
              <li><Link to="/services#custom-packaging" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Custom Packaging Services</Link></li>
              <li><Link to="/services#regulatory-compliance" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Regulatory & Compliance Guidance</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/90">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Our Services</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/90">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <a href="tel:+16042718868" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">+1 (604) 271-8868</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <a href="mailto:enquiry@nueranutra.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">enquiry@nueranutra.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span className="text-primary-foreground/80">12031 No.5 Road, Richmond, BC, Canada</span>
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
            Web Design by{" "}
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
