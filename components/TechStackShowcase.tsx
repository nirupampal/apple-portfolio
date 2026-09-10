"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { FaAws } from "react-icons/fa6";
import {
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithubactions,
  SiGraphql,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
import { Code2, Cpu, Sparkles } from "lucide-react";

import type { SkillsContent } from "@/lib/portfolio-content";

interface TechMeta {
  name: string;
  category: string;
  categoryId: string;
  icon: React.ElementType;
  brandColor: string;
  bgGradient: string;
  role: string;
}

const TECH_DEFINITIONS: Record<string, Omit<TechMeta, "name" | "category" | "categoryId">> = {
  react: {
    icon: SiReact,
    brandColor: "#61DAFB",
    bgGradient: "rgba(97, 218, 251, 0.12)",
    role: "Component Architecture",
  },
  "next.js": {
    icon: SiNextdotjs,
    brandColor: "#FFFFFF",
    bgGradient: "rgba(255, 255, 255, 0.12)",
    role: "Fullstack SSR / App Router",
  },
  nextdotjs: {
    icon: SiNextdotjs,
    brandColor: "#FFFFFF",
    bgGradient: "rgba(255, 255, 255, 0.12)",
    role: "Fullstack Framework",
  },
  typescript: {
    icon: SiTypescript,
    brandColor: "#3178C6",
    bgGradient: "rgba(49, 120, 198, 0.15)",
    role: "Type-Safe Engineering",
  },
  javascript: {
    icon: SiJavascript,
    brandColor: "#F7DF1E",
    bgGradient: "rgba(247, 223, 30, 0.12)",
    role: "Core Web Language",
  },
  "tailwind css": {
    icon: SiTailwindcss,
    brandColor: "#06B6D4",
    bgGradient: "rgba(6, 182, 212, 0.15)",
    role: "Design Systems & Tokens",
  },
  tailwindcss: {
    icon: SiTailwindcss,
    brandColor: "#06B6D4",
    bgGradient: "rgba(6, 182, 212, 0.15)",
    role: "Utility-First Styling",
  },
  "framer motion": {
    icon: SiFramer,
    brandColor: "#0055FF",
    bgGradient: "rgba(0, 85, 255, 0.15)",
    role: "Fluid Physics & Gestures",
  },
  framer: {
    icon: SiFramer,
    brandColor: "#0055FF",
    bgGradient: "rgba(0, 85, 255, 0.15)",
    role: "Micro-Animations",
  },
  "react native": {
    icon: SiReact,
    brandColor: "#61DAFB",
    bgGradient: "rgba(97, 218, 251, 0.12)",
    role: "Cross-Platform Mobile",
  },
  "three.js": {
    icon: SiThreedotjs,
    brandColor: "#FFFFFF",
    bgGradient: "rgba(255, 255, 255, 0.12)",
    role: "Interactive 3D Graphics",
  },
  "node.js": {
    icon: SiNodedotjs,
    brandColor: "#5FA04E",
    bgGradient: "rgba(95, 160, 78, 0.15)",
    role: "Server-Side Runtime",
  },
  nodedotjs: {
    icon: SiNodedotjs,
    brandColor: "#5FA04E",
    bgGradient: "rgba(95, 160, 78, 0.15)",
    role: "High-Throughput APIs",
  },
  express: {
    icon: SiExpress,
    brandColor: "#E0E0E0",
    bgGradient: "rgba(224, 224, 224, 0.1)",
    role: "REST APIs & Middleware",
  },
  "socket.io": {
    icon: SiSocketdotio,
    brandColor: "#FFFFFF",
    bgGradient: "rgba(255, 255, 255, 0.12)",
    role: "Bi-Directional Events",
  },
  socketdotio: {
    icon: SiSocketdotio,
    brandColor: "#FFFFFF",
    bgGradient: "rgba(255, 255, 255, 0.12)",
    role: "Real-Time WebSocket",
  },
  graphql: {
    icon: SiGraphql,
    brandColor: "#E10098",
    bgGradient: "rgba(225, 0, 152, 0.15)",
    role: "Declarative Data Layer",
  },
  python: {
    icon: SiPython,
    brandColor: "#3776AB",
    bgGradient: "rgba(55, 118, 171, 0.15)",
    role: "Scripting & Data Flows",
  },
  postgresql: {
    icon: SiPostgresql,
    brandColor: "#4169E1",
    bgGradient: "rgba(65, 105, 225, 0.15)",
    role: "ACID Relational SQL",
  },
  mongodb: {
    icon: SiMongodb,
    brandColor: "#47A248",
    bgGradient: "rgba(71, 162, 72, 0.15)",
    role: "Document Storage",
  },
  redis: {
    icon: SiRedis,
    brandColor: "#FF4438",
    bgGradient: "rgba(255, 68, 56, 0.15)",
    role: "In-Memory Cache & Pub/Sub",
  },
  firebase: {
    icon: SiFirebase,
    brandColor: "#FFCA28",
    bgGradient: "rgba(255, 202, 40, 0.15)",
    role: "Auth, Storage & Firestore",
  },
  supabase: {
    icon: SiSupabase,
    brandColor: "#3ECF8E",
    bgGradient: "rgba(62, 207, 142, 0.15)",
    role: "PostgreSQL BaaS & RLS",
  },
  docker: {
    icon: SiDocker,
    brandColor: "#2496ED",
    bgGradient: "rgba(36, 150, 237, 0.15)",
    role: "Containers & Reproducibility",
  },
  aws: {
    icon: FaAws,
    brandColor: "#FF9900",
    bgGradient: "rgba(255, 153, 0, 0.15)",
    role: "Cloud Infrastructure",
  },
  amazonaws: {
    icon: FaAws,
    brandColor: "#FF9900",
    bgGradient: "rgba(255, 153, 0, 0.15)",
    role: "Serverless & Cloud",
  },
  git: {
    icon: SiGit,
    brandColor: "#F05032",
    bgGradient: "rgba(240, 80, 50, 0.15)",
    role: "Version Control",
  },
  "ci/cd": {
    icon: SiGithubactions,
    brandColor: "#2088FF",
    bgGradient: "rgba(32, 136, 255, 0.15)",
    role: "Automated Deployments",
  },
  githubactions: {
    icon: SiGithubactions,
    brandColor: "#2088FF",
    bgGradient: "rgba(32, 136, 255, 0.15)",
    role: "Automated Workflows",
  },
  linux: {
    icon: SiLinux,
    brandColor: "#FCC624",
    bgGradient: "rgba(252, 198, 36, 0.15)",
    role: "Server Administration",
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 18,
      stiffness: 120,
    },
  },
};

export function TechStackShowcase({ skillsContent }: { skillsContent: SkillsContent }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const allSkills = useMemo(() => {
    const list: TechMeta[] = [];
    const seen = new Set<string>();

    skillsContent.categories.forEach((cat) => {
      cat.skills.forEach((skill) => {
        const key = skill.name.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          const meta =
            TECH_DEFINITIONS[key] ||
            TECH_DEFINITIONS[skill.icon.toLowerCase()] || {
              icon: Code2,
              brandColor: cat.color || "#67E8F9",
              bgGradient: "rgba(103, 232, 249, 0.12)",
              role: cat.title,
            };

          list.push({
            name: skill.name,
            category: cat.title,
            categoryId: cat.id,
            ...meta,
          });
        }
      });
    });

    return list;
  }, [skillsContent]);

  const categories = useMemo(() => {
    const cats = [{ id: "all", label: "All Technologies", count: allSkills.length }];
    skillsContent.categories.forEach((c) => {
      const count = allSkills.filter((s) => s.categoryId === c.id).length;
      if (count > 0) {
        cats.push({ id: c.id, label: c.title, count });
      }
    });
    return cats;
  }, [skillsContent, allSkills]);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return allSkills;
    return allSkills.filter((s) => s.categoryId === activeCategory);
  }, [allSkills, activeCategory]);

  return (
    <div className="relative space-y-10">
      {/* Infinite Horizontal Floating Marquee Row (Hardware Accelerated GPU transform) */}
      <div className="relative overflow-hidden py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#07080a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#07080a] to-transparent" />

        <div className="flex select-none gap-6 will-change-transform animate-[marquee_38s_linear_infinite]">
          {[...allSkills, ...allSkills].map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={`marquee-${tech.name}-${index}`}
                className="flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.02] px-4 py-2 text-xs text-neutral-400 backdrop-blur-sm transition duration-200 hover:border-white/20 hover:text-white"
              >
                <Icon className="h-4 w-4" style={{ color: tech.brandColor }} />
                <span className="font-mono text-[11px] font-medium">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Filter Pills Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition duration-300 ${
                isActive
                  ? "text-white"
                  : "border border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:border-white/15 hover:text-neutral-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/90 via-indigo-600/90 to-cyan-500/90 shadow-[0_0_25px_rgba(99,102,241,0.5)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
              <span
                className={`relative z-10 rounded-full px-1.5 py-0.5 font-mono text-[9px] ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-white/[0.05] text-neutral-500"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Staggered Animated Grid: Moving One By One When Scrolled */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                layout
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 350, damping: 20 },
                }}
                className="group relative flex flex-col items-center justify-between rounded-2xl border border-white/[0.08] bg-[#0a0b0f]/80 p-5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl transition duration-300 hover:border-white/25 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
              >
                {/* Brand-colored dynamic ambient glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${tech.bgGradient} 0%, transparent 75%)`,
                  }}
                />

                {/* Micro top shine line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition group-hover:via-white/30" />

                {/* Animated Brand Icon */}
                <div className="relative mb-3 mt-1 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-black/40 shadow-inner transition duration-300 group-hover:border-white/20 group-hover:bg-white/[0.04]">
                  <Icon
                    className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: tech.brandColor }}
                  />
                  <span
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-md transition duration-300 group-hover:opacity-40"
                    style={{ backgroundColor: tech.brandColor }}
                  />
                </div>

                {/* Text Directly Under the Icon */}
                <div className="relative z-10 space-y-1">
                  <h4 className="text-sm font-medium tracking-tight text-neutral-200 transition group-hover:text-white">
                    {tech.name}
                  </h4>
                  <p className="line-clamp-1 font-mono text-[9px] uppercase tracking-wider text-neutral-500 transition group-hover:text-neutral-400">
                    {tech.role}
                  </p>
                </div>

                {/* Category indicator dot */}
                <div className="relative z-10 mt-3 flex items-center gap-1.5 opacity-60 transition group-hover:opacity-100">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: tech.brandColor }}
                  />
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-neutral-500">
                    {tech.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
