/**
 * Arrival Notebook design: this page turns ConvergeIST services into a readable route from pre-flight planning to first-week confidence.
 */
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, CircleHelp, House, MapPin, PlaneLanding, Smartphone } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/SectionLabel";

const stages = [
  {
    mark: "01", icon: <PlaneLanding size={22} />, eyebrow: "Before you fly · 出发前", title: "Land with a plan, not a hundred tabs open.",
    body: "We help you turn arrival questions into a workable checklist before your departure date gets close.",
    items: ["Accommodation options matched to campus and budget", "Temporary stay planning for early arrivals", "Arrival-day schedule and transport coordination"],
    image: "/manus-storage/convergeist-housing_ba625beb.jpg", caption: "A room should feel checked, clear, and close enough."
  },
  {
    mark: "02", icon: <MapPin size={22} />, eyebrow: "Landing day · 抵达日", title: "A calm route from arrivals to your first door.",
    body: "Get a clear sequence for the moments when a dead battery and unfamiliar signs feel much bigger than they are.",
    items: ["Airport pickup and onward transport planning", "Local transit, Didi, and map orientation", "A first-meal and essential-stop game plan"],
    image: "/manus-storage/convergeist-arrival-transport_1cf09e56.jpg", caption: "One familiar face can change the whole first evening."
  },
  {
    mark: "03", icon: <Smartphone size={22} />, eyebrow: "Your first week · 第一周", title: "Turn a new city into an everyday routine.",
    body: "The practical details get easier when you know the right local tools, phrases, and places to begin.",
    items: ["Essential local-app and mobile setup guidance", "Food, payment, and currency-exchange orientation", "Cultural familiarisation and community connections"],
    image: "/manus-storage/convergeist-city-navigation_ae0c114e.jpg", caption: "The details that make a city feel usable."
  },
];

const faqs = [
  ["When should I reach out?", "The earlier the better—especially if you need help comparing accommodation or planning your arrival date. A few weeks before departure gives the most room to coordinate."],
  ["Can I choose only the support I need?", "Yes. The journey is modular. Tell the team where you need a hand and they can discuss a support plan that fits your timeline and budget."],
  ["Do you arrange university admissions or visas?", "No. ConvergeIST is focused on practical arrival and settling-in support. Keep admissions and visa questions with your university or the relevant official authority."],
  ["What happens after I share my plan?", "You receive a follow-up through your preferred contact channel. The first conversation is about your arrival date, destination, priorities, and the parts of the journey that feel most uncertain."],
];

export default function Services() {
  return <div className="page-shell">
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="page-masthead services-masthead">
        <div className="masthead-aside"><span>Support map</span><div className="masthead-rule" /></div>
        <div className="masthead-main">
          <Link href="/" className="back-link"><ArrowLeft size={16} /> Home</Link>
          <SectionLabel number="01">What we help you move through</SectionLabel>
          <h1>Support that meets you <em>before, at,</em> and after the gate.</h1>
          <p className="lead-copy">Your transition is not one big task. It is a sequence of small, practical moments. ConvergeIST helps you move through the ones that matter most.</p>
          <Link href="/arrival-plan" className="text-arrow-link">Tell us your arrival date <ArrowUpRight size={18} /></Link>
        </div>
      </section>

      <section className="service-stages">
        {stages.map((stage, index) => <article className="stage-row" key={stage.mark}>
          <div className="stage-rail"><span>{stage.mark}</span><i /></div>
          <div className="stage-copy">
            <div className="stage-icon">{stage.icon}</div>
            <p className="kicker">{stage.eyebrow}</p>
            <h2>{stage.title}</h2>
            <p>{stage.body}</p>
            <ul>{stage.items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
          </div>
          <figure className="stage-image">
            <img src={stage.image} alt="" />
            <figcaption><span>0{index + 1}</span>{stage.caption}</figcaption>
          </figure>
        </article>)}
      </section>

      <section className="service-note-section">
        <div className="service-note-mark"><House size={25} /><span>Good to know</span></div>
        <div>
          <h2>Practical help, thoughtfully coordinated.</h2>
          <p>Availability, exact costs, and local arrangements depend on your destination, dates, and needs. We will talk through the right level of support before anything is confirmed—no unclear handovers, no surprise scope.</p>
        </div>
        <Link href="/arrival-plan" className="round-arrow"><ArrowUpRight size={25} /><span className="sr-only">Start your plan</span></Link>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-heading"><SectionLabel number="04">A few useful answers</SectionLabel><h2>Questions are part of the route.</h2></div>
        <div className="faq-list">
          {faqs.map(([question, answer], i) => <details key={question} open={i === 0}>
            <summary>{question}<ChevronRight size={19} /></summary><p>{answer}</p>
          </details>)}
        </div>
      </section>

      <section className="service-cta"><CircleHelp size={26} /><div><p className="kicker">Not sure what support fits?</p><h2>Start with your first question.</h2></div><Link href="/arrival-plan" className="button-dark">Map my arrival <ArrowUpRight size={17} /></Link></section>
    </main>
    <SiteFooter />
  </div>;
}
