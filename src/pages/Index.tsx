import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/LocaleProvider";
import { fmt } from "@/i18n/dictionaries";

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
  { src: heroSupplementPackaging, position: "object-center" },
  { src: heroProductionMachinery, position: "object-center" },
  { src: about5, position: "object-center" },
];

const serviceMeta = [
  { key: "turnkey", image: servicesHome3, path: "/our-services#turnkey-manufacturing" },
  { key: "formulation", image: servicesHome1, path: "/our-services#formulation-development" },
  { key: "packaging", image: servicesHome2, path: "/our-services#custom-packaging" },
  { key: "regulatory", image: servicesHome4, path: "/our-services#regulatory-compliance" },
] as const;

const certSrcs = [gmpRed, cgmp, usdaOrganic, halal, gmpGreen, healthCanada, fda, kosherLogo];
const pathTypes = ["new-product", "product-assessment"];

const Index = () => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const { t, lp } = useLocale();
  const h = t.home;

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
            alt={index === currentHeroSlide ? h.slideAlts[index] : ""}
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
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-secondary">{h.eyebrow}</p>
          <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-[3.5rem]">
            {h.title}
          </h1>
          <div className="max-w-2xl space-y-3 text-sm leading-relaxed text-primary-foreground/80 md:text-base">
            <p>{h.body1}</p>
            <p>{h.body2}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to={lp("/contact-us?type=new-product")}>{h.ctaNew}</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to={lp("/contact-us?type=product-assessment#inquiry")}>{h.ctaAssess}</Link>
            </Button>
          </div>
          <p className="mt-8 border-l-2 border-secondary pl-4 text-sm font-semibold leading-relaxed text-primary-foreground">
            {h.tagline1}<br />{h.tagline2}
          </p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-5 z-20">
        <div className="container flex items-center justify-between">
          <div className="flex gap-2" role="tablist" aria-label={h.slidesLabel}>
            {heroSlides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setCurrentHeroSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${
                  index === currentHeroSlide ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground/80"
                }`}
                role="tab"
                aria-selected={index === currentHeroSlide}
                aria-label={fmt(h.showSlide, { n: index + 1 })}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="heroOutline" size="icon" onClick={showPreviousHeroSlide} aria-label={h.prevSlide} className="rounded-full border-primary-foreground/60 bg-primary/20">
              <ChevronLeft />
            </Button>
            <Button type="button" variant="heroOutline" size="icon" onClick={showNextHeroSlide} aria-label={h.nextSlide} className="rounded-full border-primary-foreground/60 bg-primary/20">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">{h.licence.eyebrow}</p>
          <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {h.licence.title1}<br className="hidden md:block" /> {h.licence.title2}
          </h2>
        </div>
        <div>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            {h.licence.intro}
          </p>
          <ul className="divide-y divide-border border-y border-border text-sm font-medium text-foreground md:text-base">
            {h.licence.questions.map((q) => <li key={q} className="py-3">{q}</li>)}
          </ul>
          <p className="mt-6 leading-relaxed text-muted-foreground">{h.licence.outro}</p>
        </div>
      </div>
    </section>

    <section className="relative border-y border-border bg-muted/40 py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-1 bg-secondary" />
      <div className="container">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 inline-flex border-l-4 border-secondary pl-3 text-sm font-bold uppercase tracking-widest text-primary">{h.standard.eyebrow}</p>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{h.standard.title}</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{h.standard.intro}</p>
        </div>
        <div className="space-y-6">
          {h.standard.items.map((item, index) => (
            <article key={item.title} className="overflow-hidden rounded-lg border border-border bg-card shadow-md transition-shadow duration-300 hover:shadow-lg">
              <div className="grid lg:grid-cols-[0.55fr_1fr_1.25fr]">
                <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8">
                  <span className="text-3xl font-bold text-secondary">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-xl font-bold text-foreground">{item.title}</h3>
                </div>
                <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:p-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">{h.standard.baselineLabel}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.baseline}</p>
                </div>
                <div className={`relative border-l-4 border-secondary p-6 lg:p-8 ${index % 2 === 0 ? "bg-primary/[0.06]" : "bg-secondary/[0.12]"}`}>
                  <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-primary">{h.standard.standardLabel}</p>
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
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-secondary">{h.brand.eyebrow}</p>
          <h2 className="mb-6 text-3xl font-bold text-primary-foreground md:text-4xl">{h.brand.title}</h2>
          <div className="space-y-3 leading-relaxed text-primary-foreground/80">
            <p>{h.brand.p1}</p>
            <p>{h.brand.p2}</p>
          </div>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg bg-primary-foreground/20 md:grid-cols-3">
          {h.brand.pillars.map(({ title, body }) => (
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
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{h.journey.title}</h2>
          <p className="leading-relaxed text-muted-foreground">{h.journey.intro}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {h.journey.paths.map((path, pi) => (
            <article key={path.number} className="flex min-h-[320px] flex-col rounded-lg border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-lg md:p-10">
              <div className="mb-8 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{path.number}</span>
                <span className="h-px w-8 bg-secondary" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{path.eyebrow}</span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">{path.title}</h3>
              <p className="mb-8 leading-relaxed text-muted-foreground">{path.body}</p>
              <Button className="mt-auto w-fit" asChild>
                <Link to={lp(`/contact-us?type=${pathTypes[pi]}#inquiry`)}>{path.cta}<ArrowRight size={16} /></Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section-light py-16 md:py-24">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{h.services.eyebrow}</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{h.services.title}</h2>
          <p className="leading-relaxed text-muted-foreground">{h.services.intro}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceMeta.map((service, i) => (
            <Link key={service.key} to={lp(service.path)} className="group overflow-hidden rounded-lg bg-card shadow-sm transition-shadow hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={service.image} alt={t.serviceNames[service.key]} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-lg font-bold text-foreground transition-colors group-hover:text-primary">{t.serviceNames[service.key]}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{h.services.bodies[i]}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">{h.services.explore} <ArrowRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{h.cert.eyebrow}</p>
        <h2 className="mb-5 text-3xl font-bold text-foreground md:text-4xl">{h.cert.title}</h2>
        <p className="mx-auto mb-12 max-w-3xl leading-relaxed text-muted-foreground">{h.cert.body}</p>
        <div className="grid grid-cols-2 items-center justify-items-center gap-x-7 gap-y-8 sm:grid-cols-4 lg:grid-cols-8 lg:gap-x-8">
          {certSrcs.map((src, i) => <img key={src} src={src} alt={h.cert.alts[i]} loading="lazy" className="h-16 w-full max-w-28 object-contain md:h-20" />)}
        </div>
      </div>
    </section>

    <section className="hero-gradient py-16 md:py-24">
      <div className="container text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-secondary">{h.cta.eyebrow}</p>
        <h2 className="mb-5 text-3xl font-bold text-primary-foreground md:text-4xl">{h.cta.title}</h2>
        <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-primary-foreground/80">{h.cta.body}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="hero" size="lg" asChild><Link to={lp("/contact-us?type=general")}>{h.cta.consult}</Link></Button>
          <Button variant="heroOutline" size="lg" asChild><Link to={lp("/contact-us?type=new-product")}>{h.ctaNew}</Link></Button>
        </div>
        <Link to={lp("/contact-us?type=product-assessment#inquiry")} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary-foreground underline underline-offset-4">{h.ctaAssess} <ArrowRight size={14} /></Link>
      </div>
    </section>
  </>
  );
};

export default Index;