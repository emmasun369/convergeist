/**
 * Arrival Notebook design: a focused, low-stress intake route that treats a student's first message as the beginning of a clear plan.
 */
import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronDown, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/SectionLabel";

export default function ArrivalPlan() {
  const [sent, setSent] = useState(false);
  const [channel, setChannel] = useState("WhatsApp");
  const [completion, setCompletion] = useState(0);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
    toast.success("Your arrival note is ready to send.");
  };
  const updateProgress = (event: FormEvent<HTMLFormElement>) => {
    const fields = Array.from(event.currentTarget.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("[data-progress]"));
    const answered = fields.filter((field) => field.value.trim().length > 0).length;
    setCompletion(Math.round((answered / fields.length) * 100));
  };
  return <div className="page-shell plan-page">
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="plan-top">
        <div className="plan-intro">
          <Link href="/" className="back-link"><ArrowLeft size={16} /> Home</Link>
          <SectionLabel number="Arrival note">Start here</SectionLabel>
          <h1>Tell us the part that feels <em>uncertain.</em></h1>
          <p>Share a few details about where and when you are arriving. It gives the first conversation somewhere useful to begin.</p>
          <div className="plan-benefits">
            <div><CheckCircle2 size={18} /><span>We start with your actual timeline.</span></div>
            <div><CheckCircle2 size={18} /><span>You choose the contact channel.</span></div>
            <div><CheckCircle2 size={18} /><span>Support can be tailored to the gaps.</span></div>
          </div>
          <aside className="plan-privacy"><ShieldCheck size={19} /><p><strong>Your details stay practical.</strong> This draft intake is for planning the conversation. Do not include passport, visa, payment, or other sensitive details here.</p></aside>
          <aside className="plan-response-expectation"><span>What happens after you send</span><p><strong>We read your arrival route first.</strong> Your city, timing, and preferred contact method shape the next useful conversation—not an automated sales loop.</p></aside>
        </div>
        <div className="plan-form-wrap">
          {sent ? <div className="sent-card">
            <span className="sent-icon"><CheckCircle2 size={29} /></span>
            <p className="kicker">Arrival note saved</p>
            <h2>You have made the first move.</h2>
            <p>This static demo confirms the experience. Connect your preferred form or inbox next, and this submission can be routed directly to your team.</p>
            <button className="button-dark" onClick={() => setSent(false)}>Write another note <ArrowUpRight size={17} /></button>
          </div> : <form onSubmit={submit} onInput={updateProgress} onChange={updateProgress} className="arrival-form">
            <div className="form-heading"><span>01</span><div><p className="kicker">Your arrival note · 抵达卡</p><h2>Where should we begin?</h2></div></div>
            <div className="form-route-progress" aria-hidden="true"><div><i style={{ transform: `scaleX(${completion / 100})` }} /></div><span>{completion}% mapped</span></div>
            <p className="form-station-note"><span>下一站</span> Your next station begins with a few practical details.</p>
            <label>First name<input data-progress required placeholder="Your name" autoComplete="given-name" /></label>
            <div className="form-two-up"><label>Email address<input data-progress type="email" required placeholder="you@example.com" autoComplete="email" /></label><label>Expected arrival<select data-progress required defaultValue=""><option value="" disabled>Select a timeframe</option><option>Within 2 weeks</option><option>Within 1 month</option><option>1–3 months away</option><option>Still planning</option></select><ChevronDown className="select-chevron" size={16} /></label></div>
            <div className="form-two-up"><label>City / university<input data-progress required placeholder="e.g. Wuhan" /></label><label>Getting in touch<select data-progress value={channel} onChange={(e) => setChannel(e.target.value)}><option>WhatsApp</option><option>Email</option><option>WeChat</option></select><ChevronDown className="select-chevron" size={16} /></label></div>
            <label>What would make your arrival easier?<textarea data-progress required rows={4} placeholder="Housing, airport arrival, local apps, food, getting to campus…" /></label>
            <button className="button-dark form-submit" type="submit">Send my arrival note <ArrowUpRight size={17} /></button>
          </form>}
        </div>
      </section>
      <section className="plan-next">
        <SectionLabel number="What happens next">The handoff</SectionLabel>
        <div className="plan-next-grid"><h2>A short note becomes a clear next step.</h2><ol><li><span>01</span><p><strong>We read the route.</strong> Your city, timing, and priorities guide the conversation.</p></li><li><span>02</span><p><strong>We connect your way.</strong> The team reaches out through your chosen channel to understand what matters.</p></li><li><span>03</span><p><strong>You decide the support.</strong> Together, you discuss a realistic plan around the journey you need.</p></li></ol></div>
        <div className="plan-contact-line"><p>Prefer to begin directly?</p><a href="mailto:success@airweber.tech"><Mail size={16} /> Email the team</a><a href="https://wa.me/447754285455" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Message on WhatsApp</a></div>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
