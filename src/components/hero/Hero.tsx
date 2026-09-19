import { motion, useReducedMotion } from "framer-motion";
import { CursorTrackingPortrait } from "../CursorTrackingPortrait";
import { SocialLinks } from "./SocialLinks";
import { portfolio } from "../../data/portfolio";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fade = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      };

  const stagger = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.5,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <div className="pt-[72px] md:pt-[104px] lg:pt-[112px]">
      {/* Mobile: < md — single column portrait -> name -> bio -> social (photo above text, centered) */}
      <div className="md:hidden">
        <motion.div {...stagger(0)} className="flex justify-center">
          <CursorTrackingPortrait
            alt={`Portrait of ${portfolio.name}, halftone style`}
          />
        </motion.div>

        <motion.div {...stagger(0.08)} className="mt-7">
          <h1 className="font-mono text-[28px] sm:text-[32px] font-[400] leading-[0.96] tracking-[-0.025em] text-ink">
            Jay Anne Lalanan
          </h1>
          <p className="sr-only">Jay Anne Gua-an Lalanan - Frontend Developer & UI/UX Designer at AnwarTechLabs, PHINMA Cagayan de Oro College BSIT 2026, Bukidnon Philippines</p>
        </motion.div>

        <motion.div
          {...stagger(0.14)}
          className="mt-5 max-w-[380px] space-y-[20px] font-sans text-[15px] leading-[1.7] text-secondary"
        >
          <p>{portfolio.intro}</p>
          <p>{portfolio.bio}</p>
        </motion.div>

        <motion.div {...stagger(0.22)} className="mt-7">
          <SocialLinks links={portfolio.socialLinks} />
        </motion.div>
      </div>

      {/* Tablet: md to lg — compact two-col (same size as desktop 290px) */}
      <div className="hidden md:grid lg:hidden md:grid-cols-[290px_minmax(0,1fr)] md:gap-10 md:items-start">
        <motion.div {...fade} className="pt-1">
          <CursorTrackingPortrait
            alt={`Portrait of ${portfolio.name}, halftone style`}
          />
        </motion.div>
        <div className="min-w-0">
          <motion.h1
            {...stagger(0.06)}
            className="font-mono text-[34px] font-[400] leading-[0.96] tracking-[-0.025em] text-ink"
          >
            Jay Anne Lalanan
          </motion.h1>
          <p className="sr-only">Jay Anne Gua-an Lalanan - Frontend Developer & UI/UX Designer at AnwarTechLabs, PHINMA Cagayan de Oro College BSIT 2026, Bukidnon Philippines</p>
          <motion.div
            {...stagger(0.14)}
            className="mt-5 max-w-[380px] space-y-[20px] font-sans text-[15px] leading-[1.7] text-secondary"
          >
            <p>{portfolio.intro}</p>
            <p>{portfolio.bio}</p>
          </motion.div>
          <motion.div {...stagger(0.22)} className="mt-6">
            <SocialLinks links={portfolio.socialLinks} />
          </motion.div>
        </div>
      </div>

      {/* Desktop: lg+ — editorial portrait + bio */}
      <div className="hidden lg:grid lg:grid-cols-[290px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] lg:gap-12 xl:gap-12 lg:items-start">
        <motion.div {...fade} className="pt-1">
          <CursorTrackingPortrait
            alt={`Portrait of ${portfolio.name}, halftone style`}
          />
        </motion.div>

        <div className="min-w-0">
          <motion.h1
            {...stagger(0.06)}
            className="font-mono text-[38px] font-[400] leading-[0.96] tracking-[-0.025em] text-ink"
          >
            Jay Anne Lalanan
          </motion.h1>
          <p className="sr-only">Jay Anne Gua-an Lalanan - Frontend Developer & UI/UX Designer at AnwarTechLabs, PHINMA Cagayan de Oro College BSIT 2026, Bukidnon Philippines</p>

          <motion.div
            {...stagger(0.14)}
            className="mt-5 max-w-[380px] space-y-[22px] font-sans text-[15px] leading-[1.7] text-secondary"
          >
            <p>{portfolio.intro}</p>
            <p>{portfolio.bio}</p>
          </motion.div>

          <motion.div {...stagger(0.22)} className="mt-7">
            <SocialLinks links={portfolio.socialLinks} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
