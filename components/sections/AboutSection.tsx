"use client";

import React from "react";
import Head from "next/head";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Experience = {
  title: string;
  company: string;
  date: string;
  description: string;
};

const experiences: Experience[] = [
  {
    title: "Lead Fullstack Developer",
    company: "Microace Software",
    date: "2024 — Present",
    description:
      "Architecting scalable web platforms, leading engineering team, improving release cadence and observability across services.",
  },
  {
    title: "Fullstack Developer",
    company: "Project-Based Work",
    date: "2022 — 2024",
    description:
      "Built E-commerce platforms, real-time chat applications, billing systems, and custom mail solutions from database design to pixel-perfect UI.",
  },
  {
    title: "Continuous Learning",
    company: "Self-Development",
    date: "Ongoing",
    description:
      "Expanding expertise in React/Next.js, Node.js, TypeScript, Docker, Kubernetes, CI/CD pipelines, AWS, and cloud infrastructure.",
  },
];

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "10+", label: "Technologies" },
  { value: "100%", label: "Commitment" },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function AboutSection({
  resumeUrl = "/resume.pdf",
}: {
  resumeUrl?: string;
}) {
  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nirupam Pal",
    jobTitle: "Lead Fullstack Developer",
    url: "https://nirupampal.vercel.app",
    sameAs: [
      "https://github.com/nirupampal",
      "https://www.linkedin.com/in/nirupam-pal-0916a721b/",
    ],
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500 py-32"
    >
      <Head>
        <title>About — Nirupam Pal — Lead Fullstack Developer</title>
        <meta
          name="description"
          content="About Nirupam Pal — Lead Fullstack Developer. Expertise in React/Next.js, Node.js, TypeScript, Docker, Kubernetes and building production-ready software."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20"
        >
          <span className="text-xs font-light tracking-[0.4em] text-neutral-400 dark:text-neutral-500 uppercase mb-4 block">
            About Me
          </span>
          <h2
            id="about-heading"
            className="text-4xl md:text-5xl font-extralight tracking-tight text-neutral-900 dark:text-neutral-100"
          >
            Nirupam Pal
          </h2>
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="h-px bg-neutral-200 dark:bg-neutral-800 mt-8 origin-left max-w-md"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column - Image & Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            {/* Profile Image */}
            <motion.div variants={itemVariants} className="relative mb-12">
              <div className="aspect-4/5 relative overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <Image
                  src="/nirupam.jpeg"
                  alt="Nirupam Pal"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-neutral-100/50" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-neutral-100/50" />
              </div>
              {/* Image caption */}
              <div className="mt-4 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
                <span className="tracking-wider uppercase">Kolkata, India</span>
                <span className="tracking-wider">Available for Work</span>
              </div>
            </motion.div>

            {/* Quick Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-neutral-400 dark:text-neutral-500 w-20">Role</span>
                <span className="text-neutral-900 dark:text-neutral-100 font-light">Lead Fullstack Developer</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-neutral-400 dark:text-neutral-500 w-20">Focus</span>
                <span className="text-neutral-900 dark:text-neutral-100 font-light">Web Applications & APIs</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-neutral-400 dark:text-neutral-500 w-20">Email</span>
                <a href="mailto:nirupampaldev@gmail.com" className="text-neutral-900 dark:text-neutral-100 font-light hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                  nirupampaldev@gmail.com
                </a>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href={resumeUrl}
                download
                className="group inline-flex items-center justify-center px-6 py-4 text-xs font-light tracking-widest uppercase bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 transition-all duration-500 hover:tracking-[0.2em]"
              >
                Download Resume
              </a>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-4 text-xs font-light tracking-widest uppercase text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 transition-all duration-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-900 dark:hover:border-neutral-100"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-16"
          >
            {/* Bio */}
            <motion.div variants={itemVariants}>
              <p className="text-2xl md:text-3xl font-extralight leading-relaxed text-neutral-700 dark:text-neutral-300">
                I build production-ready web applications with a focus on{" "}
                <span className="text-neutral-900 dark:text-neutral-100">performance</span>,{" "}
                <span className="text-neutral-900 dark:text-neutral-100">maintainability</span>, and{" "}
                <span className="text-neutral-900 dark:text-neutral-100">delightful user experiences</span>.
              </p>
              <p className="mt-8 text-base font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
                I lead development teams and ship reliable backend systems designed for scale. 
                From prototyping UIs to designing resilient APIs, I focus on the entire product 
                lifecycle — helping teams ship with confidence through observability and developer experience.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-neutral-200 dark:border-neutral-800">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center md:text-left">
                    <div className="text-3xl md:text-4xl font-extralight text-neutral-900 dark:text-neutral-100">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xs font-light tracking-[0.4em] text-neutral-400 dark:text-neutral-500 uppercase mb-8">
                Experience
              </h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={exp.title} className="group">
                    <div className="flex items-start gap-8">
                      {/* Index */}
                      <span className="text-xs font-mono text-neutral-300 dark:text-neutral-700 pt-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4 mb-2">
                          <h4 className="text-lg font-light text-neutral-900 dark:text-neutral-100">
                            {exp.title}
                          </h4>
                          <span className="text-xs tracking-wider text-neutral-400 dark:text-neutral-500">
                            {exp.date}
                          </span>
                        </div>
                        <p className="text-xs tracking-wider uppercase text-neutral-400 dark:text-neutral-500 mb-3">
                          {exp.company}
                        </p>
                        <p className="text-sm font-light text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                    
                    {index < experiences.length - 1 && (
                      <div className="mt-8 ml-8 h-px bg-neutral-100 dark:bg-neutral-800" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills CTA */}
            <motion.div variants={itemVariants}>
              <Link
                href="#skills"
                className="group inline-flex items-center gap-4 text-sm font-light text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300"
              >
                <span className="tracking-widest uppercase">View Full Skills</span>
                <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
