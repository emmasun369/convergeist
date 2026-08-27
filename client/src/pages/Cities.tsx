import { Link } from "wouter";
import { ArrowUpRight, Building2, Compass, MapPin } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/SectionLabel";
import { CityRoute, cityRoutesForAudience } from "@/lib/cityRoutes";

function cityHref(route: CityRoute) {
  return route.audience === "arrival" ? `/arrivals/${route.slug}` : `/business-cities/${route.slug}`;
}

function CityCollection({ audience }: { audience: "arrival" | "business" }) {
  const isBusiness = audience === "business";
  const cities = cityRoutesForAudience(audience);
  return <section id={isBusiness ? "business-cities" : "arrival-cities"} className={`cities-collection cities-collection--${audience}`}>
    <div className="cities-collection-heading"><SectionLabel number={isBusiness ? "A city route for work on the ground" : "A city route for your first chapter"}>{isBusiness ? "Business city routes" : "Student & visitor city routes"}</SectionLabel><h2>{isBusiness ? <>Choose the city that makes the visit <em>more useful.</em></> : <>Choose the city that makes the first week <em>more possible.</em></>}</h2><p>{isBusiness ? "From supplier context to the handoff that follows, each route helps your team focus the time that matters." : "From airport arrival to a workable neighbourhood rhythm, each route makes a first week feel less abstract."}</p></div>
    <div className="cities-card-grid">{cities.map((city, index) => <Link key={city.slug} href={cityHref(city)} className="cities-route-card"><div><span>0{index + 1} · {city.chinese}</span><p>{city.eyebrow.replace("First city route · ", "").replace("Business hub route · ", "")}</p></div><h3>{city.city}</h3><strong>{city.lens}</strong><ArrowUpRight size={19} /></Link>)}</div>
  </section>;
}

export default function Cities() {
  return <div className="page-shell cities-page">
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="cities-hero"><div className="cities-hero-route" aria-hidden="true"><span /><i /><b /></div><div><p className="cities-eyebrow"><span>城市路线</span> City routes, made practical</p><h1>A clearer route begins with the <em>right city.</em></h1><p>Start where your China chapter will actually happen. Choose a city route for first arrivals and everyday confidence, or one built around business visits, supplier context, and the work that follows.</p><div className="cities-hero-actions"><a href="#arrival-cities" className="button-light"><Compass size={17} /> Explore arrival cities</a><a href="#business-cities" className="cities-hero-business"><Building2 size={17} /> Explore business hubs</a></div></div><aside className="cities-hero-note"><MapPin size={17} /><p><strong>One city at a time.</strong><br />A route becomes useful when it knows where it starts.</p></aside></section>
      <CityCollection audience="arrival" />
      <CityCollection audience="business" />
    </main>
    <SiteFooter />
  </div>;
}
