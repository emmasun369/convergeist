type BrandMarkProps = { className?: string };

export default function BrandMark({ className = "" }: BrandMarkProps) {
  return <svg className={className} viewBox="0 0 36 42" fill="none" aria-hidden="true" focusable="false">
    <path d="M24.4 12.1c0-5.4-3.6-9.1-8.5-9.1-5.1 0-8.6 3.8-8.6 8.9 0 5.6 3.9 8.5 8.5 8.5h4.8c3.5 0 5.8 2.2 5.8 5.8 0 3.4-2.4 6-6.5 6-4.2 0-7-2.6-7-6.7 0-3.7 2.3-6.3 5.7-6.3" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="28.7" cy="34.9" r="3.5" fill="var(--cinnabar, #b94e32)" />
  </svg>;
}
