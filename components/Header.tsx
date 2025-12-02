"use client";

import Link from "next/link";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import {
  IoMenu,
  IoClose,
  IoHome,
  IoBriefcase,
  IoPerson,
  IoMail,
  IoLayers,
} from "react-icons/io5";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { motion, AnimatePresence } from "framer-motion";

// Magnetic hover effect wrapper
function Magnetic({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ x: 2, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  let lastScroll = typeof window !== "undefined" ? window.scrollY : 0;

  const navItems = [
    { name: "Home", href: "#home", Icon: IoHome },
    { name: "Work", href: "#works", Icon: IoBriefcase },
    { name: "About", href: "#about", Icon: IoPerson },
    { name: "Skills", href: "#skills", Icon: IoLayers },
    { name: "Contact", href: "#contact", Icon: IoMail },
  ];

  // Scroll-hide / show header
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShowHeader(current < lastScroll || current < 10);
      lastScroll = current;
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

  // Smooth scroll to element
  const scrollToSection = (href: string) => (e: any) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = href;
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* SEO */}
      <Head>
        <title>Nirupam Pal — Fullstack Developer</title>
        <meta
          name="description"
          content="Portfolio of Nirupam Pal — Fullstack Developer specializing in modern UI engineering, high-performance systems, and elegant software design."
        />
      </Head>

      {/* Header */}
      <motion.header
        animate={{
          y: showHeader ? 0 : -80,
          opacity: showHeader ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/60 dark:bg-black/40 border-b border-gray-200/40 dark:border-gray-700/40 shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">

          {/* Logo */}
          <Magnetic>
            <Link
              href="/"
              className="text-lg md:text-xl font-bold tracking-tight 
              text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Nirupam Pal
            </Link>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map(({ name, href, Icon }) => (
              <Magnetic key={name}>
                <button
                  onClick={scrollToSection(href)}
                  className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-md
                  text-gray-700 dark:text-gray-200 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  <Icon className="w-5 h-5" />

                  <span className="text-sm">{name}</span>

                  {/* Animated underline */}
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-indigo-500 group-hover:w-full transition-all duration-300 rounded-full" />
                </button>
              </Magnetic>
            ))}

            {/* Theme Switcher */}
            <Magnetic>
              <ThemeSwitcher />
            </Magnetic>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 text-gray-900 dark:text-gray-200"
          >
            <IoMenu className="w-7 h-7" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dim background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur"
            />

            {/* Drawer */}
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 right-0 z-50 h-full w-72 bg-white dark:bg-gray-900 
                         p-6 shadow-2xl border-l border-gray-300/30 dark:border-gray-700/30 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="self-end p-2 text-gray-700 dark:text-gray-300"
              >
                <IoClose className="w-7 h-7" />
              </button>

              <nav className="mt-6 flex flex-col gap-4">
                {navItems.map(({ name, href, Icon }) => (
                  <button
                    key={name}
                    onClick={scrollToSection(href)}
                    className="flex items-center gap-4 py-2 text-lg text-gray-900 dark:text-gray-200 
                               hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-3 transition"
                  >
                    <Icon className="w-6 h-6" />
                    {name}
                  </button>
                ))}
              </nav>

              {/* Mobile Theme Switcher */}
              <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Theme</span>
                  <ThemeSwitcher />
                </div>

                <a
                  href="/resume.pdf"
                  download
                  className="block text-center mt-5 px-4 py-2 rounded-full bg-gray-900 text-white 
                             dark:bg-white dark:text-gray-900 font-semibold"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
