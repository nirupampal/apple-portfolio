"use client";

import React from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Globe,
  Lock,
  Sparkles,
} from "lucide-react";

import type { ProjectItem } from "@/lib/portfolio-content";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { TechBadge } from "@/components/shared/TechIcon";

const reveal = {
  "data-scroll-reveal": "true",
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px 180px 0px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function getProjectUrlDisplay(link: string): string {
  try {
    if (link.startsWith("http")) {
      const url = new URL(link);
      return url.hostname.replace(/^www\./, "");
    }
  } catch {}
  return "demo.live";
}

function getFallbackPoints(project: ProjectItem): string[] {
  const techNames = project.tech.join(", ");
  return [
    `Engineered responsive architecture with optimized client-server state and fluid user interaction.`,
    `Integrated core technologies: ${techNames} for resilient, low-latency performance.`,
    `Production-ready UI crafted with accessibility, high performance metrics, and modern design principles.`,
  ];
}

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const isReversed = index % 2 === 1;
  const points =
    project.points && project.points.length > 0
      ? project.points
      : getFallbackPoints(project);
  const domain = getProjectUrlDisplay(project.link);
  const isLive = project.link.startsWith("http");

  // Accent gradient colors for card subtle ambient glows
  const glowTones = [
    "from-violet-600/20 via-indigo-600/10 to-transparent",
    "from-cyan-500/20 via-sky-600/10 to-transparent",
    "from-emerald-500/20 via-teal-600/10 to-transparent",
    "from-amber-500/20 via-orange-600/10 to-transparent",
    "from-fuchsia-600/20 via-purple-600/10 to-transparent",
  ];
  const glow = glowTones[index % glowTones.length];

  return (
    <motion.article
      {...reveal}
      className="group relative overflow-hidden rounded-[2.5rem] border border-white/[0.09] bg-[#090a0f]/90 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-500 hover:border-white/20 md:p-8 lg:p-10"
    >
      {/* Ambient subtle glow */}
      <div
        className={`pointer-events-none absolute -top-40 ${
          isReversed ? "-left-40" : "-right-40"
        } h-96 w-96 rounded-full bg-gradient-to-br ${glow} blur-[120px] transition-opacity duration-700 opacity-60 group-hover:opacity-100`}
      />

      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* ============================================================ */}
        {/* SIDE 1: PROJECT IMAGE & BROWSER MOCKUP                       */}
        {/* ============================================================ */}
        <div
          className={`flex flex-col gap-3 lg:col-span-6 ${
            isReversed ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {/* macOS Browser Chrome */}
          <div className="group/mockup relative overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-[#0d0e14] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#12141c]/90 px-4 py-2.5 backdrop-blur-md">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/90 shadow-[0_0_6px_rgba(255,95,86,0.5)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90 shadow-[0_0_6px_rgba(255,189,46,0.5)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/90 shadow-[0_0_6px_rgba(39,201,63,0.5)]" />
              </div>

              {/* Domain Pill */}
              <a
                href={project.link}
                target={isLive ? "_blank" : undefined}
                rel={isLive ? "noreferrer" : undefined}
                className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/40 px-3 py-1 font-mono text-[10px] text-neutral-400 transition hover:border-cyan-300/40 hover:text-white"
              >
                <Lock className="h-2.5 w-2.5 text-emerald-400" />
                <span>https://{domain}</span>
                <ExternalLink className="h-2.5 w-2.5 text-neutral-500" />
              </a>

              {/* Live Indicator */}
              <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="hidden sm:inline">Live</span>
              </div>
            </div>

            {/* Image Container with Hover zoom */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
              <a
                href={project.link}
                target={isLive ? "_blank" : undefined}
                rel={isLive ? "noreferrer" : undefined}
                aria-label={`Open live preview for ${project.title}`}
                className="block h-full w-full"
              >
                <PortfolioImage
                  src={project.image}
                  alt={project.title}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-40 transition-opacity group-hover:opacity-20" />

                {/* Floating Action Pill on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover/mockup:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-105">
                    <Globe className="h-3.5 w-3.5 text-cyan-300" />
                    Visit Live Website
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SIDE 2: DETAILS POINT BY POINT & TECH STACK                  */}
        {/* ============================================================ */}
        <div
          className={`flex flex-col gap-5 lg:col-span-6 ${
            isReversed ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {/* Meta Tags Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
              {project.type}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              {project.year}
            </span>
            {project.badge ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/25 bg-violet-400/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-violet-300">
                <Sparkles className="h-3 w-3" />
                {project.badge}
              </span>
            ) : null}
          </div>

          {/* Title & Narrative */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-200 sm:text-3xl md:text-4xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300 sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Point by Point Highlights */}
          <div className="space-y-2 rounded-2xl border border-white/[0.06] bg-black/25 p-4 md:p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Key Highlights & Architecture
            </div>
            <ul className="space-y-2.5 pt-1">
              {points.map((point, pIdx) => (
                <li
                  key={pIdx}
                  className="flex items-start gap-2.5 text-xs leading-relaxed text-neutral-300 sm:text-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Logos */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Technologies & Tools
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Action Buttons: Live Preview (Icon default, text on hover) & GitHub */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Live Preview Button: Shows icon by default; expands to show text on hover */}
            <a
              href={project.link}
              target={isLive ? "_blank" : undefined}
              rel={isLive ? "noreferrer" : undefined}
              title={`Live Preview - ${project.title}`}
              aria-label={`Open live preview for ${project.title}`}
              className="group/btn relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(99,102,241,0.35)] transition-all duration-300 hover:scale-[1.03] hover:px-5 hover:shadow-[0_0_35px_rgba(34,211,238,0.55)]"
            >
              <Globe className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/btn:scale-110" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover/btn:ml-2 group-hover/btn:max-w-xs group-hover/btn:opacity-100">
                Live Preview
              </span>
              <ArrowUpRight className="ml-0 h-0 w-0 shrink-0 opacity-0 transition-all duration-300 ease-out group-hover/btn:ml-1 group-hover/btn:h-3.5 group-hover/btn:w-3.5 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>

            {/* GitHub Source Code button */}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                title={`Source Code - ${project.title}`}
                aria-label={`View source code on GitHub for ${project.title}`}
                className="group/gh inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <Github className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/gh:scale-110" />
                <span>Source Code</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
