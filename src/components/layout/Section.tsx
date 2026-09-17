import type { ReactNode } from "react";

type SectionProps = {
  number: string;
  label: string;
  children: ReactNode;
  id?: string;
  className?: string;
  action?: ReactNode;
};

export function Section({ number, label, children, id, className = "", action }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-10 ${className}`}>
      <div className="flex items-center gap-3">
        <h2 className="font-mono text-[12px] font-normal uppercase tracking-[0.14em] text-muted whitespace-nowrap">
          {number} / {label}
        </h2>
        <div className="h-px flex-1 bg-border" aria-hidden="true" />
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
