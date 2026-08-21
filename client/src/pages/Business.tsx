/**
 * Business Route extends the Arrival Notebook system into a practical, trade-led
 * field guide for people visiting China to meet suppliers and coordinate shipping.
 */
import { ArrowDownRight, ArrowUpRight, Building2, Check, ClipboardCheck, Factory, MapPin, PackageCheck, Route as RouteIcon, Ship, UsersRound } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SectionLabel from "@/components/SectionLabel";

const tripStages = [
  {
    number: "01",
    eyebrow: "抵达前 · Before you land",
    title: "Shape the visit around real business questions.",
    description: "Turn a broad sourcing trip into a considered itinerary—who you need to meet, what you need to see, and what should be ready before the first handshake.",
    points: ["Supplier shortlist and meeting sequence", "Factory-visit questions and sample criteria", "City-to-city timing that leaves room for decisions"],
    icon: <ClipboardCheck size={22} />,
    className: "business-stage--scope",
  },
  {
    number: "02",
    eyebrow: "现场 · On the ground",
    title: "See beyond the showroom.",
    description: "Use the visit to understand working relationships, production context, and the practical details that rarely fit inside an email thread.",
    points: ["Business-friendly local orientation", "Factory, market, and partner visit coordination", "Clear notes to carry decisions forward"],
    icon: <Building2 size={22} />,
    className: "business-stage--visit",
  },
  {
    number: "03",
    eyebrow: "启运前 · After the visit",
    title: "Keep the goods—and the next steps—moving.",
    description: "Bring structure to the handoff from visit to shipment, with a shared view of samples, packing, documents, and the people responsible at each point.",
    points: ["Shipping-readiness checklist", "Supplier-to-forwarder handoff prompts", "A simple record of what was agreed"],
    icon: <Ship size={22} />,
    className: "business-stage--ship",
  },
];

const tradeNotes = [
  { title: "Supplier visit", copy: "Meet the team, inspect the process, and ask the questions that matter to your product." },
  { title: "Product review", copy: "Bring samples, specifications, and decisions into one practical conversation." },
  { title: "Shipping handoff", copy: "Clarify what travels with the goods—packing details, documents, contacts, and timing." },
];

export default function Business() {
  return (
    <div className="page-shell business-page">
      <SiteHeader />
      <main>
        <section className="business-hero">
          <div className="business-hero-route" aria-hidden="true"><span /><i /><b /><i /><span /></div>
          <div className="business-hero-copy">
            <p className="business-eyebrow"><span>商旅与贸易</span> Business travel &amp; trade, made navigable</p>
            <h1>A China trip that moves your business <em>forward.</em></h1>
            <p className="business-hero-body">For founders, buyers, and teams coming to China to source, visit, and ship. Built from the same ConvergeIST arrival-notebook mindset: make the route between your first meeting and your next decision more visible.</p>
            <div className="business-hero-actions">
              <a href="#plan" className="button-light">Plan a business visit <ArrowDownRight size={17} /></a>
              <a href="#shipping" className="business-quiet-link">Explore the shipping handoff <ArrowUpRight size={17} /></a>
            </div>
          </div>

          <div className="business-hero-visual">
            <figure className="business-hero-image">
              <img src="/manus-storage/convergeist-supplier-meeting_94a89879.jpg" alt="Business partners reviewing product details during a supplier meeting in China" />
              <div className="business-hero-image-tint" />
              <figcaption><span>01 · 会面笔记</span> You are not here to guess the route.</figcaption>
            </figure>
            <div className="business-route-card">
              <div className="route-card-top"><span className="signal-dot" /> Business route brief <span>CN / INTL</span></div>
              <div className="route-card-line"><b>落地<br /><small>Arrive</small></b><i /><b>拜访<br /><small>Visit</small></b><i /><b>发运<br /><small>Move</small></b></div>
              <p>Supplier meeting <span>→</span> shipment-ready next steps</p>
            </div>
            <div className="business-city-note"><MapPin size={16} /><span>From a factory floor<br />to your next port of call.</span></div>
          </div>

          <div className="business-hero-foot"><span>Independent visits, better prepared</span><i /></div>
        </section>

        <section className="business-intro" id="why-business">
          <div className="business-intro-rail"><span>02</span><i /></div>
          <div className="business-intro-main">
            <SectionLabel number="A calmer route through a complex visit">Why this page exists</SectionLabel>
            <h2>Business is easier to move when the <em>groundwork</em> is visible.</h2>
          </div>
          <div className="business-intro-note">
            <RouteIcon size={22} />
            <p>A China business trip often holds several jobs at once: <strong>build trust, verify details, compare options, and keep goods moving.</strong> This is another ConvergeIST arrival route—one designed for the practical questions that bring a business to China.</p>
          </div>
        </section>

        <section className="business-stages" id="plan">
          <div className="business-stages-heading">
            <SectionLabel number="A trip with useful momentum">The working route</SectionLabel>
            <h2>Three moments to make <em>count.</em></h2>
            <p>Use your time in China for the decisions that cannot be made from a spreadsheet alone.</p>
          </div>
          <div className="business-stage-list">
            {tripStages.map((stage) => (
              <article className={`business-stage ${stage.className}`} key={stage.number}>
                <div className="business-stage-number"><span>{stage.number}</span><i /></div>
                <div className="business-stage-icon">{stage.icon}</div>
                <div className="business-stage-copy">
                  <p className="kicker">{stage.eyebrow}</p>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
                <ul>{stage.points.map((point) => <li key={point}><Check size={14} /> {point}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="business-field-note">
          <div className="field-note-image"><img src="https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1100&q=85" alt="Freight containers stacked in an active logistics yard" /><span className="field-note-stamp">Field note<br />03 / logistics</span></div>
          <div className="field-note-copy">
            <SectionLabel number="The work continues after the meeting">Leave with a useful line of sight</SectionLabel>
            <h2>The right visit gives you more than business cards.</h2>
            <p>It gives you a working picture of the people, process, product, and timing behind a potential partnership. Capture the questions while you are there; make the next handoff easier when you leave.</p>
            <div className="field-note-list">
              {tradeNotes.map((note, index) => <article key={note.title}><span>0{index + 1}</span><div><h3>{note.title}</h3><p>{note.copy}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="business-shipping" id="shipping">
          <div className="shipping-copy">
            <SectionLabel number="A handoff should not feel like a black box">From visit to vessel</SectionLabel>
            <h2>Give every shipment a <em>clearer beginning.</em></h2>
            <p>Whether you are moving samples or a first production run, the useful work starts with shared detail. We can help you prepare the handoff conversation so your supplier, freight partner, and internal team are working from the same page.</p>
            <a href="mailto:hello@convergeist.com?subject=Business%20visit%20and%20shipping%20inquiry" className="text-arrow-link">Ask about your route <ArrowUpRight size={18} /></a>
          </div>
          <div className="shipping-board" aria-label="Shipping handoff checklist">
            <div className="shipping-board-top"><PackageCheck size={20} /><span>Shipment-ready notes</span><b>04</b></div>
            <div className="shipping-board-line"><span className="board-dot board-dot--jade" /><i /><span className="board-dot board-dot--cinnabar" /></div>
            <div className="shipping-board-items">
              <div><span>01</span><p><strong>Goods</strong> Sample or production status, quantities, and packaging.</p></div>
              <div><span>02</span><p><strong>People</strong> Supplier contact, freight partner, and decision owner.</p></div>
              <div><span>03</span><p><strong>Paperwork</strong> Documents to confirm with your qualified logistics and customs providers.</p></div>
            </div>
          </div>
        </section>

        <section className="business-clarity">
          <div className="clarity-mark"><UsersRound size={22} /></div>
          <div><p className="kicker">A clear lane for each partner</p><h2>Local context, practical coordination, and a <em>straight answer</em> about what comes next.</h2></div>
          <p className="clarity-note">ConvergeIST supports informed visits and organized handoffs. Formal importing, customs clearance, contracts, cargo insurance, and regulatory advice should be handled by appropriately qualified providers.</p>
        </section>

        <section className="business-cta" id="contact">
          <div className="business-cta-route" aria-hidden="true"><i /><span /></div>
          <div><p className="kicker">Start with the business question in front of you</p><h2>Tell us what you need China to <em>solve.</em></h2></div>
          <a href="mailto:hello@convergeist.com?subject=Business%20visit%20inquiry" className="business-cta-orb"><span>Start a<br />business brief</span><ArrowUpRight size={24} /></a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
