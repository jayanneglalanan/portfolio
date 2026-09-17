import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../../data/portfolio";

type PreviewState = {
  project: Project | null;
  x: number;
  y: number;
};

type ProjectPreviewProps = {
  preview: PreviewState;
};

export function ProjectPreview({ preview }: ProjectPreviewProps) {
  const { project, x, y } = preview;

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block" aria-hidden="true">
      <AnimatePresence>
        {project?.image && (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.97, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute overflow-hidden border border-border bg-bg"
            style={{
              left: x + 24,
              top: y - 96,
              width: 266,
              height: 172,
            }}
          >
            <img
              src={project.image}
              alt=""
              className="h-full w-full object-cover"
              style={{ filter: "grayscale(0.12) contrast(1.02)" }}
              loading="lazy"
              decoding="async"
            />
            {/* subtle border inner */}
            <div className="absolute inset-0 ring-1 ring-black/[0.04]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
