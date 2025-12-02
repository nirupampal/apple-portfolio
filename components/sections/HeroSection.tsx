"use client";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { JSX } from "react/jsx-runtime";
import { motion, useReducedMotion, Variants, TargetAndTransition } from "framer-motion";

export default function HeroSection({
  siteUrl = "https://nirupampal.vercel.app",
  ogImage = "/og-hero.png",
}: {
  siteUrl?: string;
  ogImage?: string;
}): JSX.Element {
  const reduce = useReducedMotion();

  /* Text/container variants (staggered entrance) */
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  /* Ball motion helpers */
  const getBallAnimation = (i: number): TargetAndTransition | undefined => {
    if (reduce) return undefined;

    const patterns = [
      { x: [0, 24, 48, 24, 0], y: [0, -30, 0, 30, 0], dur: 10 },
      { x: [0, -18, -36, -18, 0], y: [0, 22, 0, -18, 0], dur: 11 },
      { x: [0, 30, -12, 0], y: [0, -50, 12, 0], dur: 12 },
      { x: [0, 20, 40, 20, 0], y: [0, -24, 0, 18, 0], dur: 9.5 },
      { x: [0, -36, -18, -8, 0], y: [0, 30, -8, 0], dur: 10.5 },
      { x: [0, 48, 16, -10, 0], y: [0, -40, 8, 0], dur: 13 },
      { x: [0, -24, 24, 12, 0], y: [0, 30, -20, 0], dur: 12 },
      { x: [0, -56, -28, -12, 0], y: [0, 18, -12, 0], dur: 14 },
    ];
    const p = patterns[i % patterns.length];

    return {
      x: p.x,
      y: p.y,
      transition: {
        duration: p.dur,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    };
  };

  /* Triangle motion */
  const triangleAnim: TargetAndTransition | {} = reduce
    ? {}
    : {
        x: [-0, -120, -240, -80, 0],
        y: [0, 80, -60, -160, 0],
        rotate: [0, 18, 36, 18, 0],
        transition: { duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "loop" as const },
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
        id="home"
        className="relative pb-6 min-h-screen flex flex-col justify-center items-center text-center pt-12 overflow-hidden bg-white dark:bg-black/95 transition-colors duration-500 border-b dark:border-gray-800"
        aria-label="Hero section — introduction and primary call to action"
      >
        {/* Decorative animated background: transparent infinite balls (circles) + moving triangle */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            initial={reduce ? undefined : { opacity: 0.98 }}
            animate={reduce ? undefined : { opacity: [0.98, 1, 0.98], transition: { duration: 6, repeat: Infinity } }}
          >
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.36" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.28" />
              </linearGradient>
              <linearGradient id="g2" x1="0" x2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.26" />
              </linearGradient>

              <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Balls group 1 */}
            <g className="balls-group" fill="url(#g1)">
              <motion.circle
                className="ball"
                cx="140"
                cy="120"
                r="90"
                style={{ opacity: 0.44, transformOrigin: "center" }}
                animate={getBallAnimation(0)}
                aria-hidden
              />
              <motion.circle
                className="ball"
                cx="420"
                cy="200"
                r="60"
                style={{ opacity: 0.44, transformOrigin: "center" }}
                animate={getBallAnimation(1)}
                aria-hidden
              />
              <motion.circle
                className="ball"
                cx="980"
                cy="80"
                r="120"
                style={{ opacity: 0.44, transformOrigin: "center" }}
                animate={getBallAnimation(2)}
                aria-hidden
              />
              <motion.circle
                className="ball"
                cx="1260"
                cy="300"
                r="70"
                style={{ opacity: 0.44, transformOrigin: "center" }}
                animate={getBallAnimation(3)}
                aria-hidden
              />
              <motion.circle
                className="ball"
                cx="300"
                cy="520"
                r="110"
                style={{ opacity: 0.44, transformOrigin: "center" }}
                animate={getBallAnimation(4)}
                aria-hidden
              />
            </g>

            {/* Balls group 2 */}
            <g className="balls-group-2" fill="url(#g2)">
              <motion.circle
                className="ball"
                cx="820"
                cy="420"
                r="140"
                style={{ opacity: 0.44, transformOrigin: "center" }}
                animate={getBallAnimation(5)}
                aria-hidden
              />
              <motion.circle
                className="ball"
                cx="1200"
                cy="620"
                r="90"
                style={{ opacity: 0.44, transformOrigin: "center" }}
                animate={getBallAnimation(6)}
                aria-hidden
              />
              <motion.circle
                className="ball"
                cx="520"
                cy="740"
                r="100"
                style={{ opacity: 0.44, transformOrigin: "center" }}
                animate={getBallAnimation(7)}
                aria-hidden
              />
            </g>

            {/* Moving triangle (polygon) */}
            <g className="triangle-group" fill="#ffffff" opacity="0.08">
              <motion.polygon
                className="moving-triangle"
                points="0,0 140,0 70,120"
                transform="translate(1100 80)"
                animate={triangleAnim}
                style={{ transformOrigin: "70px 40px" }}
                aria-hidden
              />
            </g>

            {/* Decorative grid lines (very subtle) */}
            <g className="grid-lines" stroke="currentColor" strokeOpacity="0.02" aria-hidden>
              <line x1="0" y1="150" x2="1600" y2="150" />
              <line x1="0" y1="450" x2="1600" y2="450" />
              <line x1="0" y1="750" x2="1600" y2="750" />
            </g>
          </motion.svg>
        </div>

        {/* Content container (motion) */}
        <motion.div className="z-10 px-6 max-w-5xl" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium tracking-wide mb-4" variants={fadeUp}>
            Introducing <span className="font-semibold">Nirupam Pal</span>.
          </motion.p>

          <motion.h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter text-gray-900 dark:text-white transition-colors duration-500 leading-tight" variants={fadeUp}>
            Crafting Digital Products That Define Experience.
          </motion.h1>

          <motion.p className="mt-6 md:mt-8 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light" variants={fadeUp}>
            I'm a Fullstack Developer focusing on <strong>modern UIs</strong> and <strong>scalable backend solutions</strong> with Next.js &amp; Node.js. I design delightful interfaces,
            ship reliable APIs, and optimize performance for real-world scale.
          </motion.p>

          <motion.div className="mt-8 flex justify-center space-x-4" variants={fadeUp}>
            <Link
              href="#works"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-[1.03] shadow-xl hover:shadow-2xl"
              aria-label="Explore my work — portfolio projects"
            >
              <span>Explore My Work</span>
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-lg font-medium rounded-full transition-all duration-300 hover:shadow-md"
              aria-label="Contact — get in touch with Nirupam Pal"
            >
              Contact
            </Link>
          </motion.div>

          <p className="sr-only">
            Nirupam Pal is a fullstack developer with experience building user-centric web applications using modern
            JavaScript frameworks. Services include frontend development, backend APIs, database design, performance
            optimization, and deployment. Available for remote and on-site roles, open to opportunities in Kolkata and
            beyond.
          </p>
        </motion.div>

        {/* Inline styles (keep fallback styles & accessibility) */}
        <style jsx global>{`
          /* keep fallback fade class for non-framer usage (harmless) */
          .animate-fadeInUp {
            animation: fadeInUp 700ms cubic-bezier(.2,.9,.2,1) both;
          }

          @keyframes fadeInUp {
            from { transform: translateY(10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          .ball { filter: url(#softBlur); }

          /* Ensure SVG stays visible on small screens */
          @media (max-width: 640px) {
            .ball { opacity: 0.40; filter: none; }
            .moving-triangle { opacity: 0.06; }
          }

          .balls-group,
          .balls-group-2 {
            mix-blend-mode: normal !important;
          }

          /* Reduced-motion CSS fallback */
          @media (prefers-reduced-motion: reduce) {
            .moving-triangle, .ball {
              animation: none !important;
            }
          }

          .sr-only {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
          }
        `}</style>
      </section>
    </>
  );
}
