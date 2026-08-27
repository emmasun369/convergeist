import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Mail, Route, X } from "lucide-react";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";

export default function MobileEnquiryDock() {
  const { flags, isMobile } = useFeatureFlags();
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isPlanPage = location === "/arrival-plan" || (location === "/business" && window.location.hash === "#business-brief");

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [open]);

  useEffect(() => setOpen(false), [location]);

  if (!flags.mobileEnquiryFlow || !isMobile || isPlanPage) return null;

  return <div className="mobile-enquiry" aria-label="Quick enquiry">
    {open && <><button type="button" className="mobile-enquiry__scrim" aria-label="Close enquiry options" onClick={() => setOpen(false)} /><section className="mobile-enquiry__sheet" role="dialog" aria-modal="true" aria-labelledby="mobile-enquiry-title"><div className="mobile-enquiry__handle" /><div className="mobile-enquiry__head"><div><p>Route note · 快速咨询</p><h2 id="mobile-enquiry-title">Where should your route begin?</h2></div><button ref={closeRef} type="button" aria-label="Close enquiry options" onClick={() => setOpen(false)}><X size={18} /></button></div><div className="mobile-enquiry__options"><Link href="/arrival-plan" className="mobile-enquiry__option"><span className="mobile-enquiry__icon"><Route size={18} /></span><span><strong>I’m arriving in China</strong><small>Student and visitor support</small></span><ArrowUpRight size={17} /></Link><Link href="/business#business-brief" className="mobile-enquiry__option mobile-enquiry__option--business"><span className="mobile-enquiry__icon"><Route size={18} /></span><span><strong>I’m visiting for business</strong><small>Sourcing, visits, and handoffs</small></span><ArrowUpRight size={17} /></Link></div><a href="mailto:success@airweber.tech?subject=ConvergeIST%20enquiry" className="mobile-enquiry__email"><Mail size={15} /> Prefer email? Write to the team</a></section></>}
    <button type="button" className="mobile-enquiry__launch" onClick={() => setOpen(true)} aria-expanded={open}><Route size={16} /><span>Start a route note</span><ArrowUpRight size={15} /></button>
  </div>;
}
