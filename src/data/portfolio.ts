export type SocialLink = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Project = {
  id: string;
  num: string;
  title: string;
  description: string;
  tech: string[];
  year: string;
  href: string;
  image?: string;
};

export type Experience = {
  year: string;
  role: string;
  org: string;
  description: string;
};

export type TechGroup = {
  label: string;
  items: string[];
};

export const portfolio = {
  name: "Jay Anne Gua-an Lalanan",
  intro: "Frontend Developer & UI/UX Designer with a BSIT background.",
  bio: "Creating clean interfaces, responsive experiences, and practical digital products at AnwarTechLabs.",
  socialLinks: [
    { label: "github", href: "https://github.com/jayanneglalanan" },
    { label: "anwartechlabs", href: "https://anwartechlabs.com" },
    { label: "instagram", href: "https://www.instagram.com/jayyyyyanne" },
  ] satisfies SocialLink[],

  stats: [
    { value: "2026", label: "BSIT GRADUATE" },
    { value: "Bukidnon", label: "PHILIPPINES" },
    { value: "SupportZebra", label: "IT INTERN" },
    { value: "AnwarTechLabs", label: "FRONTEND / UI UX" },
  ] satisfies Stat[],

  projects: [
    {
      id: "kapeflow-admin",
      num: "01",
      title: "KapeFlowAdmin",
      description: "Coffee shop POS & admin dashboard to manage orders, inventory, and sales analytics.",
      tech: ["React", "Tailwind CSS", "Supabase"],
      year: "2024",
      href: "https://brewed-phi.vercel.app",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=520&h=340&fit=crop&crop=center",
    },
    {
      id: "hotel-de-susana",
      num: "02",
      title: "HotelDeSusana",
      description: "Hotel booking platform with room browsing, real-time availability, and seamless reservations.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      year: "2024",
      href: "https://hotelwebbb.netlify.app",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=520&h=340&fit=crop&crop=center",
    },
    {
      id: "worklink",
      num: "03",
      title: "WorkLink",
      description: "Workforce helper admin to connect clients with skilled workers and manage hires.",
      tech: ["React", "TypeScript", "Supabase"],
      year: "2025",
      href: "https://handy-helper-admin.vercel.app",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=520&h=340&fit=crop&crop=center",
    },
  ] satisfies Project[],

  experience: [
    {
      year: "2026",
      role: "BS Information Technology",
      org: "PHINMA - Cagayan de Oro College",
      description: "Bachelor of Science in Information Technology with a focus on software development, systems, and digital solutions.",
    },
    {
      year: "2026",
      role: "IT Intern",
      org: "SupportZebra — Custodian / Help Desk",
      description: "Formatting devices, troubleshooting, ticketing and remote technical assistance.",
    },
    {
      year: "2026",
      role: "Frontend Developer / UI UX Designer",
      org: "AnwarTechLabs",
      description: "Building websites, mobile apps, and progressive systems for clients use.",
    },
  ] satisfies Experience[],

  technologies: {
    FRONTEND: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    MOBILE: ["React Native", "Expo"],
    BACKEND: ["Supabase", "REST APIs"],
    TOOLS: ["Git", "GitHub", "VS Code"],
  } as Record<string, string[]>,

  about: {
    paragraphs: [
      "I'm Jay Anne Gua-an Lalanan, a BSIT graduate, Frontend Developer, and UI/UX Designer at AnwarTechLabs.",
      "I focus on creating clean, practical, and user-friendly digital experiences that solve real-world problems.",
      "My internship experience centered on technical troubleshooting, device formatting, system setup, remote assistance, and resolving hardware and software issues. It gave me a practical mindset that I bring into every project I work on.",
    ],
  },

  contact: {
    prompt: "For inquiries, feel free to reach me at",
    email: "jayanneglalanan@gmail.com",
    emailHref: "mailto:jayanneglalanan@gmail.com",
  },

  footer: {
    copyright: "© 2026 Jay Anne Gua-an Lalanan",
    builtWith: "Built with React + TypeScript",
  },
} as const;

export type Portfolio = typeof portfolio;
