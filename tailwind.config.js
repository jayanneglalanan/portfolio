/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        ink: "var(--ink)",
        "ink-title": "var(--ink-title)",
        secondary: "var(--secondary)",
        "secondary-soft": "var(--secondary-soft)",
        muted: "var(--muted)",
        "muted-soft": "var(--muted-soft)",
        border: "var(--border)",
        "border-soft": "var(--border-soft)",
        "border-secondary": "var(--border-secondary)",
        divider: "var(--divider)",
        accent: "var(--accent)",
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        portfolio: "840px",
      },
    },
  },
  plugins: [],
}
