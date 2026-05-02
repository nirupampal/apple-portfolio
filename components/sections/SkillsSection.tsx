"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import type { JSX } from "react/jsx-runtime";

import { defaultPortfolioContent, type SkillCategory, type SkillsContent } from "@/lib/portfolio-content";
import TextReveal from "@/components/ui/TextReveal";

function getIconUrl(slug: string): string {
  return `https://cdn.simpleicons.org/${slug}/ffffff`;
}

const SkillCard = ({ name, icon, color }: { name: string; icon: string; color: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
      }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.03)" }}
      className="group flex cursor-default items-center gap-4 rounded-xl border border-white/5 bg-neutral-900/40 p-4 backdrop-blur-sm transition-colors"
    >
      <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 transition-colors group-hover:bg-neutral-700">
        {/* Simple Icons serves tiny SVGs; using img avoids remote image config for every icon slug. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={getIconUrl(icon)} alt={name} className="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-0 rounded-lg opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40" style={{ backgroundColor: color }} />
      </div>
      <span className="font-light tracking-wide text-neutral-300 transition-colors group-hover:text-white">
        {name}
      </span>
    </motion.div>
  );
};

const CategorySection = ({ data, index }: { data: SkillCategory; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative ml-4 flex min-h-[80vh] items-center border-l border-white/10 py-24 pl-8 md:ml-12 md:pl-16">
      <span className={`absolute -left-[5px] top-1/2 h-2.5 w-2.5 rounded-full transition-colors duration-500 ${isInView ? "bg-white shadow-[0_0_10px_white]" : "bg-neutral-800"}`} />

      <div className="grid w-full max-w-6xl gap-16 lg:grid-cols-2">
        <div className="relative">
          <motion.div style={{ y: yParallax, opacity: opacityParallax }} className="sticky top-1/2">
            <span className="mb-4 block font-mono text-sm opacity-50" style={{ color: data.color }}>
              0{index + 1} / CATEGORY
            </span>
            <h2 className="mb-6 text-5xl font-semibold text-white md:text-7xl">
              {data.title}
            </h2>
            <p className="max-w-md border-l-2 border-white/5 pl-6 text-lg font-light leading-relaxed text-neutral-400">
              {data.description}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
            hidden: {},
          }}
          className="grid content-center grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {data.skills.map((skill) => (
            <SkillCard key={`${data.id}-${skill.name}`} name={skill.name} icon={skill.icon} color={data.color} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default function SkillsParallax({
  content = defaultPortfolioContent.skills,
}: {
  content?: SkillsContent;
}): JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div id="skills" className="min-h-screen overflow-hidden bg-black text-white selection:bg-white/20">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
        <div className="noise-fill absolute inset-0 opacity-20 brightness-100 contrast-150" />
      </div>

      <motion.div className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-white mix-blend-difference" style={{ scaleX }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="mb-24 pl-4 md:pl-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-b from-white to-neutral-800 bg-clip-text text-5xl font-semibold text-transparent md:text-9xl"
          >
            <TextReveal text={content.titlePrimary} delay={0.2} />
            <br />
            <TextReveal text={content.titleSecondary} delay={0.4} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 max-w-xl text-lg text-neutral-500"
          >
            {content.description}
          </motion.p>
        </div>

        <div className="flex flex-col gap-0 pb-32">
          {content.categories.map((category, index) => (
            <CategorySection key={category.id} data={category} index={index} />
          ))}
        </div>

        <div className="flex justify-center border-t border-white/10 py-20">
          <p className="font-mono text-sm text-neutral-500">{content.endLabel}</p>
        </div>
      </div>
    </div>
  );
}
