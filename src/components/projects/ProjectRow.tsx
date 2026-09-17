import { useState } from "react";
import type { Project } from "../../data/portfolio";

type ProjectRowProps = {
  project: Project;
  onHover: (project: Project | null, e?: React.MouseEvent) => void;
  isActive: boolean;
};

export function ProjectRow({ project, onHover, isActive }: ProjectRowProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={project.href}
      target={project.href.startsWith("http") ? "_blank" : undefined}
      rel={project.href.startsWith("http") ? "noreferrer" : undefined}
      className="group flex flex-col gap-1.5 border-b border-border py-5 md:flex-row md:items-baseline md:justify-between md:gap-6 md:py-[22px] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2"
      onMouseEnter={(e) => onHover(project, e)}
      onMouseMove={(e) => onHover(project, e)}
      onMouseLeave={() => onHover(null)}
      onFocus={(e) => onHover(project, e as unknown as React.MouseEvent)}
      onBlur={() => onHover(null)}
      aria-label={`${project.title}: ${project.description}`}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-[11px] tracking-[0.08em] text-muted tabular-nums">
            {project.num}
          </span>
          <h3 className="font-mono text-[17px] md:text-[18px] font-normal leading-none tracking-[-0.015em] text-ink transition-colors duration-150 group-hover:text-ink group-hover:opacity-90">
            {project.title}
          </h3>
          <span
            aria-hidden="true"
            className={`hidden md:inline-flex text-[11px] leading-none text-muted transition-transform duration-200 ${isActive ? "translate-x-[3px] text-ink" : "group-hover:translate-x-[2px]"}`}
          >
            ↗
          </span>
        </div>
        <p className="pl-[28px] font-sans text-[13.5px] leading-[1.55] text-secondary">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-[28px] md:pl-0 shrink-0 md:justify-end">
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted leading-none">
          {project.tech.join(" / ")}
        </span>
        <span className="font-mono text-[11px] tracking-[0.06em] text-muted tabular-nums leading-none">
          {project.year}
        </span>
        <span
          aria-hidden="true"
          className={`inline-flex md:hidden text-[11px] leading-none text-muted transition-transform duration-200 ${isActive ? "translate-x-[3px]" : "group-hover:translate-x-[2px]"}`}
        >
          ↗
        </span>
      </div>

      {/* Preload image for preview (hidden) */}
      {project.image && !imgError && (
        <img
          src={project.image}
          alt=""
          aria-hidden="true"
          className="hidden"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}
    </a>
  );
}
