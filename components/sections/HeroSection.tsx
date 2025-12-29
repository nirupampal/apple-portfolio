"use client";
import Head from "next/head";
import Link from "next/link";
import React, { useRef } from "react";
import { JSX } from "react/jsx-runtime";
import { motion, useReducedMotion, Variants, useScroll, useTransform } from "framer-motion";

export default function HeroSection({
  siteUrl = "https://nirupampal.vercel.app",
  ogImage = "/og-hero.png",
}: {
  siteUrl?: string;
  ogImage?: string;
}): JSX.Element {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  /* Text/container variants (staggered entrance) */
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };
  
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const lineReveal: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 } },
  };

  /* Structured data (Person + WebSite) — improves rich results */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Nirupam Pal",
        url: siteUrl,
        sameAs: ["https://github.com/nirupampal", "https://www.linkedin.com/in/nirupam-pal-0916a721b/"],
        jobTitle: "Fullstack Developer",
        description: "Fullstack Developer specializing in modern UI and scalable Node/Next backends.",
      },
      {
        "@type": "WebSite",
        name: "Nirupam Pal — Portfolio",
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
        <title>Nirupam Pal — Fullstack Developer | Modern UI & Scalable Backend</title>
        <meta
          name="description"
          content="Nirupam Pal is a Fullstack Developer specializing in modern user interfaces and scalable backend solutions using Next.js and Node.js. Explore portfolio projects, services and contact information."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nirupam Pal" />

        {/* Open Graph */}
        <meta property="og:title" content="Nirupam Pal — Fullstack Developer" />
        <meta
          property="og:description"
          content="Fullstack developer building modern UIs and scalable Node/Next backends. Explore portfolio projects and contact information."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}#home`} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Nirupam Pal" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@nirupampal" />
        <meta name="twitter:title" content="Nirupam Pal — Fullstack Developer" />
        <meta name="twitter:description" content="Fullstack developer building modern UIs and scalable Node/Next backends." />
        <meta name="twitter:image" content={ogImage} />

        <link rel="canonical" href={`${siteUrl}#home`} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <section
        ref={containerRef}
        id="home"
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500"
        aria-label="Hero section — introduction and primary call to action"
      >
        {/* Minimal grid background */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          {/* Horizontal lines */}
          <div className="absolute inset-0 flex flex-col justify-between py-20 opacity-[0.03] dark:opacity-[0.05]">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-full h-px bg-neutral-900 dark:bg-neutral-100" />
            ))}
          </div>
          {/* Vertical lines */}
          <div className="absolute inset-0 flex justify-between px-20 opacity-[0.03] dark:opacity-[0.05]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-full w-px bg-neutral-900 dark:bg-neutral-100" />
            ))}
          </div>
          {/* Center crosshair accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.02]">
            <div className="absolute top-1/2 left-0 w-full h-px bg-neutral-900 dark:bg-neutral-100" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-neutral-900 dark:bg-neutral-100" />
          </div>
          {/* Subtle radial gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(250,250,250,0.8)_70%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.8)_70%)]" />
        </div>

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-neutral-300 dark:border-neutral-700 opacity-60" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-neutral-300 dark:border-neutral-700 opacity-60" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-neutral-300 dark:border-neutral-700 opacity-60" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-neutral-300 dark:border-neutral-700 opacity-60" />

        {/* Content container (motion) */}
        <motion.div 
          className="z-10 px-6 max-w-5xl"
          style={reduce ? {} : { opacity, scale, y }}
        >
          <motion.div
            variants={container} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-center text-center"
          >
            {/* Eyebrow text */}
            <motion.div variants={fadeUp} className="mb-8">
              <span className="text-xs font-light tracking-[0.4em] text-neutral-500 dark:text-neutral-400 uppercase">
                Fullstack Developer
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-neutral-900 dark:text-neutral-100 leading-[0.95] mb-6"
            >
              <span className="block">Nirupam</span>
              <span className="block font-light">Pal</span>
            </motion.h1>

            {/* Divider line */}
            <motion.div 
              variants={lineReveal}
              className="w-16 h-px bg-neutral-300 dark:bg-neutral-700 mb-8 origin-left"
            />

            {/* Subheading */}
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed mb-12"
            >
              Crafting refined digital experiences through{" "}
              <span className="text-neutral-900 dark:text-neutral-100">modern interfaces</span>{" "}
              and{" "}
              <span className="text-neutral-900 dark:text-neutral-100">scalable architecture</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="#works"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-light tracking-widest uppercase bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 transition-all duration-500 hover:tracking-[0.2em]"
                aria-label="Explore my work — portfolio projects"
              >
                <span className="relative z-10">View Work</span>
                <div className="absolute inset-0 bg-neutral-800 dark:bg-neutral-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>

              <Link
                href="#contact"
                className="group inline-flex items-center justify-center px-8 py-4 text-sm font-light tracking-widest uppercase text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 transition-all duration-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-900 dark:hover:border-neutral-100"
                aria-label="Contact — get in touch with Nirupam Pal"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom info bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8 text-[10px] tracking-[0.3em] text-neutral-400 dark:text-neutral-600 uppercase"
        >
          <span>Based in India</span>
          <div className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
          <span>Available for Work</span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-linear-to-b from-neutral-400 to-transparent dark:from-neutral-600"
          />
        </motion.div>

        {/* Hidden SEO text */}
        <p className="sr-only">
          Nirupam Pal is a fullstack developer with experience building user-centric web applications using modern
          JavaScript frameworks. Services include frontend development, backend APIs, database design, performance
          optimization, and deployment. Available for remote and on-site roles, open to opportunities in Kolkata and
          beyond.
        </p>
      </section>
    </>
  );
}
