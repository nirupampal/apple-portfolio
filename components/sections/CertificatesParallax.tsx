"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";

// --- DATA ---
const certificates = [
  {
    id: "cert-01",
    title: "Software Engineer",
    issuer: "HackerRank",
    date: "09 Jan 2026",
    image: "/hacker-rank-software-engineer.png", // Ensure this image is in your public folder
    link: "https://www.hackerrank.com/certificates/iframe/868725916053", // Replace with actual verification link if available
    credentialId: "868725916053"
  }
];

// --- COMPONENTS ---

const GrainOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-20">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-100 contrast-150" />
  </div>
);

const CertificateCard = ({ cert }: { cert: typeof certificates[0] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative block w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-neutral-900 transition-colors hover:border-white/20"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 grid md:grid-cols-2">
        
        {/* Left: Image/Preview area */}
        <div className="relative aspect-[4/3] md:aspect-auto md:h-full w-full overflow-hidden bg-black border-r border-white/5">
            {/* The Image */}
            <div className="absolute inset-0 p-8 flex items-center justify-center">
                <div className="relative w-full h-full shadow-2xl transition-transform duration-500 group-hover:scale-105">
                    <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
            
            {/* Holographic Sheen on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-center p-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full" />

            <div className="relative z-10">
                {/* Verified Badge */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500">
                        Verified Credential
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {cert.title}
                </h3>
                
                <p className="text-sm text-neutral-400 mb-6">
                    Issued by <span className="text-white">{cert.issuer}</span>
                </p>

                <div className="space-y-3">
                    <div className="flex justify-between border-b border-white/5 pb-2 text-xs">
                        <span className="text-neutral-500">ISSUED DATE</span>
                        <span className="font-mono text-neutral-300">{cert.date}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2 text-xs">
                        <span className="text-neutral-500">CREDENTIAL ID</span>
                        <span className="font-mono text-neutral-300">{cert.credentialId}</span>
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <span>View Certificate</span>
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>
        </div>
      </div>
    </motion.a>
  );
};

export default function CertificatesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section 
      id="certificates" 
      ref={containerRef} 
      className="relative min-h-[80vh] flex items-center bg-neutral-950 py-32 overflow-hidden"
    >
      <GrainOverlay />
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Text Column */}
            <motion.div 
                style={{ y }}
                className="lg:col-span-4 lg:sticky lg:top-32 h-fit"
            >
                <span className="mb-4 block font-mono text-sm text-emerald-500">
                    03 / CERTIFICATES
                </span>
                <h2 className="text-5xl font-bold tracking-tighter text-white mb-6">
                    Proven<br />
                    <span className="text-neutral-600">Expertise.</span>
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                    Continuous learning is the core of my engineering philosophy. 
                    These credentials validate my technical proficiency and commitment to industry standards.
                </p>
            </motion.div>

            {/* Cards Column */}
            <div className="lg:col-span-8 flex flex-col gap-8">
                {certificates.map((cert) => (
                    <CertificateCard key={cert.id} cert={cert} />
                ))}
            </div>
        </div>
        
      </div>
    </section>
  );
}