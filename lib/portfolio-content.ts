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
  points?: string[];
  github?: string;
  badge?: string;
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
  contentRevision?: number;
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
  "contentRevision": 2,
  "hero": {
    "availabilityText": "Open to full-time opportunities",
    "firstName": "Nirupam",
    "lastName": "Pal",
    "imageSrc": "/nirupam-pal.png",
    "imageAlt": "Nirupam Pal, Full Stack Developer",
    "headlinePrimary": "Software for",
    "headlineSecondary": "the everyday.",
    "professionLabel": "Full Stack Developer",
    "countryLabel": "India · Open to relocation",
    "role": "I build web and mobile products that businesses use every day.",
    "description": "From billing across 200+ franchises to tools for independent businesses. I work across the interface, backend and deployment.",
    "primaryCtaLabel": "Explore my work",
    "primaryCtaHref": "#work",
    "secondaryCtaLabel": "Download CV",
    "secondaryCtaHref": "/Nirupam_Pal_CV.pdf"
  },
  "about": {
    "sectionLabel": "ABOUT / EXPERIENCE",
    "titlePrimary": "Built with care.",
    "titleSecondary": "Used in the real world.",
    "resumeUrl": "/Nirupam_Pal_CV.pdf",
    "imageSrc": "/nirupam-pal.png",
    "imageAlt": "Portrait of Nirupam Pal",
    "paragraphs": [
      "I’m Nirupam, a Full Stack Developer based in Krishnanagar, Nadia, West Bengal. I build web and mobile applications from interface to deployment.",
      "At Microace Software, I developed the Taste N Bite POS, mobile ordering app and admin portal, as well as Hisab Restro for restaurant billing, KOT generation and table QR ordering.",
      "I also run BuildNerd, my sole proprietorship, where I build and operate business software products. I’m seeking a full-time developer role and can join from 1 December 2026."
    ],
    "experiences": [
      {
        "id": "microace",
        "title": "Full Stack Developer",
        "company": "Microace Software",
        "date": "April 2025 – Present",
        "description": "Built the Taste N Bite POS, companion ordering app and admin portal supporting 200+ franchises. Developed Hisab Restro for restaurant billing, kitchen tickets and QR ordering, plus business websites including microacesoftware.com and tnbpos.in.",
        "tags": [
          "Next.js",
          "TypeScript",
          "Firebase",
          "Web & mobile"
        ]
      },
      {
        "id": "buildnerd",
        "title": "Founder & Developer",
        "company": "BuildNerd Technologies",
        "date": "Independent venture",
        "description": "Building and operating Catalogue, Quotes, Catalogue Studio, Create QRcode and Bookings. Also developed Rupvia, an offline money manager.",
        "tags": [
          "Own products",
          "SaaS",
          "Sole proprietorship"
        ]
      }
    ],
    "stats": [
      {
        "value": 200,
        "suffix": "+",
        "label": "Franchises using my work"
      },
      {
        "value": 5,
        "suffix": "",
        "label": "BuildNerd products"
      },
      {
        "value": 2025,
        "suffix": "",
        "label": "At Microace since April"
      }
    ],
    "ctaText": "Have a role in mind?",
    "ctaHref": "#contact",
    "ctaLabel": "Let’s talk"
  },
  "works": {
    "sectionLabel": "SELECTED WORK",
    "titlePrimary": "Real workflows.",
    "titleSecondary": "Working software.",
    "githubUrl": "https://github.com/nirupampal",
    "githubLabel": "Explore GitHub",
    "projects": [
      {
        "title": "Taste N Bite POS & Ordering",
        "description": "A connected billing platform, mobile ordering app and admin portal built at Microace Software. Used daily across 200+ Taste N Bite franchises.",
        "image": "/dashboard.png",
        "link": "https://tnbpos.in",
        "type": "Production / Microace Software",
        "year": "2025–2026",
        "badge": "200+ franchises",
        "tech": [
          "Next.js",
          "TypeScript",
          "Firebase"
        ],
        "points": [
          "Web-based POS used for daily product billing.",
          "Companion mobile app for daily franchise ordering.",
          "Administration portal connecting business operations."
        ]
      },
      {
        "title": "Hisab Restro",
        "description": "Web and mobile restaurant software connecting billing, kitchen order tickets and QR ordering at the table.",
        "image": "/dashboard.png",
        "link": "https://microacesoftware.com",
        "type": "Restaurant operations / Microace",
        "year": "2025–2026",
        "badge": "Web + mobile",
        "tech": [
          "Billing",
          "KOT",
          "QR ordering"
        ],
        "points": [
          "Generate bills and Kitchen Order Tickets (KOT).",
          "Let customers place orders by scanning a table QR code.",
          "Web and mobile interfaces for small restaurants."
        ]
      },
      {
        "title": "BuildNerd Catalogue",
        "description": "Excel imports, dealer-specific price lists and shareable product catalogues with WhatsApp order requests.",
        "image": "/dashboard.png",
        "link": "https://catalogue.buildnerd.in",
        "type": "Own product / Seller tools",
        "year": "",
        "tech": [
          "Excel imports",
          "Dealer pricing",
          "WhatsApp orders"
        ]
      },
      {
        "title": "BuildNerd Quotes",
        "description": "Quotations and proposals with PDF export, client choices, invoicing and payment tracking.",
        "image": "/dashboard.png",
        "link": "https://quotes.buildnerd.in",
        "type": "Own product / Business documents",
        "year": "",
        "tech": [
          "PDF export",
          "Client approvals",
          "Invoicing"
        ]
      },
      {
        "title": "Catalogue Studio",
        "description": "Batch product photo preparation and branded PDF price lists from spreadsheet data.",
        "image": "/dashboard.png",
        "link": "https://studio.buildnerd.in",
        "type": "Own product / Seller tools",
        "year": "",
        "tech": [
          "Product photos",
          "CSV imports",
          "PDF price lists"
        ]
      },
      {
        "title": "Create QRcode",
        "description": "Static QR downloads and editable dynamic links for menus, Wi-Fi and business links.",
        "image": "/createqrcode-dashboard.png",
        "link": "https://createqrcode.in",
        "type": "Own product / QR platform",
        "year": "",
        "tech": [
          "Static QR",
          "Dynamic links",
          "Business tools"
        ]
      },
      {
        "title": "BuildNerd Bookings",
        "description": "Salon appointments, staff calendars, walk-ins and customer history in one scheduling workflow.",
        "image": "/dashboard.png",
        "link": "https://book.buildnerd.in",
        "type": "Own product / Scheduling",
        "year": "",
        "tech": [
          "Appointments",
          "Staff calendars",
          "Customer history"
        ]
      },
      {
        "title": "Rupvia",
        "description": "An offline money management mobile application, built for keeping track of money without an internet connection.",
        "image": "/dashboard.png",
        "link": "https://www.buildnerd.in",
        "type": "Own project / Mobile application",
        "year": "",
        "tech": [
          "Mobile app",
          "Offline access",
          "Money management"
        ]
      }
    ]
  },
  "skills": {
    "titlePrimary": "From interface",
    "titleSecondary": "to infrastructure.",
    "description": "The technologies and integrations I work with.",
    "endLabel": "ALWAYS LEARNING",
    "categories": [
      {
        "id": "frontend",
        "title": "Web & mobile",
        "description": "Web & mobile",
        "color": "#bfeb58",
        "skills": [
          {
            "name": "JavaScript",
            "icon": "code"
          },
          {
            "name": "TypeScript",
            "icon": "code"
          },
          {
            "name": "React.js",
            "icon": "code"
          },
          {
            "name": "Next.js",
            "icon": "code"
          },
          {
            "name": "HTML",
            "icon": "code"
          },
          {
            "name": "CSS",
            "icon": "code"
          },
          {
            "name": "React Native",
            "icon": "code"
          },
          {
            "name": "VB.NET",
            "icon": "code"
          }
        ]
      },
      {
        "id": "data",
        "title": "Databases & caching",
        "description": "Databases & caching",
        "color": "#bfeb58",
        "skills": [
          {
            "name": "PostgreSQL",
            "icon": "code"
          },
          {
            "name": "MongoDB",
            "icon": "code"
          },
          {
            "name": "Microsoft SQL Server",
            "icon": "code"
          },
          {
            "name": "Redis",
            "icon": "code"
          },
          {
            "name": "Firebase",
            "icon": "code"
          },
          {
            "name": "Supabase",
            "icon": "code"
          }
        ]
      },
      {
        "id": "cloud",
        "title": "Cloud & deployment",
        "description": "Cloud & deployment",
        "color": "#bfeb58",
        "skills": [
          {
            "name": "Node.js",
            "icon": "code"
          },
          {
            "name": "Docker",
            "icon": "code"
          },
          {
            "name": "Nginx",
            "icon": "code"
          },
          {
            "name": "PM2",
            "icon": "code"
          },
          {
            "name": "AWS",
            "icon": "code"
          },
          {
            "name": "Google Cloud",
            "icon": "code"
          },
          {
            "name": "Google Play Console",
            "icon": "code"
          }
        ]
      },
      {
        "id": "integrations",
        "title": "APIs & integrations",
        "description": "APIs & integrations",
        "color": "#bfeb58",
        "skills": [
          {
            "name": "Razorpay",
            "icon": "code"
          },
          {
            "name": "Stripe",
            "icon": "code"
          },
          {
            "name": "WhatsApp API",
            "icon": "code"
          },
          {
            "name": "AI / LLM APIs",
            "icon": "code"
          },
          {
            "name": "WebSockets",
            "icon": "code"
          }
        ]
      }
    ]
  },
  "achievements": {
    "sectionLabel": "EDUCATION",
    "title": "Learning by studying. And shipping.",
    "description": "Formal education alongside hands-on software development.",
    "items": []
  },
  "blog": {
    "eyebrow": "NOTES",
    "title": "From the workbench",
    "description": "Ideas and notes on building software.",
    "posts": []
  },
  "contact": {
    "sectionLabel": "CONTACT",
    "titlePrimary": "Your next developer",
    "titleSecondary": "could be right here.",
    "availabilityText": "Available from 1 December 2026",
    "locationLabel": "Krishnanagar, Nadia, West Bengal · Open to relocation",
    "links": [
      {
        "id": "email",
        "label": "Email",
        "value": "iamnirupampal@gmail.com",
        "href": "mailto:iamnirupampal@gmail.com"
      },
      {
        "id": "phone",
        "label": "Phone",
        "value": "+91 86176 24775",
        "href": "tel:+918617624775"
      },
      {
        "id": "github",
        "label": "GitHub",
        "value": "nirupampal",
        "href": "https://github.com/nirupampal"
      },
      {
        "id": "linkedin",
        "label": "LinkedIn",
        "value": "nirupampal",
        "href": "https://www.linkedin.com/in/nirupampal/"
      }
    ],
    "copyrightName": "Nirupam Pal",
    "rightsLabel": "Built with care.",
    "backToTopLabel": "Back to top"
  }
,
  terminal: developerTerminalPreset
};
