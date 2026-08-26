/**
 * Arrival Notebook design: a calm wayfinding header using Converge Jade, route-line motion, and editorial typography.
 */
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "The journey", href: "/#journey" },
  { label: "Support", href: "/services" },
  { label: "Business visits", href: "/business" },
  { label: "Guides", href: "/guides" },
  { label: "About us", href: "/#about" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const isBusinessRoute = location === "/business";
  const primaryLabel = isBusinessRoute ? "Plan a business visit" : "Start your plan";
  const primaryHref = isBusinessRoute ? "#business-brief" : "/arrival-plan";

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

  const primaryAction = isBusinessRoute
    ? <a href={primaryHref} className="header-cta"><span className="cta-station" aria-hidden="true" />{primaryLabel} <ArrowUpRight size={15} strokeWidth={2.2} /></a>
    : <Link href={primaryHref} className="header-cta"><span className="cta-station" aria-hidden="true" />{primaryLabel} <ArrowUpRight size={15} strokeWidth={2.2} /></Link>;

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="ConvergeIST home">
          <img src="/manus-storage/convergeist-logo-mark_e24b7c42.png" alt="" className="brand-mark" />
          <span className="brand-wordmark">CONVERGE<span>IST</span></span>
          <span className="brand-destination">China arrival routes</span>
          <span className="brand-route-gesture" aria-hidden="true"><i /><b /></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const itemRoute = item.href.split("#")[0] || "/";
            const current = itemRoute === location;
            return <Link key={item.label} href={item.href} className="nav-link" aria-current={current ? "page" : undefined}>{item.label}</Link>;
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
            const current = itemRoute === location;
            return <Link ref={index === 0 ? firstMobileLinkRef : undefined} key={item.label} href={item.href} className="mobile-nav-link" aria-current={current ? "page" : undefined}><span className="route-number">0{index + 1}</span>{item.label}<ArrowUpRight size={18} /></Link>;
          })}
          {isBusinessRoute ? <a href="#business-brief" className="mobile-nav-plan">Plan a business visit <ArrowUpRight size={18} /></a> : <Link href="/arrival-plan" className="mobile-nav-plan">Map my arrival <ArrowUpRight size={18} /></Link>}
        </nav>
      </div>
    </header>
  );
}
