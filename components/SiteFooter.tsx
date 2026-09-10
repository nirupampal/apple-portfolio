"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { usePortfolioContent } from "@/lib/use-portfolio-content";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Works", href: "/works" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/nirupam-pal-0916a721b/" },
  { name: "GitHub", href: "https://github.com/nirupampal" },
  { name: "Email", href: "mailto:nirupampaldev@gmail.com" },
];

export function SiteFooter() {
  const pathname = usePathname();
  const { content } = usePortfolioContent();
  const year = new Date().getFullYear();

  const emailLink = content.contact.links.find((l) => l.label.toLowerCase().includes("email"));

  return (
    <footer className="border-t border-[#e5e5e5] bg-white">
      {/* Big CTA Section */}
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-center text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#7b7b7b]">
            Ready to collaborate?
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl leading-tight tracking-[-0.02em] text-[#222222] sm:text-5xl md:text-6xl">
            Got a Vision? Let&apos;s Bring it to Life!
          </h2>
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#222222] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#333333]"
          >
            Book A Call
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Email Display */}
      {emailLink && (
        <div className="border-t border-[#e5e5e5] py-12 md:py-16">
          <a
            href={emailLink.href}
            className="block text-center font-display text-2xl text-[#7b7b7b] transition hover:text-[#222222] sm:text-3xl md:text-4xl"
          >
            {emailLink.value}
          </a>
        </div>
      )}

      {/* Bottom Grid */}
      <div className="border-t border-[#e5e5e5]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#222222] text-[10px] font-bold text-white">
                  NP
                </span>
                <span className="text-sm font-semibold text-[#222222]">Nirupam Pal</span>
              </Link>
              <p className="mt-4 max-w-xs text-[13px] leading-6 text-[#7b7b7b]">
                Fullstack developer crafting minimal, functional digital experiences.
              </p>
            </div>

            {/* Nav */}
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7b7b7b]">Navigation</p>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-[13px] transition hover:text-[#222222] ${
                        pathname === link.href ? "font-medium text-[#222222]" : "text-[#7b7b7b]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7b7b7b]">Connect</p>
              <ul className="space-y-2.5">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-[13px] text-[#7b7b7b] transition hover:text-[#222222]"
                    >
                      {link.name}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#f0f0f0] px-6 py-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-[11px] text-[#b0b0b0] sm:flex-row">
            <p>© {year} {content.contact.copyrightName}. {content.contact.rightsLabel}.</p>
            <p>Designed & built in India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
