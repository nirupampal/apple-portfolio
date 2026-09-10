"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { usePortfolioContent } from "@/lib/use-portfolio-content";
import { ContactForm } from "@/components/shared/ContactForm";
import { SocialIcon } from "@/components/shared/SocialIcon";
import { IndiaClock } from "@/components/shared/IndiaClock";
import { reveal } from "@/components/shared/SectionHeading";

export default function ContactPage() {
  const { content } = usePortfolioContent();

  return (
    <main>
      {/* ═══════════════════ CONTACT HERO ═══════════════════ */}
      <section className="min-h-[85svh] pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#7b7b7b]">
              ● Contact
            </p>
            <IndiaClock location={content.contact.locationLabel} />
          </div>

          {/* Big CTA Headline */}
          <motion.div
            {...reveal}
            className="mt-16 border-b border-[#e5e5e5] pb-14"
          >
            <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1] tracking-[-0.03em] text-[#222222]">
              Got a Vision?
            </h1>
            <div className="mt-2 flex items-end justify-between gap-6">
              <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1] tracking-[-0.03em] text-[#7b7b7b]">
                Let&apos;s Bring it to Life!
              </h1>
              <a
                href={content.contact.links.find((l) => l.label.toLowerCase().includes("email"))?.href ?? "#"}
                className="mb-2 hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#e5e5e5] text-[#222222] transition hover:bg-[#222222] hover:text-white md:flex"
              >
                <ArrowUpRight className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <ContactForm />

          {/* Social Links */}
          <div className="mt-12 grid gap-5 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-[13px] leading-6 text-[#7b7b7b]">
                {content.contact.availabilityText}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.contact.links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center justify-between rounded-2xl border border-[#e5e5e5] bg-[#f8f8f8] p-5 transition hover:border-[#222222] hover:bg-white"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[#7b7b7b] transition group-hover:text-[#222222]">
                      <SocialIcon label={link.label} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#222222]">{link.label}</p>
                      <p className="mt-0.5 max-w-[190px] truncate text-[11px] text-[#b0b0b0]">{link.value}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#d4d4d4] transition group-hover:text-[#222222]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
