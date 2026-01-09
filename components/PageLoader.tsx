"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- CONSTANTS ---
const LOG_MESSAGES = [
  "Initializing core modules...",
  "Loading shader kernels...",
  "Hydrating React components...",
  "Optimizing vector assets...",
  "Establishing secure connection...",
  "Rendering virtual DOM...",
  "System checks passed...",
  "Welcome, User."
];

// --- COMPONENTS ---

const GrainOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-20">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-100 contrast-150" />
  </div>
);

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);

  useEffect(() => {
    // 1. Lock Body Scroll
    document.body.style.overflow = "hidden";

    // 2. Progress Animation
    const duration = 2000; // 2 seconds total load time
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    // 3. Log Message Cycler
    const logTimer = setInterval(() => {
      setCurrentLog((prev) => (prev + 1) % LOG_MESSAGES.length);
    }, duration / LOG_MESSAGES.length);

    // 4. Cleanup & Reveal
    const cleanupTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset";
      clearInterval(logTimer);
    }, duration + 500); // Slight delay after 100%

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
      clearTimeout(cleanupTimer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Custom bezier for "Curtain" effect
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-neutral-950 text-white px-6 py-8 md:px-12 md:py-12"
        >
          <GrainOverlay />
          
          {/* Top Bar */}
          <div className="relative z-10 flex justify-between items-start font-mono text-xs text-neutral-500 uppercase tracking-widest">
            <div className="flex flex-col gap-1">
                <span>System Status:</span>
                <span className="text-emerald-500 animate-pulse">Booting Sequence</span>
            </div>
            <span>v2.0.0</span>
          </div>

          {/* Center Content: Log Messages */}
          <div className="relative z-10 w-full max-w-md">
            <div className="h-px w-full bg-white/10 mb-4" />
            <div className="font-mono text-xs md:text-sm h-6 overflow-hidden text-neutral-400">
               <motion.span
                  key={currentLog}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
               >
                  {`> ${LOG_MESSAGES[currentLog]}`}
               </motion.span>
            </div>
          </div>

          {/* Bottom Bar: Big Counter */}
          <div className="relative z-10 flex justify-between items-end">
             {/* Name Reveal */}
             <div className="hidden md:block">
                <h1 className="text-xl font-bold tracking-tighter text-white">
                    NIRUPAM PAL
                </h1>
                <p className="text-xs text-neutral-500 font-mono mt-1">
                    FULLSTACK DEVELOPER
                </p>
             </div>

             {/* Percentage */}
             <div className="flex flex-col items-end">
                <div className="text-[15vw] md:text-[12vw] leading-[0.8] font-bold tracking-tighter text-white tabular-nums">
                    {Math.round(progress)}
                </div>
                <div className="mt-2 h-1 w-full bg-white/10 overflow-hidden">
                    <motion.div 
                        className="h-full bg-emerald-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
             </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}