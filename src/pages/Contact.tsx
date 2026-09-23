import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import servicesHome3 from "@/assets/services-home-3.jpg";
import { useLocale } from "@/i18n/LocaleProvider";

const inquiryTypes = [
  { value: "new-product", label: "New Product Development" },
  { value: "product-assessment", label: "Existing Product Assessment" },
  { value: "manufacturing", label: "Manufacturing Services" },
  { value: "regulatory", label: "Regulatory & Compliance" },
  { value: "general", label: "General Inquiry" },
];

const productTypes = ["Capsule", "Tablet", "Powder", "Softgel (Outsourced)", "Other"];
const productStatuses = [
  "Currently in Market",
  "Currently in Production",
  "Formulated but Not Yet Manufactured",
  "Being Reformulated",
  "Considering Manufacturer Transfer",
  "Other",
];
const npnStatuses = ["Approved NPN", "NPN Application in Progress", "No NPN Yet", "Not Sure", "Not Applicable"];
const manufacturingSituations = [
  "Currently Manufactured by Another Manufacturer",
  "Currently Manufactured by NuEra",
  "Not Yet in Production",
  "Looking for a New Manufacturer",
  "Other",
];
const assessmentReasons = [
  "Manufacturing Consistency",
  "Quality Control",
  "Testing Requirements",
  "Formulation Review",
  "Stability",
  "Regulatory Requirements",
  "Packaging",
  "Manufacturing Transfer",
  "Scaling Production",
  "General Consultation",
  "Other",
];
const volumes = ["Under 5,000 units", "5,000–25,000 units", "25,001–100,000 units", "Over 100,000 units", "Not Sure Yet"];
const developmentStages = [
  "Idea / Concept",
  "Formula Development",
  "Existing Formula",
  "Ready for Manufacturing",
  "Manufacturer Transfer",
  "Not Sure",
];

const NETLIFY_FORM_NAME = "contact-inquiry";

const fieldClass =
  "w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";
const labelClass = "block text-sm font-medium text-foreground mb-1.5";

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  inquiryType: "general",
  productName: "",
  productType: "",
  productStatus: "",
  npnStatus: "",
  manufacturingSituation: "",
  assessmentReason: "",
  developmentStage: "",
  estimatedVolume: "",
  message: "",
};

const Select = ({
  label,
  value,
  options,
  labels,
  placeholder,
  onChange,
  required,
  name,
}: {
  label: string;
  value: string;
  options: string[];
  labels: string[];
  placeholder: string;
  onChange: (v: string) => void;
  required?: boolean;
  name: string;
}) => (
  <div>
    <label className={labelClass}>{label}{required ? " *" : ""}</label>
    <select name={name} required={required} value={value} onChange={(e) => onChange(e.target.value)} className={fieldClass}>
      <option value="">{placeholder}</option>
      {options.map((o, i) => (
        <option key={o} value={o}>{labels[i] ?? o}</option>
      ))}
    </select>
  </div>
);

const Contact = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitError, setSubmitError] = useState(false);
  const [botField, setBotField] = useState("");
  const { t, locale } = useLocale();
  const c = t.contact;
  const sel = { placeholder: c.pleaseSelect };

  useEffect(() => {
    const type = searchParams.get("type");
    const subject = searchParams.get("subject");
    if (type && inquiryTypes.find((t) => t.value === type)) {
      setForm((f) => ({ ...f, inquiryType: type }));
    }
    if (subject) {
      setForm((f) => ({ ...f, message: subject }));
    }
  }, [searchParams]);

  const set = (patch: Partial<typeof emptyForm>) => setForm((f) => ({ ...f, ...patch }));

  const isAssessment = form.inquiryType === "product-assessment";
  const isNewProduct = form.inquiryType === "new-product";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);
    const data: Record<string, string> = {
      "form-name": NETLIFY_FORM_NAME,
      "bot-field": botField,
      locale: locale.code,
      inquiry_type: inquiryTypes.find((t) => t.value === form.inquiryType)?.label ?? form.inquiryType,
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      product_name: isAssessment ? form.productName.trim() : "",
      product_type: isAssessment || isNewProduct ? form.productType : "",
      product_status: isAssessment ? form.productStatus : "",
      npn_status: isAssessment ? form.npnStatus : "",
      manufacturing_situation: isAssessment ? form.manufacturingSituation : "",
      assessment_reason: isAssessment ? form.assessmentReason : "",
      development_stage: isNewProduct ? form.developmentStage : "",
      estimated_volume: isAssessment || isNewProduct ? form.estimatedVolume : "",
      message: form.message.trim(),
    };
    let error = false;
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) error = true;
    } catch {
      error = true;
    }
    setSubmitting(false);

    if (error) {
      setSubmitError(true);
      toast({
        title: c.toastFailTitle,
        description: c.submitError,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: c.toastOkTitle,
      description: c.toastOkBody,
    });
    setForm({ ...emptyForm, inquiryType: form.inquiryType });
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={servicesHome3} alt={c.heroAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">{c.title}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            {c.subtitle}
          </p>
        </div>
      </section>

      <section id="inquiry" className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">{c.getInTouch}</h2>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <Phone size={20} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{c.phone}</p>
                      <a href="tel:+16042718868" className="text-muted-foreground hover:text-primary transition-colors">+1 (604) 271-8868</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail size={20} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{c.email}</p>
                      <a href="mailto:enquiry@nueranutra.com" className="text-muted-foreground hover:text-primary transition-colors">enquiry@nueranutra.com</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={20} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{c.address}</p>
                      <p className="text-muted-foreground">{t.address}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={20} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{c.hours}</p>
                      <p className="text-muted-foreground">{c.hoursWeek}</p>
                      <p className="text-muted-foreground">{c.hoursWeekend}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-serif font-bold text-foreground mb-6">{c.formTitle}</h3>
                <form
                  name={NETLIFY_FORM_NAME}
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
                  <input type="hidden" name="locale" value={locale.code} />
                  <p
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
                  >
                    <label>
                      {c.honeypot}
                      <input name="bot-field" tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />
                    </label>
                  </p>
                  <div>
                    <label className={labelClass}>{c.inquiryType} *</label>
                    <select
                      name="inquiry_type"
                      value={form.inquiryType}
                      onChange={(e) => set({ inquiryType: e.target.value })}
                      className={fieldClass}
                    >
                      {inquiryTypes.map((it, i) => (
                        <option key={it.value} value={it.value}>{c.inquiryTypes[i]}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>{c.fullName} *</label>
                      <input type="text" required name="name" value={form.name} onChange={(e) => set({ name: e.target.value })} className={fieldClass} />
                    </div>
                    <div>
                      <label className={labelClass}>{c.company} *</label>
                      <input type="text" required name="company" value={form.company} onChange={(e) => set({ company: e.target.value })} className={fieldClass} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>{c.emailLabel} *</label>
                      <input type="email" required name="email" value={form.email} onChange={(e) => set({ email: e.target.value })} className={fieldClass} />
                    </div>
                    <div>
                      <label className={labelClass}>{c.phoneLabel}{isAssessment || isNewProduct ? "" : c.optional}</label>
                      <input type="tel" name="phone" value={form.phone} onChange={(e) => set({ phone: e.target.value })} className={fieldClass} />
                    </div>
                  </div>

                  {isAssessment && (
                    <div className="space-y-5 border-t border-border pt-5">
                      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{c.assessmentHeading}</p>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClass}>{c.productName} *</label>
                          <input type="text" required name="product_name" value={form.productName} onChange={(e) => set({ productName: e.target.value })} className={fieldClass} />
                        </div>
                        <Select required name="product_type" {...sel} labels={c.productTypes} label={c.productType} value={form.productType} options={productTypes} onChange={(v) => set({ productType: v })} />
                        <Select required name="product_status" {...sel} labels={c.productStatuses} label={c.productStatus} value={form.productStatus} options={productStatuses} onChange={(v) => set({ productStatus: v })} />
                        <Select required name="npn_status" {...sel} labels={c.npnStatuses} label={c.npnStatus} value={form.npnStatus} options={npnStatuses} onChange={(v) => set({ npnStatus: v })} />
                        <Select required name="manufacturing_situation" {...sel} labels={c.manufacturingSituations} label={c.manufacturingSituation} value={form.manufacturingSituation} options={manufacturingSituations} onChange={(v) => set({ manufacturingSituation: v })} />
                        <Select required name="assessment_reason" {...sel} labels={c.assessmentReasons} label={c.assessmentReason} value={form.assessmentReason} options={assessmentReasons} onChange={(v) => set({ assessmentReason: v })} />
                        <Select required name="estimated_volume" {...sel} labels={c.volumes} label={c.estimatedVolume} value={form.estimatedVolume} options={volumes} onChange={(v) => set({ estimatedVolume: v })} />
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {c.confidentiality}
                      </p>
                    </div>
                  )}

                  {isNewProduct && (
                    <div className="space-y-5 border-t border-border pt-5">
                      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{c.newProductHeading}</p>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Select required name="product_type" {...sel} labels={c.productTypes} label={c.productType} value={form.productType} options={productTypes} onChange={(v) => set({ productType: v })} />
                        <Select required name="development_stage" {...sel} labels={c.developmentStages} label={c.developmentStage} value={form.developmentStage} options={developmentStages} onChange={(v) => set({ developmentStage: v })} />
                        <Select required name="estimated_volume" {...sel} labels={c.volumes} label={c.estimatedVolume} value={form.estimatedVolume} options={volumes} onChange={(v) => set({ estimatedVolume: v })} />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className={labelClass}>
                      {isAssessment ? c.additionalDetails : isNewProduct ? c.projectDetails : c.message} *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => set({ message: e.target.value })}
                      className={`${fieldClass} resize-none`}
                    />
                  </div>
                  {submitError && (
                    <p role="alert" className="text-sm text-destructive">
                      {c.submitError}
                    </p>
                  )}
                  <Button type="submit" size="lg" disabled={submitting}>
                    {submitting ? c.sending : c.send}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
