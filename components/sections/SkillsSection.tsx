// components/sections/SkillsSection.tsx
"use client";

import React from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";
import type { JSX } from "react/jsx-runtime";

type Skill = {
  name: string;
  level: number; // 0-100
  category?: string;
  icon?: string; // URL to tech icon/logo
};

const defaultSkills: Skill[] = [
  { name: "HTML", level: 95, category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS / Tailwind", level: 92, category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "JavaScript", level: 94, category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "React", level: 90, category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "React Native", level: 78, category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", level: 82, category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", level: 88, category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", level: 84, category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "Socket.io", level: 82, category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg" },
  { name: "Microservices", level: 76, category: "Backend", icon: "https://cdn-icons-png.flaticon.com/512/7042/7042452.png" },
  { name: "Firebase", level: 79, category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
  { name: "MongoDB", level: 80, category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", level: 85, category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", level: 83, category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "JavaScript", level: 94, category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", level: 75, category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Python", level: 78, category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Go", level: 45, category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
  { name: "Bash", level: 72, category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
  { name: "Docker", level: 68, category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Kubernetes", level: 60, category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" },
  { name: "AWS", level: 70, category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg" },
  { name: "Nginx", level: 75, category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
  { name: "Linux", level: 80, category: "OS & Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "Windows", level: 85, category: "OS & Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SkillsSection({ skills = defaultSkills }: { skills?: Skill[] }): JSX.Element {
  const reduce = useReducedMotion();

  // group skills by category for a tidy UI
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const key = s.category || "Other";
    acc[key] = acc[key] || [];
    acc[key].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" aria-labelledby="skills-heading" className="w-full bg-gray-50 dark:bg-[#030303] py-20 md:py-28 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-10 md:mb-14">
          <h2 id="skills-heading" className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Skills & Expertise
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
            Technologies I use to build production-ready products. I focus on performance, accessibility, and maintainability.
          </p>
        </header>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(grouped).map(([category, list]) => (
            <motion.div key={category} variants={item} className="bg-white dark:bg-[#060606] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{category}</h3>
              <div className="mt-4 space-y-4">
                {list.map((s) => (
                  <div key={s.name} className="">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {s.icon && (
                          <img
                            src={s.icon}
                            alt={s.name}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        )}
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{s.name}</div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{s.level}%</div>
                    </div>

                    <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={s.level}
                        className="h-full rounded-full"
                        style={{ width: `${s.level}%`, background: "linear-gradient(90deg,#7c3aed,#60a5fa)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">Curious about other tools? Ask me — I learn fast.</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <a href="/skills.pdf" className="inline-block px-6 py-3 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold shadow hover:shadow-lg transition" download>
            Download Skills PDF
          </a>
        </div>
      </div>
    </section>
  );
}


