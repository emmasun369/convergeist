/**
 * Business Route extends the Arrival Notebook system into a practical, trade-led
 * field guide for people visiting China to meet suppliers and coordinate shipping.
 */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight, Building2, Check, ClipboardCheck, MapPin, PackageCheck, Route as RouteIcon, Ship, UsersRound } from "lucide-react";
import BusinessBriefForm from "@/components/BusinessBriefForm";
import SourcingHubMap from "@/components/SourcingHubMap";
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
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const select = gsap.utils.selector(page);
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTimeline
        .from(select(".business-eyebrow"), { autoAlpha: 0, y: 16, duration: 0.5 })
        .from(select(".business-hero h1"), { autoAlpha: 0, y: 28, duration: 0.8 }, "-=0.2")
        .from(select(".business-hero-body"), { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.44")
        .from(select(".business-hero-actions > *"), { autoAlpha: 0, y: 12, duration: 0.45, stagger: 0.1 }, "-=0.3")
        .from(select(".business-hero-image"), { autoAlpha: 0, x: 34, scale: 0.985, duration: 0.9 }, "-=0.7")
        .from(select(".business-route-card"), { autoAlpha: 0, y: 22, rotation: -5, duration: 0.62 }, "-=0.42")
        .from(select(".business-city-note"), { autoAlpha: 0, x: 18, duration: 0.45 }, "-=0.34")
        .from(select(".business-hero-route"), { autoAlpha: 0, duration: 0.35 }, "<")
        .from(select(".business-hero-route i"), { scaleY: 0, transformOrigin: "top", duration: 0.8 }, "-=0.1")
        .from(select(".business-hero-route b"), { scale: 0.5, autoAlpha: 0, duration: 0.28 }, "-=0.45");

      gsap.to(select(".business-hero-image"), {
        yPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: select(".business-hero")[0], start: "top top", end: "bottom top", scrub: 0.55 },
      });
      gsap.to(select(".business-route-card"), {
        y: -22,
        ease: "none",
        scrollTrigger: { trigger: select(".business-hero")[0], start: "top top", end: "bottom top", scrub: 0.7 },
      });

      const revealSection = (sectionSelector: string, targets: string, y = 28) => {
        const section = select(sectionSelector)[0];
        const nodes = select(targets);
        if (!section || !nodes.length) return;
        gsap.from(nodes, {
          y,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 77%", once: true },
        });
      };

      revealSection(".business-intro", ".business-intro-rail, .business-intro-main > *, .business-intro-note");
      const introRail = select(".business-intro-rail i")[0];
      if (introRail) gsap.fromTo(introRail, { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: ".business-intro", start: "top 76%", end: "bottom 55%", scrub: 0.45 } });

      revealSection(".business-stages", ".business-stages-heading > *");
      gsap.utils.toArray<HTMLElement>(select(".business-stage")).forEach((stage) => {
        const rail = stage.querySelector(".business-stage-number i");
        const icon = stage.querySelector(".business-stage-icon");
        const copy = stage.querySelector(".business-stage-copy");
        const checklist = stage.querySelector("ul");
        ScrollTrigger.create({
          trigger: stage,
          start: "top 78%",
          once: true,
          onEnter: () => {
            const timeline = gsap.timeline();
            timeline
              .from(stage, { y: 24, duration: 0.58, ease: "power3.out" })
              .from(icon, { scale: 0.82, rotation: -8, duration: 0.4, ease: "back.out(1.4)" }, "-=0.36");
            if (copy) timeline.from(copy, { x: 16, duration: 0.45, ease: "power2.out" }, "-=0.22");
            if (checklist) timeline.from(checklist, { x: 16, duration: 0.45, ease: "power2.out" }, "-=0.35");
            if (rail) timeline.fromTo(rail, { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", duration: 0.5, ease: "power1.out" }, 0.12);
          },
        });
      });

      const fieldImage = select(".field-note-image")[0];
      const fieldCopy = select(".field-note-copy > *");
      if (fieldImage) {
        const fieldTimeline = gsap.timeline({ scrollTrigger: { trigger: ".business-field-note", start: "top 75%", once: true } });
        fieldTimeline
          .from(fieldImage, { y: 28, scale: 0.985, duration: 0.82, ease: "power3.inOut" })
          .from(select(".field-note-stamp"), { y: 16, rotation: 0, duration: 0.38, ease: "power2.out" }, "-=0.28")
          .from(fieldCopy, { y: 22, duration: 0.55, stagger: 0.1, ease: "power3.out" }, "-=0.48");
      }

      const shippingTimeline = gsap.timeline({ scrollTrigger: { trigger: ".business-shipping", start: "top 72%", once: true } });
      shippingTimeline
        .from(select(".shipping-copy > *"), { y: 22, duration: 0.58, stagger: 0.1, ease: "power3.out" })
        .from(select(".shipping-board"), { x: 26, y: 16, rotation: 1.8, duration: 0.7, ease: "power3.out" }, "-=0.55")
        .from(select(".shipping-board-items > div"), { x: 13, duration: 0.35, stagger: 0.09, ease: "power2.out" }, "-=0.32");
      gsap.to(select(".shipping-board"), { y: -16, ease: "none", scrollTrigger: { trigger: ".business-shipping", start: "top bottom", end: "bottom top", scrub: 0.8 } });

      revealSection(".business-hubs", ".business-hubs-heading > *, .hub-map-shell");
      revealSection(".business-clarity", ".clarity-mark, .business-clarity h2, .clarity-note");
      revealSection(".business-brief", ".business-brief-head > *, .brief-panel");
      const ctaTimeline = gsap.timeline({ scrollTrigger: { trigger: ".business-cta", start: "top 78%", once: true } });
      ctaTimeline
        .from(select(".business-cta .kicker, .business-cta h2"), { y: 24, duration: 0.62, stagger: 0.12, ease: "power3.out" })
        .from(select(".business-cta-orb"), { scale: 0.88, rotation: -12, duration: 0.55, ease: "back.out(1.35)" }, "-=0.36")
        .from(select(".business-cta-route"), { y: 12, duration: 0.25 }, "<");
    }, page);

    return () => context.revert();
  }, []);

  return (
    <div ref={pageRef} className="page-shell business-page">
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
          <div className="field-note-route" aria-hidden="true"><span>04</span><i /><b /></div>
            <div className="field-note-image"><img src="https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1100&q=85" alt="Freight containers stacked in an active logistics yard" /><span className="field-note-stamp">工厂笔记<br />03 / fieldwork</span></div>
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
          <div className="shipping-route-guide" aria-hidden="true"><span>05</span><i /><b>HANDOFF / FOLLOW UP</b></div>
          <div className="shipping-copy">
            <SectionLabel number="A handoff should not feel like a black box">From visit to vessel</SectionLabel>
            <h2>Give every shipment a <em>clearer beginning.</em></h2>
            <p>Whether you are moving samples or a first production run, the useful work starts with shared detail. We can help you prepare the handoff conversation so your supplier, freight partner, and internal team are working from the same page.</p>
            <a href="mailto:hello@convergeist.com?subject=Business%20visit%20and%20shipping%20inquiry" className="text-arrow-link">Ask about your route <ArrowUpRight size={18} /></a>
          </div>
          <div className="shipping-board" aria-label="Shipping handoff checklist">
            <div className="shipping-board-top"><PackageCheck size={20} /><span>Shipment-ready notes · 发运交接</span><b>04</b></div>
            <div className="shipping-board-line"><span className="board-dot board-dot--jade" /><i /><span className="board-dot board-dot--cinnabar" /></div>
            <div className="shipping-board-items">
              <div><span>01</span><p><strong>Goods</strong> Sample or production status, quantities, and packaging.</p></div>
              <div><span>02</span><p><strong>People</strong> Supplier contact, freight partner, and decision owner.</p></div>
              <div><span>03</span><p><strong>Paperwork</strong> Documents to confirm with your qualified logistics and customs providers.</p></div>
            </div>
          </div>
        </section>

        <section className="business-hubs" id="sourcing-hubs">
          <div className="business-hubs-route" aria-hidden="true"><span>05</span><i /><b /></div>
          <div className="business-hubs-heading"><SectionLabel number="A route gets clearer when the cities are visible">China sourcing hubs</SectionLabel><h2>Choose the city that gives your visit its <em>working context.</em></h2><p>Explore four practical starting points. The map is not a recommendation—it is a way to begin making the visit specific.</p></div>
          <div className="hub-map-shell"><SourcingHubMap /></div>
        </section>

        <section className="business-clarity">
          <div className="clarity-mark"><UsersRound size={22} /></div>
          <div><p className="kicker">06 · 后续 / Follow up</p><h2>Local context, practical coordination, and a <em>straight answer</em> about what comes next.</h2></div>
          <p className="clarity-note">ConvergeIST supports informed visits and organized handoffs. Formal importing, customs clearance, contracts, cargo insurance, and regulatory advice should be handled by appropriately qualified providers.</p>
        </section>

        <section className="business-brief" id="business-brief">
          <div className="business-brief-head"><SectionLabel number="Turn the next question into a route note">Start a business brief</SectionLabel><h2>Begin with the part that needs a <em>clearer answer.</em></h2><p>Three short steps are enough to outline the visit, the work, and the handoff you want to make easier.</p></div>
          <div className="brief-panel"><BusinessBriefForm /></div>
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
