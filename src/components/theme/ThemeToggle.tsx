import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animatingRef = useRef(false);

  // Sync theme to document — used by non-ViewTransition fallback and initial load
  // During View Transition reveal, html,body transitions are disabled via .reveal-active
  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    root.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {}
      setTheme(e.matches ? "dark" : "light");
    };
    if (mql.addEventListener) mql.addEventListener("change", handleChange);
    else mql.addListener(handleChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", handleChange);
      else mql.removeListener(handleChange);
    };
  }, []);

  const isDark = theme === "dark";

  const handleToggle = () => {
    // DO NOT queue multiple toggles while animating
    if (animatingRef.current) return;
    const next: Theme = isDark ? "light" : "dark";
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion → very short transition or instant
    if (reduce) {
      setTheme(next);
      return;
    }

    const btn = buttonRef.current;
    if (!btn) {
      setTheme(next);
      return;
    }

    // Button press feedback: 1 → 0.94 → 1, 150ms subtle (no bounce)
    btn.animate(
      [{ transform: "scale(1)" }, { transform: "scale(0.94)" }, { transform: "scale(1)" }],
      { duration: 150, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
    );
    // Brief purple accent glow 200-300ms
    const prevShadow = btn.style.boxShadow;
    btn.style.boxShadow = "0 0 20px rgba(130, 110, 210, 0.15)";
    window.setTimeout(() => {
      btn.style.boxShadow = prevShadow;
    }, 280);

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxRadius = Math.max(
      Math.hypot(x, y),
      Math.hypot(window.innerWidth - x, y),
      Math.hypot(x, window.innerHeight - y),
      Math.hypot(window.innerWidth - x, window.innerHeight - y)
    );
    const r = Math.ceil(maxRadius + 40);

    const root = document.documentElement;
    root.style.setProperty("--x", `${x}px`);
    root.style.setProperty("--y", `${y}px`);
    root.style.setProperty("--r", `${r}px`);
    root.style.setProperty("--r-soft", `${r + 40}px`);

    // Prevent double-animate: disable html,body color transitions during View Transition reveal
    // View Transition will handle the main theme change via clip-path
    animatingRef.current = true;
    btn.disabled = true;
    const docWithVT = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void>; ready: Promise<void> };
    };

    const finish = () => {
      window.setTimeout(() => {
        animatingRef.current = false;
        if (btn) btn.disabled = false;
        root.classList.remove("reveal-active");
      }, 750);
    };

    if (docWithVT.startViewTransition) {
      root.classList.add("reveal-active");
      const vt = docWithVT.startViewTransition(() => {
        // Single reliable theme state update inside transition
        setTheme(next);
      });
      vt.finished.finally(() => {
        // Ensure theme class is committed and reveal completes
        finish();
      });
      // Fallback safety if finished never resolves
      window.setTimeout(() => {
        if (animatingRef.current) {
          root.classList.remove("reveal-active");
          animatingRef.current = false;
          btn.disabled = false;
        }
      }, 900);
    } else {
      // Fallback browser: smooth 350ms specific transitions (background-color/color/border-color) — NOT transition: all
      // Do NOT force 750ms on fallback; let html,body 400ms handle it
      setTheme(next);
      window.setTimeout(() => {
        animatingRef.current = false;
        btn.disabled = false;
      }, 400);
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-[5px] border border-border bg-transparent text-muted transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 dark:border-white/[0.10] dark:text-muted dark:hover:border-white/15 dark:hover:text-white will-change-transform"
    >
      <span aria-hidden="true" className="relative inline-flex h-4 w-4 items-center justify-center">
        <span
          className={`absolute inset-0 inline-flex items-center justify-center transition-all duration-[280ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform ${isDark ? "opacity-0 scale-75 rotate-[35deg]" : "opacity-100 scale-100 rotate-0"}`}
        >
          <Moon size={16} strokeWidth={1.8} />
        </span>
        <span
          className={`absolute inset-0 inline-flex items-center justify-center transition-all duration-[280ms] ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform ${isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-[-35deg]"}`}
        >
          <Sun size={16} strokeWidth={1.8} />
        </span>
      </span>
    </button>
  );
}
