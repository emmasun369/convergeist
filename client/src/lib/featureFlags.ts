export const FEATURE_FLAG_DEFAULTS = {
  mobileEnquiryFlow: true,
  desktopFilmTreatment: true,
  desktopFilmMotion: true,
} as const;

export type FeatureFlagKey = keyof typeof FEATURE_FLAG_DEFAULTS;
export type FeatureFlags = Record<FeatureFlagKey, boolean>;

export const FEATURE_FLAG_STORAGE_KEY = "convergeist-feature-flags";

export const featureFlagLabels: Record<FeatureFlagKey, { label: string; description: string }> = {
  mobileEnquiryFlow: { label: "Mobile enquiry flow", description: "Touch-first bottom sheet and compact enquiry path on screens up to 700px." },
  desktopFilmTreatment: { label: "Desktop film treatment", description: "Business Visits cinematic desktop visual layer above 700px." },
  desktopFilmMotion: { label: "Desktop film motion", description: "Subtle film grain, timecode, and motion details within the desktop treatment." },
};

export function readStoredFeatureFlags(): FeatureFlags {
  if (typeof window === "undefined") return { ...FEATURE_FLAG_DEFAULTS };
  try {
    const stored = window.localStorage.getItem(FEATURE_FLAG_STORAGE_KEY);
    if (!stored) return { ...FEATURE_FLAG_DEFAULTS };
    const parsed = JSON.parse(stored) as Partial<FeatureFlags>;
    return { ...FEATURE_FLAG_DEFAULTS, ...parsed };
  } catch {
    return { ...FEATURE_FLAG_DEFAULTS };
  }
}
