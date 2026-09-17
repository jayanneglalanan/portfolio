export function DotPattern() {
  return (
    <>
      {/* Upper-right cluster */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[4px] top-[68px] hidden h-[132px] w-[220px] opacity-[0.18] dark:opacity-[0.18] md:block lg:right-[8px] bg-[radial-gradient(circle,rgba(0,0,0,0.22)_1px,transparent_1.15px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.10)_1px,transparent_1.15px)]"
        style={{
          backgroundSize: "13px 13px",
          maskImage:
            "radial-gradient(ellipse at center, black 58%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 58%, transparent 78%)",
        }}
      />
      {/* Lower-left cluster */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-24px] left-[4px] hidden h-[160px] w-[180px] opacity-[0.15] dark:opacity-[0.15] md:block bg-[radial-gradient(circle,rgba(0,0,0,0.20)_1px,transparent_1.15px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.09)_1px,transparent_1.15px)]"
        style={{
          backgroundSize: "14px 14px",
          maskImage:
            "radial-gradient(ellipse at center, black 62%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 62%, transparent 82%)",
        }}
      />
      {/* Subtle small cluster below stats - visible on desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-40px] right-[40px] hidden h-[74px] w-[140px] opacity-[0.12] dark:opacity-[0.12] md:block bg-[radial-gradient(circle,rgba(0,0,0,0.16)_1px,transparent_1.15px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1.15px)]"
        style={{
          backgroundSize: "12px 12px",
          maskImage:
            "radial-gradient(ellipse at center, black 60%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 60%, transparent 80%)",
        }}
      />
      {/* Mobile faint top dots - very subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-[18px] h-[84px] w-[96px] opacity-[0.10] dark:opacity-[0.10] md:hidden bg-[radial-gradient(circle,rgba(0,0,0,0.18)_1px,transparent_1.15px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.09)_1px,transparent_1.15px)]"
        style={{
          backgroundSize: "12px 12px",
          maskImage:
            "radial-gradient(ellipse at center, black 65%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 65%, transparent 85%)",
        }}
      />
    </>
  );
}
