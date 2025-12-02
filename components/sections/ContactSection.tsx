"use client";

import React from "react";
import Head from "next/head";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { JSX } from "react/jsx-runtime";

export default function ContactSection(): JSX.Element {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, duration: 0.6 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
  };

  // Accent animation (typed properly)
  const accentAnimation = reduce
    ? {}
    : {
        opacity: [0, 0.08, 0],
        transition: {
          duration: 1.6,
          repeat: Infinity,
          // repeatType literal typed correctly
          repeatType: "reverse" as const,
        },
      };

  // Structured data for ContactPoint + Person
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nirupam Pal",
    url: "https://nirupampal.vercel.app",
    sameAs: [
      "https://www.linkedin.com/in/nirupam-pal-0916a721b/",
      "https://github.com/nirupampal"
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "business",
        email: "nirupampaldev@gmail.com",
        description: "Primary contact for freelance & contract opportunities"
      }
    ]
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="w-full bg-gradient-to-b from-white via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-colors duration-500"
    >
      {/* Page-level Head is ideal for SEO; including relevant meta & structured data here for convenience. If you prefer server-side, move these tags to the page-level `head`. */}
      <Head>
        <title>Contact — Nirupam Pal — Lead Fullstack Developer</title>
        <meta name="description" content="Contact Nirupam Pal for freelance, contract or full-time opportunities. Email: nirupampaldev@gmail.com — typically replies within 1–2 business days." />
        <meta name="robots" content="index,follow" />

        {/* Open Graph / Social preview */}
        <meta property="og:title" content="Contact — Nirupam Pal" />
        <meta property="og:description" content="Get in touch with Nirupam Pal — Lead Fullstack Developer. Reach out for projects, collaborations, or job opportunities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nirupampal.vercel.app#contact" />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact — Nirupam Pal" />
        <meta name="twitter:description" content="Get in touch with Nirupam Pal — Lead Fullstack Developer. Reach out for projects, collaborations, or job opportunities." />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* Full-width container with horizontal padding */}
      <div className="w-full px-6">
        {/* Centered frame — still full-width on small screens, constrained on large screens */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.20 }}
          className="relative mx-auto w-full max-w-6xl"
        >
          {/* The visual card (fills available width but keeps padding & rounded corners) */}
          <div className="w-full">
            <motion.div
              className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16"
              variants={fadeUp}
            >
              <div className="flex flex-col lg:flex-row items-center gap-10">
                <motion.div variants={fadeUp} className="flex-1 text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Let’s create something remarkable.
                  </h2>

                  <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 font-light">
                    I design and build delightful digital experiences. If you have a project, collaboration or opportunity,
                    I’d love to hear about it.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 justify-center lg:justify-start">
                    <motion.a
                      variants={fadeUp}
                      href="mailto:nirupampaldev@gmail.com"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-semibold shadow-md bg-black text-white dark:bg-white dark:text-black min-w-[200px] hover:scale-[1.02] transform transition-shadow duration-200"
                      whileHover={{ scale: 1.035 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Email Nirupam Pal"
                    >
                      Say Hello
                    </motion.a>

                    <motion.a
                      variants={fadeUp}
                      href="#works"
                      className="inline-flex items-center px-6 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all"
                      whileHover={{ y: -3 }}
                    >
                      View portfolio
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="w-full sm:w-96 md:w-[420px] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl font-semibold text-gray-700 dark:text-gray-200">
                      ✉️
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Prefer to message?</p>
                      <p className="mt-1 font-medium text-gray-900 dark:text-white">nirupampaldev@gmail.com</p>
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <p>
                      Typical response time: <span className="font-medium">1–2 business days</span>.
                    </p>

                    <p className="mt-3">Include a short description of your project and links (Figma, brief, repo) if you have them.</p>
                  </div>
                </motion.div>
              </div>

              {/* subtle floating accents similar to Apple aesthetic (positioned relative to the card) */}
              <motion.div
                aria-hidden
                initial={reduce ? undefined : { opacity: 0 }}
                animate={accentAnimation as any}
                className="pointer-events-none absolute left-1/2 transform -translate-x-1/2 translate-y-8"
                style={{ width: "420px", height: 120 }}
              />
            </motion.div>
          </div>

          {/* Bottom helper text */}
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Prefer other ways to connect? I’m on LinkedIn and GitHub.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
