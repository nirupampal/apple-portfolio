"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { defaultPortfolioContent, type ContactContent } from "@/lib/portfolio-content";

const GrainOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-20">
    <div className="noise-fill absolute inset-0 brightness-100 contrast-150" />
  </div>
);

const IndiaClock = ({ locationLabel }: { locationLabel: string }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
      <div className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </div>
      <span className="font-mono text-xs text-neutral-300">
        {locationLabel} - {time}
      </span>
    </div>
  );
};

const ContactItem = ({ item }: { item: ContactContent["links"][number] }) => {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex items-center justify-between border-t border-white/10 px-4 py-10 transition-colors hover:bg-white/5 md:px-8"
    >
      <div className="flex items-baseline gap-6 md:gap-12">
        <span className="font-mono text-sm text-neutral-500 transition-colors group-hover:text-emerald-500">
          {item.id}
        </span>
        <h3 className="text-3xl font-light text-white transition-transform duration-500 group-hover:translate-x-4 md:text-5xl">
          {item.label}
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden font-mono text-xs uppercase tracking-widest text-neutral-500 transition-colors group-hover:text-white md:block">
          {item.value}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-emerald-500 group-hover:bg-emerald-500">
          <svg className="h-4 w-4 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
};

export default function ContactSection({
  content = defaultPortfolioContent.contact,
}: {
  content?: ContactContent;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const footerOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black pb-12 pt-32 text-white"
    >
      <GrainOverlay />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[50vh] w-full bg-gradient-to-t from-emerald-900/10 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-between px-6">
        <div>
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-4 block font-mono text-sm text-emerald-500">
                {content.sectionLabel}
              </span>
              <h2 className="text-6xl font-semibold leading-none md:text-8xl">
                {content.titlePrimary}
                <br />
                <span className="text-neutral-600">{content.titleSecondary}</span>
              </h2>
            </div>

            <div className="mb-2">
              <p className="mb-4 max-w-xs text-sm leading-relaxed text-neutral-400">
                {content.availabilityText}
              </p>
              <IndiaClock locationLabel={content.locationLabel} />
            </div>
          </div>

          <div className="flex flex-col border-b border-white/10">
            {content.links.map((link) => (
              <ContactItem key={link.id} item={link} />
            ))}
          </div>
        </div>

        <motion.div
          style={{ opacity: footerOpacity }}
          className="flex flex-col items-end justify-between pt-24 font-mono text-xs uppercase tracking-widest text-neutral-500 md:flex-row md:items-center"
        >
          <div className="flex gap-8">
            <span>© {new Date().getFullYear()} {content.copyrightName}</span>
            <span>{content.rightsLabel}</span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group mt-4 flex items-center gap-2 transition-colors hover:text-white md:mt-0"
          >
            {content.backToTopLabel}
            <svg className="h-4 w-4 transition-transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
