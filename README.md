# Jay Anne Lalanan — Developer Portfolio

Editorial, minimalist portfolio built with:

- **React 19 + TypeScript 6 + Vite 8**
- **Tailwind CSS 3.4**
- **Framer Motion** (subtle entrance + project preview)
- **Lucide React** (installed, arrows use literal `↗` per spec)

## Quick Start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build -> dist/
npm run preview  # preview production build
```

## Editing Content

All personal data is in **one file**:

`src/data/portfolio.ts`

```ts
export const portfolio = {
  name: "Jay Anne Lalanan",
  intro: "...",
  bio: "...",
  socialLinks: [ {label:"github", href:"..."} ],
  stats: [ {value:"10+", label:"PROJECTS"} ],
  projects: [ {num:"01", title:"...", tech:["React"], year:"2025", href:"#", image:"..."} ],
  experience: [ {year:"2026", role:"IT INTERN", org:"...", description:"..."} ],
  technologies: { FRONTEND:["React","TypeScript"], MOBILE:["React Native","Expo"] },
  about: { paragraphs: ["...", "..."] },
  contact: { prompt:"Have a project in mind?", email:"..." }
}
```

Edit and rebuild — no other files need touching.

## Portrait

Default uses a remote Unsplash placeholder via `REMOTE_PORTRAIT` in `src/pages/Home.tsx`.

To use your own:

1. Add `public/portrait.jpg` (600×600 recommended, square, centered face)
2. It auto-detects `/portrait.jpg` and replaces remote image
3. Halftone effect is CSS-only: `grayscale + contrast + radial dot overlay` (no canvas)

Keep background transparent/light for best newspaper effect.

## Design Tokens

`tailwind.config.js`

```js
bg: "#FAFAF8"
ink: "#171717"
secondary: "#626262"
muted: "#898989"
border: "#E5E5E2"
accent: "#7867C7"
max-w: 840px
mono: "IBM Plex Mono"
sans: "Inter"
```

Top accent line: `1px solid #7867C7` fixed top.
Dot pattern: `radial-gradient` decorative, `aria-hidden`, low opacity 0.12-0.18.

## Deploy

Vite builds static assets to `dist/` — deploy to:

- Vercel: `vercel --prod`
- Netlify: drag `dist` or `netlify deploy`
- GitHub Pages: `gh-pages -d dist`

## Structure

```
src/
  data/portfolio.ts
  components/
    layout/Container, Section
    hero/Hero, HalftonePortrait, SocialLinks, Stats
    projects/ProjectList, ProjectRow, ProjectPreview
    experience/ExperienceList
    tech/TechStack
    about/About
    contact/Contact
    decorations/DotPattern
  pages/Home.tsx
  App.tsx
```

No `any`, no giant components, no `useEffect` bloat, no gradients (except required halftone/dot), no rounded containers, no shadows.

## Accessibility

- Semantic HTML, keyboard nav, visible focus ring (`#7867C7`)
- `prefers-reduced-motion` respected
- Decorative dots `aria-hidden`
- `alt` on portrait, external links with `rel="noreferrer"` + `target="_blank"`

## Responsive

Verified at 375 / 430 / 768 / 1024 / 1440:
- Mobile hero: Name → Bio → Portrait (240px) → Social → Stats (2x2)
- Tablet: 260px portrait + bio two-col
- Desktop: 290px portrait / 44px gap
- No horizontal overflow, stats never cramped, dot pattern never reduces readability.
