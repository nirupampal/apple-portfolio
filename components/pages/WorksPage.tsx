"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";

import { usePortfolioContent } from "@/lib/use-portfolio-content";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { FlagshipProjectShowcase } from "@/components/FlagshipProjectShowcase";
import { SectionHeading, reveal } from "@/components/shared/SectionHeading";

export default function WorksPage() {
  const { content } = usePortfolioContent();

  return (
    <main>
      {/* ═══════════════════ WORKS HERO ═══════════════════ */}
      <section className="border-b border-[#e5e5e5] bg-[#f8f8f8] pt-28 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#7b7b7b]">
              ● Portfolio
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[1.05] tracking-[-0.02em] text-[#222222] md:text-7xl">
              Latest Works
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-[#7b7b7b]">
              A mix of product thinking, interface craft, and fullstack engineering — each project designed around a real job to be done.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ PROJECTS GRID ═══════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-10 md:space-y-14">
            {content.works.projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          <motion.div {...reveal} className="mt-14 flex flex-col items-center gap-5 rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-base font-semibold text-[#222222]">Want to see more?</p>
              <p className="mt-1 text-[13px] text-[#7b7b7b]">Check out my open-source work and experiments on GitHub.</p>
            </div>
            <a
              href={content.works.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full bg-[#222222] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#333333]"
            >
              <Github className="h-4 w-4" />
              {content.works.githubLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
