import { ExternalLink } from "lucide-react";
import type { Project } from "../../data/portfolio";

type Props = {
  project: Project;
  isActive: boolean;
  dragging?: boolean;
  onClick?: () => void;
};

export function FeaturedProjectCard({ project, isActive, dragging, onClick }: Props) {
  const categoryMap: Record<string, string> = {
    "kapeflow-admin": "ADMIN PAGE",
    "hotel-de-susana": "BOOKING PAGE",
    worklink: "ADMIN PAGE",
  };
  const category = categoryMap[project.id] ?? "WEB APPLICATION";

  return (
    <div
      onClick={() => {
        if (dragging) return;
        onClick?.();
      }}
      role={isActive ? undefined : "button"}
      tabIndex={isActive ? undefined : 0}
      onKeyDown={(e) => {
        if (dragging) return;
        if (!isActive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`relative flex min-h-[220px] w-[280px] shrink-0 flex-col rounded-[16px] border bg-surface p-[16px] text-left transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] sm:min-h-[238px] sm:w-[300px] sm:p-[18px] md:min-h-[275px] md:w-[340px] md:rounded-[18px] md:p-[22px] ${
        isActive
          ? "z-30 border-border shadow-[0_18px_40px_rgba(0,0,0,0.07)] dark:border-white/[0.08] dark:shadow-[0_18px_45px_rgba(0,0,0,0.35)] opacity-100"
          : "z-10 cursor-pointer border-[#E3E3DF] bg-[#FAFAF8] opacity-[0.76] shadow-[0_8px_25px_rgba(0,0,0,0.025)] hover:opacity-90 dark:border-white/[0.08] dark:bg-[#0C0C0E] dark:opacity-100 dark:shadow-[0_8px_25px_rgba(0,0,0,0.2)]"
      } ${!isActive ? "hover:-translate-y-[2px]" : "hover:-translate-y-[3px] hover:shadow-[0_22px_48px_rgba(0,0,0,0.085)]"} motion-reduce:transform-none`}
      aria-label={isActive ? `${project.title}: ${project.description}` : `View ${project.title}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-black/[0.04] dark:ring-white/[0.06]" aria-hidden="true" />

      {/* Badge */}
      <div className="flex flex-wrap gap-1.5">
        <span className="inline-flex h-[22px] items-center rounded-full bg-[#111111] px-3 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-[#F5F5F2] dark:bg-[#F1F1F1] dark:text-[#141414]">
          #{project.num} {category}
        </span>
      </div>

      {/* Header */}
      <div className="mt-3 flex items-center gap-3 sm:mt-4 sm:gap-3.5">
        <div className="h-[40px] w-[40px] shrink-0 overflow-hidden rounded-[10px] border border-[#E0E0DC] bg-[#FAFAF7] dark:border-white/[0.08] dark:bg-white/[0.04] sm:h-[44px] sm:w-[44px] md:h-[46px] md:w-[46px] md:rounded-[12px]">
          {project.image ? (
            <img
              src={project.image}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
          ) : (
            <div className="h-full w-full bg-border/40" />
          )}
        </div>
        <h3 className="font-mono text-[16px] font-medium leading-none tracking-[-0.015em] text-[#2B2B2B] dark:text-[#E3E3E5] sm:text-[17px] md:text-[20px]">{project.title}</h3>
      </div>

      <p className="mt-2.5 font-sans text-[13px] leading-[1.55] text-[#686864] dark:text-[#A0A0A8] line-clamp-3 sm:text-[13.5px] md:text-[14px] md:leading-[1.6]">{project.description}</p>

      {/* Single action */}
      <div className="mt-auto pt-4">
        <a
          href={project.href}
          target={project.href.startsWith("http") ? "_blank" : undefined}
          rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex h-[40px] w-full items-center justify-center gap-1.5 rounded-[8px] bg-[#111111] px-4 font-mono text-[13px] font-medium tracking-[0.02em] text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent dark:bg-[#F1F1F1] dark:text-[#0B0B0D] dark:hover:bg-white"
          aria-label={`View ${project.title} project`}
        >
          View Project <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
