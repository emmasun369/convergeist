/**
 * Arrival Notebook design: a calm wayfinding header using Converge Jade, route-line motion, and editorial typography.
 */
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="ConvergeIST home">
          <img src="/manus-storage/convergeist-logo-mark_e24b7c42.png" alt="" className="brand-mark" />
          <span className="brand-wordmark">CONVERGE<span>IST</span></span>
          <span className="brand-destination">China arrival routes</span>
          <span className="brand-route-gesture" aria-hidden="true"><i /><b /></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="nav-link">{item.label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/arrival-plan" className="header-cta">
            <span className="cta-station" aria-hidden="true" />Start your plan <ArrowUpRight size={15} strokeWidth={2.2} />
          </Link>
          <button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${open ? "mobile-nav--open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <Link key={item.label} href={item.href} className="mobile-nav-link">
              <span className="route-number">0{index + 1}</span>{item.label}<ArrowUpRight size={18} />
            </Link>
          ))}
          <Link href="/arrival-plan" className="mobile-nav-plan">Map my arrival <ArrowUpRight size={18} /></Link>
        </nav>
      </div>
    </header>
  );
}
