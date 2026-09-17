import { useEffect, useRef, useState } from "react";

import defaultPortrait from "../assets/default.png";
import portraitUp from "../assets/ChatGPT Image Sep 15, 2026, 02_43_52 PM (1).png";
import portraitUpRight from "../assets/ChatGPT Image Sep 15, 2026, 02_43_54 PM (2).png";
import portraitRight from "../assets/ChatGPT Image Sep 15, 2026, 02_43_55 PM (3).png";
import portraitDownRight from "../assets/ChatGPT Image Sep 15, 2026, 02_43_56 PM (4).png";
import portraitDown from "../assets/ChatGPT Image Sep 15, 2026, 02_43_56 PM (5).png";
import portraitDownLeft from "../assets/ChatGPT Image Sep 15, 2026, 02_43_58 PM (6).png";
import portraitLeft from "../assets/ChatGPT Image Sep 15, 2026, 02_43_59 PM (7).png";
import portraitUpLeft from "../assets/ChatGPT Image Sep 15, 2026, 02_43_59 PM (8).png";

type PortraitDirection =
  | "center"
  | "n"
  | "ne"
  | "e"
  | "se"
  | "s"
  | "sw"
  | "w"
  | "nw";

const PORTRAIT_IMAGES: Record<PortraitDirection, string> = {
  center: defaultPortrait,
  n: portraitUp,
  ne: portraitUpRight,
  e: portraitRight,
  se: portraitDownRight,
  s: portraitDown,
  sw: portraitDownLeft,
  w: portraitLeft,
  nw: portraitUpLeft,
};

// Order for rendering stacked layers - center first then 8 directions
const ALL_DIRECTIONS: PortraitDirection[] = [
  "center",
  "n",
  "ne",
  "e",
  "se",
  "s",
  "sw",
  "w",
  "nw",
];

const CENTER_ENTER_RADIUS = 65;
const CENTER_EXIT_RADIUS = 85;
const ANGLE_HYSTERESIS = 8;
const STABILITY_DELAY_MS = 40;

function getRawDirectionForAngle(deg: number): PortraitDirection {
  if (deg >= -22.5 && deg < 22.5) return "e";
  if (deg >= 22.5 && deg < 67.5) return "se";
  if (deg >= 67.5 && deg < 112.5) return "s";
  if (deg >= 112.5 && deg < 157.5) return "sw";
  if (deg >= 157.5 || deg < -157.5) return "w";
  if (deg >= -157.5 && deg < -112.5) return "nw";
  if (deg >= -112.5 && deg < -67.5) return "n";
  return "ne";
}

// Expanded sector check for hysteresis (half hysteresis each side)
function isAngleInExpandedSector(
  angle: number,
  direction: PortraitDirection,
  halfHysteresis: number
): boolean {
  // Normalize angle to -180..180 (already)
  const expand = halfHysteresis;
  switch (direction) {
    case "e":
      return angle >= -22.5 - expand && angle < 22.5 + expand;
    case "se":
      return angle >= 22.5 - expand && angle < 67.5 + expand;
    case "s":
      return angle >= 67.5 - expand && angle < 112.5 + expand;
    case "sw":
      return angle >= 112.5 - expand && angle < 157.5 + expand;
    case "w":
      return angle >= 157.5 - expand || angle < -157.5 + expand;
    case "nw":
      return angle >= -157.5 - expand && angle < -112.5 + expand;
    case "n":
      return angle >= -112.5 - expand && angle < -67.5 + expand;
    case "ne":
      return angle >= -67.5 - expand && angle < -22.5 + expand;
    case "center":
      return false;
  }
}

function getDirectionWithHysteresis(
  angle: number,
  current: PortraitDirection
): PortraitDirection {
  const raw = getRawDirectionForAngle(angle);
  if (raw === current) return current;
  if (current === "center") return raw;
  // If angle still within expanded current sector, keep current to avoid jitter at boundary
  if (isAngleInExpandedSector(angle, current, ANGLE_HYSTERESIS / 2)) {
    return current;
  }
  return raw;
}

type CursorTrackingPortraitProps = {
  alt: string;
};

export function CursorTrackingPortrait({ alt }: CursorTrackingPortraitProps) {
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const directionRef = useRef<PortraitDirection>("center");
  const candidateRef = useRef<PortraitDirection | null>(null);
  const candidateTimerRef = useRef<number | null>(null);
  const [direction, setDirection] = useState<PortraitDirection>("center");
  const [imagesReady, setImagesReady] = useState(false);
  const isDisabledRef = useRef(false);
  const isMountedRef = useRef(true);

  // Preload and decode all images before enabling tracking
  useEffect(() => {
    isMountedRef.current = true;
    let cancelled = false;

    const preload = async () => {
      const promises = Object.values(PORTRAIT_IMAGES).map(async (src) => {
        const img = new Image();
        img.src = src;
        // If decode is supported, wait for it; otherwise wait for onload
        const loadPromise = new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve(); // don't block on error
          }
        });

        if (img.decode) {
          try {
            await img.decode();
          } catch {
            // fallback: wait for load
            await loadPromise;
          }
        } else {
          await loadPromise;
        }
      });

      await Promise.all(promises);
      if (!cancelled && isMountedRef.current) {
        setImagesReady(true);
      }
    };

    preload();

    return () => {
      cancelled = true;
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const coarseMql = window.matchMedia("(pointer: coarse)");
    const reducedMql = window.matchMedia("(prefers-reduced-motion: reduce)");

    const checkDisabled = () => {
      const disabled = coarseMql.matches || reducedMql.matches;
      isDisabledRef.current = disabled;
      if (disabled && directionRef.current !== "center") {
        // Clear any pending candidate
        if (candidateTimerRef.current !== null) {
          window.clearTimeout(candidateTimerRef.current);
          candidateTimerRef.current = null;
        }
        candidateRef.current = null;
        directionRef.current = "center";
        setDirection("center");
      }
    };

    checkDisabled();

    const handleChange = () => checkDisabled();
    if (coarseMql.addEventListener) {
      coarseMql.addEventListener("change", handleChange);
      reducedMql.addEventListener("change", handleChange);
    } else {
      coarseMql.addListener(handleChange);
      reducedMql.addListener(handleChange);
    }

    const resetToCenter = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (candidateTimerRef.current !== null) {
        window.clearTimeout(candidateTimerRef.current);
        candidateTimerRef.current = null;
      }
      candidateRef.current = null;
      if (directionRef.current !== "center") {
        directionRef.current = "center";
        setDirection("center");
      }
    };

    const commitDirection = (next: PortraitDirection) => {
      if (next !== directionRef.current) {
        directionRef.current = next;
        setDirection(next);
      }
      candidateRef.current = null;
      if (candidateTimerRef.current !== null) {
        window.clearTimeout(candidateTimerRef.current);
        candidateTimerRef.current = null;
      }
    };

    const updateDirection = () => {
      rafRef.current = null;
      if (isDisabledRef.current) return;
      if (!imagesReady) return;
      const el = portraitRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = pointerRef.current.x - centerX;
      const dy = pointerRef.current.y - centerY;
      const distance = Math.hypot(dx, dy);

      let rawNext: PortraitDirection;
      if (directionRef.current === "center") {
        // Need to exceed exit radius to leave center
        if (distance < CENTER_EXIT_RADIUS) {
          rawNext = "center";
        } else {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          rawNext = getRawDirectionForAngle(angle);
        }
      } else {
        // Currently directional, need to enter within enter radius to return to center
        if (distance < CENTER_ENTER_RADIUS) {
          rawNext = "center";
        } else {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          rawNext = getDirectionWithHysteresis(angle, directionRef.current);
        }
      }

      if (rawNext === directionRef.current) {
        // Stable, clear any pending candidate
        if (candidateTimerRef.current !== null) {
          window.clearTimeout(candidateTimerRef.current);
          candidateTimerRef.current = null;
        }
        candidateRef.current = null;
        return;
      }

      // Candidate differs from current - require stability delay
      if (candidateRef.current !== rawNext) {
        candidateRef.current = rawNext;
        if (candidateTimerRef.current !== null) {
          window.clearTimeout(candidateTimerRef.current);
        }
        candidateTimerRef.current = window.setTimeout(() => {
          candidateTimerRef.current = null;
          // Only commit if candidate hasn't changed and still matches rawNext logic
          // Re-evaluate distance/angle at commit time to be safe, but use stored candidate
          if (candidateRef.current === rawNext) {
            commitDirection(rawNext);
          }
        }, STABILITY_DELAY_MS);
      }
      // If candidate already equals rawNext, wait for timer to fire
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDisabledRef.current) return;
      if (!imagesReady) return;
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateDirection);
      }
    };

    const onPointerLeave = () => {
      resetToCenter();
    };

    const onBlur = () => {
      resetToCenter();
    };

    // Only attach global tracking if not disabled and images ready
    // We still attach listeners always but early-return if disabled/not ready
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onBlur);
      if (coarseMql.removeEventListener) {
        coarseMql.removeEventListener("change", handleChange);
        reducedMql.removeEventListener("change", handleChange);
      } else {
        coarseMql.removeListener(handleChange);
        reducedMql.removeListener(handleChange);
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (candidateTimerRef.current !== null) {
        window.clearTimeout(candidateTimerRef.current);
        candidateTimerRef.current = null;
      }
    };
  }, [imagesReady]);

  // For touch/reduced-motion, render only default to save memory/video
  // But we still need to respect imagesReady gating for desktop
  const isCoarseOrReduced =
    typeof window !== "undefined" &&
    (window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // If on coarse/reduced, always show center with single image
  if (isCoarseOrReduced) {
    return (
      <div
        ref={portraitRef}
        className="relative isolate overflow-hidden bg-transparent border-0 shadow-none shrink w-[290px] xl:w-[300px] aspect-square max-w-full"
        style={{ aspectRatio: "1 / 1" }}
      >
        <img
          src={PORTRAIT_IMAGES.center}
          alt={alt}
          width={300}
          height={300}
          decoding="async"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-contain bg-transparent pointer-events-none select-none"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={portraitRef}
      className="relative isolate overflow-hidden bg-transparent border-0 shadow-none shrink w-[290px] xl:w-[300px] aspect-square max-w-full"
      style={{ aspectRatio: "1 / 1" }}
    >
      {/* While not ready, show only center; after ready, stacked layers */}
      {!imagesReady ? (
        <img
          src={PORTRAIT_IMAGES.center}
          alt={alt}
          width={300}
          height={300}
          decoding="async"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-contain bg-transparent pointer-events-none select-none"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />
      ) : (
        ALL_DIRECTIONS.map((dir) => (
          <img
            key={dir}
            src={PORTRAIT_IMAGES[dir]}
            alt={dir === "center" ? alt : ""}
            aria-hidden={dir !== "center" ? true : undefined}
            width={300}
            height={300}
            decoding="async"
            loading="eager"
            fetchPriority={dir === "center" ? "high" : "low"}
            className="absolute inset-0 h-full w-full object-contain bg-transparent pointer-events-none select-none"
            style={{
              opacity: direction === dir ? 1 : 0,
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              // No transition for instant switching; keep rendering stable
              transition: "none",
            }}
          />
        ))
      )}
    </div>
  );
}
