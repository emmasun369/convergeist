/**
 * Arrival Notebook design: the footer closes the route with a quiet, paper-and-ink sign-off and clear exits.
 */
import { Link } from "wouter";
import { ArrowUpRight, Instagram, Mail, MessageCircle } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-route-line" aria-hidden="true"><span /></div>
      <div className="footer-grid">
        <section>
          <Link href="/" className="brand footer-brand" aria-label="ConvergeIST home">
            <img src="/manus-storage/convergeist-logo-mark_e24b7c42.png" alt="" className="brand-mark" />
            <span className="brand-wordmark">CONVERGE<span>IST</span></span>
            <span className="brand-route-gesture" aria-hidden="true"><i /><b /></span>
          </Link>
          <p className="footer-intro">Peer-led arrival support for students making China their next chapter.</p>
        </section>
        <section className="footer-list">
          <p className="footer-label">Explore</p>
          <Link href="/services">Support by stage <ArrowUpRight size={14} /></Link>
          <Link href="/guides">Arrival guides <ArrowUpRight size={14} /></Link>
          <Link href="/arrival-plan">Start an arrival plan <ArrowUpRight size={14} /></Link>
        </section>
        <section className="footer-list">
          <p className="footer-label">Connect</p>
          <a href="mailto:hello@convergeist.com"><Mail size={14} /> Email the team</a>
          <a href="#contact"><MessageCircle size={14} /> Send a message</a>
          <a href="#instagram"><Instagram size={14} /> Follow the journey</a>
        </section>
      </div>
      <div className="footer-bottom">
        <p>© 2026 ConvergeIST. Built for the first week—and the chapter after.</p>
        <p><span>欢迎来到中国</span> · Welcome to China</p>
      </div>
    </footer>
  );
}
