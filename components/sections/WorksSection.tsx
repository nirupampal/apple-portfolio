"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  type: string;
  year: string;
  tech: string[];
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Fullstack Next.js store with Stripe payments, inventory management, and optimized performance for scale.",
    image: "/e-commerce.png",
    link: "#",
    type: "Fullstack",
    year: "2024",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    title: "EdTech Website",
    description: "Interactive online learning platform with teacher dashboards, student progress tracking, and live classes.",
    image: "/edtech.webp",
    link: "#",
    type: "EdTech",
    year: "2024",
    tech: ["React", "Node.js", "WebRTC"],
  },
 
  {
    title: "Weather App",
    description: "A responsive weather dashboard built with React, consuming external weather APIs and providing forecasts.",
    image: "/weather.png",
    link: "#",
    type: "Frontend",
    year: "2023",
    tech: ["React", "API", "Tailwind"],
  },
];

const categories = ["All", "Fullstack", "Frontend", "EdTech"];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const ProjectCard: React.FC<Project & { index: number }> = ({ title, description, image, link, type, year, tech, index }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
      aria-label={`Open project ${title}`}
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-6">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
          priority={false}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 dark:group-hover:bg-neutral-100/10 transition-colors duration-500" />
        
        {/* View Project indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 text-xs font-light tracking-widest uppercase">
            View Project
          </span>
        </div>

        {/* Index number */}
        <div className="absolute bottom-4 left-4 text-xs font-mono text-neutral-400 dark:text-neutral-500">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Meta row */}
        <div className="flex items-center justify-between text-xs tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
          <span>{type}</span>
          <span>{year}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-light text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm font-light text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {tech.map((t, i) => (
            <span
              key={i}
              className="text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-500 border border-neutral-200 dark:border-neutral-800 px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default function WorksSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.type === activeFilter);

  return (
    <section id="works" className="py-32 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <span className="text-xs font-light tracking-[0.4em] text-neutral-400 dark:text-neutral-500 uppercase mb-4 block">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-neutral-900 dark:text-neutral-100">
              Projects
            </h2>
          </div>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs font-light tracking-wider uppercase transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900"
                    : "text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="h-px bg-neutral-200 dark:bg-neutral-800 mt-12 origin-left"
        />
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16"
          >
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.title} {...project} index={idx} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-7xl mx-auto px-6 mt-24"
      >
        <div className="flex flex-col md:flex-row items-center justify-between py-12 border-t border-b border-neutral-200 dark:border-neutral-800">
          <p className="text-lg font-light text-neutral-600 dark:text-neutral-400 mb-6 md:mb-0">
            Want to see more of my work?
          </p>
          <Link
            href="https://github.com/nirupampal"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm font-light tracking-widest uppercase text-neutral-900 dark:text-neutral-100 transition-all duration-300"
          >
            <span>View GitHub</span>
            <span className="w-8 h-px bg-neutral-900 dark:bg-neutral-100 group-hover:w-12 transition-all duration-300" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
