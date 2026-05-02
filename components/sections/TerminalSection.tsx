"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Play, Terminal } from "lucide-react";
import { motion } from "framer-motion";

import { defaultPortfolioContent, type TerminalContent } from "@/lib/portfolio-content";

export default function TerminalSection({
  content = defaultPortfolioContent.terminal,
}: {
  content?: TerminalContent;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCommand = content.commands[activeIndex] ?? content.commands[0];
  const metricSummary = useMemo(
    () => content.metrics.map((metric) => `${metric.value} ${metric.label}`).join(" / "),
    [content.metrics],
  );

  if (!activeCommand) {
    return null;
  }

  return (
    <section id="terminal" className="relative overflow-hidden bg-neutral-950 px-6 py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_35%,rgba(255,255,255,0.03))]" />
      <div className="noise pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 font-mono text-xs uppercase text-emerald-400"
          >
            {content.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="max-w-xl text-5xl font-semibold leading-none text-white md:text-7xl"
          >
            {content.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mt-6 max-w-xl text-lg leading-8 text-neutral-400"
          >
            {content.description}
          </motion.p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {content.metrics.map((metric) => (
              <div key={`${metric.value}-${metric.label}`} className="border-t border-white/15 pt-4">
                <p className="text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-sm text-neutral-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="overflow-hidden rounded-[8px] border border-white/10 bg-black/70 shadow-2xl shadow-black/40"
        >
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
              <Terminal className="h-4 w-4" />
              <span>{content.prompt}</span>
            </div>
          </div>

          <div className="grid min-h-[430px] lg:grid-cols-[240px_1fr]">
            <div className="border-b border-white/10 bg-white/[0.02] p-3 lg:border-b-0 lg:border-r">
              <div className="grid gap-2">
                {content.commands.map((item, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={`${item.command}-${index}`}
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-center gap-3 rounded-[8px] px-3 py-3 text-left text-sm transition ${
                        isActive
                          ? "bg-white text-black"
                          : "text-neutral-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Play className="h-4 w-4 shrink-0" />
                      <span className="min-w-0 truncate font-mono">{item.command}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col p-5 md:p-7">
              <p className="font-mono text-sm text-neutral-500">
                <span className="text-emerald-400">{content.prompt}</span>:~$ {activeCommand.command}
              </p>
              <h3 className="mt-6 text-2xl font-semibold text-white">{activeCommand.title}</h3>
              <div className="mt-6 space-y-4">
                {activeCommand.output.map((line) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 font-mono text-sm text-neutral-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{line}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <div className="rounded-[8px] border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-xs text-neutral-500">
                  impact: {metricSummary}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
