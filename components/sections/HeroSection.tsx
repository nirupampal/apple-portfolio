"use client";

import Head from "next/head";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import type { JSX } from "react/jsx-runtime";

import { defaultPortfolioContent, type HeroContent } from "@/lib/portfolio-content";
import TextReveal from "@/components/ui/TextReveal";

const GrainOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
    <div
      className="noise-fill absolute inset-0 opacity-20 brightness-100 contrast-150"
      style={{ backgroundRepeat: "repeat" }}
    />
  </div>
);

const HeroBackdrop = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.16),transparent_42%),linear-gradient(180deg,#050505_0%,#111_48%,#050505_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:84px_84px] opacity-30" />
    </div>
  );
};

const Spotlight = ({ mouseX, mouseY }: { mouseX: unknown; mouseY: unknown }) => {
  return (
    <motion.div
      className="pointer-events-none absolute -inset-px z-10 overflow-hidden rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      aria-hidden="true"
    >
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-2xl"
        style={{
          x: mouseX as never,
          y: mouseY as never,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />
    </motion.div>
  );
};

const MagneticButton = ({
  children,
  href,
  primary = false,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) => {
  return (
    <Link href={href} className="group relative">
      <div
        className={`relative z-10 flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-widest transition-all duration-300 ${
          primary
            ? "bg-white text-neutral-950 hover:bg-neutral-200"
            : "border border-white/20 text-white hover:border-white/50 hover:bg-white/5"
        }`}
      >
        {children}
      </div>
      {primary ? (
        <div className="absolute inset-0 -z-10 bg-white/50 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-70" />
      ) : null}
    </Link>
  );
};

export default function HeroSection({
  content = defaultPortfolioContent.hero,
  siteUrl = "https://inirupampal.in",
  ogImage = "/og-hero.png",
}: {
  content?: HeroContent;
  siteUrl?: string;
  ogImage?: string;
}): JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Nirupam Pal",
        url: siteUrl,
        sameAs: ["https://github.com/nirupampal", "https://www.linkedin.com/in/nirupam-pal-0916a721b/"],
        jobTitle: "Fullstack Developer",
        description: content.description,
      },
      {
        "@type": "WebSite",
        name: "Nirupam Pal - Portfolio",
        url: siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Nirupam Pal - Fullstack Developer | Modern UI & Scalable Backend</title>
        <meta name="description" content={content.description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Nirupam Pal - Fullstack Developer" />
        <meta property="og:description" content={content.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}#home`} />
        <meta property="og:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <section
        ref={containerRef}
        id="home"
        onMouseMove={handleMouseMove}
        className="group relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-neutral-950 pt-20 text-white selection:bg-white/30"
      >
        <GrainOverlay />
        <HeroBackdrop />
        <Spotlight mouseX={smoothX} mouseY={smoothY} />

        <motion.div
          style={{ y: y1, opacity }}
          className="relative z-30 mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 shadow-lg backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
              {content.availabilityText}
            </span>
          </motion.div>

          <div className="relative">
            <div className="bg-gradient-to-b from-white via-white to-neutral-500 bg-clip-text text-7xl font-semibold leading-none text-transparent sm:text-8xl md:text-9xl lg:text-[10rem]">
              <TextReveal text={content.firstName} delay={0.2} />
              <br />
              <span className="outline-text text-neutral-800">
                <TextReveal text={content.lastName} delay={0.5} />
              </span>
            </div>
          </div>

          <div className="max-w-2xl text-lg font-light leading-relaxed text-neutral-400 md:text-2xl">
            <TextReveal text={content.role} wordLevel delay={0.8} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-col gap-6 sm:flex-row"
          >
            <MagneticButton href={content.primaryCtaHref} primary>
              {content.primaryCtaLabel}
            </MagneticButton>
            <MagneticButton href={content.secondaryCtaHref}>
              {content.secondaryCtaLabel}
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-4 grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035] text-left backdrop-blur-md sm:grid-cols-3"
          >
            {[
              ["Frontend", "High-polish interfaces"],
              ["Backend", "Scalable product systems"],
              ["CMS", "Firebase-powered updates"],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r last:border-b-0 sm:last:border-r-0">
                <p className="font-mono text-[10px] uppercase text-neutral-500">{label}</p>
                <p className="mt-1 text-sm text-neutral-200">{value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Scroll</span>
          <div className="h-12 w-[1px] overflow-hidden bg-gradient-to-b from-neutral-800 to-transparent">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="h-1/2 w-full bg-white"
            />
          </div>
        </motion.div>

        <style jsx global>{`
          .outline-text {
            -webkit-text-stroke: 2px #333;
            color: transparent;
          }
          @media (min-width: 768px) {
            .outline-text {
              -webkit-text-stroke: 3px #333;
            }
          }
          .translate-z-0 {
            transform: translateZ(0);
          }
        `}</style>
      </section>
    </>
  );
}
