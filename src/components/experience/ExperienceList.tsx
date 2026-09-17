import type { Experience } from "../../data/portfolio";

type ExperienceListProps = {
  experience: readonly Experience[];
};

export function ExperienceList({ experience }: ExperienceListProps) {
  return (
    <div className="border-t border-border">
      {experience.map((item) => (
        <div
          key={`${item.year}-${item.role}`}
          className="grid grid-cols-[92px_1fr] gap-4 border-b border-border py-6 md:grid-cols-[110px_1fr] md:gap-8"
        >
          <div className="font-mono text-[12px] leading-none tracking-[0.04em] text-muted pt-[3px]">
            {item.year}
          </div>
          <div>
            <div className="font-mono text-[12px] md:text-[13px] font-normal uppercase tracking-[0.06em] leading-none text-ink">
              {item.role}
            </div>
            <div className="mt-1.5 font-mono text-[12px] leading-none tracking-[0.04em] text-muted">
              {item.org}
            </div>
            <p className="mt-3 max-w-[520px] font-sans text-[14px] leading-[1.65] text-secondary">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
