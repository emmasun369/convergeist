import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { FEATURE_FLAG_DEFAULTS, FEATURE_FLAG_STORAGE_KEY, FeatureFlagKey, FeatureFlags, readStoredFeatureFlags } from "@/lib/featureFlags";

type FeatureFlagsContextValue = {
  flags: FeatureFlags;
  isMobile: boolean;
  setFlag: (key: FeatureFlagKey, enabled: boolean) => void;
  resetFlags: () => void;
};

const FeatureFlagsContext = createContext<FeatureFlagsContextValue | null>(null);

export function FeatureFlagsProvider({ children }: PropsWithChildren) {
  const [flags, setFlags] = useState<FeatureFlags>(readStoredFeatureFlags);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 700px)").matches);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px)");
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(FEATURE_FLAG_STORAGE_KEY, JSON.stringify(flags));
  }, [flags]);

  const value = useMemo(() => ({
    flags,
    isMobile,
    setFlag: (key: FeatureFlagKey, enabled: boolean) => setFlags((current) => ({ ...current, [key]: enabled })),
    resetFlags: () => setFlags({ ...FEATURE_FLAG_DEFAULTS }),
  }), [flags, isMobile]);

  return <FeatureFlagsContext.Provider value={value}>{children}</FeatureFlagsContext.Provider>;
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext);
  if (!context) throw new Error("useFeatureFlags must be used within a FeatureFlagsProvider");
  return context;
}
