"use client";

import React, { memo, useEffect, useRef } from "react";
import Head from "next/head";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { defaultPortfolioContent, type AboutContent } from "@/lib/portfolio-content";
import TextReveal from "@/components/ui/TextReveal";

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!inView || !ref.current) {
      return;
    }

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [inView, suffix, value]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
};

const ExperienceCard = memo(({ data }: { data: AboutContent["experiences"][number] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative border-l border-white/10 pl-8 py-8 transition-colors hover:border-emerald-500/50 md:pl-12"
    >
      <span className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-neutral-800 ring-4 ring-neutral-950 transition-colors group-hover:bg-emerald-500" />

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h4 className="text-xl font-bold text-white transition-colors group-hover:text-emerald-400">
          {data.title}
        </h4>
        <span className="rounded bg-white/5 px-2 py-1 font-mono text-xs text-neutral-500">
          {data.date}
        </span>
      </div>

      <p className="mb-2 font-mono text-sm uppercase tracking-wider text-neutral-400">
        {data.company}
      </p>

      <p className="mb-6 max-w-xl leading-relaxed text-neutral-400">
        {data.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-neutral-500 transition-colors hover:border-white/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

ExperienceCard.displayName = "ExperienceCard";

export default function AboutSection({
  content = defaultPortfolioContent.about,
}: {
  content?: AboutContent;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nirupam Pal",
    jobTitle: "Lead Fullstack Developer",
    url: "https://inirupampal.in",
    sameAs: ["https://github.com/nirupampal", "https://www.linkedin.com/in/nirupam-pal-0916a721b/"],
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-neutral-950 py-20 text-white md:py-32"
    >
      <Head>
        <title>About - Nirupam Pal</title>
        <meta name="description" content="About Nirupam Pal - Lead Fullstack Developer." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <div className="noise-fill absolute inset-0 brightness-100 contrast-150" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-24">
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
            className="text-4xl font-semibold md:text-5xl lg:text-7xl"
          >
            <TextReveal text={content.titlePrimary} delay={0.2} />
            <br />
            <span className="text-neutral-600">
              <TextReveal text={content.titleSecondary} delay={0.5} />
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <motion.div style={{ y, willChange: "transform" }} className="lg:sticky lg:top-32">
              <div className="group relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm border border-white/10 bg-neutral-900">
                <Image
                  src={content.imageSrc}
                  alt={content.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 z-10 bg-neutral-950/20" />
                <div className="absolute left-2 top-2 z-20 h-4 w-4 border-l-2 border-t-2 border-white/80" />
                <div className="absolute bottom-2 right-2 z-20 h-4 w-4 border-b-2 border-r-2 border-white/80" />
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {content.stats.map((stat, index) => (
                  <div key={`${stat.label}-${index}`} className="border border-white/5 bg-white/5 p-4 text-center backdrop-blur-sm">
                    <div className="flex justify-center text-2xl font-bold text-white">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase text-neutral-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={content.resumeUrl}
                className="mt-8 flex w-full items-center justify-center gap-2 border border-white/20 bg-transparent py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black"
              >
                <span>Download Resume</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20 space-y-6 text-lg font-light leading-relaxed text-neutral-300 md:text-xl"
            >
              {content.paragraphs.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "" : "text-neutral-400"}>
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <div>
              <h3 className="mb-8 font-mono text-sm text-emerald-500">
                / CAREER_HISTORY
              </h3>
              <div className="space-y-0">
                {content.experiences.map((experience) => (
                  <ExperienceCard key={experience.id} data={experience} />
                ))}
              </div>
            </div>

            <div className="mt-20 border-t border-white/10 pt-10">
              <p className="mb-4 text-neutral-400">{content.ctaText}</p>
              <Link href={content.ctaHref} className="inline-block text-3xl font-bold text-white transition-colors hover:text-emerald-400">
                {content.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
