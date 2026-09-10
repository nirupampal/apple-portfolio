"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
} from "lucide-react";

import { usePortfolioContent } from "@/lib/use-portfolio-content";
import { Timeline } from "@/components/ui/timeline";
import { TechStackShowcase } from "@/components/TechStackShowcase";
import { SectionHeading, reveal } from "@/components/shared/SectionHeading";
import { PortfolioImage } from "@/components/shared/PortfolioImage";

export default function AboutPage() {
  const { content } = usePortfolioContent();
  const fullName = `${content.hero.firstName} ${content.hero.lastName}`;

  const timelineData = content.about.experiences.map((experience) => ({
    title: experience.date,
    content: (
      <div className="mb-6 rounded-2xl border border-[#e5e5e5] bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7b7b7b]">
              {experience.company}
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[#222222]">
              {experience.title}
            </h3>
          </div>
          <BriefcaseBusiness className="h-5 w-5 text-[#d4d4d4]" />
        </div>
        <p className="mt-4 text-[13px] leading-7 text-[#7b7b7b]">
          {experience.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f8f8f8] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#7b7b7b]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <main>
      {/* ═══════════════════ ABOUT HERO ═══════════════════ */}
      <section className="border-b border-[#e5e5e5] bg-[#f8f8f8] pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            index="01"
            eyebrow="About Me"
            title={`${content.about.titlePrimary} ${content.about.titleSecondary}`}
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            {/* Portrait Card */}
            <motion.div
              {...reveal}
              className="relative min-h-[480px] overflow-hidden rounded-2xl bg-[#e5e5e5] lg:col-span-5 lg:row-span-2"
            >
              <PortfolioImage
                src={content.about.imageSrc}
                alt={content.about.imageAlt}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="photo-bw object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-7">
                <p className="text-[11px] uppercase tracking-[0.15em] text-white/70">Based in {content.hero.countryLabel}</p>
                <p className="mt-2 text-xl font-semibold text-white">{fullName}</p>
              </div>
            </motion.div>

            {/* Bio Card */}
            <motion.div
              {...reveal}
              className="rounded-2xl border border-[#e5e5e5] bg-white p-8 md:p-10 lg:col-span-7"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7b7b7b]">
                Systems · Product · Scale
              </p>
              <p className="mt-6 text-lg leading-8 text-[#222222] md:text-xl md:leading-8">
                {content.about.paragraphs[0]}
              </p>
              <p className="mt-4 text-[15px] leading-7 text-[#7b7b7b]">
                {content.about.paragraphs.slice(1).join(" ")}
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
              {content.about.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.08 }}
                  className="rounded-2xl border border-[#e5e5e5] bg-white p-6 transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                >
                  <p className="text-3xl font-semibold text-[#222222]">
                    {stat.value}{stat.suffix}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[#7b7b7b]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ EXPERIENCE TIMELINE ═══════════════════ */}
      <Timeline
        data={timelineData}
        eyebrow="02 / Experience"
        heading="Explore My Design Journey"
        description="From independent delivery to leading fullstack systems, every chapter has added a sharper layer to the way I solve problems."
        className="bg-white"
      />

      {/* ═══════════════════ ACHIEVEMENTS ═══════════════════ */}
      <section className="border-t border-[#e5e5e5] bg-[#f8f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            index="03"
            eyebrow="Certifications"
            title={content.achievements.title}
            copy={content.achievements.description}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {content.achievements.items.map((achievement, index) => (
              <motion.a
                key={achievement.id}
                {...reveal}
                href={achievement.verifyUrl || "#"}
                target={achievement.verifyUrl.startsWith("http") ? "_blank" : undefined}
                rel={achievement.verifyUrl.startsWith("http") ? "noreferrer" : undefined}
                className="group overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="relative h-52 overflow-hidden bg-[#e5e5e5]">
                  <PortfolioImage
                    src={achievement.image}
                    alt={`${achievement.issuer} ${achievement.title}`}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <BadgeCheck className="h-4 w-4" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">{achievement.issuer}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[#222222]">{achievement.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#7b7b7b]">{achievement.description}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#f0f0f0] pt-4">
                    <span className="text-[11px] text-[#b0b0b0]">{achievement.issuedOn}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#d4d4d4] transition group-hover:text-[#222222]" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TECH STACK ═══════════════════ */}
      <section className="border-t border-[#e5e5e5] bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            index="04"
            eyebrow="Capabilities"
            title={`${content.skills.titlePrimary} ${content.skills.titleSecondary}`}
            copy={content.skills.description}
          />
          <div className="mt-12">
            <TechStackShowcase skillsContent={content.skills} />
          </div>
        </div>
      </section>
    </main>
  );
}
