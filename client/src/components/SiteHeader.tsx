/**
 * Arrival Notebook design: a calm wayfinding header using Converge Jade, route-line motion, and editorial typography.
 */
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cityRouteBySlug } from "@/lib/cityRoutes";
import BrandMark from "@/components/BrandMark";

const navItems = [
  { label: "The journey", href: "/#journey", native: true },
  { label: "Support", href: "/services" },
  { label: "Business visits", href: "/business" },
  { label: "City routes", href: "/cities" },
  { label: "Guides", href: "/guides" },
  { label: "About us", href: "/#about", native: true },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const businessCitySlug = location.startsWith("/business-cities/") ? location.split("/").filter(Boolean).at(-1) ?? "" : "";
  const businessCity = cityRouteBySlug(businessCitySlug, "business");
  const arrivalCitySlug = location.startsWith("/arrivals/") ? location.split("/").filter(Boolean).at(-1) ?? "" : "";
  const arrivalCity = cityRouteBySlug(arrivalCitySlug, "arrival");
  const isBusinessRoute = location === "/business" || Boolean(businessCity);
  const isCityRoute = location === "/cities" || Boolean(arrivalCity) || Boolean(businessCity);
  const primaryLabel = isBusinessRoute ? "Plan a business visit" : arrivalCity ? `Map my ${arrivalCity.city} arrival` : "Start your plan";
  const primaryHref = businessCity ? `/business?city=${businessCity.slug}#business-brief` : isBusinessRoute ? "#business-brief" : arrivalCity ? `/arrival-plan?city=${arrivalCity.slug}` : "/arrival-plan";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    if (!open) return;
    const focusFirst = window.setTimeout(() => firstMobileLinkRef.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.setTimeout(() => menuButtonRef.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusFirst);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const primaryAction = isBusinessRoute && !businessCity
    ? <a href={primaryHref} className="header-cta"><span className="cta-station" aria-hidden="true" />{primaryLabel} <ArrowUpRight size={15} strokeWidth={2.2} /></a>
    : <Link href={primaryHref} className="header-cta"><span className="cta-station" aria-hidden="true" />{primaryLabel} <ArrowUpRight size={15} strokeWidth={2.2} /></Link>;

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="ConvergeIST home">
          <BrandMark className="brand-mark" />
          <span className="brand-wordmark">CONVERGE<span>IST</span></span>
          <span className="brand-destination">China arrival routes</span>
          <span className="brand-route-gesture" aria-hidden="true"><i /><b /></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const itemRoute = item.href.split("#")[0] || "/";
            const current = !item.native && (item.href === "/cities" ? isCityRoute : itemRoute === location);
            return item.native
              ? <a key={item.label} href={item.href} className="nav-link">{item.label}</a>
              : <Link key={item.label} href={item.href} className="nav-link" aria-current={current ? "page" : undefined}>{item.label}</Link>;
          })}
        </nav>

        <div className="header-actions">
          {primaryAction}
          <button ref={menuButtonRef} className="mobile-menu-button" onClick={() => setOpen((current) => !current)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-primary-navigation">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-primary-navigation" className={`mobile-nav ${open ? "mobile-nav--open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => {
            const itemRoute = item.href.split("#")[0] || "/";
            const current = !item.native && (item.href === "/cities" ? isCityRoute : itemRoute === location);
            const content = <><span className="route-number">0{index + 1}</span>{item.label}<ArrowUpRight size={18} /></>;
            return item.native
              ? <a ref={index === 0 ? firstMobileLinkRef : undefined} key={item.label} href={item.href} className="mobile-nav-link">{content}</a>
              : <Link ref={index === 0 ? firstMobileLinkRef : undefined} key={item.label} href={item.href} className="mobile-nav-link" aria-current={current ? "page" : undefined}>{content}</Link>;
          })}
          {isBusinessRoute && !businessCity ? <a href="#business-brief" className="mobile-nav-plan">Plan a business visit <ArrowUpRight size={18} /></a> : <Link href={primaryHref} className="mobile-nav-plan">{primaryLabel} <ArrowUpRight size={18} /></Link>}
        </nav>
      </div>
    </header>
  );
}
