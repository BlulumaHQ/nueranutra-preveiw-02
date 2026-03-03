import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building, Award, Users, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import servicesHome3 from "@/assets/services-home-3.jpg";
import about1 from "@/assets/about-1.jpg";
import about3 from "@/assets/about-3.jpg";
import about4 from "@/assets/about-4.jpg";
import about5 from "@/assets/about-5.jpg";
import reception from "@/assets/reception.jpg";

const milestones = [
  { year: "2007", event: "NuEra Nutraceuticals Inc. founded in Richmond, BC, Canada." },
  { year: "2010", event: "Achieved GMP certification and expanded encapsulation capacity." },
  { year: "2013", event: "Added tableting lines and pharmaceutical-grade coating capabilities." },
  { year: "2016", event: "Expanded facility to 30,000 sq. ft. with automated bottling lines." },
  { year: "2019", event: "Obtained USDA Organic, Halal, and additional GMP certifications." },
  { year: "2022", event: "Upgraded to 5 high-speed encapsulation lines and added sachet/blister packaging." },
  { year: "2025", event: "Continuing to serve startup and global brands with precision manufacturing." },
];

const facilityStats = [
  { label: "Facility Size", value: "30,000 sq. ft." },
  { label: "Encapsulation Lines", value: "5 High-Speed" },
  { label: "Tabletting Lines", value: "3 Lines" },
  { label: "Coating Drum", value: "1 Pharma-Grade" },
  { label: "Powder Blenders", value: "3 (Various Capacities)" },
  { label: "Bottling Lines", value: "2 Automated" },
  { label: "Sachet Filling", value: "1 High-Speed Line" },
  { label: "Blister Packaging", value: "2 High-Speed Lines" },
];

const slideshowImages = [
  { src: about5, alt: "NuEra manufacturing floor" },
  { src: reception, alt: "NuEra reception area" },
  { src: about3, alt: "NuEra production equipment" },
  { src: about1, alt: "NuEra facility interior" },
  { src: about4, alt: "NuEra packaging area" },
];

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
          <img src={servicesHome3} alt="About NuEra" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">About Us</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Proudly Canadian. Built on trust, quality, and innovation since 2007.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Who We Are</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  NuEra Nutraceuticals Inc. is a proudly Canadian nutraceutical contract manufacturer headquartered in Richmond, British Columbia. Since our founding in 2007, we have been committed to delivering GMP-compliant manufacturing solutions that combine technical precision with responsive, partnership-driven service.
                </p>
                <p>
                  We serve a diverse portfolio of clients—from startup supplement brands launching their first product to established global companies scaling production. Our approach is built on transparency, regulatory confidence, and the pursuit of manufacturing excellence.
                </p>
                <p>
                  Our team brings deep expertise in formulation development, encapsulation, tableting, powder blending, packaging, and regulatory compliance. Every product that leaves our facility is backed by documented quality controls, rigorous testing protocols, and a commitment to brand integrity.
                </p>
              </div>
            </div>
            <div>
              <img alt="NuEra Facility" className="rounded-lg shadow-lg w-full" src="/lovable-uploads/0ac9be96-af4f-4e51-9bf2-dd2784b8de23.jpg" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 section-light">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Award className="text-accent" size={32} />, title: "Quality", desc: "Documented quality control at every stage of production." },
              { icon: <Users className="text-accent" size={32} />, title: "Partnership", desc: "Responsive, transparent service built on trust." },
              { icon: <Building className="text-accent" size={32} />, title: "Innovation", desc: "Continuous improvement in processes and capabilities." },
              { icon: <Calendar className="text-accent" size={32} />, title: "Compliance", desc: "Regulatory confidence for domestic and international markets." },
            ].map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">{v.icon}</div>
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
          <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {m.year}
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
                </div>
                <div className="pt-3 pb-4">
                  <p className="text-foreground leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility */}
      <section id="facility" className="py-16 md:py-24 section-light">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Our Facility</h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
            Our 30,000 sq. ft. manufacturing facility in Richmond, BC is equipped with state-of-the-art machinery for high-volume, GMP-compliant production across multiple dosage formats.
          </p>

          {/* Slideshow */}
          <div className="relative mb-12 rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-[16/9] relative">
              {slideshowImages.map((img, index) => (
                <img
                  key={index}
                  src={img.src}
                  alt={img.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full p-2 transition-colors z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} className="text-foreground" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full p-2 transition-colors z-10"
                aria-label="Next slide"
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
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Equipment Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {facilityStats.map((stat) => (
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
          <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">Partner With Us</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Discover how NuEra can support your product from concept to commercialization.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact?type=quote">Request a Quote</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact?type=consultation">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
