type TechStackProps = {
  technologies: Record<string, readonly string[]>;
};

export function TechStack({ technologies }: TechStackProps) {
  return (
    <div className="border-t border-border pt-6">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
        {Object.entries(technologies).map(([label, items]) => (
          <div key={label}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              {label}
            </h3>
            <ul className="mt-3 space-y-[4px]">
              {items.map((item) => (
                <li
                  key={item}
                  className="font-sans text-[14px] leading-[1.9] text-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
