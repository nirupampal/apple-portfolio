"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";

import { usePortfolioContent } from "@/lib/use-portfolio-content";

const navItems = [
  { label: "About Me", href: "/about" },
  { label: "Portfolio", href: "/works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteNavigation() {
  const pathname = usePathname();
  const { content } = usePortfolioContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", close); };
  }, [mobileMenuOpen]);

  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  return (
    <>
      {/* ─── Clean Minimal Top Bar ─── */}
      <header
        className={`fixed inset-x-0 top-0 z-[110] transition-all duration-300 ${
          scrolled ? "bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3" aria-label="Home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#222222] text-[11px] font-bold tracking-wider text-white transition group-hover:scale-105">
              NP
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative py-1 text-[13px] font-medium transition-colors ${
                    isActive ? "text-[#222222]" : "text-[#7b7b7b] hover:text-[#222222]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-[#222222]"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full bg-[#222222] px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#333333] md:flex"
            >
              Book A Call
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e5e5] text-[#222222] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm md:hidden"
            />
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-20 z-[105] overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)] md:hidden"
            >
              {navItems.map((item, i) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 + i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition ${
                        isActive ? "bg-[#f8f8f8] text-[#222222]" : "text-[#7b7b7b] hover:bg-[#f8f8f8] hover:text-[#222222]"
                      }`}
                    >
                      {item.label}
                      <ChevronRight className="h-3.5 w-3.5 text-[#d4d4d4]" />
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-2 border-t border-[#f0f0f0] p-2 pt-3">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#222222] py-3 text-sm font-medium text-white"
                >
                  Book A Call <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
