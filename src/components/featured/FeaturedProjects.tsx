import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "../../data/portfolio";
import { FeaturedProjectCard } from "./FeaturedProjectCard";

type Props = {
  projects: readonly Project[];
};

export function FeaturedProjects({ projects }: Props) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % projects.length);
  }, [projects.length]);

  const goTo = useCallback((idx: number) => setActive(idx), []);

  if (projects.length === 0) return null;

  // Decorative thin diagonal lines behind cards
  const Lines = () => (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      <div className="absolute left-1/2 top-[52%] h-px w-[520px] -translate-x-1/2 -rotate-[18deg] bg-[#EDEDE9] dark:bg-white/[0.06]" />
      <div className="absolute left-1/2 top-[52%] h-px w-[520px] -translate-x-1/2 rotate-[18deg] bg-[#EDEDE9] dark:bg-white/[0.06]" />
    </div>
  );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      className="relative overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
    >
      {/* Track — smaller on mobile to fit screen */}
      <div className="relative mx-auto flex h-[360px] max-w-[920px] items-center justify-center overflow-visible px-5 py-6 sm:h-[380px] md:h-[420px] md:py-8">
        <Lines />
        {/* Cards */}
        <div className="relative flex h-full w-full items-center justify-center">
          {projects.map((project, idx) => {
            const offset = ((idx - active + projects.length) % projects.length);
            // Normalize offset to -1, 0, 1 for 3 items (choose shortest path)
            let pos = offset;
            if (pos > projects.length / 2) pos -= projects.length;
            // For 3 items: pos will be -1,0,1
            const isActive = pos === 0;
            const isPrev = pos === -1;
            const isNext = pos === 1;
            const isVisible = isActive || isPrev || isNext;

            if (!isVisible && projects.length > 3) return null;

            const style = isActive
              ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 30 }
              : isPrev
                ? { x: -210, y: 18, rotate: -12, scale: 0.92, opacity: 0.76, zIndex: 10 }
                : { x: 210, y: 18, rotate: 12, scale: 0.92, opacity: 0.76, zIndex: 10 };



            return (
              <motion.div
                key={project.id}
                className="absolute left-1/2 top-1/2 will-change-transform"
                initial={false}
                animate={
                  shouldReduceMotion
                    ? { x: style.x, y: style.y, opacity: style.opacity, zIndex: style.zIndex }
                    : style
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0.01 }
                    : { type: "spring", stiffness: 260, damping: 30, mass: 0.9 }
                }
                style={{
                  // Responsive override via CSS: on md↓ use tablet values via inline media query handled by framer? Use style fallback for mobile
                  // We handle mobile via CSS classes on inner card (88-92vw)
                  // Keep will-change for performance
                } as any}
                // Mobile: reduce translation via class on inner wrapper
                // Use data-pos for CSS mobile override
                data-pos={isActive ? "active" : isPrev ? "prev" : "next"}
              >
                {/* Mobile peeking wrapper — small cards to fit screen */}
                <div className=" -translate-x-1/2 -translate-y-1/2 data-[pos=prev]:max-md:-translate-x-[calc(50%+22px)] data-[pos=next]:max-md:-translate-x-[calc(50%-22px)] max-md:[&>div]:w-[82vw] max-md:[&>div]:max-w-[300px] max-md:data-[pos=prev]:rotate-[-3deg] max-md:data-[pos=next]:rotate-[3deg] max-md:data-[pos=prev]:opacity-70 max-md:data-[pos=next]:opacity-70">
                  <motion.div
                    animate={shouldReduceMotion ? {} : undefined}
                    className="md:hidden"
                    style={{ x: style.x > 0 ? 18 : style.x < 0 ? -18 : 0 } as any}
                  />
                  <FeaturedProjectCard
                    project={project}
                    isActive={isActive}
                    dragging={dragging}
                    onClick={() => !isActive && goTo(idx)}
                  />
                </div>
                {/* Tablet override via hidden element for framer to lerp? Simplified: CSS media will adjust via JS resize is complex, keep desktop values and mobile peek */}
                <style>{`@media (min-width: 768px) and (max-width: 1023px) {}`}</style>
              </motion.div>
            );
          })}
        </div>
      </div>



      {/* Swipe area for mobile - whole track handles drag */}
      <motion.div
        className="absolute inset-0 z-20 touch-pan-y select-none md:hidden will-change-transform cursor-grab active:cursor-grabbing overscroll-contain"
        style={{ touchAction: "pan-y" } as any}
        drag="x"
        dragDirectionLock
        dragElastic={0.22}
        dragConstraints={{ left: 0, right: 0 }}
        dragMomentum={false}
        onDragStart={() => setDragging(true)}
        onDragEnd={(_, info) => {
          window.setTimeout(() => setDragging(false), 120);
          if (info.offset.x < -40 || info.velocity.x < -400) next();
          else if (info.offset.x > 40 || info.velocity.x > 400) prev();
        }}
        aria-hidden="true"
      />
    </div>
  );
}
