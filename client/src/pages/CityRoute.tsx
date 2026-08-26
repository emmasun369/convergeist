import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowUpRight, Check, ClipboardCheck, MapPin, Route as RouteIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/SectionLabel";
import { CityRoute as CityRouteData, cityRouteAssets, cityRouteBySlug, cityRoutesForAudience } from "@/lib/cityRoutes";
import NotFound from "@/pages/NotFound";

function cityHref(route: CityRouteData) {
  return route.audience === "arrival" ? `/arrivals/${route.slug}` : `/business-cities/${route.slug}`;
}

function formHref(route: CityRouteData) {
  return route.audience === "arrival" ? `/arrival-plan?city=${route.slug}` : `/business?city=${route.slug}#business-brief`;
}

function CityRoutePage({ route }: { route: CityRouteData }) {
  const isBusiness = route.audience === "business";
  const related = route.related.map((slug) => cityRouteBySlug(slug)).filter((item): item is CityRouteData => Boolean(item));
  const cardRoutes = related.length ? related : cityRoutesForAudience(route.audience).filter((item) => item.slug !== route.slug).slice(0, 3);
  const asset = cityRouteAssets[route.slug] ?? { image: route.image, imageAlt: route.imageAlt, artifactLabel: "ROUTE NOTE", artifactValue: route.lens };

  return <div className={`page-shell city-page city-page--${route.audience}`}>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="city-hero">
        <div className="city-hero-route" aria-hidden="true"><span /><i /><b /></div>
        <div className="city-hero-copy">
          <Link href={isBusiness ? "/business" : "/"} className="back-link"><ArrowLeft size={16} /> {isBusiness ? "Business visits" : "Arrival routes"}</Link>
          <p className="city-eyebrow"><span>{route.chinese}</span>{route.eyebrow}</p>
          <h1>{route.title} <em>{route.emphasis}</em></h1>
          <p className="city-hero-body">{route.introduction}</p>
          <div className="city-hero-actions"><Link href={formHref(route)} className="button-light">{isBusiness ? `Plan a ${route.city} visit` : `Map my arrival in ${route.city}`} <ArrowUpRight size={17} /></Link><a href="#route-notes" className="city-quiet-link">Read the route notes <ArrowUpRight size={17} /></a></div>
          <div className="city-artifact"><span>{asset.artifactLabel}</span><strong>{asset.artifactValue}</strong><i aria-hidden="true" /><b aria-hidden="true" /></div>
        </div>
        <div className="city-hero-visual">
          <figure><img src={asset.image} alt={asset.imageAlt} /><div className="city-image-tint" /><figcaption><span>{route.routeNo}</span>{route.lens}</figcaption></figure>
          <aside className="city-hero-note"><MapPin size={16} /><p><strong>{route.city} / {route.chinese}</strong><br />{route.note}</p></aside>
        </div>
      </section>

      <section className="city-route-notes" id="route-notes">
        <div className="city-section-head"><SectionLabel number={isBusiness ? "Turn the visit into a working sequence" : "Keep the first week manageable"}>{isBusiness ? "Visit sequence" : "First 72 hours"}</SectionLabel><h2>{isBusiness ? "Make the trip leave a" : "Let the city become"} <em>{isBusiness ? "useful record." : "a little more familiar."}</em></h2><p>{isBusiness ? "The point is not to collect meetings. It is to leave with context your team can use and a next step someone owns." : "A calm arrival does not require knowing the whole city. It begins with a small sequence you can repeat."}</p></div>
        <div className="city-stage-list">{route.stages.map((stage, index) => <article key={stage.title} className="city-stage"><div className="city-stage-no"><span>0{index + 1}</span><i /></div><div><h3>{stage.title}</h3><p>{stage.copy}</p></div><Check size={18} /></article>)}</div>
      </section>

      <section className="city-field-notes">
        <div className="city-field-photo"><img src={asset.image} alt="" /><span>{isBusiness ? "城市业务笔记" : "城市抵达笔记"}<br />{route.chinese} · {asset.artifactLabel}</span></div>
        <div className="city-field-copy"><SectionLabel number={isBusiness ? "What should travel with the work" : "A note to keep close"}>{isBusiness ? "Decision & handoff notes" : "Carry-with-you field notes"}</SectionLabel><h2>Useful context belongs in the <em>next move.</em></h2>{route.fieldNotes.map((note) => <article key={note.label}><span>{note.label}</span><p>{note.copy}</p></article>)}<Link href={formHref(route)} className="text-arrow-link">{isBusiness ? "Prepare a city-specific business brief" : "Start an arrival note for this city"} <ArrowUpRight size={18} /></Link></div>
      </section>

      <section className="city-related">
        <div className="city-related-head"><SectionLabel number={isBusiness ? "Other working routes" : "Other first-city routes"}>Keep exploring</SectionLabel><h2>Another city may be a better <em>next chapter.</em></h2></div>
        <div className="city-related-grid">{cardRoutes.map((item, index) => <Link key={item.slug} href={cityHref(item)} className="city-related-card"><span>0{index + 1} · {item.chinese}</span><h3>{item.city}</h3><p>{item.lens}</p><ArrowUpRight size={19} /></Link>)}</div>
      </section>

      <section className="city-final-cta"><div className="city-final-route" aria-hidden="true"><i /><span /></div><div className="city-brand-station" aria-hidden="true"><span>CONVERGE</span><b>IST</b><i /></div><div><p className="kicker">{isBusiness ? "Ready to make the visit specific?" : "Ready to make the arrival feel less uncertain?"}</p><h2>{isBusiness ? <>Start with the city, then make the <em>handoff visible.</em></> : <>Start with the city, then make the <em>first week workable.</em></>}</h2></div><Link href={formHref(route)} className="cta-orb"><ClipboardCheck size={19} /><span>{isBusiness ? "Plan the\nbusiness visit" : "Map the\narrival"}</span></Link></section>
    </main>
    <SiteFooter />
  </div>;
}

export function ArrivalCityRoute() {
  const [location] = useLocation();
  const slug = location.split("/").filter(Boolean).at(-1) ?? "";
  const route = cityRouteBySlug(slug, "arrival");
  return route ? <CityRoutePage route={route} /> : <NotFound />;
}

export function BusinessCityRoute() {
  const [location] = useLocation();
  const slug = location.split("/").filter(Boolean).at(-1) ?? "";
  const route = cityRouteBySlug(slug, "business");
  return route ? <CityRoutePage route={route} /> : <NotFound />;
}
