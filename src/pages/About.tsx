import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/LocaleProvider";
import { fmt } from "@/i18n/dictionaries";
import { Building, Award, Users, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import servicesHome3 from "@/assets/services-home-3.jpg";
import about3 from "@/assets/about-3.jpg";
import about4 from "@/assets/about-4.jpg";
import about5 from "@/assets/about-5.jpg";
import receptionArea from "@/assets/nuera-nutraceutical-reception-area.webp";
import officeBuilding from "@/assets/nuera-nutraceutical-office-building.webp";

const milestoneYears = ["2008", "2010", "2013", "2016", "2019", "2022", "2025", "2026"];
const slideshowImages = [about5, receptionArea, about3, officeBuilding, about4];
const valueIcons = [
  <Award className="text-accent" size={32} />,
  <Users className="text-accent" size={32} />,
  <Building className="text-accent" size={32} />,
  <Calendar className="text-accent" size={32} />,
];

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, lp } = useLocale();
  const a = t.about;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={servicesHome3} alt={a.heroAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">{a.title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            {a.tagline}
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">{a.whoTitle}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {a.who.map((para) => <p key={para}>{para}</p>)}
              </div>
            </div>
            <div>
              <img alt={a.buildingAlt} className="rounded-lg shadow-lg w-full object-cover" src={officeBuilding} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 section-light">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">{a.valuesTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {a.values.map((v, vi) => (
              <div key={v.title} className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">{valueIcons[vi]}</div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">{a.journeyTitle}</h2>
          <div className="max-w-3xl mx-auto">
            {milestoneYears.map((year, i) => (
              <div key={year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {year}
                  </div>
                  {i < milestoneYears.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
                </div>
                <div className="pt-3 pb-4">
                  <p className="text-foreground leading-relaxed">{a.milestones[i]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility */}
      <section id="facility" className="py-16 md:py-24 section-light">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-6">{a.facilityTitle}</h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
            {a.facilityBody}
          </p>

          {/* Slideshow */}
          <div className="relative mb-12 rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-[16/9] relative">
              {slideshowImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={a.slideAlts[index]}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full p-2 transition-colors z-10"
                aria-label={a.prevSlide}
              >
                <ChevronLeft size={24} className="text-foreground" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full p-2 transition-colors z-10"
                aria-label={a.nextSlide}
              >
                <ChevronRight size={24} className="text-foreground" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slideshowImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-primary" : "bg-background/60"
                    }`}
                    aria-label={fmt(a.goToSlide, { n: index + 1 })}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Equipment Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {a.stats.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-lg p-5">
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 hero-gradient text-center">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">{a.ctaTitle}</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            {a.ctaBody}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to={lp("/contact-us?type=manufacturing")}>{a.quote}</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to={lp("/contact-us?type=general")}>{a.consult}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
