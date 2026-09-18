import { useState } from "react";
import { portfolio } from "../../data/portfolio";
import { SocialLinks } from "../hero/SocialLinks";
import { useIsMobile } from "../../hooks/useIsMobile";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = portfolio.contact.email;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  const isMobile = useIsMobile();

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Mobile: pointer coarse OR ≤640px → native mailto (+ copy for feedback)
    if (isMobile) {
      navigator.clipboard?.writeText(email).catch(() => {});
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      return;
    }
    e.preventDefault();
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="border-t border-border pt-8">
      <p className="font-sans text-[18px] leading-none text-ink">
        {portfolio.contact.prompt}
      </p>
      <a
        href={portfolio.contact.emailHref}
        onClick={handleEmailClick}
        aria-label={`Email ${email} — opens Gmail compose and copies address`}
        className="mt-3 inline-flex items-center gap-1.5 font-mono text-[14.5px] font-normal leading-none tracking-[-0.015em] text-ink underline decoration-1 underline-offset-4 decoration-border transition-colors hover:decoration-ink focus-visible:decoration-accent"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
          className="shrink-0 text-muted"
        >
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="M3 7l9 7 9-7" />
        </svg>
        {portfolio.contact.email}
        <span aria-hidden="true" className="text-[11px] translate-y-[-1px] text-muted">
          ↗
        </span>
      </a>
      {copied && (
        <span role="status" aria-live="polite" className="ml-3 font-mono text-[11px] tracking-[0.03em] text-accent">
          Copied!
        </span>
      )}

      <div className="mt-8">
        <SocialLinks links={portfolio.socialLinks} />
      </div>
    </div>
  );
}
