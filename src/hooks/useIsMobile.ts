import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)");
    const onChange = () => {
      setIsMobile(coarse.matches || window.innerWidth <= breakpoint);
    };
    if (coarse.addEventListener) coarse.addEventListener("change", onChange);
    else coarse.addListener(onChange as any);
    window.addEventListener("resize", onChange);
    return () => {
      if (coarse.removeEventListener) coarse.removeEventListener("change", onChange);
      else coarse.removeListener(onChange as any);
      window.removeEventListener("resize", onChange);
    };
  }, [breakpoint]);

  return isMobile;
}
