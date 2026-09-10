"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight, ArrowDown } from "lucide-react";

import { usePortfolioContent } from "@/lib/use-portfolio-content";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { FlagshipProjectShowcase } from "@/components/FlagshipProjectShowcase";
import { PortfolioImage } from "@/components/shared/PortfolioImage";
import { SectionHeading, reveal } from "@/components/shared/SectionHeading";

export default function HomePage() {
  const { content } = usePortfolioContent();

  return (
    <main>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#f8f8f8] pt-20 md:pt-24">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid items-end gap-8 pb-16 pt-12 md:grid-cols-2 md:pt-20">
            {/* Left: Stats + Text */}
            <div>
              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12 flex gap-10"
              >
                {content.about.stats.slice(0, 2).map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-semibold text-[#222222] md:text-4xl">
                      +{stat.value}
                    </p>
                    <p className="mt-1 text-[13px] text-[#7b7b7b]">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Big "Hello" */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(4rem,15vw,10rem)] leading-[0.9] tracking-[-0.04em] text-[#222222]"
              >
                Hello
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-6 text-[15px] leading-7 text-[#7b7b7b]"
              >
                — It&apos;s {content.hero.firstName.charAt(0) + content.hero.firstName.slice(1).toLowerCase()} a fullstack wizard
              </motion.p>
            </div>

            {/* Right: Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative mx-auto h-[400px] w-full max-w-[400px] overflow-hidden rounded-3xl bg-[#e5e5e5] md:h-[480px] md:max-w-none"
            >
              <PortfolioImage
                src={content.about.imageSrc}
                alt={content.about.imageAlt}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="photo-bw object-cover object-top"
                priority
              />
            </motion.div>
          </div>

          {/* Scroll Down */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-2 pb-10 text-[13px] text-[#7b7b7b]"
          >
            Scroll down <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </motion.div>
        </div>

        {/* Faint background "PORTFOLIO" text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center overflow-hidden"
        >
          <span className="select-none whitespace-nowrap text-[clamp(6rem,20vw,16rem)] font-bold leading-none tracking-[-0.06em] text-[#e8e8e8]">
            PORTFOLIO
          </span>
        </div>
      </section>

      {/* ═══════════════════ ABOUT ME PREVIEW ═══════════════════ */}
      <section className="border-t border-[#e5e5e5] bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr]">
            {/* Left: About text */}
            <motion.div {...reveal}>
              <h2 className="font-display text-3xl tracking-[-0.02em] text-[#222222] md:text-4xl">About Me</h2>
              <p className="mt-5 text-[15px] leading-7 text-[#7b7b7b]">
                {content.about.paragraphs[0]}
              </p>
              <p className="mt-4 text-[15px] leading-7 text-[#7b7b7b]">
                {content.about.paragraphs[1]}
              </p>
              <Link
                href="/about"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#222222] transition hover:text-[#7b7b7b]"
              >
                Learn more about me
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Center: Big stat */}
            <motion.div {...reveal} className="flex flex-col items-center justify-center rounded-2xl bg-[#f8f8f8] px-10 py-12">
              <p className="text-5xl font-semibold text-[#222222] md:text-6xl">120%</p>
              <p className="mt-3 max-w-[180px] text-center text-[13px] leading-5 text-[#7b7b7b]">
                Average increase in client engagement in the first 6 months
              </p>
            </motion.div>

            {/* Right: Portrait + Experience bullets */}
            <motion.div {...reveal} className="space-y-6">
              <div className="relative h-48 overflow-hidden rounded-2xl bg-[#e5e5e5]">
                <PortfolioImage
                  src={content.about.imageSrc}
                  alt={content.about.imageAlt}
                  sizes="320px"
                  className="photo-bw object-cover object-top"
                />
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#222222] text-[10px] text-white">+</span>
                  <p className="text-[13px] leading-6 text-[#7b7b7b]">
                    With {content.about.stats[0]?.value}+ years of experience, I specialize in building scalable fullstack applications.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#222222] text-[10px] text-white">+</span>
                  <p className="text-[13px] leading-6 text-[#7b7b7b]">
                    I thrive on solving complex problems, blending modern architecture with clean interfaces.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ MARQUEE ═══════════════════ */}
      <section className="overflow-hidden border-y border-[#e5e5e5] bg-[#f8f8f8] py-5">
        <div className="marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-6">
              <span className="whitespace-nowrap text-sm font-medium text-[#7b7b7b]">
                Fullstack Development
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-[#b0b0b0]" />
              <span className="whitespace-nowrap text-sm font-medium text-[#222222]">
                React & Next.js
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-[#b0b0b0]" />
              <span className="whitespace-nowrap text-sm font-medium text-[#7b7b7b]">
                Node.js & APIs
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-[#b0b0b0]" />
              <span className="whitespace-nowrap text-sm font-medium text-[#222222]">
                Cloud & DevOps
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-[#b0b0b0]" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ LATEST WORKS ═══════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            index="01"
            eyebrow="Portfolio"
            title="Latest Works"
            copy="A mix of product thinking, interface craft, and fullstack engineering."
          />

          <div className="mt-14 space-y-10 md:space-y-14">
            {content.works.projects.slice(0, 4).map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/works"
              className="group inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] px-6 py-3 text-sm font-medium text-[#222222] transition hover:border-[#222222]"
            >
              View all works
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ BLOG TEASER ═══════════════════ */}
      <section className="border-t border-[#e5e5e5] bg-[#f8f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            index="02"
            eyebrow="Blog"
            title="Design Insights & Trends"
            copy={content.blog.description}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.blog.posts
              .filter((post) => post.published)
              .slice(0, 3)
              .map((post) => (
                <motion.div key={post.id} {...reveal}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                  >
                    <div className="relative h-48 overflow-hidden bg-[#e5e5e5]">
                      <PortfolioImage
                        src={post.coverImage}
                        alt={post.title}
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.1em] text-[#b0b0b0]">
                        <span>{post.publishedAt}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-3 text-base font-semibold leading-snug text-[#222222]">{post.title}</h3>
                      <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-[#7b7b7b]">{post.excerpt}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-white px-6 py-3 text-sm font-medium text-[#222222] transition hover:border-[#222222]"
            >
              View all articles
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
