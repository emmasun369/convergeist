/**
 * Arrival Notebook design: repeated section labels act as stamped route markers for orientation through long pages.
 */
export default function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="section-label"><span>{number}</span>{children}</p>;
}
