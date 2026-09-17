import { useState } from "react";
import { portfolio } from "../../data/portfolio";
import type { SocialLink } from "../../data/portfolio";

type SocialLinksProps = {
  links: readonly SocialLink[];
};

export function SocialLinks({ links }: SocialLinksProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isEmail = href.startsWith("mailto:");
    if (!isEmail) return;
    e.preventDefault();
    const email = portfolio.contact.email;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2000);
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <nav aria-label="Social links">
      <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px] lowercase leading-none text-muted">
        {links.map((link) => {
          const isEmail = link.href.startsWith("mailto:");
          return (
            <li key={link.label} className="inline-flex items-center gap-1.5">
              <a
                href={link.href}
                target={isEmail ? undefined : link.href.startsWith("http") ? "_blank" : undefined}
                rel={isEmail ? undefined : link.href.startsWith("http") ? "noreferrer" : undefined}
                onClick={(e) => handleEmailClick(e, link.href)}
                aria-label={isEmail ? `Email ${portfolio.contact.email} — opens Gmail compose and copies address` : undefined}
                className="inline-flex items-center gap-[3px] underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-ink focus-visible:decoration-accent md:hover:text-accent"
              >
                {link.label}
                <span aria-hidden="true" className="text-[11px] leading-none translate-y-[-1px]">
                  ↗
                </span>
              </a>
              {isEmail && copiedEmail && (
                <span role="status" aria-live="polite" className="font-mono text-[11px] tracking-[0.03em] text-accent">
                  Copied!
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
