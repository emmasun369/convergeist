/**
 * Arrival Notebook design: resource content is presented as a collectible set of travel notes rather than a generic blog grid.
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Bookmark, Clock3, Compass, Download, Map, Sparkles } from "lucide-react";
import { toast } from "sonner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/SectionLabel";

const guides = [
  { no: "01", type: "Pre-departure", title: "The carry-on checklist that actually earns its place", blurb: "A calm way to separate travel-day essentials from the things that can wait until you are settled.", time: "6 min read", icon: <Compass size={22} />, tone: "jade" },
  { no: "02", type: "Your first 48 hours", title: "What to do when the airport Wi-Fi disappears", blurb: "A first-day sequence for charging, transport, checking in, and finding a familiar meal without spiralling.", time: "5 min read", icon: <Map size={22} />, tone: "cinnabar" },
  { no: "03", type: "Everyday systems", title: "The small local apps that make a big difference", blurb: "A plain-English starting point for maps, ride-hailing, payments, translation, and keeping your day moving.", time: "8 min read", icon: <Sparkles size={22} />, tone: "ink" },
];

export default function Guides() {
  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
    const cards = Array.from(page.querySelectorAll<HTMLElement>(".guide-card"));
    const cleanup = cards.map((card) => {
      const move = (event: PointerEvent) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.transform = `translateY(-7px) perspective(650px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      };
      const leave = () => { card.style.transform = ""; };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return () => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); };
    });
    return () => cleanup.forEach((remove) => remove());
  }, []);
  return <div ref={pageRef} className="page-shell guides-page">
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="page-masthead guides-masthead">
        <div className="masthead-aside"><span>Field notes</span><div className="masthead-rule" /></div>
        <div className="masthead-main"><Link href="/" className="back-link"><ArrowLeft size={16} /> Home</Link><SectionLabel number="Notes to take with you">Guides</SectionLabel><h1>Keep the useful bits <em>close.</em></h1><p className="lead-copy">Short, thoughtful field notes for the practical moments that make a new country feel less distant.</p><p className="guide-margin-note"><span>指南</span> A small guide for finding your way.</p></div>
      </section>
      <section className="guides-featured">
        <div className="featured-image"><img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1400&q=86" alt="A map and travel-planning tools prepared on a desk" /><span className="image-stamp">Saved<br />for later</span></div>
        <div className="featured-content"><p className="kicker">Featured arrival note</p><h2>There is more to “welcome” than knowing the words.</h2><p>Our first-week orientation pulls together simple language, local customs, and the tiny bits of context that stop everyday interactions feeling like a puzzle.</p><button onClick={() => toast("Guide preview", { description: "Connect your CMS or download host to publish this guide." })} className="text-arrow-link">Open the field note <ArrowUpRight size={18} /></button></div>
      </section>
      <section className="guide-cards-section"><SectionLabel number="The arrival library">Three places to begin</SectionLabel><div className="guide-cards">{guides.map((guide) => <article className={`guide-card guide-card--${guide.tone}`} key={guide.no}><div className="guide-card-top"><span>{guide.no}</span><button onClick={() => toast("Saved for later") } aria-label={`Save ${guide.title}`}><Bookmark size={18} /></button></div><div className="guide-icon">{guide.icon}</div><p className="kicker">{guide.type}</p><h2>{guide.title}</h2><p>{guide.blurb}</p><footer><span><Clock3 size={14} />{guide.time}</span><button onClick={() => toast("Guide preview", { description: "Connect your CMS or download host to publish this guide." })}><ArrowUpRight size={19} /></button></footer></article>)}</div></section>
      <section className="resource-callout"><div><p className="kicker">Make the first week lighter</p><h2>Your pocket arrival list, ready when you are.</h2><p>A printable draft checklist for the travel day, your first night, and the week ahead.</p></div><button className="button-light" onClick={() => toast("Download setup", { description: "Add the final PDF to enable this resource." })}><Download size={17} /> Get the checklist</button></section>
    </main>
    <SiteFooter />
  </div>;
}
