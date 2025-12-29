"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const navItems = [
  { name: "Home", href: "#home", index: "01" },
  { name: "Works", href: "#works", index: "02" },
  { name: "About", href: "#about", index: "03" },
  { name: "Skills", href: "#skills", index: "04" },
  { name: "Contact", href: "#contact", index: "05" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollRef = useRef(0);

  // Scroll-hide/show header & track active section
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShowHeader(current < lastScrollRef.current || current < 10);
      lastScrollRef.current = current;

      // Track active section
      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isMenuOpen && drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Header Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: showHeader ? 0 : -100, opacity: showHeader ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/30 dark:bg-black/30"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 border-b border-neutral-200 dark:border-neutral-800">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 border border-neutral-900 dark:border-neutral-100 flex items-center justify-center">
                <span className="text-sm font-light tracking-wider text-neutral-900 dark:text-neutral-100">
                  NP
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
                  Portfolio
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={scrollToSection(item.href)}
                  className={`group relative px-4 py-2 text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                    activeSection === item.href.replace("#", "")
                      ? "text-neutral-900 dark:text-neutral-100"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {activeSection === item.href.replace("#", "") && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 border-b border-neutral-900 dark:border-neutral-100"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right side - Theme & Menu */}
            <div className="flex items-center gap-4">
              <ThemeSwitcher />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                aria-label="Open menu"
              >
                <span className="w-5 h-px bg-neutral-900 dark:bg-neutral-100" />
                <span className="w-5 h-px bg-neutral-900 dark:bg-neutral-100" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-neutral-50 dark:bg-neutral-950"
            />

            {/* Menu Content */}
            <motion.div
              ref={drawerRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between h-20 px-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="w-10 h-10 border border-neutral-900 dark:border-neutral-100 flex items-center justify-center">
                  <span className="text-sm font-light tracking-wider text-neutral-900 dark:text-neutral-100">
                    NP
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-5 h-5 text-neutral-900 dark:text-neutral-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center px-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={scrollToSection(item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex items-center gap-6 py-6 border-b border-neutral-200 dark:border-neutral-800"
                  >
                    <span className="text-xs font-mono text-neutral-400">
                      {item.index}
                    </span>
                    <span className="text-3xl font-extralight tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:translate-x-2 transition-transform duration-300">
                      {item.name}
                    </span>
                    <svg
                      className="w-5 h-5 ml-auto text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.button>
                ))}
              </nav>

              {/* Footer */}
              <div className="px-6 py-8 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span className="tracking-[0.2em] uppercase">Theme</span>
                  <ThemeSwitcher />
                </div>
                <motion.a
                  href="/resume.pdf"
                  download
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 block w-full py-4 text-center text-xs tracking-[0.3em] uppercase border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900 hover:text-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 transition-colors duration-300"
                >
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
