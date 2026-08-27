import { useEffect, useRef } from "react";
import { Clapperboard, MapPin } from "lucide-react";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";

export default function DesktopFilmTreatment() {
  const { flags, isMobile } = useFeatureFlags();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (flags.desktopFilmMotion && !isMobile) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [flags.desktopFilmMotion, isMobile]);

  if (isMobile || !flags.desktopFilmTreatment) return null;

  return <div className={`desktop-film ${flags.desktopFilmMotion ? "desktop-film--motion" : "desktop-film--still"}`} aria-hidden="true">
    <video ref={videoRef} className="desktop-film__video" muted loop playsInline preload="metadata" poster="/manus-storage/convergeist-supplier-meeting_94a89879.jpg"><source src="/manus-storage/convergeist-business-film-loop_6819c583.mp4" type="video/mp4" /></video>
    <div className="desktop-film__wash" />
    <div className="desktop-film__frame" />
    <div className="desktop-film__meta desktop-film__meta--top"><span><Clapperboard size={13} /> CN / FIELD REEL</span><b>01:04</b></div>
    <div className="desktop-film__meta desktop-film__meta--bottom"><span><MapPin size={13} /> Supplier context, in motion</span><i /></div>
  </div>;
}
