import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pill, FlaskConical, Package, ShieldCheck } from "lucide-react";
import servicesHome3 from "@/assets/services-home-3.jpg";
import servicesHome1 from "@/assets/services-home-1.jpg";
import servicesHome2 from "@/assets/services-home-2.jpg";
import servicesHome4 from "@/assets/services-home-4.jpg";
import { useLocale } from "@/i18n/LocaleProvider";

const services = [
  { id: "turnkey-manufacturing", key: "turnkey", icon: <Pill className="text-accent" size={40} />, img: servicesHome3 },
  { id: "formulation-development", key: "formulation", icon: <FlaskConical className="text-accent" size={40} />, img: servicesHome1 },
  { id: "custom-packaging", key: "packaging", icon: <Package className="text-accent" size={40} />, img: servicesHome2 },
  { id: "regulatory-compliance", key: "regulatory", icon: <ShieldCheck className="text-accent" size={40} />, img: servicesHome4 },
] as const;

const Services = () => {
  const { t, lp } = useLocale();
  const s = t.services;
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={servicesHome3} alt={s.heroAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">{s.title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">{s.subtitle}</p>
        </div>
      </section>

      {/* Service Rows */}
      {services.map((svc, i) => (
        <section key={svc.id} id={svc.id} className={`py-16 md:py-24 ${i % 2 === 0 ? "section-light" : ""}`}>
          <div className="container">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "md:[direction:rtl]" : ""}`}>
              <div className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}>
                <div className="mb-4">{svc.icon}</div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">{t.serviceNames[svc.key]}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{s.bodies[i]}</p>
                <Button asChild>
                  <Link to={lp("/contact-us?type=manufacturing")}>{s.getStarted} <ArrowRight size={16} /></Link>
                </Button>
              </div>
              <div className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}>
                <div className="aspect-[16/10] overflow-hidden rounded-lg shadow-lg">
                  <img src={svc.img} alt={t.serviceNames[svc.key]} loading={i === 0 ? undefined : "lazy"} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section id="process" className="py-16 md:py-24 hero-gradient">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">{s.processTitle}</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">{s.processIntro}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {s.steps.map((step, i) => (
              <div key={step.title} className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-6">
                <span className="text-3xl font-bold text-secondary font-sans">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xl font-serif font-bold text-primary-foreground mt-2 mb-2">{step.title}</h3>
                <p className="text-primary-foreground/80 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 text-center">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">{s.ctaTitle}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">{s.ctaBody}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to={lp("/contact-us?type=manufacturing")}>{s.quote}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to={lp("/contact-us?type=general")}>{s.consult}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
