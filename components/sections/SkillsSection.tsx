"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import type { JSX } from "react/jsx-runtime";

type Skill = {
  name: string;
  category: string;
  icon: string; // Simple Icons slug or custom
};

const skills: Skill[] = [
  // Frontend
  { name: "HTML5", category: "Frontend", icon: "html5" },
  { name: "CSS3", category: "Frontend", icon: "css3" },
  { name: "JavaScript", category: "Frontend", icon: "javascript" },
  { name: "TypeScript", category: "Frontend", icon: "typescript" },
  { name: "React", category: "Frontend", icon: "react" },
  { name: "Next.js", category: "Frontend", icon: "nextdotjs" },
  { name: "Tailwind CSS", category: "Frontend", icon: "tailwindcss" },
  { name: "React Native", category: "Frontend", icon: "react" },
  // Backend
  { name: "Node.js", category: "Backend", icon: "nodedotjs" },
  { name: "Express.js", category: "Backend", icon: "express" },
  { name: "Socket.io", category: "Backend", icon: "socketdotio" },
  { name: "REST APIs", category: "Backend", icon: "openapiinitiative" },
  { name: "GraphQL", category: "Backend", icon: "graphql" },
  { name: "Python", category: "Backend", icon: "python" },
  // Database
  { name: "MongoDB", category: "Database", icon: "mongodb" },
  { name: "PostgreSQL", category: "Database", icon: "postgresql" },
  { name: "MySQL", category: "Database", icon: "mysql" },
  { name: "Redis", category: "Database", icon: "redis" },
  { name: "Firebase", category: "Database", icon: "firebase" },
  // DevOps
  { name: "Docker", category: "DevOps", icon: "docker" },
  { name: "Kubernetes", category: "DevOps", icon: "kubernetes" },
  { name: "AWS", category: "DevOps", icon: "amazonwebservices" },
  { name: "CI/CD", category: "DevOps", icon: "githubactions" },
  { name: "Nginx", category: "DevOps", icon: "nginx" },
  { name: "Linux", category: "DevOps", icon: "linux" },
  // Tools
  { name: "Git", category: "Tools", icon: "git" },
  { name: "VS Code", category: "Tools", icon: "visualstudiocode" },
  { name: "Figma", category: "Tools", icon: "figma" },
  { name: "Postman", category: "Tools", icon: "postman" },
];

const categories = ["All", "Frontend", "Backend", "Database", "DevOps", "Tools"];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

// Generate Simple Icons URL with theme-aware color
function getIconUrl(slug: string, color: string): string {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

export default function SkillsSection(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter(s => s.category === activeCategory);

  // Group by category for display
  const grouped = filteredSkills.reduce<Record<string, Skill[]>>((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="w-full bg-neutral-50 dark:bg-neutral-950 py-32 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="text-xs font-light tracking-[0.4em] text-neutral-400 dark:text-neutral-500 uppercase mb-4 block">
                04 — Expertise
              </span>
              <h2
                id="skills-heading"
                className="text-4xl md:text-6xl font-extralight tracking-tight text-neutral-900 dark:text-neutral-100"
              >
                Skills & Technologies
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-light tracking-wider uppercase transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900"
                      : "text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="h-px bg-neutral-200 dark:bg-neutral-800 mt-12 origin-left"
          />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {Object.entries(grouped).map(([category, categorySkills]) => (
            <motion.div key={category} variants={itemVariants}>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-mono text-neutral-300 dark:text-neutral-700">
                  {String(categories.indexOf(category)).padStart(2, '0')}
                </span>
                <h3 className="text-xs font-light tracking-[0.3em] text-neutral-400 dark:text-neutral-500 uppercase">
                  {category}
                </h3>
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`group relative py-6 px-5 border transition-all duration-300 cursor-default ${
                      hoveredSkill === skill.name
                        ? "border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100"
                        : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Skill Icon */}
                      <div className="relative w-8 h-8 shrink-0">
                        {/* Icon images (use simple <img> for external SVGs) */}
                        <img
                          src={getIconUrl(skill.icon, isDark ? "ffffff" : "171717")}
                          alt={skill.name}
                          width={32}
                          height={32}
                          className={`absolute inset-0 w-8 h-8 object-contain transition-opacity duration-300 ${
                            hoveredSkill === skill.name ? "opacity-100" : "opacity-90"
                          }`}
                        />
                      </div>

                      {/* Skill Name */}
                      <span
                        className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                          hoveredSkill === skill.name
                            ? "text-neutral-100 dark:text-neutral-900"
                            : "text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-24 pt-12 border-t border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-lg font-light text-neutral-500 dark:text-neutral-400 text-center md:text-left">
              Always learning, always growing. These are the tools I use daily to build production-ready applications.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 text-sm font-light tracking-widest uppercase text-neutral-900 dark:text-neutral-100 transition-all duration-300"
            >
              <span>Let's Work Together</span>
              <span className="w-8 h-px bg-neutral-900 dark:bg-neutral-100 group-hover:w-12 transition-all duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


