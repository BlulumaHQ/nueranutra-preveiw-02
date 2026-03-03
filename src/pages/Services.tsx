import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pill, FlaskConical, Package, ShieldCheck } from "lucide-react";
import servicesHome3 from "@/assets/services-home-3.jpg";
import servicesHome1 from "@/assets/services-home-1.jpg";
import servicesHome2 from "@/assets/services-home-2.jpg";
import servicesHome4 from "@/assets/services-home-4.jpg";

const REGULATORY_TEXT = `Navigating regulatory requirements in the nutraceutical industry requires precision, documentation discipline, and current knowledge of domestic and international standards. Our Regulatory & Compliance team supports Health Canada NPN applications, U.S. FDA facility alignment, ingredient verification, label compliance review, and permissible health claim guidance. We assist in preparing Master Manufacturing Records, Certificates of Analysis, stability documentation, and export documentation to ensure products meet all required frameworks. From pre-launch evaluation to ongoing compliance oversight, we reduce regulatory risk and accelerate market entry.`;

const services = [
  {
    id: "turnkey-manufacturing",
    title: "Turnkey Manufacturing Solutions",
    body: "End-to-end support from concept to commercialization. Capsule filling, tablet pressing, and powder blending under GMP-compliant processes built for quality, scalability, and speed.",
    icon: <Pill className="text-accent" size={40} />,
    img: servicesHome3,
  },
  {
    id: "formulation-development",
    title: "Formulation & Development Support",
    body: "R&D support to create performance-driven formulas—ingredient sourcing, optimization, and manufacturability guidance to turn ideas into market-ready products.",
    icon: <FlaskConical className="text-accent" size={40} />,
    img: servicesHome1,
  },
  {
    id: "custom-packaging",
    title: "Custom Packaging Services",
    body: "Packaging formats, labeling coordination, and execution across bottles, blister, sachet, and stick-pak solutions—designed for retail readiness and operational efficiency.",
    icon: <Package className="text-accent" size={40} />,
    img: servicesHome2,
  },
  {
    id: "regulatory-compliance",
    title: "Regulatory & Compliance Guidance",
    body: REGULATORY_TEXT,
    icon: <ShieldCheck className="text-accent" size={40} />,
    img: servicesHome4,
  },
];

const processSteps = [
  { step: "01", title: "Discover", desc: "Understanding your product vision, target market, and regulatory requirements." },
  { step: "02", title: "Formulate", desc: "Developing and optimizing your formula for efficacy and manufacturability." },
  { step: "03", title: "Manufacture", desc: "GMP-compliant production with rigorous quality controls at every stage." },
  { step: "04", title: "Package", desc: "Professional packaging solutions tailored to your brand and market needs." },
  { step: "05", title: "Documentation", desc: "Complete regulatory documentation including COAs, MMRs, and compliance records." },
  { step: "06", title: "Ship & Export", desc: "Logistics coordination with export-ready documentation for global distribution." },
];

const Services = () => {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={servicesHome3} alt="Capsule Manufacturing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">Our Services</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Comprehensive nutraceutical manufacturing solutions from concept to commercialization.
          </p>
        </div>
      </section>

      {/* Service Rows */}
      {services.map((svc, i) => (
        <section key={svc.id} id={svc.id} className={`py-16 md:py-24 ${i % 2 === 0 ? "section-light" : ""}`}>
          <div className="container">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "md:[direction:rtl]" : ""}`}>
              <div className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}>
                <div className="mb-4">{svc.icon}</div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">{svc.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{svc.body}</p>
                <Button asChild>
                  <Link to="/contact?type=quote">Get Started <ArrowRight size={16} /></Link>
                </Button>
              </div>
              <div className={i % 2 !== 0 ? "md:[direction:ltr]" : ""}>
                <div className="aspect-[16/10] overflow-hidden rounded-lg shadow-lg">
                  <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">Our Process</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              A structured pathway from concept to commercialization, designed for speed and compliance.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <div key={step.step} className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-6">
                <span className="text-3xl font-bold text-secondary font-sans">{step.step}</span>
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
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Partner with NuEra for precision manufacturing, regulatory confidence, and scalable growth.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/contact?type=quote">Request a Quote</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact?type=consultation">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
