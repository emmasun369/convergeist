import { useState } from "react";
import { ArrowUpRight, Factory, MapPin, Ship, Sparkles } from "lucide-react";

type Hub = {
  id: string;
  city: string;
  chinese: string;
  label: string;
  focus: string;
  detail: string;
  note: string;
  x: string;
  y: string;
  icon: "factory" | "sparkles" | "ship";
};

const hubs: Hub[] = [
  { id: "shenzhen", city: "Shenzhen", chinese: "深圳", label: "01 · Prepare", focus: "Electronics & hardware", detail: "A practical base for factory context, product iteration, and supplier conversations across the Greater Bay Area.", note: "Pair Shenzhen with Dongguan when production-floor time is central to the visit.", x: "64%", y: "73%", icon: "factory" },
  { id: "guangzhou", city: "Guangzhou", chinese: "广州", label: "02 · Meet", focus: "Consumer goods & trade fairs", detail: "Useful for category discovery, trade-show days, and supplier meetings with room to compare options in person.", note: "Plan a focused meeting sequence; trade-show days move quickly.", x: "57%", y: "67%", icon: "sparkles" },
  { id: "yiwu", city: "Yiwu", chinese: "义乌", label: "03 · Verify", focus: "Small commodities & product discovery", detail: "A concentrated route for researching product ranges, sampling possibilities, and the commercial details behind high-volume categories.", note: "Bring decision criteria with you so each product conversation stays useful.", x: "72%", y: "51%", icon: "factory" },
  { id: "shanghai", city: "Shanghai", chinese: "上海", label: "04 · Hand off", focus: "Commercial bridge & logistics", detail: "A strong point for partner meetings, international connections, and framing the next leg from visit to onward movement.", note: "Use the final meeting to confirm owner, documents, and next communication step.", x: "80%", y: "42%", icon: "ship" },
];

function HubIcon({ type }: { type: Hub["icon"] }) {
  if (type === "ship") return <Ship size={17} />;
  if (type === "sparkles") return <Sparkles size={17} />;
  return <Factory size={17} />;
}

export default function SourcingHubMap() {
  const [activeId, setActiveId] = useState("shenzhen");
  const activeHub = hubs.find((hub) => hub.id === activeId) ?? hubs[0];

  return (
    <div className="hub-map-layout">
      <div className="hub-map-controls" aria-label="Sourcing hub selector">
        {hubs.map((hub) => (
          <button key={hub.id} className={`hub-selector ${hub.id === activeId ? "hub-selector--active" : ""}`} onClick={() => setActiveId(hub.id)}>
            <span>{hub.label}</span><strong>{hub.city}</strong><em>{hub.chinese}</em>
          </button>
        ))}
      </div>
      <div className="hub-map-frame">
        <div className="sourcing-atlas" role="img" aria-label="Illustrated route atlas connecting the sourcing hubs of Shenzhen, Guangzhou, Yiwu, and Shanghai">
          <svg className="atlas-contours" viewBox="0 0 1000 600" aria-hidden="true">
            <path d="M135 184C250 92 414 99 520 176c81 58 145 20 243 109 67 62 74 167 23 248-44 70-140 108-244 81-100-27-137 11-245-30-103-39-160-143-133-232 10-35-53-58-29-168Z" />
            <path d="M222 194c79 17 123 94 201 88 101-8 163 77 253 72 82-4 112 51 95 126" />
            <path d="M311 514c97-84 163-30 236-110 61-67 154-23 202-103" />
            <path d="M495 121c-25 76 16 104 0 165-16 64 24 90 46 127" />
          </svg>
          <svg className="atlas-routes" viewBox="0 0 1000 600" aria-hidden="true"><path d="M570 402 C600 370 615 335 653 306 S720 250 747 229" /></svg>
          {hubs.map((hub) => <button key={hub.id} className={`atlas-pin ${hub.id === activeId ? "atlas-pin--active" : ""}`} style={{ left: hub.x, top: hub.y }} onClick={() => setActiveId(hub.id)} aria-label={`Explore ${hub.city} sourcing hub`}><span>{hub.label.slice(0, 2)}</span><i /></button>)}
          <div className="atlas-corner-note"><span>中国 / route note 05</span><i /></div>
        </div>
      </div>
      <aside className="hub-detail-card" aria-live="polite">
        <div className="hub-detail-kicker"><span>{activeHub.label} · 城市笔记</span><MapPin size={14} /></div>
        <div className="hub-detail-title"><span className="hub-detail-icon"><HubIcon type={activeHub.icon} /></span><div><h3>{activeHub.city}</h3><p>{activeHub.chinese} · {activeHub.focus}</p></div></div>
        <p className="hub-detail-copy">{activeHub.detail}</p>
        <div className="hub-detail-note"><i /><p>{activeHub.note}</p></div>
        <a href="#business-brief" className="hub-detail-link">Start a brief for {activeHub.city} <ArrowUpRight size={16} /></a>
      </aside>
    </div>
  );
}
