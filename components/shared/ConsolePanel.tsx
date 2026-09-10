"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Command } from "lucide-react";

import type { TerminalContent } from "@/lib/portfolio-content";
import { reveal } from "@/components/shared/SectionHeading";

export function ConsolePanel({ content }: { content: TerminalContent }) {
  const [activeCommand, setActiveCommand] = useState(0);
  const active = content.commands[activeCommand] ?? content.commands[0];

  if (!active) return null;

  return (
    <section className="relative border-y border-white/[0.07] py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <motion.div {...reveal}>
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-cyan-300/80">
            07 / {content.eyebrow}
          </p>
          <h2 className="mt-6 text-4xl font-medium tracking-[-0.05em] text-white md:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-lg leading-7 text-neutral-400">{content.description}</p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {content.metrics.map((metric) => (
              <div key={metric.label} className="border-l border-white/10 pl-4">
                <p className="text-xl font-medium text-white md:text-2xl">{metric.value}</p>
                <p className="mt-1 text-[11px] leading-4 text-neutral-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090a0d] shadow-[0_35px_120px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
              {content.prompt}
            </span>
          </div>

          <div className="grid md:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-white/[0.07] p-3 md:border-b-0 md:border-r">
              {content.commands.map((item, index) => (
                <button
                  key={item.command}
                  onClick={() => setActiveCommand(index)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left font-mono text-xs transition ${
                    activeCommand === index
                      ? "bg-white/[0.07] text-white"
                      : "text-neutral-600 hover:bg-white/[0.035] hover:text-neutral-300"
                  }`}
                >
                  <Command className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{item.command}</span>
                </button>
              ))}
            </div>

            <div className="min-h-[320px] p-7 font-mono text-xs md:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.command}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <p className="text-neutral-600">
                    <span className="text-cyan-300">{content.prompt}</span>
                    <span className="mx-2 text-violet-400">~</span>
                    {active.command}
                  </p>
                  <p className="mt-8 text-sm font-medium text-white">{active.title}</p>
                  <div className="mt-6 space-y-4">
                    {active.output.map((line, index) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="flex items-center gap-3 text-neutral-400"
                      >
                        <span className="text-emerald-400">✓</span>
                        <span>{line}</span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="mt-8 animate-pulse text-cyan-300">▋</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
