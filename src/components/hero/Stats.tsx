import type { Stat } from "../../data/portfolio";

type StatsProps = {
  stats: readonly Stat[];
};

export function Stats({ stats }: StatsProps) {
  return (
    <div
      className="border-y border-border"
      role="list"
      aria-label="Statistics"
    >
      {/* Desktop: 4 cols, Mobile: 2x2 — mobile-only fix: per-cell row-aware borders, far-left edge clean */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => {
          const isMobileLeftCol = i % 2 === 0;
          const isMobileTopRow = i < 2;
          const isDesktopFirst = i === 0;
          return (
            <div
              key={stat.label}
              role="listitem"
              className={`py-[18px] md:py-[22px] ${isMobileLeftCol ? "pl-0 pr-[18px]" : "pl-[18px] pr-[18px]"} ${isDesktopFirst ? "md:pl-0" : "md:pl-[18px]"} ${isMobileLeftCol ? "border-r border-border md:border-r-0" : ""} ${isMobileTopRow ? "border-b border-border md:border-b-0" : ""} ${i < 3 ? "md:border-r md:border-border" : "md:border-r-0"}`}
            >
              <div className="flex items-baseline gap-[5px] font-mono text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-normal leading-none tracking-[-0.015em] text-ink break-words">
                <span className="break-all sm:break-normal">{stat.value}</span>
                <span
                  aria-hidden="true"
                  className="text-[10px] leading-none text-muted translate-y-[-2px]"
                >
                  ↗
                </span>
              </div>
              <div className="mt-[7px] font-mono text-[11px] font-normal uppercase tracking-[0.045em] leading-none text-muted">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
