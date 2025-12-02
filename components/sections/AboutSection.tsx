// components/sections/AboutSection.tsx
"use client";

import React from "react";
import { Zap, Briefcase, Code } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, Variants, useReducedMotion } from "framer-motion";

interface ExperienceCardData {
  title: string;
  icon: LucideIcon;
  content: string;
  imageSide: "left" | "right"; // used for layout alternation
}

interface ExperienceCardProps extends ExperienceCardData {}

const experienceCards: ExperienceCardData[] = [
  {
    title: "Lead Fullstack Developer",
    icon: Briefcase,
    content:
      "I currently lead the fullstack development efforts at Microace Software. My role involves architecting solutions from the ground up, ensuring performance, scalability, and adherence to clean code principles across the entire application lifecycle. I guide teams from concept to production.",
    imageSide: "left",
  },
  {
    title: "Hands-On Project Experience",
    icon: Zap,
    content:
      "I have extensive hands-on experience bringing complex applications to life, including E-Commerce Platforms, Real-Time Chat Systems (Socket.IO), Billing & Finance Applications, and Custom Mailing Systems. I thrive on tackling projects from the database schema to the pixel-perfect UI.",
    imageSide: "right",
  },
  {
    title: "Modern Tech Stack & DevOps",
    icon: Code,
    content:
      "My core stack is anchored by robust technologies: React/Next.js (Front), Node.js/Express (Back), and SQL/MongoDB (DB). I ensure stability and scale by leveraging TypeScript and managing deployment with Docker, Kubernetes, CI/CD pipelines, AWS, and Cloudflare.",
    imageSide: "left",
  },
];

/* Motion variants (typed) */
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function DecorativeBlob({ side }: { side: "left" | "right" }) {
  // simple decorative gradient blob — small, subtle
  const transform = side === "left" ? "translate(-10%, -10%)" : "translate(10%, -10%)";
  return (
    <svg
      aria-hidden
      width="320"
      height="200"
      viewBox="0 0 320 200"
      className={`pointer-events-none select-none transform ${side === "left" ? "md:-translate-x-6" : "md:translate-x-6"} opacity-90`}
      style={{ transform }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`g-${side}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path fill={`url(#g-${side})`} d="M20 100 C 40 10, 120 10, 160 40 C 200 70, 260 70, 300 110 C 320 130, 300 180, 240 180 C 180 180, 120 160, 60 150 C 20 145, 5 120, 20 100z" />
    </svg>
  );
}

function ExperienceCard({ title, icon: Icon, content, imageSide }: ExperienceCardProps) {
  const reduce = useReducedMotion();

  // layout order classes
  const isLeft = imageSide === "left";
  const imgCol = isLeft ? "md:order-1" : "md:order-2";
  const contentCol = isLeft ? "md:order-2" : "md:order-1";

  return (
    <motion.article
      className="w-full rounded-3xl overflow-hidden bg-white dark:bg-[#070707] border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-none"
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      whileHover={reduce ? undefined : { translateY: -6, boxShadow: "0 20px 40px rgba(2,6,23,0.12)" }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      aria-labelledby={`exp-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-0`}>
        {/* Decorative blob column (takes place of image) */}
        <div className={`${imgCol} relative flex items-center justify-center min-h-[220px] md:min-h-[300px] p-8`}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <DecorativeBlob side={imageSide} />
          </div>

          <div className="relative z-10 max-w-[22rem] text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 text-white grid place-items-center shadow-lg">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 id={`exp-${title.replace(/\s+/g, "-").toLowerCase()}`} className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                  {title}
                </h3>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Full-time · Onsite</div>
              </div>
            </div>

            <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              {content}
            </p>
          </div>
        </div>

        {/* Content column — call to action / links */}
        <div className={`${contentCol} p-8 md:p-12 flex flex-col justify-center`}>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-4">
            <strong className="text-gray-900 dark:text-white">Summary</strong> · Technology, leadership & delivery.
          </p>

     
          {/* subtle extra text to mimic Apple's understated detail */}
          <div className="mt-6 text-xs text-gray-400 dark:text-gray-500">
            Available for remote and on-site engagements. Open to leadership & contract roles.
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-gray-50 dark:bg-[#050505] transition-colors duration-500 py-24 md:py-32">
      <div className="w-full max-w-[1100px] mx-auto px-6">
        <header className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Hello, I'm <span className="text-indigo-600 dark:text-indigo-400">Nirupam Pal</span>.
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-400 font-light max-w-3xl mx-auto">
            A Lead Fullstack Developer building robust, scalable, and elegant software.
          </p>
        </header>

        <div className="space-y-8 md:space-y-12">
          {experienceCards.map((card, idx) => (
            <motion.div key={idx} variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
              <ExperienceCard {...card} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <a
            href="/resume.pdf"
            className="inline-block px-8 py-3 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold shadow-lg hover:shadow-2xl transition"
            download
          >
            Download My Full Resume
          </a>
        </div>
      </div>
    </section>
  );
}
