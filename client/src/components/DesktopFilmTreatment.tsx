import { useEffect, useRef } from "react";
import { Clapperboard } from "lucide-react";
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
    <video ref={videoRef} className="desktop-film__video" muted loop playsInline preload="metadata" poster="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=86"><source src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663312168274/DDJdRgGvqEhjCNSv.mp4" type="video/mp4" /></video>
    <div className="desktop-film__wash" />
    <div className="desktop-film__frame" />
    <div className="desktop-film__meta desktop-film__meta--top"><span><Clapperboard size={13} /> CN</span><b>01:04</b></div>
  </div>;
}
