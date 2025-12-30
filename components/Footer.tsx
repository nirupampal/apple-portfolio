"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nirupam-pal-0916a721b/",
  },
  {
    name: "GitHub",
    href: "https://github.com/nirupampal",
  },
  {
    name: "Email",
    href: "mailto:nirupampaldev@gmail.com",
  },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Works", href: "#works" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showBackToTop ? 1 : 0, y: showBackToTop ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Back to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>

      <footer className="relative bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-100/50 dark:to-neutral-950/50 pointer-events-none" />
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 border border-neutral-900 dark:border-neutral-100 flex items-center justify-center mb-6">
              <span className="text-sm font-light tracking-wider text-neutral-900 dark:text-neutral-100">
                NP
              </span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
              Fullstack developer crafting minimal, functional, and 
              aesthetically refined digital experiences.
            </p>
          </motion.div>

          {/* Navigation Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-xs tracking-[0.3em] text-neutral-400 uppercase mb-6 block">
              Navigation
            </span>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={scrollToSection(link.href)}
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300 text-left"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Connect Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-xs tracking-[0.3em] text-neutral-400 uppercase mb-6 block">
              Connect
            </span>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300"
                >
                  <span>{link.name}</span>
                  <svg
                    className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <p className="text-xs text-neutral-500">
              © {year} Nirupam Pal. All rights reserved.
            </p>
            <p className="text-xs text-neutral-400 flex items-center gap-2">
              <span>Designed & Built with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-emerald-500"
              >
                ♥
              </motion.span>
              <span>precision</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
    </>
  );
}
