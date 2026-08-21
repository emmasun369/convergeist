/**
 * Arrival Notebook design: an asymmetric editorial home page that turns anxiety around moving to China into a calm, visible route.
 */
import { Link } from "wouter";
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, CircleArrowRight, Compass, House, Languages, MapPinned, MessageCircleHeart, PlaneLanding, Smartphone, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/SectionLabel";

const journey = [
  { no: "01", title: "Before you fly", body: "Get accommodation, arrival timing, and your first practical questions in order.", icon: <PlaneLanding size={20} /> },
  { no: "02", title: "Landing day", body: "Move from the airport to a place that feels like a beginning—not a maze.", icon: <MapPinned size={20} /> },
  { no: "03", title: "Your first week", body: "Learn the local systems, food, routes, and routines that make a city usable.", icon: <Smartphone size={20} /> },
];

const serviceTiles = [
  { label: "Housing & stays", text: "Pre-vetted options, temporary rooms, and practical distance checks.", icon: <House size={21} />, className: "service-tile--housing" },
  { label: "Arrivals & transit", text: "Airport plans, safe onward routes, and less charades on day one.", icon: <MapPinned size={21} />, className: "service-tile--transit" },
  { label: "Everyday confidence", text: "Local apps, payments, food, and cultural context that adds up.", icon: <Languages size={21} />, className: "service-tile--apps" },
];

export default function Home() {
  return <div className="page-shell home-page">
    <SiteHeader />
    <main>
      <section className="hero">
        <div className="hero-route" aria-hidden="true"><span className="route-dot route-dot--top" /><i /><span className="route-dot route-dot--bottom" /></div>
        <div className="hero-copy">
          <p className="hero-eyebrow"><span>新旅程</span> A better first chapter in China</p>
          <h1>Your first day in China should feel like an <em>arrival,</em> not a test.</h1>
          <p className="hero-body">ConvergeIST is the peer-led support system for international students finding their feet in China—from the airport gate to your first familiar routine.</p>
          <div className="hero-actions"><Link href="/arrival-plan" className="button-light">Map my arrival <ArrowUpRight size={17} /></Link><Link href="/services" className="button-quiet">See how support works <ArrowDownRight size={17} /></Link></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame"><img src="/manus-storage/convergeist-hero-arrival_8423e824.jpg" alt="An international student arriving at a contemporary airport in China" /><div className="hero-image-overlay" /></div>
          <div className="hero-note"><span className="note-pin" /><p><strong>欢迎来到中国</strong><br />A very practical kind of welcome.</p><ArrowUpRight size={16} /></div>
        </div>
        <div className="hero-footnote"><span>Scroll to trace the route</span><i /></div>
      </section>

      <section className="intro-band" id="about">
        <div className="intro-marker"><span>01</span><i /></div>
        <div className="intro-main"><SectionLabel number="A familiar guide goes a long way">Why ConvergeIST</SectionLabel><h2>Because someone who has made the move should be within reach when you make yours.</h2></div>
        <div className="intro-note"><MessageCircleHeart size={22} /><p>We are not here to turn your arrival into a package. We are here to make the unfamiliar parts feel <strong>thought through, human, and possible.</strong></p></div>
      </section>

      <section className="journey-section" id="journey">
        <div className="journey-heading"><SectionLabel number="Your route, made visible">The journey</SectionLabel><h2>Three chapters.<br /><em>One steady hand.</em></h2><p>Start with the part that feels most uncertain. We help you connect the dots around it.</p></div>
        <div className="journey-list">{journey.map((item, index) => <article className="journey-item" key={item.no}><div className="journey-no"><span>{item.no}</span><i /></div><div className="journey-icon">{item.icon}</div><div className="journey-copy"><h3>{item.title}</h3><p>{item.body}</p></div><Link href="/services" aria-label={`Explore ${item.title}`} className="journey-arrow"><ArrowUpRight size={19} /></Link>{index === 1 && <span className="journey-side-note">You do not have to figure it<br />out as you go.</span>}</article>)}</div>
      </section>

      <section className="services-preview">
        <div className="services-image"><img src="/manus-storage/convergeist-housing_ba625beb.jpg" alt="A simple, sunlit student room prepared for a new arrival" /><div className="services-image-caption"><span>In the details</span><p>A safe route home starts before you reach the door.</p></div></div>
        <div className="services-content"><SectionLabel number="Pieces of support that add up">How we help</SectionLabel><h2>The small things are rarely <em>small</em> when you are new.</h2><p>Housing. Getting from the airport. A first meal. The apps on your phone. A place to ask questions without feeling behind. We make space for all of it.</p><div className="service-tiles">{serviceTiles.map((tile) => <article key={tile.label} className={`service-tile ${tile.className}`}><span className="service-tile-icon">{tile.icon}</span><h3>{tile.label}</h3><p>{tile.text}</p><Link href="/services" aria-label={`Learn about ${tile.label}`}><CircleArrowRight size={21} /></Link></article>)}</div><Link href="/services" className="text-arrow-link">Explore all support <ArrowUpRight size={18} /></Link></div>
      </section>

      <section className="welcome-section">
        <div className="welcome-overlay" /><div className="welcome-left"><p>欢迎来到中国</p><span>Huānyíng lái dào Zhōngguó</span></div><div className="welcome-right"><SectionLabel number="The words are just the beginning">A gentler landing</SectionLabel><h2>We help you read the room, the route, and the next small sign.</h2><p>Language apps can teach you “hello.” Lived experience helps with the rest: transport etiquette, dorm life, an order at the right spice level, and knowing where to find a familiar face.</p><Link href="/guides" className="button-light">Browse field notes <ArrowUpRight size={17} /></Link></div>
      </section>

      <section className="principles-section"><div className="principles-head"><SectionLabel number="A practical promise">What we bring</SectionLabel><h2>Clear guidance. Real context. <em>Room to breathe.</em></h2></div><div className="principles-list"><article><span>01</span><h3>Personal, not generic</h3><p>Your plan starts with your city, budget, arrival date, and actual question.</p></article><article><span>02</span><h3>Cost-conscious by design</h3><p>We talk through options that work for the reality of your move, not a one-size-fits-all template.</p></article><article><span>03</span><h3>Local knowledge, shared</h3><p>From community connections to everyday routines, we pass along the context you can use.</p></article></div></section>

      <section className="arrival-cta" id="contact"><div className="arrival-cta-route"><i /><span /></div><div><p className="kicker">Your next step can be simple</p><h2>Tell us where<br />you are <em>landing.</em></h2><p>Begin with a short arrival note. We will take it from there.</p></div><Link href="/arrival-plan" className="cta-orb"><span>Start your<br />arrival plan</span><ArrowUpRight size={24} /></Link></section>
    </main>
    <SiteFooter />
  </div>;
}
