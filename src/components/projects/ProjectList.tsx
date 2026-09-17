import { useState, useCallback } from "react";
import type { Project } from "../../data/portfolio";
import { ProjectRow } from "./ProjectRow";
import { ProjectPreview } from "./ProjectPreview";

type ProjectListProps = {
  projects: readonly Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  const [preview, setPreview] = useState<{
    project: Project | null;
    x: number;
    y: number;
  }>({ project: null, x: 0, y: 0 });

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleHover = useCallback(
    (project: Project | null, e?: React.MouseEvent) => {
      if (project && e) {
        // Keep preview away from title: offset to right of cursor
        setPreview({ project, x: e.clientX, y: e.clientY });
        setActiveId(project.id);
      } else if (!project) {
        setPreview((p) => ({ ...p, project: null }));
        setActiveId(null);
      }
    },
    []
  );

  return (
    <div
      className="border-t border-border"
      onMouseLeave={() => handleHover(null)}
    >
      <ProjectPreview preview={preview} />
      <ul className="list-none p-0 m-0">
        {projects.map((project) => (
          <li key={project.id} className="list-none">
            <ProjectRow
              project={project}
              onHover={handleHover}
              isActive={activeId === project.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
