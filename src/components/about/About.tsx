import type { portfolio } from "../../data/portfolio";

type AboutProps = {
  about: (typeof portfolio)["about"];
};

export function About({ about }: AboutProps) {
  return (
    <div className="border-t border-border pt-6">
      <div className="grid gap-6 md:grid-cols-[120px_1fr] md:gap-8">
        <div className="hidden md:block font-mono text-[11px] uppercase tracking-[0.08em] text-muted pt-1">
          About
        </div>
        <div className="max-w-[560px] space-y-4">
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-sans text-[14.5px] leading-[1.75] text-secondary"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
