import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import about5 from "@/assets/about-5.jpg";
import heroSupplementPackaging from "@/assets/hero-supplement-packaging.jpg";
import heroProductionMachinery from "@/assets/hero-production-machinery.jpg";
import servicesHome1 from "@/assets/services-home-1.jpg";
import servicesHome2 from "@/assets/services-home-2.jpg";
import servicesHome3 from "@/assets/services-home-3.jpg";
import servicesHome4 from "@/assets/services-home-4.jpg";

import gmpRed from "@/assets/certs/gmp-red.png";
import cgmp from "@/assets/certs/cgmp.png";
import usdaOrganic from "@/assets/certs/usda-organic.png";
import halal from "@/assets/certs/halal.png";
import gmpGreen from "@/assets/certs/gmp-green.png";
import healthCanada from "@/assets/certs/health-canada.png";
import fda from "@/assets/certs/fda.png";
import kosherLogo from "@/assets/kosher-logo.png";

const heroSlides = [
  { src: heroSupplementPackaging, alt: "Premium nutraceutical product packaging", position: "object-center" },
  { src: heroProductionMachinery, alt: "Organized nutraceutical production equipment", position: "object-center" },
  { src: about5, alt: "NuEra Nutraceuticals manufacturing facility", position: "object-center" },
];

const comparisons = [
  {
    number: "01",
    title: "Precision Blend Uniformity",
    baseline: "Production may depend heavily on standard mixing times and established general process parameters.",
    standard: "NuEra applies controlled procedures and blend-uniformity verification for complex formulations to support consistent active ingredient distribution throughout production.",
    line: "Consistency should be verified—not assumed.",
  },
  {
    number: "02",
    title: "Raw Material Identity",
    baseline: "Supplier documentation such as a Certificate of Analysis provides important starting information.",
    standard: "NuEra incorporates incoming material identity verification into its quality-control process before materials are released for manufacturing.",
    line: "Know what enters the process before it reaches the product.",
  },
  {
    number: "03",
    title: "Impurity & Contaminant Screening",
    baseline: "Routine testing often focuses on standard microbial and heavy-metal requirements.",
    standard: "Product-specific quality programs can evaluate additional relevant risks including chemical impurities, residual solvents, pesticides and degradation products depending on the ingredient and formulation.",
    line: "Testing should reflect the actual risk profile of the product.",
  },
  {
    number: "04",
    title: "Stability Assurance",
    baseline: "Shelf-life decisions can rely heavily on existing ingredient data or generalized expectations.",
    standard: "Structured stability programs monitor physical and chemical product integrity over time to support specification, potency and shelf-life decisions.",
    line: "Quality has to last beyond the manufacturing date.",
  },
];

const services = [
  {
    title: "Turnkey Manufacturing Solutions",
    body: "End-to-end support from concept to commercialization across capsule filling, tablet pressing and powder blending.",
    image: servicesHome3,
    path: "/our-services#turnkey-manufacturing",
  },
  {
    title: "Formulation & Development Support",
    body: "Ingredient sourcing, optimization and manufacturability guidance for market-ready products.",
    image: servicesHome1,
    path: "/our-services#formulation-development",
  },
  {
    title: "Custom Packaging Services",
    body: "Coordinated bottle, blister, sachet and stick-pak solutions designed for retail readiness.",
    image: servicesHome2,
    path: "/our-services#custom-packaging",
  },
  {
    title: "Regulatory & Compliance Guidance",
    body: "Documentation and regulatory support from pre-launch evaluation through ongoing compliance oversight.",
    image: servicesHome4,
    path: "/our-services#regulatory-compliance",
  },
];

const certIcons = [
  { src: gmpRed, alt: "GMP Certified" },
  { src: cgmp, alt: "cGMP Certified" },
  { src: usdaOrganic, alt: "USDA Organic" },
  { src: halal, alt: "IFANCC Halal Certified" },
  { src: gmpGreen, alt: "GMP Practice Certified" },
  { src: healthCanada, alt: "Health Canada GMP Certified" },
  { src: fda, alt: "FDA Registered" },
  { src: kosherLogo, alt: "Kosher Certified" },
];

const Index = () => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const showNextHeroSlide = useCallback(() => {
    setCurrentHeroSlide((current) => (current + 1) % heroSlides.length);
  }, []);

  const showPreviousHeroSlide = useCallback(() => {
    setCurrentHeroSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const timer = window.setInterval(showNextHeroSlide, 5500);
    return () => window.clearInterval(timer);
  }, [showNextHeroSlide]);

  return (
  <>
    <section className="relative min-h-[85vh] flex items-end overflow-hidden">
      <div className="absolute inset-0" aria-live="polite">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={index === currentHeroSlide ? slide.alt : ""}
            aria-hidden={index !== currentHeroSlide}
            width={1536}
            height={1024}
            className={`absolute inset-0 h-full w-full object-cover ${slide.position} transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
              index === currentHeroSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/25" />
      </div>
      <div className="container relative z-10 pb-24 pt-28 md:pb-24 md:pt-36">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-secondary">The standard beyond the standard</p>
          <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-[3.5rem]">
            Not All Supplement Manufacturing Is Created Equal.
          </h1>
          <div className="max-w-2xl space-y-3 text-sm leading-relaxed text-primary-foreground/80 md:text-base">
            <p>A Site Licence tells you a manufacturer is licensed. What happens every day on the production floor determines the consistency, quality and reliability of your product.</p>
            <p>At NuEra Nutraceuticals, advanced SOPs, testing, documentation and process control are built into how we manufacture.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact-us?type=new-product">Start a New Product</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact-us?type=product-assessment#inquiry">Request a Product Assessment</Link>
            </Button>
          </div>
          <p className="mt-8 border-l-2 border-secondary pl-4 text-sm font-semibold leading-relaxed text-primary-foreground">
            Licensed is the baseline.<br />Execution is the difference.
          </p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-5 z-20">
        <div className="container flex items-center justify-between">
          <div className="flex gap-2" role="tablist" aria-label="Hero slides">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.alt}
                type="button"
                onClick={() => setCurrentHeroSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${
                  index === currentHeroSlide ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground/80"
                }`}
                role="tab"
                aria-selected={index === currentHeroSlide}
                aria-label={`Show hero slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="heroOutline" size="icon" onClick={showPreviousHeroSlide} aria-label="Previous hero slide" className="rounded-full border-primary-foreground/60 bg-primary/20">
              <ChevronLeft />
            </Button>
            <Button type="button" variant="heroOutline" size="icon" onClick={showNextHeroSlide} aria-label="Next hero slide" className="rounded-full border-primary-foreground/60 bg-primary/20">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Licence vs. daily execution</p>
          <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
            A Licence Tells You Where the Standard Starts.<br className="hidden md:block" /> Our SOPs Show You How Far We Take It.
          </h2>
        </div>
        <div>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            Meeting regulatory requirements is essential. But for a brand owner, compliance alone does not answer the most important manufacturing questions:
          </p>
          <ul className="divide-y divide-border border-y border-border text-sm font-medium text-foreground md:text-base">
            <li className="py-3">Is the blend actually uniform?</li>
            <li className="py-3">Were incoming ingredients independently verified?</li>
            <li className="py-3">Are relevant contaminants and impurities being evaluated?</li>
            <li className="py-3">Will the formulation remain within specification throughout its intended shelf life?</li>
          </ul>
          <p className="mt-6 leading-relaxed text-muted-foreground">That is where NuEra’s day-to-day quality systems become important.</p>
        </div>
      </div>
    </section>

    <section className="relative border-y border-border bg-muted/40 py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-1 bg-secondary" />
      <div className="container">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 inline-flex border-l-4 border-secondary pl-3 text-sm font-bold uppercase tracking-widest text-primary">The NuEra Standard</p>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">The Baseline vs. The NuEra Standard</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Four practical areas where disciplined daily execution supports product consistency and brand confidence.</p>
        </div>
        <div className="space-y-6">
          {comparisons.map((item, index) => (
            <article key={item.number} className="overflow-hidden rounded-lg border border-border bg-card shadow-md transition-shadow duration-300 hover:shadow-lg">
              <div className="grid lg:grid-cols-[0.55fr_1fr_1.25fr]">
                <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8">
                  <span className="text-3xl font-bold text-secondary">{item.number}</span>
                  <h3 className="mt-4 text-xl font-bold text-foreground">{item.title}</h3>
                </div>
                <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">The baseline</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.baseline}</p>
                </div>
                <div className={`relative border-l-4 border-secondary p-6 lg:p-8 ${index % 2 === 0 ? "bg-primary/[0.06]" : "bg-secondary/[0.12]"}`}>
                  <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-primary">The NuEra Standard</p>
                  <p className="text-sm leading-relaxed text-foreground">{item.standard}</p>
                  <p className="mt-5 border-l-2 border-secondary pl-3 text-sm font-semibold text-primary">{item.line}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-primary py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-secondary">Your formula. Your label. Your reputation.</p>
          <h2 className="mb-6 text-3xl font-bold text-primary-foreground md:text-4xl">Manufacturing Quality Becomes Brand Risk.</h2>
          <div className="space-y-3 leading-relaxed text-primary-foreground/80">
            <p>A product can look perfect on a specification sheet and still create problems if execution varies during manufacturing.</p>
            <p>For brand owners, strong manufacturing controls help reduce unnecessary exposure to inconsistent batches, documentation issues, delays and preventable quality failures.</p>
          </div>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg bg-primary-foreground/20 md:grid-cols-3">
          {[
            ["Audit-ready", "Transparent manufacturing and quality records that support traceability and review."],
            ["Consistent", "Controlled procedures designed to support repeatability from development through commercial production."],
            ["Risk-aware", "Testing and documentation strategies designed around the characteristics of the formulation and its ingredients."],
          ].map(([title, body]) => (
            <div key={title} className="bg-primary p-7 md:p-8">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-secondary">{title}</h3>
              <p className="text-sm leading-relaxed text-primary-foreground/80">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Where Are You in Your Product Journey?</h2>
          <p className="leading-relaxed text-muted-foreground">Whether you are creating something new or evaluating a product already in production, NuEra can help you determine the right manufacturing, testing and quality-control path forward.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { number: "Path 01", eyebrow: "New Product", title: "Build Your Next Product", body: "Develop a new nutraceutical product with support across formulation, ingredient sourcing, manufacturing, packaging and regulatory requirements.", cta: "Start a New Product", type: "new-product" },
            { number: "Path 02", eyebrow: "Existing Product", title: "Take a Closer Look at What You Already Have", body: "Already have a formulation or product in production? Speak with NuEra about manufacturing consistency, testing, quality control, stability, regulatory considerations and opportunities for improvement.", cta: "Request a Product Assessment", type: "product-assessment" },
          ].map((path) => (
            <article key={path.number} className="flex min-h-[320px] flex-col rounded-lg border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-lg md:p-10">
              <div className="mb-8 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{path.number}</span>
                <span className="h-px w-8 bg-secondary" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{path.eyebrow}</span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">{path.title}</h3>
              <p className="mb-8 leading-relaxed text-muted-foreground">{path.body}</p>
              <Button className="mt-auto w-fit" asChild>
                <Link to={`/contact-us?type=${path.type}#inquiry`}>{path.cta}<ArrowRight size={16} /></Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section-light py-16 md:py-24">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Complete manufacturing support</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Everything You Need to Move From Formula to Market.</h2>
          <p className="leading-relaxed text-muted-foreground">Advanced quality systems mean more when they are backed by complete manufacturing capabilities. NuEra supports clients across product development, manufacturing, packaging and regulatory requirements.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link key={service.title} to={service.path} className="group overflow-hidden rounded-lg bg-card shadow-sm transition-shadow hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={service.image} alt={service.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-lg font-bold text-foreground transition-colors group-hover:text-primary">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{service.body}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore service <ArrowRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Certification is the foundation.</p>
        <h2 className="mb-5 text-3xl font-bold text-foreground md:text-4xl">Our Daily Standard Is What Builds On It.</h2>
        <p className="mx-auto mb-12 max-w-3xl leading-relaxed text-muted-foreground">Licensing and GMP requirements establish the regulatory foundation. NuEra’s differentiation comes from how procedures, testing, documentation and process control are applied throughout day-to-day manufacturing.</p>
        <div className="grid grid-cols-2 items-center justify-items-center gap-x-7 gap-y-8 sm:grid-cols-4 lg:grid-cols-8 lg:gap-x-8">
          {certIcons.map((cert) => <img key={cert.alt} src={cert.src} alt={cert.alt} loading="lazy" className="h-16 w-full max-w-28 object-contain md:h-20" />)}
        </div>
      </div>
    </section>

    <section className="hero-gradient py-16 md:py-24">
      <div className="container text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-secondary">Let’s look at your product differently</p>
        <h2 className="mb-5 text-3xl font-bold text-primary-foreground md:text-4xl">Ready to Raise Your Manufacturing Standard?</h2>
        <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-primary-foreground/80">Whether you are developing a new formulation or evaluating an existing product, speak with NuEra about manufacturing, quality control, testing, documentation and compliance.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="hero" size="lg" asChild><Link to="/contact-us?type=general">Schedule a Quality &amp; Technical Consultation</Link></Button>
          <Button variant="heroOutline" size="lg" asChild><Link to="/contact-us?type=new-product">Start a New Product</Link></Button>
        </div>
        <Link to="/contact-us?type=product-assessment#inquiry" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary-foreground underline underline-offset-4">Request a Product Assessment <ArrowRight size={14} /></Link>
      </div>
    </section>
  </>
  );
};

export default Index;