/**
 * Arrival Notebook design: the footer closes the route with a quiet, paper-and-ink sign-off and clear exits.
 */
import { Link } from "wouter";
import { ArrowUpRight, Instagram, Mail, MessageCircle, Phone } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-route-line" aria-hidden="true"><span /></div>
      <div className="footer-grid">
        <section>
          <Link href="/" className="brand footer-brand" aria-label="ConvergeIST home">
            <img src="/manus-storage/convergeist-logo-mark_e24b7c42.png" alt="" className="brand-mark" />
            <span className="brand-wordmark">CONVERGE<span>IST</span></span>
            <span className="brand-destination">China arrival routes</span>
            <span className="brand-route-gesture" aria-hidden="true"><i /><b /></span>
          </Link>
          <p className="footer-intro">A practical China partner for first arrivals, business visits, and the work that follows.</p>
        </section>
        <section className="footer-list">
          <p className="footer-label">Explore</p>
          <Link href="/services">Support by stage <ArrowUpRight size={14} /></Link>
          <Link href="/business">Business visits &amp; shipping <ArrowUpRight size={14} /></Link>
          <Link href="/guides">Arrival guides <ArrowUpRight size={14} /></Link>
          <Link href="/arrival-plan">Start an arrival plan <ArrowUpRight size={14} /></Link>
        </section>
        <section className="footer-list">
          <p className="footer-label">Connect</p>
          <a href="mailto:success@airweber.tech"><Mail size={14} /> success@airweber.tech</a>
          <a href="tel:+447754285455"><Phone size={14} /> +44 7754 285 455</a>
          <a href="https://wa.me/447754285455" target="_blank" rel="noreferrer"><MessageCircle size={14} /> Send a WhatsApp message</a>
          <a href="https://www.instagram.com/convergeist/" target="_blank" rel="noreferrer"><Instagram size={14} /> Follow @convergeist</a>
        </section>
      </div>
      <div className="footer-bottom">
        <p>© 2026 ConvergeIST. Built for the first week—and the chapter after.</p>
        <p><span>欢迎来到中国</span> · Welcome to China</p>
      </div>
    </footer>
  );
}
