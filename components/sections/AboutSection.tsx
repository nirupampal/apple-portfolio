"use client";

import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { Zap, Briefcase, Code } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, Variants, useReducedMotion, useAnimation } from "framer-motion";
import Image from "next/image";

type Experience = {
  title: string;
  icon: LucideIcon;
  date?: string;
  description: string;
};

const experiences: Experience[] = [
  {
    title: "Lead Fullstack Developer — Microace Software",
    icon: Briefcase,
    date: "2024 — Present",
    description:
      "Architected scalable web platforms, led a small engineering team, improved release cadence and observability across services.",
  },
  {
    title: "Hands-On Project Experience",
    icon: Zap,
    date: "2022 — 2024",
    description:
      "Built E-commerce platforms, real-time chat (Socket.IO), billing & finance apps, and custom mail systems — from DB design to pixel UI.",
  },
  {
    title: "Modern Tech Stack & DevOps",
    icon: Code,
    date: "Ongoing",
    description:
      "React/Next.js, Node/Express, MongoDB/SQL, TypeScript, Docker, Kubernetes, CI/CD, AWS, and Cloudflare for production delivery.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, when: "beforeChildren" } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function AboutSection({ resumeUrl = "/resume.pdf" }: { resumeUrl?: string }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const controls = useAnimation();
  const reduce = useReducedMotion();

  // Observe the section safely and trigger show animation when it becomes visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e && e.isIntersecting) {
          controls.start("show");
        }
      },
      { threshold: 0.18, root: null, rootMargin: "-8% 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [controls]);

  // JSON-LD structured data (kept minimal)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nirupam Pal",
    jobTitle: "Lead Fullstack Developer",
    url: "https://nirupampal.vercel.app",
    sameAs: ["https://github.com/nirupampal", "https://www.linkedin.com/in/nirupam-pal-0916a721b/"],
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      style={{ scrollMarginTop: "64px" }} // adjust if your header height differs
      className="w-full bg-gray-50 dark:bg-[#050505] transition-colors duration-500 py-20 md:py-28"
    >
      <Head>
        <title>About — Nirupam Pal — Lead Fullstack Developer</title>
        <meta
          name="description"
          content="About Nirupam Pal — Lead Fullstack Developer. Expertise in React/Next.js, Node.js, TypeScript, Docker, Kubernetes and building production-ready software."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div className="max-w-6xl mx-auto px-6">
        <motion.header variants={containerVariants} initial="hidden" animate={controls} className="mb-8 md:mb-12">
          <motion.h2 variants={itemVariants} id="about-heading" className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            About — <span className="text-indigo-600 dark:text-indigo-400">Nirupam Pal</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="mt-3 text-gray-700 dark:text-gray-300 max-w-3xl font-light">
            I build production-ready web applications with a focus on performance, maintainability and delightful user experiences.
            I lead development teams and ship reliable backend systems designed for scale.
          </motion.p>
        </motion.header>

        {/* Two-column layout: left profile & CTAs, right details & timeline */}
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left column */}
          <motion.aside variants={itemVariants} className="md:col-span-4">
            <div className="bg-white dark:bg-[#070707] rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
              <div className="w-full mb-4 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full overflow-hidden relative">
  <Image
    src="/nirupam.jpeg"
    alt="Nirupam"
    fill
    className="object-cover"
  />
</div>

              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nirupam Pal</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">Lead Fullstack Developer</div>
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">Based in Kolkata · Open to remote & onsite</div>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={resumeUrl}
                  download
                  className="block w-full text-center px-4 py-2 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold"
                  aria-label="Download resume"
                >
                  Download Resume
                </a>

                <a
                  href="mailto:nirupampaldev@gmail.com"
                  className="block w-full text-center px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  aria-label="Email Nirupam Pal"
                >
                  Email — nirupampaldev@gmail.com
                </a>
              </div>

              <div className="mt-6">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider">Core</h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {["React", "Next.js", "Node.js", "TypeScript"].map((t) => (
                    <li key={t} className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.aside>

          {/* Right column */}
          <motion.div variants={itemVariants} className="md:col-span-8 space-y-6">
            <article className="bg-white dark:bg-[#070707] rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">What I do</h3>
              <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                I design and implement full product lifecycles — from prototyping UIs to designing resilient backend APIs.
                I focus on performance, observability, and developer experience — helping teams ship with confidence.
              </p>

              {/* CTA: jump to SkillsSection (no duplicate skills here) */}
              <div className="mt-6">
                <a
                  href="#skills"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("skills");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="inline-block px-5 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow hover:shadow-lg transition"
                  aria-label="View full skills"
                >
                  View Full Skills
                </a>
              </div>
            </article>

            <article className="bg-white dark:bg-[#070707] rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Experience timeline</h3>

              <ol className="mt-4 space-y-5">
                {experiences.map((exp) => (
                  <li key={exp.title} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900 grid place-items-center text-indigo-600 dark:text-indigo-200">
                        <exp.icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                        {exp.date && <div className="text-xs text-gray-400 dark:text-gray-500">{exp.date}</div>}
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{exp.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            <div className="flex gap-4 items-center">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-block px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow hover:shadow-lg transition"
                aria-label="Contact Nirupam"
              >
                Contact me
              </a>

              <a href="/projects" className="text-sm text-gray-700 dark:text-gray-200 hover:underline" aria-label="View projects">
                View Projects &rarr;
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
