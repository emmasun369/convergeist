import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardPenLine, LockKeyhole, Mail, Route } from "lucide-react";
import { toast } from "sonner";

type BriefData = { name: string; email: string; travelWindow: string; city: string; focus: string; stage: string; notes: string; };
const initialBrief: BriefData = { name: "", email: "", travelWindow: "", city: "", focus: "", stage: "", notes: "" };
const stepMeta = [{ label: "Your visit", hint: "When, where, and who is coming?" }, { label: "The work", hint: "What needs attention on the ground?" }, { label: "The handoff", hint: "What should keep moving once you leave?" }];

export default function BusinessBriefForm() {
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState<BriefData>(initialBrief);
  const [errors, setErrors] = useState<Partial<Record<keyof BriefData, string>>>({});
  const [sent, setSent] = useState(false);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { if (step > 1) stepHeadingRef.current?.focus(); }, [step]);
  const update = (field: keyof BriefData, value: string) => { setBrief((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })); };
  const validate = () => {
    const nextErrors: Partial<Record<keyof BriefData, string>> = {};
    if (step === 1) { if (!brief.name.trim()) nextErrors.name = "Tell us who is travelling."; if (!brief.email.trim() || !/^\S+@\S+\.\S+$/.test(brief.email)) nextErrors.email = "Add a valid work email."; if (!brief.travelWindow) nextErrors.travelWindow = "Choose a travel window."; }
    if (step === 2) { if (!brief.city) nextErrors.city = "Choose a first sourcing hub."; if (!brief.focus) nextErrors.focus = "Choose the work that matters most."; }
    if (step === 3 && !brief.stage) nextErrors.stage = "Choose the shipping or follow-up stage.";
    setErrors(nextErrors); return Object.keys(nextErrors).length === 0;
  };
  const next = () => { if (validate()) setStep((current) => Math.min(current + 1, 3)); };
  const mailto = `mailto:success@airweber.tech?subject=${encodeURIComponent("Business visit route note")}&body=${encodeURIComponent(`Name: ${brief.name}\nTravel window: ${brief.travelWindow}\nStarting hub: ${brief.city}\nFocus: ${brief.focus}\nHandoff stage: ${brief.stage}\nNotes: ${brief.notes || "—"}`)}`;
  const submit = (event: FormEvent) => { event.preventDefault(); if (!validate()) return; setSent(true); toast.success("Your business brief is ready to send.", { description: "Review the route note, then email it to the ConvergeIST team." }); };
  const summary = [brief.travelWindow, brief.city, brief.focus, brief.stage].filter(Boolean).join(" · ");

  if (sent) return <div className="brief-sent-card" role="status" aria-live="polite"><span className="brief-sent-icon"><CheckCircle2 size={24} /></span><p className="kicker">Route note prepared</p><h3 tabIndex={-1} ref={stepHeadingRef}>Your first business route is taking shape.</h3><p>Your route note is held locally until you choose to email it. The summary below is ready for a real, useful first conversation.</p><div className="brief-route-summary"><Route size={15} /><div><strong>Prepared route</strong>{summary || "Your visit, work, and handoff details"}</div></div><a href={mailto} className="brief-sent-contact"><Mail size={16} /> Email this route note</a><button type="button" className="button-dark" onClick={() => { setSent(false); setStep(1); setBrief(initialBrief); }}>Prepare another brief <ArrowRight size={16} /></button></div>;

  return <form className="business-brief-form" onSubmit={submit} noValidate>
    <div className="brief-form-top"><div><p className="kicker">A short route note is enough to start</p><h3 tabIndex={-1} ref={stepHeadingRef}>{stepMeta[step - 1].label}</h3><p>{stepMeta[step - 1].hint}</p></div><ClipboardPenLine size={23} /></div>
    <div className="brief-progress" aria-label={`Step ${step} of 3`}>{stepMeta.map((item, index) => <span key={item.label} className={index + 1 === step ? "brief-progress--active" : index + 1 < step ? "brief-progress--complete" : ""}><b>0{index + 1}</b><i /></span>)}</div>
    {summary && <div className="brief-route-summary" aria-live="polite"><Route size={15} /><div><strong>Route so far</strong>{summary}</div></div>}
    {step === 1 && <div className="brief-fields"><label>Full name<input value={brief.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" autoComplete="name" aria-invalid={Boolean(errors.name)} />{errors.name && <small role="alert">{errors.name}</small>}</label><label>Work email<input type="email" value={brief.email} onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" autoComplete="email" aria-invalid={Boolean(errors.email)} />{errors.email && <small role="alert">{errors.email}</small>}</label><label>Travel window<select value={brief.travelWindow} onChange={(event) => update("travelWindow", event.target.value)} aria-invalid={Boolean(errors.travelWindow)}><option value="">Choose a window</option><option value="next-30">Within 30 days</option><option value="next-90">Within 90 days</option><option value="planning">Still planning</option></select>{errors.travelWindow && <small role="alert">{errors.travelWindow}</small>}</label></div>}
    {step === 2 && <div className="brief-fields"><label>First sourcing hub<select value={brief.city} onChange={(event) => update("city", event.target.value)} aria-invalid={Boolean(errors.city)}><option value="">Choose a city</option><option value="Shenzhen">Shenzhen / Greater Bay Area</option><option value="Guangzhou">Guangzhou</option><option value="Yiwu">Yiwu</option><option value="Shanghai">Shanghai</option><option value="Other">Another route</option></select>{errors.city && <small role="alert">{errors.city}</small>}</label><fieldset><legend>Primary focus</legend><div className="brief-choice-grid">{["Supplier visits", "Product review", "Trade show route", "Shipping handoff"].map((item) => <label key={item} className={brief.focus === item ? "brief-choice--selected" : ""}><input type="radio" name="focus" value={item} checked={brief.focus === item} onChange={(event) => update("focus", event.target.value)} />{item}</label>)}</div>{errors.focus && <small role="alert">{errors.focus}</small>}</fieldset></div>}
    {step === 3 && <div className="brief-fields"><fieldset><legend>Shipping or follow-up stage</legend><div className="brief-choice-grid">{["Exploring options", "Samples in motion", "Production planning", "Ready for handoff"].map((item) => <label key={item} className={brief.stage === item ? "brief-choice--selected" : ""}><input type="radio" name="stage" value={item} checked={brief.stage === item} onChange={(event) => update("stage", event.target.value)} />{item}</label>)}</div>{errors.stage && <small role="alert">{errors.stage}</small>}</fieldset><label>Anything we should know? <span>Optional</span><textarea value={brief.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Product category, people you plan to meet, or the question you most need answered." rows={4} /></label></div>}
    <div className="brief-form-bottom"><div><p className="brief-response-note"><strong>What happens next:</strong> your note becomes an email-ready route summary for the ConvergeIST team.</p><div className="brief-privacy"><LockKeyhole size={14} /><span>This static form keeps your route note in this browser until you choose email.</span></div></div><div className="brief-actions">{step > 1 && <button type="button" className="brief-back" onClick={() => setStep((current) => current - 1)}><ArrowLeft size={15} /> Back</button>}{step < 3 ? <button type="button" className="button-dark" onClick={next}>Continue <ArrowRight size={16} /></button> : <button type="submit" className="button-dark">Prepare email-ready brief <ArrowRight size={16} /></button>}</div></div>
  </form>;
}
