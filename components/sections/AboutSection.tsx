"use client";

import React, { useRef } from "react";
import Head from "next/head";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

// --- DATA ---
type Experience = {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string;
  tags: string[];
};

const experiences: Experience[] = [
  {
    id: "01",
    title: "Lead Fullstack Developer",
    company: "Microace Software",
    date: "2024 — Present",
    description: "Architecting scalable web platforms and leading the engineering team. Improved release cadence by 40% and implemented comprehensive observability.",
    tags: ["Leadership", "Architecture", "DevOps"],
  },
  {
    id: "02",
    title: "Fullstack Developer",
    company: "Project-Based Work",
    date: "2022 — 2024",
    description: "Delivered 15+ end-to-end solutions including E-commerce platforms and real-time chat apps. Handled database design, API development, and UI implementation.",
    tags: ["Fullstack", "DB Design", "React"],
  },
  {
    id: "03",
    title: "Continuous Learning",
    company: "Self-Development",
    date: "Ongoing",
    description: "Deepening expertise in distributed systems. Currently building custom Kubernetes operators and exploring Rust for high-performance tooling.",
    tags: ["R&D", "Rust", "K8s"],
  },
];

const stats = [
  { value: 3, suffix: "+", label: "Years Exp." },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 100, suffix: "%", label: "Commitment" },
];

// --- COMPONENTS ---

const ExperienceCard = ({ data }: { data: Experience }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative border-l border-white/10 pl-8 md:pl-12 py-8 transition-colors hover:border-emerald-500/50"
    >
        {/* Timeline Dot */}
        <span className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-neutral-800 ring-4 ring-black transition-colors group-hover:bg-emerald-500" />
        
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
            <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                {data.title}
            </h4>
            <span className="font-mono text-xs text-neutral-500 bg-white/5 px-2 py-1 rounded">
                {data.date}
            </span>
        </div>
        
        <p className="mb-2 text-sm font-mono text-neutral-400 uppercase tracking-wider">
            {data.company}
        </p>
        
        <p className="text-neutral-400 leading-relaxed max-w-xl mb-6">
            {data.description}
        </p>

        <div className="flex gap-2">
            {data.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-wider text-neutral-500 border border-white/5 px-2 py-1 rounded hover:border-white/20 transition-colors">
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
  );
};

export default function AboutSection({
  resumeUrl = "https://drive.google.com/file/d/1WdiR6QzRi3tsuMX-d5JHZ3_t3tnH_F-z/view",
}: {
  resumeUrl?: string;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  // Parallax for the image
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nirupam Pal",
    jobTitle: "Lead Fullstack Developer",
    url: "https://nirupampal.vercel.app",
    sameAs: ["https://github.com/nirupampal", "https://www.linkedin.com/in/nirupam-pal-0916a721b/"],
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative min-h-screen bg-neutral-950 py-32 text-white overflow-hidden"
    >
      <Head>
        <title>About — Nirupam Pal</title>
        <meta name="description" content="About Nirupam Pal — Lead Fullstack Developer." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* Background Noise */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-24">
            <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4 block font-mono text-sm text-emerald-500"
            >
                01 / ABOUT ME
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-bold tracking-tighter"
            >
                Engineer.<br />
                <span className="text-neutral-600">Problem Solver.</span>
            </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Image (Sticky) */}
            <div className="lg:col-span-5 relative">
                <motion.div 
                    style={{ y }} 
                    className="lg:sticky lg:top-32"
                >
                    <div className="group relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm bg-neutral-900">
                        {/* Image */}
                        <Image
                            src="/nirupam.jpeg"
                            alt="Nirupam Pal"
                            fill
                            className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                        />
                        
                        {/* Scanline Overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,14,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20" />
                        
                        {/* Frame Border */}
                        <div className="absolute inset-0 border border-white/10 z-20 group-hover:border-white/20 transition-colors"></div>
                        
                        {/* Decorative Corners */}
                        <div className="absolute top-2 left-2 h-4 w-4 border-l-2 border-t-2 border-white/80 z-20" />
                        <div className="absolute bottom-2 right-2 h-4 w-4 border-r-2 border-b-2 border-white/80 z-20" />
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="mt-8 grid grid-cols-3 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="border border-white/5 bg-white/5 p-4 backdrop-blur-sm text-center">
                                <div className="text-2xl font-bold text-white flex justify-center">
                                   <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="mt-1 font-mono text-[10px] uppercase text-neutral-500">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Download CV Button */}
                    <a 
                        href={resumeUrl}
                        download
                        className="mt-8 flex w-full items-center justify-center gap-2 border border-white/20 bg-transparent py-4 text-sm font-medium uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <span>Download Resume</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </motion.div>
            </div>

            {/* Right Column: Bio & Timeline */}
            <div className="lg:col-span-7">
                
                {/* Bio Text */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 space-y-6 text-lg md:text-xl font-light leading-relaxed text-neutral-300"
                >
                    <p>
                        I build <span className="text-white font-normal">production-ready</span> web applications with a relentless focus on performance and scalability.
                    </p>
                    <p className="text-neutral-400">
                        Currently leading engineering efforts at <span className="text-white">Microace Software</span>, I bridge the gap between complex backend logic and fluid user interfaces. My philosophy is simple: code should be as clean as the design it powers.
                    </p>
                    <p className="text-neutral-400">
                        When I'm not pushing code, I'm likely exploring cloud-native technologies, optimizing CI/CD pipelines, or contributing to the developer community in India.
                    </p>
                </motion.div>

                {/* Experience List */}
                <div>
                    <h3 className="mb-8 font-mono text-sm text-emerald-500">
                        / CAREER_HISTORY
                    </h3>
                    <div className="space-y-0">
                        {experiences.map((exp) => (
                            <ExperienceCard key={exp.id} data={exp} />
                        ))}
                    </div>
                </div>

                {/* Connect CTA */}
                <div className="mt-20 border-t border-white/10 pt-10">
                    <p className="mb-4 text-neutral-400">Interested in working together?</p>
                    <Link href="#contact" className="inline-block text-3xl font-bold text-white hover:text-emerald-400 transition-colors">
                        Let's Talk  &rarr;
                    </Link>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
}