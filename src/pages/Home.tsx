import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { Hero } from "../components/hero/Hero";
import { Stats } from "../components/hero/Stats";
import { DotPattern } from "../components/decorations/DotPattern";
import { FeaturedProjects } from "../components/featured/FeaturedProjects";
import { ExperienceList } from "../components/experience/ExperienceList";
import { TechStack } from "../components/tech/TechStack";
import { About } from "../components/about/About";
import { Contact } from "../components/contact/Contact";
import { EmailFab } from "../components/contact/EmailFab";
import { AmbientLight } from "../components/theme/AmbientLight";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { portfolio } from "../data/portfolio";

export function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen bg-bg transition-colors duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none">
      {/* 1px top accent line */}
      <div className="fixed left-0 top-0 z-50 h-px w-full bg-accent" aria-hidden="true" />
      <div className="fixed right-5 top-[14px] z-40 md:right-8">
        <ThemeToggle />
      </div>
      <AmbientLight />

      {/* Page wrapper - narrow editorial */}
      <div className="relative z-10">
        <Container className="relative">
          <div className="relative">
            <DotPattern />
            <Hero />

            {/* Stats strip below hero */}
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }
              }
              className="mt-10 md:mt-14"
            >
              <Stats stats={portfolio.stats} />
            </motion.div>
          </div>
        </Container>

        {/* Main portfolio content */}
        <Container className="mt-14 md:mt-16 pb-20 md:pb-0">
          <div className="space-y-16 md:space-y-20">
            <Section
              number="01"
              label="Projects"
              id="work"
              action={
                <a
                  href="https://anwartechlabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View all projects at AnwarTechLabs"
                  className="group inline-flex items-center gap-1 font-mono text-[13px] tracking-[0.12em] text-[#8B8B87] transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent dark:text-muted dark:hover:text-white"
                >
                  ALL PROJECTS
                  <span
                    aria-hidden="true"
                    className="inline-block text-[11px] leading-none transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transform-none"
                  >
                    →
                  </span>
                </a>
              }
            >
              <FeaturedProjects projects={portfolio.projects} />
            </Section>

            <Section number="02" label="Experience" id="experience">
              <ExperienceList experience={portfolio.experience} />
            </Section>

            <Section number="03" label="Tech Stack" id="stack">
              <TechStack technologies={portfolio.technologies as Record<string, readonly string[]>} />
            </Section>

            <Section number="04" label="About" id="about">
              <About about={portfolio.about} />
            </Section>

            <Section number="05" label="Contact" id="contact">
              <Contact />
            </Section>
          </div>

          {/* Footer */}
          <footer className="mt-16 flex flex-col gap-3 border-t border-border py-6 md:mt-20 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] leading-none tracking-[0.03em] text-muted">
              <span>{portfolio.footer.copyright}</span>
            </div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
              }}
              className="font-mono text-[11px] tracking-[0.03em] text-muted underline decoration-transparent underline-offset-4 transition-colors hover:text-ink hover:decoration-ink focus-visible:decoration-accent"
            >
              Back to top ↑
            </a>
          </footer>
        </Container>

        {/* Generous bottom whitespace like reference */}
        <div className="h-10 md:h-16" aria-hidden="true" />
        <EmailFab />
      </div>
    </div>
  );
}
