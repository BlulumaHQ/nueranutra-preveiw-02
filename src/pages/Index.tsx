import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Real source images from nueranutra.com
import servicesHome3 from "@/assets/services-home-3.jpg";
import servicesHome1 from "@/assets/services-home-1.jpg";
import servicesHome2 from "@/assets/services-home-2.jpg";
import servicesHome4 from "@/assets/services-home-4.jpg";
import receptionImg from "@/assets/reception.jpg";
import about5 from "@/assets/about-5.jpg";
import about1 from "@/assets/about-1.jpg";
import about3 from "@/assets/about-3.jpg";
import about4 from "@/assets/about-4.jpg";

// Certificate icons
import gmpRed from "@/assets/certs/gmp-red.png";
import cgmp from "@/assets/certs/cgmp.png";
import usdaOrganic from "@/assets/certs/usda-organic.png";
import halal from "@/assets/certs/halal.png";
import gmpGreen from "@/assets/certs/gmp-green.png";
import healthCanada from "@/assets/certs/health-canada.png";
import fda from "@/assets/certs/fda.png";

const certIcons = [
{ src: gmpRed, alt: "GMP Certified" },
{ src: cgmp, alt: "cGMP Certified" },
{ src: usdaOrganic, alt: "USDA Organic" },
{ src: halal, alt: "IFANCC Halal Certified" },
{ src: gmpGreen, alt: "GMP Practice Certified" },
{ src: healthCanada, alt: "Health Canada GMP Certified" },
{ src: fda, alt: "FDA Registered" }];


const Index = () => {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
           SECTION 1 – HERO (full-width image with text overlay, like Merck)
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-end">
        <div className="absolute inset-0">
          <img src={about5} alt="NuEra Manufacturing Facility" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        <div className="container relative z-10 pb-16 md:pb-24 pt-32">
          <div className="max-w-2xl">
            <p className="text-secondary font-sans font-semibold text-sm uppercase tracking-widest mb-3">Since 2007</p>
            <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-serif font-bold text-primary-foreground mb-3 leading-tight">
              GMP-Certified Nutraceutical Manufacturing Partner
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/90 font-sans mb-2 font-medium">
              Speed • Compliance • Scalable Production
            </p>
            <p className="text-sm md:text-base text-primary-foreground/75 font-sans mb-8 max-w-xl leading-relaxed">
              Since 2007, NuEra Nutraceuticals Inc. has supported startup supplement brands and established global companies with scalable, GMP-compliant manufacturing. From formulation to packaging, we deliver precision production and regulatory confidence—so you can launch faster with reduced compliance risk.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact-us?type=quote">Request a Quote</Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/contact-us?type=consultation">Book Consultation</Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/contact-us?type=formula">Submit Your Formula</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 2 – 3 PILLAR HORIZONTAL CARDS (with images, like Merck)
           ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {[
            {
              title: "Startup Supplement Brands",
              body: "Turnkey guidance, faster timelines, and regulatory-ready documentation designed for first-time launches.",
              img: servicesHome1
            },
            {
              title: "Established Global Brands",
              body: "Scalable high-volume production with disciplined GMP processes and export-ready documentation.",
              img: servicesHome3
            },
            {
              title: "Quality & Sustainability",
              body: "Documented quality control, controlled manufacturing flow, and responsible production standards that protect brand integrity.",
              img: receptionImg
            }].
            map((card) =>
            <div key={card.title} className="group">
                <div className="h-56 overflow-hidden rounded-lg mb-5">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.body}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 3 – CAPABILITY GRID (stories-style: 1 large left + 3 small right, like Merck)
           ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 section-light">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-10">
            Engineering Manufacturing Precision
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Large featured card */}
            <div className="group relative overflow-hidden rounded-lg">
              <div className="h-full min-h-[400px] overflow-hidden">
                <img alt="High-Speed Encapsulation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/lovable-uploads/19fab4ee-8d11-40b4-820d-d761b04d0784.jpg" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary/90 to-transparent">
                <p className="text-secondary text-xs font-semibold uppercase tracking-wider mb-1">Manufacturing</p>
                <h3 className="text-xl font-serif font-bold text-primary-foreground mb-1">High-Speed Encapsulation</h3>
                <p className="text-primary-foreground/80 text-sm">5 high-speed encapsulation lines engineered for consistency, throughput, and repeatable quality.</p>
              </div>
            </div>
            {/* 3 smaller cards in right column */}
            <div className="grid gap-6">
              {[
              {
                title: "Advanced Tableting",
                body: "3 tabletting lines plus pharmaceutical-grade coating drum capability for finish quality and stability.",
                img: servicesHome4,
                tag: "Manufacturing"
              },
              {
                title: "Automated Bottling & Packaging",
                body: "2 automated bottling lines with blister, sachet, and stick-pak options for modern consumer formats.",
                img: servicesHome2,
                tag: "Packaging"
              },
              {
                title: "Powder Blending & Custom Formulation",
                body: "3 powder blenders in multiple capacities supporting custom formulas and scalable runs.",
                img: servicesHome1,
                tag: "Formulation"
              }].
              map((card) =>
              <div key={card.title} className="group flex gap-4 items-start">
                  <div className="w-32 h-24 shrink-0 overflow-hidden rounded-lg">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <p className="text-secondary text-xs font-semibold uppercase tracking-wider mb-1">{card.tag}</p>
                    <h3 className="text-sm font-serif font-bold text-foreground mb-1">{card.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{card.body}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8">
            <Button variant="default" asChild className="bg-primary text-primary-foreground">
              <Link to="/our-services">Explore Our Capabilities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 4 – ABOUT SPLIT BLOCK (bg color left text, image right, like Merck)
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative">
        <div className="grid md:grid-cols-2 min-h-[500px]">
          {/* Left: colored background with text */}
          <div className="bg-primary flex items-center p-10 md:p-16 lg:p-20">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-6">Built on Trust Since 2007</h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-8">
                NuEra Nutraceuticals Inc. is a proudly Canadian nutraceutical manufacturer committed to quality, innovation, and trust. We provide GMP-compliant contract manufacturing solutions that combine technical precision with responsive, partnership-driven service—helping brands bring safe, compliant products to market with confidence.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="heroOutline" asChild>
                  <Link to="/about-us">Who We Are</Link>
                </Button>
                <Button variant="heroOutline" asChild>
                  <Link to="/about-us#facility">Our Facility</Link>
                </Button>
              </div>
            </div>
          </div>
          {/* Right: image */}
          <div className="h-64 md:h-auto overflow-hidden">
            <img src={receptionImg} alt="NuEra Facility Reception" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 5 – PIPELINE SPLIT BLOCK (image left, text right, like Merck)
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative">
        <div className="grid md:grid-cols-2 min-h-[500px]">
          {/* Left: image */}
          <div className="h-64 md:h-auto overflow-hidden">
            <img src={about1} alt="Manufacturing Pipeline" className="w-full h-full object-cover" />
          </div>
          {/* Right: colored background with text */}
          <div className="bg-secondary flex items-center p-10 md:p-16 lg:p-20">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-foreground mb-6">From Concept to Commercialization</h2>
              <p className="text-secondary-foreground/80 leading-relaxed mb-8">
                Our structured manufacturing pipeline is designed to reduce delays, strengthen documentation integrity, and accelerate time to market—without compromising compliance.
              </p>
              <Button variant="heroOutline" asChild>
                <Link to="/our-services#process">View Our Process <ArrowRight size={16} /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 6 – REGULATORY & COMPLIANCE SPLIT BLOCK (bg left text, image right, like Merck)
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative">
        <div className="grid md:grid-cols-2 min-h-[500px]">
          {/* Left: colored background */}
          <div className="bg-primary flex items-center p-10 md:p-16 lg:p-20">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-6">Regulatory & Compliance Leadership</h2>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-8">
                Navigating regulatory requirements in the nutraceutical industry requires precision, documentation discipline, and current knowledge of domestic and international standards. Our Regulatory & Compliance team supports Health Canada NPN applications, U.S. FDA facility alignment, ingredient verification, label compliance review, and permissible health claim guidance. We assist in preparing Master Manufacturing Records, Certificates of Analysis, stability documentation, and export documentation to ensure products meet all required frameworks. From pre-launch evaluation to ongoing compliance oversight, we reduce regulatory risk and accelerate market entry.
              </p>
              <Button variant="heroOutline" asChild>
                <Link to="/contact-us?type=formula&subject=Product+Development">Start Your Product Development</Link>
              </Button>
            </div>
          </div>
          {/* Right: image */}
          <div className="h-64 md:h-auto overflow-hidden">
            <img src={about3} alt="Quality Control Laboratory" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 7 – GMP-CERTIFIED SOLUTIONS + CERT ICONS
           ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">GMP-Certified Solutions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Our certifications reflect disciplined manufacturing systems, documented quality control, and compliance readiness for global distribution.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {certIcons.map((cert) =>
            <img key={cert.alt} src={cert.src} alt={cert.alt} className="h-20 md:h-24 w-auto object-contain" />
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 8 – FINAL CONVERSION BLOCK (before footer)
           ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 hero-gradient">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">Ready to Launch Your Product?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 leading-relaxed">
            Get a manufacturing partner built for precision, compliance, and scalable growth.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact-us?type=quote">Request a Quote</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact-us?type=consultation">Book Consultation</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact-us?type=formula">Submit Your Formula</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION 9 – RELATED LINKS GRID (3 cards, like Merck)
           ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 section-light">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-10">Related Links</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
             { title: "Our Services", desc: "Explore our turnkey manufacturing, formulation, and packaging capabilities.", path: "/our-services", img: servicesHome3 },
             { title: "About Us", desc: "Learn about our history, facility, and commitment to quality since 2007.", path: "/about-us", img: about4 },
             { title: "Contact Us", desc: "Get in touch for quotes, consultations, or to submit your product formula.", path: "/contact-us", img: servicesHome2 }].
            map((card) =>
            <Link to={card.path} key={card.title} className="group block overflow-hidden rounded-lg bg-card hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-muted-foreground text-sm">{card.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary">
                    Learn more <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>);

};

export default Index;