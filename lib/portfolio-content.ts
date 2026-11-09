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
  slug?: string;
  screenshots?: { src: string; alt: string }[];
  mobile?: boolean;
  featured?: boolean;
  category?: "business" | "production" | "personal";
  linkLabel?: string;
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
  "contentRevision": 5,
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
        "description": "Built the Taste N Bite POS, companion ordering app and admin portal supporting 200+ franchises. Developed Hisab Restro for restaurant billing, kitchen tickets and QR ordering, plus business websites including microacesoftware.com and tnbpos.in. Built Microace Staff, a mobile workspace for attendance, tasks, chat and business operations.",
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
        "title": "TNB POS",
        "description": "Web-based billing software and administration portal built at Microace Software for Taste N Bite. Part of the connected system serving its 200+ franchise network.",
        "image": "/projects/tnb-pos-dashboard.png",
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
        ],
        "screenshots": [
          {
            "src": "/projects/tnb-pos-dashboard.png",
            "alt": "TNB POS business overview with sales, inventory and product reports"
          }
        ],
        "mobile": false,
        "featured": true,
        "category": "production",
        "linkLabel": "Visit TNB POS",
        "slug": "tnb-pos"
      },
      {
        "title": "Hisab Restro",
        "description": "Web and mobile restaurant software connecting billing, kitchen order tickets and QR ordering at the table.",
        "image": "/projects/hisab-restro-home.png",
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
        ],
        "screenshots": [
          {
            "src": "/projects/hisab-restro-home.png",
            "alt": "Hisab Restro dashboard showing live orders, running order value and table occupancy"
          },
          {
            "src": "/projects/hisab-restro-tables.png",
            "alt": "Hisab Restro table management with availability by floor"
          },
          {
            "src": "/projects/hisab-restro-tools.png",
            "alt": "Hisab Restro tools including kitchen queue, order history, bills and menu availability"
          },
          {
            "src": "/projects/hisab-restro-alerts.png",
            "alt": "Hisab Restro notifications and food-ready updates"
          }
        ],
        "mobile": true,
        "featured": true,
        "category": "production",
        "linkLabel": "About Microace",
        "slug": "hisab-restro"
      },
      {
        "title": "TNB Ordering",
        "description": "The companion mobile ordering application built at Microace Software for Taste N Bite. Used daily by 200+ franchises, with ordering, packing and special-order workflows.",
        "image": "/projects/tnb-order-special-order.png",
        "link": "https://play.google.com/store/apps/details?id=com.tnborder.app&hl=en",
        "linkLabel": "Get it on Google Play",
        "type": "Franchise ordering / Microace",
        "year": "",
        "badge": "On Google Play",
        "tech": [
          "Mobile ordering",
          "Special orders",
          "Franchise operations"
        ],
        "mobile": true,
        "category": "production",
        "screenshots": [
          {
            "src": "/projects/tnb-order-special-order.png",
            "alt": "TNB Ordering special-order screen with catalogue options, customer details and cart"
          }
        ],
        "slug": "tnb-ordering"
      },
      {
        "title": "Microace Staff",
        "description": "A mobile workspace for staff attendance, tasks, chat and sales, with access to vouchers, ledgers, project workflows and customer support tickets.",
        "image": "/projects/microace-staff-home.png",
        "link": "https://microacesoftware.com",
        "linkLabel": "About Microace",
        "type": "Staff application / Microace",
        "year": "",
        "badge": "Mobile workspace",
        "tech": [
          "Attendance",
          "Tasks & chat",
          "Team operations"
        ],
        "mobile": true,
        "category": "production",
        "screenshots": [
          {
            "src": "/projects/microace-staff-home.png",
            "alt": "Microace Staff home with attendance check-in and workday overview"
          },
          {
            "src": "/projects/microace-staff-workspace.png",
            "alt": "Microace Staff workspace with finance, projects and customer support tools"
          }
        ],
        "slug": "microace-staff"
      },
      {
        "title": "Rupvia",
        "description": "An offline money manager with income and expense tracking, wallets, budgets, savings goals, bill reminders and spending insights.",
        "image": "/projects/rupvia-overview.png",
        "link": "https://www.buildnerd.in",
        "type": "Own project / Mobile application",
        "year": "",
        "tech": [
          "Mobile app",
          "Offline access",
          "Money management"
        ],
        "screenshots": [
          {
            "src": "/projects/rupvia-overview.png",
            "alt": "Rupvia overview with balance, income, spending and monthly plan"
          },
          {
            "src": "/projects/rupvia-transactions.png",
            "alt": "Rupvia transaction ledger with search, category and date filters"
          },
          {
            "src": "/projects/rupvia-add.png",
            "alt": "Rupvia tools for expenses, income, lending, borrowing, bills, savings and budgets"
          },
          {
            "src": "/projects/rupvia-insights.png",
            "alt": "Rupvia weekly and monthly spending insights"
          }
        ],
        "mobile": true,
        "category": "personal",
        "linkLabel": "Visit BuildNerd",
        "slug": "rupvia"
      },
      {
        "title": "BuildNerd Catalogue",
        "description": "Excel imports, dealer-specific price lists and shareable product catalogues with WhatsApp order requests.",
        "image": "/projects/buildnerd-catalogue-home.jpg",
        "link": "https://catalogue.buildnerd.in",
        "type": "Own product / Seller tools",
        "year": "",
        "tech": [
          "Excel imports",
          "Dealer pricing",
          "WhatsApp orders"
        ],
        "category": "business",
        "screenshots": [
          {
            "src": "/projects/buildnerd-catalogue-home.jpg",
            "alt": "BuildNerd Catalogue public product page for Excel imports, dealer pricing and online catalogues"
          },
          {
            "src": "/projects/buildnerd-catalogue-demo.jpg",
            "alt": "BuildNerd Catalogue public buyer demo showing a sample product collection"
          }
        ],
        "mobile": false,
        "linkLabel": "Explore product",
        "slug": "buildnerd-catalogue"
      },
      {
        "title": "BuildNerd Quotes",
        "description": "Quotations and proposals with PDF export, client choices, invoicing and payment tracking.",
        "image": "/projects/buildnerd-quotes-home.jpg",
        "link": "https://quotes.buildnerd.in",
        "type": "Own product / Business documents",
        "year": "",
        "tech": [
          "PDF export",
          "Client approvals",
          "Invoicing"
        ],
        "category": "business",
        "screenshots": [
          {
            "src": "/projects/buildnerd-quotes-home.jpg",
            "alt": "BuildNerd Quotes product page with an example website proposal"
          },
          {
            "src": "/projects/buildnerd-quotes-editor.jpg",
            "alt": "BuildNerd Quotes proposal editor and live document preview using sample client details"
          }
        ],
        "mobile": false,
        "linkLabel": "Explore product",
        "slug": "buildnerd-quotes"
      },
      {
        "title": "Catalogue Studio",
        "description": "Batch product photo preparation and branded PDF price lists from spreadsheet data.",
        "image": "/projects/buildnerd-studio-home.jpg",
        "link": "https://studio.buildnerd.in",
        "type": "Own product / Seller tools",
        "year": "",
        "tech": [
          "Product photos",
          "CSV imports",
          "PDF price lists"
        ],
        "category": "business",
        "screenshots": [
          {
            "src": "/projects/buildnerd-studio-home.jpg",
            "alt": "Catalogue Studio product page showing photo preparation and a sample PDF price list"
          },
          {
            "src": "/projects/buildnerd-studio-editor.jpg",
            "alt": "Catalogue Studio price-list editor with sample product details and a live PDF preview"
          }
        ],
        "mobile": false,
        "linkLabel": "Explore product",
        "slug": "catalogue-studio"
      },
      {
        "title": "Create QRcode",
        "description": "Static QR downloads and editable dynamic links for menus, Wi-Fi and business links.",
        "image": "/projects/buildnerd-qr-generator.jpg",
        "link": "https://createqrcode.in",
        "type": "Own product / QR platform",
        "year": "",
        "tech": [
          "Static QR",
          "Dynamic links",
          "Business tools"
        ],
        "category": "business",
        "screenshots": [
          {
            "src": "/projects/buildnerd-qr-generator.jpg",
            "alt": "Create QRcode public generator with a sample BuildNerd website QR preview"
          }
        ],
        "mobile": false,
        "linkLabel": "Explore product",
        "slug": "create-qrcode"
      },
      {
        "title": "BuildNerd Bookings",
        "description": "Salon appointments, staff calendars, walk-ins and customer history in one scheduling workflow.",
        "image": "/projects/buildnerd-bookings-home.jpg",
        "link": "https://book.buildnerd.in",
        "type": "Own product / Scheduling",
        "year": "",
        "tech": [
          "Appointments",
          "Staff calendars",
          "Customer history"
        ],
        "category": "business",
        "screenshots": [
          {
            "src": "/projects/buildnerd-bookings-home.jpg",
            "alt": "BuildNerd Bookings public product page for salon appointments and staff scheduling"
          }
        ],
        "mobile": false,
        "linkLabel": "Explore product",
        "slug": "buildnerd-bookings"
      },
      {
        "title": "RMBC Community Website",
        "description": "Website for Ranirghat Mahismardini Barowari Committee in Nabadwip, bringing together Rash Yatra updates, local heritage, festival photo archives, news and membership registration.",
        "image": "/projects/rmbc-website.png",
        "link": "https://www.rmbc.co.in/",
        "linkLabel": "Visit RMBC",
        "type": "Community & festival website",
        "year": "",
        "badge": "Live website",
        "tech": [
          "Festival updates",
          "Photo archives",
          "Membership"
        ],
        "category": "production",
        "mobile": false,
        "screenshots": [
          {
            "src": "/projects/rmbc-website.png",
            "alt": "Ranirghat Mahismardini Barowari Committee website featuring Rash Yatra celebrations and community heritage"
          }
        ],
        "slug": "rmbc"
      },
      {
        "title": "DOTCOM Coin",
        "description": "E-commerce website for coins, banknotes and collectibles, with category browsing, product search, wishlists, a shopping cart and detailed collectible listings.",
        "image": "/projects/dotcomcoin-storefront.jpg",
        "link": "https://dotcomcoin.in",
        "linkLabel": "Visit DOTCOM Coin",
        "type": "E-commerce website",
        "year": "",
        "badge": "Live storefront",
        "tech": [
          "Product catalogue",
          "Search & categories",
          "Shopping cart"
        ],
        "mobile": false,
        "category": "production",
        "screenshots": [
          {
            "src": "/projects/dotcomcoin-storefront.jpg",
            "alt": "DOTCOM Coin storefront featuring British India coins, banknotes and collectible categories"
          }
        ],
        "slug": "dotcom-coin"
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
      },
      {
        "id": "twitter",
        "label": "X (Twitter)",
        "value": "nirupampaldev",
        "href": "https://x.com/nirupampaldev"
      }
    ],
    "copyrightName": "Nirupam Pal",
    "rightsLabel": "Built with care.",
    "backToTopLabel": "Back to top"
  }
,
  terminal: developerTerminalPreset
};
