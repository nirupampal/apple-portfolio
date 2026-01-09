"use client";

import Head from "next/head";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import type { JSX } from "react/jsx-runtime";

// --- COMPONENTS ---

// 1. The Grain/Noise Overlay
const GrainOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-20">
    <div className="absolute inset-[-200%] h-[400%] w-[400%] animate-noise bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-20 contrast-150 brightness-100" />
  </div>
);

// 2. The Moving Aurora Background
const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950">
        {/* Primary Glow */}
        <motion.div 
            animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] h-[80vh] w-[80vh] rounded-full bg-purple-900/30 blur-[120px]" 
        />
        {/* Secondary Glow */}
        <motion.div 
            animate={{ 
                rotate: [360, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] right-[-10%] h-[70vh] w-[70vh] rounded-full bg-blue-900/20 blur-[120px]" 
        />
        {/* Bottom Glow */}
        <motion.div 
             animate={{ 
                x: [-100, 100],
                opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="absolute -bottom-[20%] left-[20%] h-[60vh] w-[60vh] rounded-full bg-emerald-900/10 blur-[100px]" 
        />
    </div>
  );
};

// 3. Magnetic Button Component
const MagneticButton = ({ children, href, primary = false }: { children: React.ReactNode, href: string, primary?: boolean }) => {
    return (
        <Link href={href} className="group relative">
            <div className={`
                relative z-10 flex items-center justify-center px-8 py-4 
                text-sm font-medium tracking-widest uppercase transition-all duration-300
                ${primary 
                    ? "text-neutral-950 bg-white hover:bg-neutral-200" 
                    : "text-white border border-white/20 hover:border-white/50 hover:bg-white/5"}
            `}>
                {children}
            </div>
            {/* Glow effect for primary button */}
            {primary && (
                <div className="absolute inset-0 -z-10 bg-white/50 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
            )}
        </Link>
    );
}

export default function HeroSection({
  siteUrl = "https://nirupampal.vercel.app",
  ogImage = "/og-hero.png",
}: {
  siteUrl?: string;
  ogImage?: string;
}): JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax Scroll Effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Text moves down slower
  const opacity = useTransform(scrollY, [0, 300], [1, 0]); // Fades out
  const blur = useTransform(scrollY, [0, 300], ["0px", "10px"]); // Blurs out

  // Mouse Spotlight Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // SEO Data
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
        <meta name="description" content="Nirupam Pal is a Fullstack Developer specializing in modern user interfaces and scalable backend solutions using Next.js and Node.js." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Nirupam Pal — Fullstack Developer" />
        <meta property="og:description" content="Building modern UIs and scalable backends." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}#home`} />
        <meta property="og:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <section
        ref={containerRef}
        id="home"
        onMouseMove={handleMouseMove}
        className="relative min-h-screen pt-20 w-full flex flex-col items-center justify-center overflow-hidden bg-neutral-950 text-white selection:bg-white/30"
      >
        <GrainOverlay />
        <AuroraBackground />

        {/* Mouse Spotlight (Subtle lighting on cursor) */}
        <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            style={{
                background: useMotionTemplate`
                    radial-gradient(
                        600px circle at ${mouseX}px ${mouseY}px,
                        rgba(255, 255, 255, 0.03),
                        transparent 40%
                    )
                `,
            }}
        />

        {/* Content Container */}
        <motion.div 
            style={{ y: y1, opacity, filter: useMotionTemplate`blur(${blur})` }}
            className="relative z-30 px-6 text-center max-w-7xl mx-auto flex flex-col items-center gap-8"
        >
            {/* Status Pill */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
            >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-neutral-300 tracking-wider uppercase">
                    Available for new projects
                </span>
            </motion.div>

            {/* Main Title */}
            <div className="relative">
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[12vw] leading-[0.8] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-500"
                >
                    NIRUPAM
                    <br />
                    <span className="text-neutral-800 outline-text">PAL</span>
                </motion.h1>
                
                {/* Decorative floating elements */}
                <motion.div 
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-8 top-1/2 w-24 h-24 hidden md:block opacity-20"
                >
                    <svg viewBox="0 0 100 100" className="fill-white spin-slow">
                        <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                    </svg>
                </motion.div>
            </div>

            {/* Subheading */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-lg md:text-2xl font-light text-neutral-400 max-w-2xl leading-relaxed"
            >
                Engineering <span className="text-white font-normal">digital excellence</span>. 
                I build scalable backend architecture and fluid interfaces that define the modern web.
            </motion.p>

            {/* CTA Actions */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 mt-8"
            >
                <MagneticButton href="#works" primary>
                    View Selected Works
                </MagneticButton>
                <MagneticButton href="https://drive.google.com/file/d/1WdiR6QzRi3tsuMX-d5JHZ3_t3tnH_F-z/view">
                    Download CV
                </MagneticButton>
            </motion.div>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
            style={{ opacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
        >
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Scroll</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-neutral-800 to-transparent overflow-hidden">
                <motion.div 
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="h-1/2 w-full bg-white"
                />
            </div>
        </motion.div>

        {/* Custom Styles for text outline support */}
        <style jsx global>{`
            .outline-text {
                -webkit-text-stroke: 2px #333; /* Dark outline */
                color: transparent;
            }
            @media (min-width: 768px) {
                .outline-text {
                    -webkit-text-stroke: 3px #333;
                }
            }
            .spin-slow {
                animation: spin 10s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes noise {
                0% { transform: translate(0,0) }
                10% { transform: translate(-5%,-5%) }
                20% { transform: translate(-10%,5%) }
                30% { transform: translate(5%,-10%) }
                40% { transform: translate(-5%,15%) }
                50% { transform: translate(-10%,5%) }
                60% { transform: translate(15%,0) }
                70% { transform: translate(0,10%) }
                80% { transform: translate(-15%,0) }
                90% { transform: translate(10%,5%) }
                100% { transform: translate(5%,0) }
            }
            .animate-noise {
                animation: noise 0.2s steps(10) infinite;
            }
        `}</style>
      </section>
    </>
  );
}