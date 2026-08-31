export type HeroContent = {
  availabilityText: string;
  firstName: string;
  lastName: string;
  imageSrc: string;
  imageAlt: string;
  headlinePrimary: string;
  headlineSecondary: string;
  professionLabel: string;
  countryLabel: string;
  role: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string;
  tags: string[];
};

export type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

export type AboutContent = {
  sectionLabel: string;
  titlePrimary: string;
  titleSecondary: string;
  resumeUrl: string;
  imageSrc: string;
  imageAlt: string;
  paragraphs: string[];
  experiences: ExperienceItem[];
  stats: StatItem[];
  ctaText: string;
  ctaHref: string;
  ctaLabel: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  image: string;
  link: string;
  type: string;
  year: string;
  tech: string[];
};

export type WorksContent = {
  sectionLabel: string;
  titlePrimary: string;
  titleSecondary: string;
  githubUrl: string;
  githubLabel: string;
  projects: ProjectItem[];
};

export type SkillItem = {
  name: string;
  icon: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  color: string;
  skills: SkillItem[];
};

export type SkillsContent = {
  titlePrimary: string;
  titleSecondary: string;
  description: string;
  endLabel: string;
  categories: SkillCategory[];
};

export type ContactLink = {
  id: string;
  label: string;
  value: string;
  href: string;
};

export type ContactContent = {
  sectionLabel: string;
  titlePrimary: string;
  titleSecondary: string;
  availabilityText: string;
  locationLabel: string;
  links: ContactLink[];
  copyrightName: string;
  rightsLabel: string;
  backToTopLabel: string;
};

export type TerminalCommand = {
  command: string;
  title: string;
  output: string[];
};

export type TerminalMetric = {
  value: string;
  label: string;
};

export type TerminalContent = {
  eyebrow: string;
  title: string;
  description: string;
  prompt: string;
  commands: TerminalCommand[];
  metrics: TerminalMetric[];
};

export type AchievementItem = {
  id: string;
  title: string;
  issuer: string;
  issuedOn: string;
  description: string;
  image: string;
  verifyUrl: string;
};

export type AchievementsContent = {
  sectionLabel: string;
  title: string;
  description: string;
  items: AchievementItem[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  content: string;
  published: boolean;
};

export type BlogContent = {
  eyebrow: string;
  title: string;
  description: string;
  posts: BlogPost[];
};

export type PortfolioContent = {
  hero: HeroContent;
  terminal: TerminalContent;
  about: AboutContent;
  works: WorksContent;
  skills: SkillsContent;
  achievements: AchievementsContent;
  blog: BlogContent;
  contact: ContactContent;
};

export const developerTerminalPreset: TerminalContent = {
  eyebrow: "ENGINEERING / RELEASE CONSOLE",
  title: "From commit to production",
  description:
    "Real commands from a modern delivery workflow: validate the codebase, start infrastructure, migrate data, and verify a safe production rollout.",
  prompt: "nirupam@devbox",
  commands: [
    {
      command: "pnpm exec tsc --noEmit && pnpm lint",
      title: "Quality gate passed",
      output: [
        "TypeScript: 0 type errors",
        "ESLint: 0 warnings",
        "Import boundaries verified",
        "Commit is safe to merge",
      ],
    },
    {
      command: "docker compose up -d --build",
      title: "Local stack is healthy",
      output: [
        "API image built from cache",
        "PostgreSQL accepting connections",
        "Redis healthcheck passed",
        "Services available on the dev network",
      ],
    },
    {
      command: "pnpm prisma migrate deploy",
      title: "Database schema synchronized",
      output: [
        "Migration history validated",
        "Pending migrations applied atomically",
        "Generated client matches the schema",
        "No destructive changes detected",
      ],
    },
    {
      command: "kubectl rollout status deployment/api",
      title: "Production rollout verified",
      output: [
        "New replica set is available",
        "Readiness and liveness probes passed",
        "Zero unavailable replicas",
        "Deployment successfully rolled out",
      ],
    },
  ],
  metrics: [
    { value: "0", label: "type and lint errors" },
    { value: "4/4", label: "healthy local services" },
    { value: "100%", label: "available replicas" },
  ],
};

export const defaultPortfolioContent: PortfolioContent = {
  hero: {
    availabilityText: "Available for new projects",
    firstName: "NIRUPAM",
    lastName: "PAL",
    imageSrc: "/nirupam.png",
    imageAlt: "Nirupam Pal",
    headlinePrimary: "Ideas into",
    headlineSecondary: "interfaces.",
    professionLabel: "Fullstack developer",
    countryLabel: "India",
    role: "Engineering digital excellence. I build scalable backend architecture and fluid interfaces that define the modern web.",
    description:
      "Fullstack developer focused on modern interfaces, strong backend architecture, and production-ready delivery.",
    primaryCtaLabel: "View Selected Works",
    primaryCtaHref: "#works",
    secondaryCtaLabel: "Download CV",
    secondaryCtaHref: "https://drive.google.com/file/d/1WdiR6QzRi3tsuMX-d5JHZ3_t3tnH_F-z/view",
  },
  terminal: developerTerminalPreset,
  about: {
    sectionLabel: "01 / ABOUT ME",
    titlePrimary: "Engineer.",
    titleSecondary: "Problem Solver.",
    resumeUrl: "https://drive.google.com/file/d/1WdiR6QzRi3tsuMX-d5JHZ3_t3tnH_F-z/view",
    imageSrc: "/nirupam.png",
    imageAlt: "Nirupam Pal",
    paragraphs: [
      "I build production-ready web applications with a relentless focus on performance and scalability.",
      "Since April 2025, I have been working at Microace Software as a Fullstack Developer, where I build and lead projects across billing, mobile ordering, hotel management, and real-time chat with video calling.",
      "When I'm not pushing code, I'm likely exploring cloud-native technologies, optimizing CI/CD pipelines, or contributing to the developer community in India.",
    ],
    experiences: [
      {
        id: "01",
        title: "Fullstack Developer",
        company: "Microace Software",
        date: "Apr 2025 - Present",
        description:
          "Built and led fullstack projects including a POS billing system, mobile ordering app, hotel management system, and a real-time chat application with video calls and other features.",
        tags: ["Fullstack", "Leadership", "Real-time Apps"],
      },
      {
        id: "02",
        title: "Fullstack Developer",
        company: "Project-Based Work",
        date: "2022 - 2024",
        description:
          "Delivered 15+ end-to-end solutions including e-commerce platforms and real-time chat apps. Handled database design, API development, and UI implementation.",
        tags: ["Fullstack", "DB Design", "React"],
      },
      {
        id: "03",
        title: "Continuous Learning",
        company: "Self-Development",
        date: "Ongoing",
        description:
          "Deepening expertise in distributed systems. Currently building custom Kubernetes operators and exploring Rust for high-performance tooling.",
        tags: ["R&D", "Rust", "K8s"],
      },
    ],
    stats: [
      { value: 3, suffix: "+", label: "Years Exp." },
      { value: 20, suffix: "+", label: "Projects" },
      { value: 100, suffix: "%", label: "Commitment" },
    ],
    ctaText: "Interested in working together?",
    ctaHref: "#contact",
    ctaLabel: "Let's Talk ->",
  },
  works: {
    sectionLabel: "02 / PORTFOLIO",
    titlePrimary: "Selected",
    titleSecondary: "Works.",
    githubUrl: "https://github.com/nirupampal",
    githubLabel: "More on GitHub",
    projects: [
      {
        title: "E-Commerce Platform",
        description:
          "Fullstack Next.js store with Stripe payments, inventory management, and optimized performance for scale.",
        image: "/e-commerce.png",
        link: "https://delacruash.vercel.app/",
        type: "Fullstack",
        year: "2024",
        tech: ["Next.js", "Stripe", "PostgreSQL"],
      },
      {
        title: "EdTech Website",
        description:
          "Interactive online learning platform with teacher dashboards, student progress tracking, and live classes.",
        image: "/edtech.webp",
        link: "#",
        type: "EdTech",
        year: "2024",
        tech: ["React", "Node.js", "WebRTC"],
      },
      {
        title: "Weather App",
        description:
          "A responsive weather dashboard built with React, consuming external weather APIs and providing forecasts.",
        image: "/weather.png",
        link: "https://weather-app-by-nirupampal.vercel.app/",
        type: "Frontend",
        year: "2023",
        tech: ["React", "API", "Tailwind"],
      },
      {
        title: "Calculator App",
        description:
          "A simple and intuitive calculator app built with React, featuring basic arithmetic operations and a clean UI.",
        image: "/calculator.png",
        link: "https://calculator-app-alpha-olive.vercel.app/",
        type: "Frontend",
        year: "2023",
        tech: ["React", "CSS"],
      },
    ],
  },
  skills: {
    titlePrimary: "Tech",
    titleSecondary: "Stack.",
    description: "A curated list of technologies I use to build digital products. Scroll down to explore my expertise.",
    endLabel: "END OF LIST",
    categories: [
      {
        id: "frontend",
        title: "Frontend",
        description:
          "Crafting pixel-perfect, responsive user interfaces with a focus on performance and accessibility. I specialize in the React ecosystem.",
        color: "#61DAFB",
        skills: [
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextdotjs" },
          { name: "TypeScript", icon: "typescript" },
          { name: "Tailwind CSS", icon: "tailwindcss" },
          { name: "Framer Motion", icon: "framer" },
          { name: "React Native", icon: "react" },
        ],
      },
      {
        id: "backend",
        title: "Backend",
        description:
          "Architecting scalable server-side solutions. I build robust APIs and handle real-time communications.",
        color: "#68A063",
        skills: [
          { name: "Node.js", icon: "nodedotjs" },
          { name: "Express", icon: "express" },
          { name: "Socket.io", icon: "socketdotio" },
          { name: "GraphQL", icon: "graphql" },
          { name: "Python", icon: "python" },
        ],
      },
      {
        id: "database",
        title: "Database",
        description:
          "Designing efficient data schemas. I work with both relational and document-based databases to ensure data integrity.",
        color: "#336791",
        skills: [
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "MongoDB", icon: "mongodb" },
          { name: "Redis", icon: "redis" },
          { name: "Firebase", icon: "firebase" },
          { name: "Supabase", icon: "supabase" },
        ],
      },
      {
        id: "devops",
        title: "DevOps",
        description:
          "Streamlining deployment pipelines. I ensure code gets to production safely and servers remain healthy.",
        color: "#E34F26",
        skills: [
          { name: "Docker", icon: "docker" },
          { name: "AWS", icon: "amazonaws" },
          { name: "Git", icon: "git" },
          { name: "CI/CD", icon: "githubactions" },
          { name: "Linux", icon: "linux" },
        ],
      },
    ],
  },
  achievements: {
    sectionLabel: "05 / ACHIEVEMENTS",
    title: "Proof behind the practice.",
    description:
      "Selected certifications, milestones, and recognitions from the work behind the screen.",
    items: [
      {
        id: "hackerrank-software-engineer-2026",
        title: "Software Engineer",
        issuer: "HackerRank",
        issuedOn: "09 Jan 2026",
        description:
          "Verified software engineering skills across problem solving, SQL, and REST API development.",
        image: "/hacker-rank-software-engineer.png",
        verifyUrl: "https://www.hackerrank.com/certificates/iframe/db1cfdf0bbf4",
      },
    ],
  },
  blog: {
    eyebrow: "Notes from the build",
    title: "Ideas, decisions, and lessons from shipping software.",
    description:
      "Practical notes on fullstack engineering, product craft, performance, and the systems behind modern web experiences.",
    posts: [
      {
        id: "building-products-that-last",
        slug: "building-products-that-last",
        title: "Building products that last beyond the first release",
        excerpt:
          "A practical framework for balancing delivery speed, maintainability, and the user experience.",
        coverImage: "/TechStack.png",
        publishedAt: "2026-08-24",
        readTime: "6 min read",
        tags: ["Engineering", "Product", "Architecture"],
        published: true,
        content:
          "Great software is rarely the result of one clever decision. It comes from hundreds of small choices that keep the product understandable, adaptable, and useful.\n\n## Start with the job to be done\n\nBefore choosing a framework or drawing a schema, get precise about the user problem. The best technical solution is the one that removes friction without creating unnecessary operational weight.\n\n## Build for change, not prediction\n\nArchitecture should make the next reasonable change inexpensive. Clear boundaries, readable naming, and observable behavior usually create more value than premature abstraction.\n\n## Make quality part of delivery\n\nPerformance, accessibility, and failure states are not polish. They are part of the feature. Treating them that way from the first commit produces calmer releases and more trustworthy products.",
      },
    ],
  },
  contact: {
    sectionLabel: "04 / CONTACT",
    titlePrimary: "Let's work",
    titleSecondary: "together.",
    availabilityText: "Currently open for freelance projects and full-time opportunities.",
    locationLabel: "KRISHNANAGAR, IN",
    links: [
      {
        id: "01",
        label: "Email",
        value: "nirupampaldev@gmail.com",
        href: "mailto:nirupampaldev@gmail.com",
      },
      {
        id: "02",
        label: "LinkedIn",
        value: "/in/nirupam-pal",
        href: "https://www.linkedin.com/in/nirupam-pal-0916a721b/",
      },
      {
        id: "03",
        label: "GitHub",
        value: "@nirupampal",
        href: "https://github.com/nirupampal",
      },
      {
        id: "04",
        label: "Resume",
        value: "View PDF",
        href: "https://drive.google.com/file/d/1WdiR6QzRi3tsuMX-d5JHZ3_t3tnH_F-z/view",
      },
    ],
    copyrightName: "Nirupam Pal",
    rightsLabel: "All Rights Reserved",
    backToTopLabel: "Back to Top",
  },
};
