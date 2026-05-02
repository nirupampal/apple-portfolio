"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import ParallaxImage from "@/components/ui/ParallaxImage";
import { defaultPortfolioContent, type ProjectItem, type WorksContent } from "@/lib/portfolio-content";

const ProjectCard = ({ project, index }: { project: ProjectItem; index: number }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.055]"
      >
        <div className="relative h-56 overflow-hidden bg-neutral-900 md:h-60">
          <ParallaxImage src={project.image} alt={project.title} className="h-full w-full" aspectRatio="16/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase text-neutral-300 backdrop-blur-md">
              {project.year}
            </span>
            <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase text-emerald-300 backdrop-blur-md">
              {project.type}
            </span>
          </div>
          <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-5">
            <h3 className="text-2xl font-semibold leading-tight text-white">
              {project.title}
            </h3>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-400">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-[6px] border border-white/10 bg-black/25 px-2.5 py-1 font-mono text-[10px] uppercase text-neutral-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default function WorksSection({
  content = defaultPortfolioContent.works,
}: {
  content?: WorksContent;
}) {
  const categories = useMemo(
    () => ["All", ...new Set(content.projects.map((project) => project.type))],
    [content.projects],
  );
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? content.projects
    : content.projects.filter((project) => project.type === activeFilter);

  return (
    <section id="works" className="relative overflow-hidden bg-black py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <div className="noise-fill absolute inset-0 brightness-100 contrast-150" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 block font-mono text-sm text-emerald-500"
            >
              {content.sectionLabel}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-semibold text-white md:text-7xl"
            >
              {content.titlePrimary}
              <br />
              <span className="text-neutral-600">{content.titleSecondary}</span>
            </motion.h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`rounded-full border px-5 py-2 text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === category
                    ? "border-white bg-white text-black"
                    : "border-neutral-800 bg-transparent text-neutral-500 hover:border-neutral-500 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={`${project.title}-${project.year}`} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 flex justify-center border-t border-white/10 pt-12">
          <Link
            href={content.githubUrl}
            target="_blank"
            className="group flex items-center gap-4 text-lg font-light text-neutral-400 transition-colors hover:text-white"
          >
            <span>{content.githubLabel}</span>
            <span className="block h-px w-12 bg-neutral-600 transition-all duration-300 group-hover:w-20 group-hover:bg-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
