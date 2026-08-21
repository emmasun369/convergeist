import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardPenLine, LockKeyhole } from "lucide-react";
import { toast } from "sonner";

type BriefData = {
  name: string;
  email: string;
  travelWindow: string;
  city: string;
  focus: string;
  stage: string;
  notes: string;
};

const initialBrief: BriefData = { name: "", email: "", travelWindow: "", city: "", focus: "", stage: "", notes: "" };

const stepMeta = [
  { label: "Your visit", hint: "When, where, and who is coming?" },
  { label: "The work", hint: "What needs attention on the ground?" },
  { label: "The handoff", hint: "What should keep moving once you leave?" },
];

export default function BusinessBriefForm() {
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState<BriefData>(initialBrief);
  const [errors, setErrors] = useState<Partial<Record<keyof BriefData, string>>>({});
  const [sent, setSent] = useState(false);

  const update = (field: keyof BriefData, value: string) => {
    setBrief((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof BriefData, string>> = {};
    if (step === 1) {
      if (!brief.name.trim()) nextErrors.name = "Tell us who is travelling.";
      if (!brief.email.trim() || !/^\S+@\S+\.\S+$/.test(brief.email)) nextErrors.email = "Add a valid work email.";
      if (!brief.travelWindow) nextErrors.travelWindow = "Choose a travel window.";
    }
    if (step === 2) {
      if (!brief.city) nextErrors.city = "Choose a first sourcing hub.";
      if (!brief.focus) nextErrors.focus = "Choose the work that matters most.";
    }
    if (step === 3 && !brief.stage) nextErrors.stage = "Choose the shipping or follow-up stage.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (validate()) setStep((current) => Math.min(current + 1, 3));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setSent(true);
    toast.success("Your business brief is prepared.", { description: "Connect an intake destination to route the details to your team." });
  };

  if (sent) {
    return <div className="brief-sent-card"><span className="brief-sent-icon"><CheckCircle2 size={24} /></span><p className="kicker">Route note prepared</p><h3>Your first business route is taking shape.</h3><p>This front-end intake has prepared your brief. Connect your preferred email or CRM destination to receive completed submissions.</p><button type="button" className="button-dark" onClick={() => { setSent(false); setStep(1); setBrief(initialBrief); }}>Prepare another brief <ArrowRight size={16} /></button></div>;
  }

  return (
    <form className="business-brief-form" onSubmit={submit} noValidate>
      <div className="brief-form-top"><div><p className="kicker">A short route note is enough to start</p><h3>{stepMeta[step - 1].label}</h3><p>{stepMeta[step - 1].hint}</p></div><ClipboardPenLine size={23} /></div>
      <div className="brief-progress" aria-label={`Step ${step} of 3`}>
        {stepMeta.map((item, index) => <span key={item.label} className={index + 1 === step ? "brief-progress--active" : index + 1 < step ? "brief-progress--complete" : ""}><b>0{index + 1}</b><i /></span>)}
      </div>
      {step === 1 && <div className="brief-fields">
        <label>Full name<input value={brief.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
        <label>Work email<input type="email" value={brief.email} onChange={(event) => update("email", event.target.value)} placeholder="you@company.com" aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email}</small>}</label>
        <label>Travel window<select value={brief.travelWindow} onChange={(event) => update("travelWindow", event.target.value)} aria-invalid={Boolean(errors.travelWindow)}><option value="">Choose a window</option><option value="next-30">Within 30 days</option><option value="next-90">Within 90 days</option><option value="planning">Still planning</option></select>{errors.travelWindow && <small>{errors.travelWindow}</small>}</label>
      </div>}
      {step === 2 && <div className="brief-fields">
        <label>First sourcing hub<select value={brief.city} onChange={(event) => update("city", event.target.value)} aria-invalid={Boolean(errors.city)}><option value="">Choose a city</option><option value="Shenzhen">Shenzhen / Greater Bay Area</option><option value="Guangzhou">Guangzhou</option><option value="Yiwu">Yiwu</option><option value="Shanghai">Shanghai</option><option value="Other">Another route</option></select>{errors.city && <small>{errors.city}</small>}</label>
        <fieldset><legend>Primary focus</legend><div className="brief-choice-grid">{["Supplier visits", "Product review", "Trade show route", "Shipping handoff"].map((item) => <label key={item} className={brief.focus === item ? "brief-choice--selected" : ""}><input type="radio" name="focus" value={item} checked={brief.focus === item} onChange={(event) => update("focus", event.target.value)} />{item}</label>)}</div>{errors.focus && <small>{errors.focus}</small>}</fieldset>
      </div>}
      {step === 3 && <div className="brief-fields">
        <fieldset><legend>Shipping or follow-up stage</legend><div className="brief-choice-grid">{["Exploring options", "Samples in motion", "Production planning", "Ready for handoff"].map((item) => <label key={item} className={brief.stage === item ? "brief-choice--selected" : ""}><input type="radio" name="stage" value={item} checked={brief.stage === item} onChange={(event) => update("stage", event.target.value)} />{item}</label>)}</div>{errors.stage && <small>{errors.stage}</small>}</fieldset>
        <label>Anything we should know? <span>Optional</span><textarea value={brief.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Product category, people you plan to meet, or the question you most need answered." rows={4} /></label>
      </div>}
      <div className="brief-form-bottom"><div className="brief-privacy"><LockKeyhole size={14} /><span>This prototype keeps your route note in this browser only.</span></div><div className="brief-actions">{step > 1 && <button type="button" className="brief-back" onClick={() => setStep((current) => current - 1)}><ArrowLeft size={15} /> Back</button>}{step < 3 ? <button type="button" className="button-dark" onClick={next}>Continue <ArrowRight size={16} /></button> : <button type="submit" className="button-dark">Prepare brief <ArrowRight size={16} /></button>}</div></div>
    </form>
  );
}
