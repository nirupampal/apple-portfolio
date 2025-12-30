"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  title: string;
  subtitle?: string;
  quote?: string;
}

export default function ParallaxSection({
  title,
  subtitle,
  quote,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Text animations
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);
  
  // Rotate the gradient ring based on scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden"
    >
      {/* Dark Background - respects theme */}
      <div className="absolute inset-0 bg-neutral-950 dark:bg-neutral-950">
        {/* Subtle radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black" />
      </div>

      {/* Floating Glow Orbs - White/Blue theme */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-72 h-72 bg-white rounded-full blur-[120px] opacity-[0.08]"
        animate={{
          x: [0, 60, 0, -60, 0],
          y: [0, -60, 60, 0, 0],
          scale: [1, 1.2, 1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-[0.15]"
        animate={{
          x: [0, -50, 0, 50, 0],
          y: [0, 50, -50, 0, 0],
          scale: [1, 1.15, 1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full blur-[150px] opacity-[0.08]"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating gradient ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ rotate }}
      >
        <div className="w-[600px] h-[600px] rounded-full border border-white/5" />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-blue-500/10" />
      </motion.div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
        animate={{
          x: ['-200%', '200%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto"
        style={{ opacity, y: textY }}
      >
        {subtitle && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block text-xs font-light tracking-[0.4em] text-neutral-400 uppercase mb-6"
          >
            {subtitle}
          </motion.span>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white mb-8 leading-tight"
        >
          {title}
        </motion.h2>

        {quote && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl font-light text-neutral-400 leading-relaxed max-w-2xl mx-auto"
          >
            &ldquo;{quote}&rdquo;
          </motion.p>
        )}

        {/* Glowing decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-24 h-px mx-auto mt-10 relative"
        >
          <div className="absolute inset-0 bg-white/60" />
          <div className="absolute inset-0 bg-blue-400 blur-sm opacity-50" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator with glow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent relative">
          <div className="absolute inset-0 bg-blue-400 blur-sm opacity-30" />
        </div>
      </motion.div>
    </section>
  );
}
