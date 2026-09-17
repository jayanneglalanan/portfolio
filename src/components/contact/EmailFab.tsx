import { useState } from "react";
import { portfolio } from "../../data/portfolio";

export function EmailFab() {
  const [copied, setCopied] = useState(false);
  const email = portfolio.contact.email;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={portfolio.contact.emailHref}
      onClick={handleClick}
      aria-label={`Email ${email} — opens Gmail compose and copies address`}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-bg shadow-lg shadow-black/15 transition-transform active:scale-95 md:hidden"
      style={{
        bottom: "calc(1.25rem + env(safe-area-inset-bottom))",
        right: "calc(1.25rem + env(safe-area-inset-right))",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="M3 7l9 7 9-7" />
      </svg>
      {copied && (
        <span
          role="status"
          aria-live="polite"
          className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 font-mono text-[11px] text-bg shadow-md"
        >
          Copied!
        </span>
      )}
    </a>
  );
}
