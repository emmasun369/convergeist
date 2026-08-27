import { useState } from "react";
import { Settings2, RotateCcw, X } from "lucide-react";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";
import { featureFlagLabels, FeatureFlagKey } from "@/lib/featureFlags";

const flagOrder: FeatureFlagKey[] = ["mobileEnquiryFlow", "desktopFilmTreatment", "desktopFilmMotion"];

export default function FeatureFlagPanel() {
  const { flags, isMobile, setFlag, resetFlags } = useFeatureFlags();
  const [open, setOpen] = useState(false);
  const enabled = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("features") === "1";
  if (!enabled) return null;

  return <aside className={`feature-flag-panel ${open ? "feature-flag-panel--open" : ""}`} aria-label="Experience feature controls">
    {open && <div className="feature-flag-panel__body"><div className="feature-flag-panel__top"><div><span>Owner controls</span><strong>Experience flags</strong></div><button type="button" aria-label="Close feature controls" onClick={() => setOpen(false)}><X size={16} /></button></div><p>Settings apply in this browser only. Append <code>?features=1</code> to any page to reopen these controls.</p><div className="feature-flag-list">{flagOrder.map((key) => <label key={key}><span><strong>{featureFlagLabels[key].label}</strong><small>{featureFlagLabels[key].description}</small></span><input type="checkbox" checked={flags[key]} onChange={(event) => setFlag(key, event.target.checked)} aria-label={featureFlagLabels[key].label} /></label>)}</div><div className="feature-flag-panel__foot"><span>Current viewport: <strong>{isMobile ? "Mobile" : "Desktop"}</strong></span><button type="button" onClick={resetFlags}><RotateCcw size={13} /> Reset</button></div></div>}
    <button type="button" className="feature-flag-panel__trigger" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label="Open experience feature controls"><Settings2 size={16} /><span>Flags</span></button>
  </aside>;
}
