import { useState } from "react";

type HalftonePortraitProps = {
  src: string;
  alt: string;
};

export function HalftonePortrait({ src, alt }: HalftonePortraitProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="relative isolate overflow-hidden bg-[#EDEDE9] shrink-0 w-[240px] h-[240px] sm:w-[260px] sm:h-[260px] md:w-[260px] md:h-[270px] lg:w-[284px] lg:h-[284px]"
      style={{
        maxWidth: "100%",
      }}
    >
      {!failed ? (
        <>
          <img
            src={src}
            alt={alt}
            width={284}
            height={284}
            loading="eager"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top"
            style={{
              filter: "grayscale(1) contrast(1.22) brightness(0.99)",
            }}
          />
          {/* Halftone dot overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,0.92) 1.05px, transparent 1.18px)",
              backgroundSize: "3.1px 3.1px",
              mixBlendMode: "multiply",
              opacity: 0.26,
            }}
          />
          {/* Second grain / contrast layer - very subtle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          {/* subtle bottom fade - no gradient per restraint, keep halftone pure */}
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#E8E6E1] font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <span className="border border-border bg-bg px-3 py-1.5">Portrait</span>
        </div>
      )}
    </div>
  );
}
