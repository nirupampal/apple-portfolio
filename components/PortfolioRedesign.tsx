"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  AlertCircle,
  Award,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Command,
  ChevronRight,
  Download,
  FileText,
  Github,
  Home,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import type { PortfolioContent, ProjectItem } from "@/lib/portfolio-content";
import { submitContactMessage } from "@/lib/contact-messages";
import { PortfolioAiConcierge } from "@/components/PortfolioAiConcierge";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Timeline } from "@/components/ui/timeline";

const reveal = {
  "data-scroll-reveal": "true",
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px 220px 0px" },
  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
};

function PortfolioImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!src.startsWith("/")) {
    return (
      // Portfolio images are CMS-managed and may come from arbitrary remote hosts.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={`absolute inset-0 h-full w-full ${className ?? ""}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}

function ScrollBeam() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[120] h-px origin-left bg-gradient-to-r from-violet-500 via-cyan-300 to-blue-500"
      style={{ scaleX }}
    />
  );
}

function MobileScrollRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-24 right-2 top-24 z-[80] w-px overflow-hidden bg-white/[0.055] md:hidden"
    >
      <motion.div
        className="h-full origin-top bg-gradient-to-b from-violet-400 via-cyan-300 to-blue-500 shadow-[0_0_12px_rgba(103,232,249,0.7)]"
        style={{ scaleY }}
      />
    </div>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
  copy,
}: {
  index: string;
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <motion.div {...reveal} className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
      <div className="flex items-start gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-neutral-500">
        <span className="text-cyan-300/80">{index}</span>
        <span>{eyebrow}</span>
      </div>
      <div>
        <h2 className="max-w-4xl text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl md:text-7xl">
          {title}
        </h2>
        {copy ? (
          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-400 md:text-lg">
            {copy}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const size = [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-7",
  ][index % 4];
  const tones = [
    "from-violet-500/20 via-indigo-500/5 to-transparent",
    "from-cyan-400/20 via-sky-500/5 to-transparent",
    "from-amber-400/15 via-orange-500/5 to-transparent",
    "from-fuchsia-500/15 via-purple-500/5 to-transparent",
  ];

  return (
    <motion.a
      {...reveal}
      href={project.link}
      target={project.link.startsWith("http") ? "_blank" : undefined}
      rel={project.link.startsWith("http") ? "noreferrer" : undefined}
      className={`group relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0c0f] p-3 ${size}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${tones[index % tones.length]} opacity-80`} />
      <div className="project-shine absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.45rem] border border-white/[0.07] bg-black/25">
        <div className="relative min-h-[295px] flex-1 overflow-hidden bg-neutral-900">
          <PortfolioImage
            src={project.image}
            alt={project.title}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0c] via-transparent to-transparent" />
          <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-xl transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="relative z-10 p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            <span>{project.type}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="text-2xl font-medium tracking-[-0.035em] text-white md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function ConsolePanel({ content }: { content: PortfolioContent["terminal"] }) {
  const [activeCommand, setActiveCommand] = useState(0);
  const active = content.commands[activeCommand] ?? content.commands[0];

  if (!active) return null;

  return (
    <section id="terminal" className="relative border-y border-white/[0.07] py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <motion.div {...reveal}>
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-cyan-300/80">
            07 / {content.eyebrow}
          </p>
          <h2 className="mt-6 text-4xl font-medium tracking-[-0.05em] text-white md:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-lg leading-7 text-neutral-400">{content.description}</p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {content.metrics.map((metric) => (
              <div key={metric.label} className="border-l border-white/10 pl-4">
                <p className="text-xl font-medium text-white md:text-2xl">{metric.value}</p>
                <p className="mt-1 text-[11px] leading-4 text-neutral-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090a0d] shadow-[0_35px_120px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
              {content.prompt}
            </span>
          </div>

          <div className="grid md:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-white/[0.07] p-3 md:border-b-0 md:border-r">
              {content.commands.map((item, index) => (
                <button
                  key={item.command}
                  onClick={() => setActiveCommand(index)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left font-mono text-xs transition ${
                    activeCommand === index
                      ? "bg-white/[0.07] text-white"
                      : "text-neutral-600 hover:bg-white/[0.035] hover:text-neutral-300"
                  }`}
                >
                  <Command className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{item.command}</span>
                </button>
              ))}
            </div>

            <div className="min-h-[320px] p-7 font-mono text-xs md:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.command}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <p className="text-neutral-600">
                    <span className="text-cyan-300">{content.prompt}</span>
                    <span className="mx-2 text-violet-400">~</span>
                    {active.command}
                  </p>
                  <p className="mt-8 text-sm font-medium text-white">{active.title}</p>
                  <div className="mt-6 space-y-4">
                    {active.output.map((line, index) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="flex items-center gap-3 text-neutral-400"
                      >
                        <span className="text-emerald-400">✓</span>
                        <span>{line}</span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="mt-8 animate-pulse text-cyan-300">▋</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IndiaClock({ location }: { location: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      {location} · {time}
    </div>
  );
}

function SocialIcon({ label }: { label: string }) {
  const lowered = label.toLowerCase();
  if (lowered.includes("github")) return <Github className="h-5 w-5" />;
  if (lowered.includes("linkedin")) return <Linkedin className="h-5 w-5" />;
  if (lowered.includes("mail")) return <Mail className="h-5 w-5" />;
  return <FileText className="h-5 w-5" />;
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [lastSubmittedAt, setLastSubmittedAt] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("website") ?? "").trim()) {
      form.reset();
      setStatus("success");
      setFeedback("Thanks — your message has been received.");
      return;
    }

    if (Date.now() - lastSubmittedAt < 10_000) {
      setStatus("error");
      setFeedback("Please wait a few seconds before sending another message.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      await submitContactMessage({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        subject: String(data.get("subject") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setLastSubmittedAt(Date.now());
      setStatus("success");
      setFeedback("Message sent. I’ll get back to you soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error && !error.message.toLowerCase().includes("firebase")
          ? error.message
          : "Could not send your message right now. Please try again.",
      );
    }
  }

  const fieldClass =
    "w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-white outline-none transition placeholder:text-neutral-700 focus:border-cyan-300/60";

  return (
    <motion.div {...reveal} className="mt-14 md:mt-20">
      <BackgroundGradient
        containerClassName="rounded-[2rem] p-px"
        className="overflow-hidden rounded-[calc(2rem-1px)] bg-[#090a0d]"
      >
        <div className="relative grid lg:grid-cols-[0.72fr_1.28fr]">
          <div className="relative overflow-hidden border-b border-white/[0.08] p-7 md:p-10 lg:border-b-0 lg:border-r">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-violet-500/[0.13] blur-[75px]" />
            <div className="portrait-dot-field absolute inset-0 opacity-30" />
            <div className="relative">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200">
                <Mail className="h-4.5 w-4.5" />
              </span>
              <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-200/70">Direct message</p>
              <h3 className="mt-4 max-w-sm text-3xl font-medium tracking-[-0.045em] text-white md:text-4xl">Tell me what you’re building.</h3>
              <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-500">Share the project, problem, or opportunity. Your message goes directly into my private admin inbox.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative p-7 md:p-10">
            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">Your name</span>
                <input name="name" required maxLength={100} autoComplete="name" placeholder="Nirupam Pal" className={fieldClass} />
              </label>
              <label className="block">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">Email address</span>
                <input name="email" type="email" required maxLength={160} autoComplete="email" placeholder="you@company.com" className={fieldClass} />
              </label>
              <label className="block sm:col-span-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">Subject</span>
                <input name="subject" required maxLength={160} placeholder="Project collaboration" className={fieldClass} />
              </label>
              <label className="block sm:col-span-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">Message</span>
                <textarea name="message" required maxLength={5000} rows={5} placeholder="A few details about your project..." className={`${fieldClass} resize-none leading-6`} />
              </label>
            </div>

            <label className="absolute -left-[9999px]" aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div aria-live="polite" className="min-h-5">
                {feedback ? (
                  <p className={`flex items-center gap-2 text-xs ${status === "success" ? "text-emerald-300" : "text-red-300"}`}>
                    {status === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    {feedback}
                  </p>
                ) : (
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-neutral-700">Stored securely in Firebase</p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-xs font-medium text-black transition hover:bg-cyan-200 disabled:cursor-wait disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send message"}
                <Send className={`h-3.5 w-3.5 transition-transform ${status === "sending" ? "animate-pulse" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`} />
              </button>
            </div>
          </form>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
}

export default function PortfolioRedesign({ content }: { content: PortfolioContent }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fullName = `${content.hero.firstName} ${content.hero.lastName}`;
  const dockItems = [
    { title: "Home", href: "#home", icon: <Home className="h-full w-full" /> },
    { title: "Work", href: "#works", icon: <Layers3 className="h-full w-full" /> },
    { title: "About", href: "#about", icon: <UserRound className="h-full w-full" /> },
    { title: "Achievements", href: "#achievements", icon: <Award className="h-full w-full" /> },
    { title: "Stack", href: "#skills", icon: <Code2 className="h-full w-full" /> },
    { title: "Blog", href: "/blog", icon: <BookOpen className="h-full w-full" /> },
    { title: "Contact", href: "#contact", icon: <Mail className="h-full w-full" /> },
  ];

  const timelineData = content.about.experiences.map((experience) => ({
    title: experience.date,
    content: (
      <div className="mb-8 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
              {experience.company}
            </p>
            <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-white">
              {experience.title}
            </h3>
          </div>
          <BriefcaseBusiness className="h-5 w-5 text-neutral-600" />
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-400">
          {experience.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  }));

  const skillCards = content.skills.categories.map((category) => ({
    title: category.title,
    description: `${category.description} ${category.skills.map((skill) => skill.name).join(" · ")}`,
    link: "#skills",
  }));

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="dark relative overflow-clip bg-[#050608] text-white selection:bg-cyan-300 selection:text-black">
      <ScrollBeam />
      <MobileScrollRail />
      <PortfolioAiConcierge />

      <div className="fixed bottom-5 left-1/2 z-[100] hidden -translate-x-1/2 md:block">
        <FloatingDock
          items={dockItems}
          desktopClassName="border border-white/10 bg-black/70 shadow-[0_20px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
        />
      </div>
      <header className="fixed inset-x-0 top-0 z-[110] border-b border-white/[0.06] bg-[#050608]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#home" className="flex items-center gap-3" aria-label="Back to home">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] font-mono text-[10px] font-semibold">
              NP
            </span>
            <span className="hidden text-xs font-medium tracking-wide text-neutral-300 sm:block">
              {fullName}
            </span>
          </a>
          <div className="hidden md:block">
            <IndiaClock location={content.contact.locationLabel} />
          </div>
          <a
            href={content.about.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-300 transition hover:text-white md:flex"
          >
            Resume
            <Download className="h-3.5 w-3.5" />
          </a>

          <motion.button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            whileTap={{ scale: 0.9 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-neutral-200 md:hidden"
          >
            <AnimatePresence initial={false} mode="wait">
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -75, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 75, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="h-4.5 w-4.5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 75, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -75, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="h-4.5 w-4.5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-20 z-[105] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090a0d]/95 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.75)] backdrop-blur-2xl md:hidden"
            >
              <div className="absolute -right-16 -top-24 h-56 w-56 rounded-full bg-violet-500/15 blur-[70px]" />
              <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-[65px]" />
              <div className="portrait-dot-field absolute inset-0 opacity-30" />

              <div className="relative grid gap-1">
                {dockItems.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + index * 0.045, duration: 0.3 }}
                    className="group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-neutral-300 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                      <span className="h-4 w-4">{item.icon}</span>
                    </span>
                    <span className="flex-1 text-sm font-medium">{item.title}</span>
                    <span className="font-mono text-[8px] tracking-[0.18em] text-neutral-700">0{index + 1}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-neutral-600 transition-transform group-hover:translate-x-0.5" />
                  </motion.a>
                ))}
              </div>

              <div className="relative mt-3 grid grid-cols-[1fr_auto] items-center gap-3 border-t border-white/[0.07] p-3 pt-4">
                <IndiaClock location={content.contact.locationLabel} />
                <a
                  href={content.about.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-[10px] font-medium uppercase tracking-[0.15em] text-white"
                >
                  Resume <Download className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>

      <main>
        <section id="home" className="relative min-h-[100svh] overflow-hidden border-b border-white/[0.07] pt-16">
          <Spotlight
            gradientFirst="radial-gradient(68% 69% at 55% 31%, rgba(139,92,246,.22) 0, rgba(56,189,248,.06) 52%, transparent 82%)"
            gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(34,211,238,.12) 0, rgba(59,130,246,.03) 80%, transparent 100%)"
            gradientThird="radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,.11) 0, rgba(99,102,241,.02) 80%, transparent 100%)"
            translateY={-420}
            duration={9}
          />
          <div className="aceternity-grid absolute inset-0 opacity-50" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#050608] to-transparent" />

          <div className="relative z-50 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-center px-6 py-24">
            <motion.div
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-8 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.9)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-300">
                {content.hero.availabilityText}
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 34 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 max-w-6xl text-[clamp(3.4rem,10.5vw,9rem)] font-medium leading-[0.86] tracking-[-0.075em]"
            >
              <span className="block text-white">{content.hero.headlinePrimary}</span>
              <span className="block bg-gradient-to-r from-neutral-500 via-white to-cyan-200 bg-clip-text text-transparent">
                {content.hero.headlineSecondary}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto mt-10 h-[370px] w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#090a0d] shadow-[0_35px_100px_rgba(0,0,0,0.45)] lg:absolute lg:right-0 lg:top-10 lg:mt-0 lg:h-[58%] lg:w-[44%] lg:max-w-none lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_28%,rgba(139,92,246,0.2),transparent_38%),radial-gradient(circle_at_80%_68%,rgba(34,211,238,0.12),transparent_36%)] lg:inset-[-12%]" />
              <div className="portrait-dot-field absolute inset-0 opacity-45" />
              <div className="hero-portrait-material absolute inset-x-[8%] bottom-[3%] top-[5%]" />
              <PortfolioImage
                src={content.hero.imageSrc}
                alt={content.hero.imageAlt}
                sizes="(min-width: 1024px) 44vw, 430px"
                className="z-10 object-contain object-bottom drop-shadow-[0_28px_34px_rgba(0,0,0,0.48)]"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/35 to-transparent lg:from-[#050608]" />
              <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 backdrop-blur-xl lg:right-7 lg:top-7">
                <Sparkles className="h-3 w-3 text-violet-200" />
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/65">Fullstack creator</span>
              </div>
            </motion.div>

            <div className="relative z-20 mt-12 grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
              <motion.div
                initial={{ y: 12 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.65 }}
                className="flex items-center gap-4"
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/15 bg-neutral-900">
                  <PortfolioImage
                    src={content.hero.imageSrc}
                    alt={content.hero.imageAlt}
                    sizes="48px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{fullName}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                    {content.hero.professionLabel} · {content.hero.countryLabel}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.75 }}
              >
                <p className="max-w-xl text-base leading-7 text-neutral-400 md:text-lg">
                  {content.hero.role}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <MovingBorderButton
                    as="a"
                    href={content.hero.primaryCtaHref}
                    containerClassName="h-13 w-auto min-w-48"
                    className="gap-2 bg-[#0b0c10]/90 px-6 text-xs font-medium tracking-wide"
                    borderClassName="bg-[radial-gradient(#67e8f9_40%,transparent_60%)]"
                  >
                    {content.hero.primaryCtaLabel}
                    <ArrowDownRight className="h-4 w-4" />
                  </MovingBorderButton>
                  <a
                    href={content.hero.secondaryCtaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-[52px] items-center gap-2 rounded-[1.75rem] border border-white/10 px-6 text-xs font-medium text-neutral-300 transition hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
                  >
                    {content.hero.secondaryCtaLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-7 right-6 z-50 hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-neutral-600 lg:flex">
            Scroll to explore
            <ArrowDownRight className="h-4 w-4" />
          </div>
        </section>

        <section id="works" className="relative py-28 md:py-40">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading
              index="01"
              eyebrow={content.works.sectionLabel.replace(/^\d+\s*\/\s*/, "")}
              title={`${content.works.titlePrimary} ${content.works.titleSecondary}`}
              copy="A mix of product thinking, interface craft, and fullstack engineering—each project designed around a real job to be done."
            />

            <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12">
              {content.works.projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>

            <div className="mt-10 flex justify-end">
              <a
                href={content.works.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 text-sm text-neutral-400 transition hover:text-white"
              >
                <Github className="h-4 w-4" />
                {content.works.githubLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="relative overflow-hidden border-y border-white/[0.07] bg-[#07080a] py-28 md:py-40">
          <Spotlight
            gradientFirst="radial-gradient(58% 56% at 25% 44%, rgba(251,241,215,.13) 0, rgba(139,92,246,.06) 50%, transparent 82%)"
            gradientSecond="radial-gradient(45% 50% at 50% 50%, rgba(34,211,238,.08) 0, rgba(59,130,246,.02) 80%, transparent 100%)"
            gradientThird="radial-gradient(42% 46% at 50% 50%, rgba(168,85,247,.09) 0, rgba(99,102,241,.02) 80%, transparent 100%)"
            translateY={-180}
            duration={12}
          />
          <div className="aceternity-grid absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6">
            <SectionHeading
              index="02"
              eyebrow={content.about.sectionLabel.replace(/^\d+\s*\/\s*/, "")}
              title={`${content.about.titlePrimary} ${content.about.titleSecondary}`}
            />

            <div className="mt-16 grid auto-rows-[minmax(190px,auto)] gap-4 lg:grid-cols-12">
              <BackgroundGradient
                containerClassName="min-h-[560px] rounded-[2rem] p-px lg:col-span-5 lg:row-span-2"
                className="h-full overflow-hidden rounded-[calc(2rem-1px)] bg-[#08090c]"
              >
                <motion.div
                  {...reveal}
                  className="group/portrait relative h-full min-h-[560px] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(139,92,246,0.18),transparent_32%),radial-gradient(circle_at_82%_36%,rgba(34,211,238,0.12),transparent_30%),linear-gradient(145deg,#0b0c11_0%,#060709_72%)]" />
                  <div className="portrait-dot-field absolute inset-0 opacity-60" />
                  <div className="absolute -left-20 top-24 h-56 w-56 rounded-full bg-violet-500/15 blur-[80px]" />
                  <div className="absolute -right-16 bottom-24 h-52 w-52 rounded-full bg-cyan-300/10 blur-[75px]" />

                  <div className="portrait-material absolute inset-x-[7%] bottom-[5%] top-[8%]">
                    <div className="noise-fill absolute inset-0 opacity-[0.08] mix-blend-multiply" />
                    <div className="absolute inset-x-[12%] top-[5%] h-1/3 rounded-full bg-white/65 blur-[34px]" />
                  </div>

                  <div className="absolute right-5 top-5 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 backdrop-blur-xl">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.85)]" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/65">Portrait / 2026</span>
                  </div>

                  <PortfolioImage
                    src={content.about.imageSrc}
                    alt={content.about.imageAlt}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="z-20 object-cover object-top drop-shadow-[0_28px_30px_rgba(7,8,10,0.5)] transition-transform duration-700 ease-out group-hover/portrait:scale-[1.018]"
                  />
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050608] via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-30 p-7">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/80">Based in {content.hero.countryLabel}</p>
                    <p className="mt-3 text-2xl font-medium tracking-[-0.03em]">{fullName}</p>
                  </div>
                </motion.div>
              </BackgroundGradient>

              <motion.div
                {...reveal}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition-colors duration-500 hover:border-violet-300/20 md:p-10 lg:col-span-7"
              >
                <div className="absolute -right-28 -top-32 h-72 w-72 rounded-full bg-violet-500/[0.09] blur-[80px] transition-colors duration-500 group-hover:bg-violet-500/[0.14]" />
                <div className="absolute -bottom-28 left-1/3 h-52 w-52 rounded-full bg-cyan-400/[0.06] blur-[70px]" />
                <div className="relative flex items-center justify-between">
                  <Sparkles className="h-5 w-5 text-violet-300" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-neutral-600">Systems · Product · Scale</span>
                </div>
                <p className="mt-8 max-w-3xl text-xl leading-8 tracking-[-0.025em] text-neutral-200 md:text-2xl md:leading-9">
                  {content.about.paragraphs[0]}
                </p>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-500 md:text-base">
                  {content.about.paragraphs.slice(1).join(" ")}
                </p>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
                {content.about.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    {...reveal}
                    transition={{ ...reveal.transition, delay: index * 0.08 }}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.055] to-transparent p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/20"
                  >
                    <div className={`absolute inset-x-0 top-0 h-px ${[
                      "bg-gradient-to-r from-transparent via-violet-300/60 to-transparent",
                      "bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent",
                      "bg-gradient-to-r from-transparent via-amber-200/60 to-transparent",
                    ][index % 3]}`} />
                    <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-white/[0.035] blur-2xl transition group-hover:bg-cyan-300/[0.09]" />
                    <p className="text-3xl font-medium tracking-[-0.04em] text-white">
                      {stat.value}{stat.suffix}
                    </p>
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.a
                {...reveal}
                href="https://www.hackerrank.com/certificates/iframe/db1cfdf0bbf4"
                target="_blank"
                rel="noreferrer"
                className="hidden"
              >
                <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <div className="flex items-center gap-3 text-emerald-300">
                      <BadgeCheck className="h-5 w-5" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em]">Verified credential</span>
                    </div>
                    <h3 className="mt-8 text-3xl font-medium tracking-[-0.04em] md:text-5xl">HackerRank Software Engineer</h3>
                    <p className="mt-3 text-sm text-neutral-500">Issued January 2026 · Digital certificate available</p>
                  </div>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 transition group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </motion.a>
            </div>
          </div>
        </section>

        <Timeline
          data={timelineData}
          eyebrow="03 / Experience"
          heading="Progress, measured in shipped work."
          description="From independent delivery to leading fullstack systems, every chapter has added a sharper layer to the way I solve problems."
          className="bg-[#050608]"
        />

        <section id="achievements" className="border-t border-white/[0.07] py-28 md:py-40">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading
              index="04"
              eyebrow={content.achievements.sectionLabel.replace(/^\d+\s*\/\s*/, "")}
              title={content.achievements.title}
              copy={content.achievements.description}
            />
            <div className="mt-16 grid gap-5 md:grid-cols-2">
              {content.achievements.items.map((achievement, index) => (
                <motion.a
                  key={achievement.id}
                  {...reveal}
                  href={achievement.verifyUrl || "#"}
                  target={achievement.verifyUrl.startsWith("http") ? "_blank" : undefined}
                  rel={achievement.verifyUrl.startsWith("http") ? "noreferrer" : undefined}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0c0f]"
                >
                  <div className="relative h-64 overflow-hidden bg-neutral-900">
                    <PortfolioImage
                      src={achievement.image}
                      alt={`${achievement.issuer} ${achievement.title}`}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-transparent to-transparent" />
                  </div>
                  <div className="p-7 md:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-emerald-300">
                        <BadgeCheck className="h-4 w-4" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em]">{achievement.issuer}</span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600">0{index + 1}</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-medium tracking-[-0.035em] text-white md:text-3xl">{achievement.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-500">{achievement.description}</p>
                    <div className="mt-7 flex items-center justify-between border-t border-white/[0.07] pt-5">
                      <span className="text-xs text-neutral-500">{achievement.issuedOn}</span>
                      <ArrowUpRight className="h-4 w-4 text-neutral-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="border-t border-white/[0.07] bg-[#07080a] py-28 md:py-40">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading
              index="05"
              eyebrow="Capabilities"
              title={`${content.skills.titlePrimary} ${content.skills.titleSecondary}`}
              copy={content.skills.description}
            />
            <motion.div {...reveal} className="mt-8">
              <HoverEffect items={skillCards} className="lg:grid-cols-2" />
            </motion.div>
          </div>
        </section>

        <section id="journal" className="border-t border-white/[0.07] py-28 md:py-40">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading
              index="06"
              eyebrow={content.blog.eyebrow}
              title={content.blog.title}
              copy={content.blog.description}
            />
            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {content.blog.posts
                .filter((post) => post.published)
                .slice(0, 3)
                .map((post) => (
                  <motion.a
                    key={post.id}
                    {...reveal}
                    href={`/blog/${post.slug}`}
                    className="group overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025]"
                  >
                    <div className="relative h-52 overflow-hidden bg-neutral-900">
                      <PortfolioImage
                        src={post.coverImage}
                        alt={post.title}
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090a0c] via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600">
                        <span>{post.publishedAt}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-5 text-xl font-medium leading-7 tracking-[-0.025em] text-white">{post.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-500">{post.excerpt}</p>
                      <div className="mt-6 flex items-center gap-2 text-xs text-cyan-200/80">
                        Read article <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </motion.a>
                ))}
            </div>
            <div className="mt-10 flex justify-end">
              <Link href="/blog" className="group flex items-center gap-3 text-sm text-neutral-400 transition hover:text-white">
                View all writing
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        <ConsolePanel content={content.terminal} />

        <section id="contact" className="relative min-h-[90svh] overflow-hidden py-28 md:py-40">
          <Spotlight
            gradientFirst="radial-gradient(68% 69% at 55% 31%, rgba(34,211,238,.14) 0, rgba(99,102,241,.05) 52%, transparent 82%)"
            gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(139,92,246,.10) 0, transparent 80%)"
            translateY={-260}
            duration={11}
          />
          <div className="aceternity-grid absolute inset-0 opacity-25" />
          <div className="relative z-50 mx-auto flex max-w-7xl flex-col px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-cyan-300/80">
                08 / Start a conversation
              </p>
              <IndiaClock location={content.contact.locationLabel} />
            </div>

            <motion.a
              {...reveal}
              href={content.contact.links.find((link) => link.label.toLowerCase().includes("email"))?.href ?? "#"}
              className="group mt-24 block border-b border-white/10 pb-16"
            >
              <p className="text-[clamp(3.5rem,11vw,10rem)] font-medium leading-[0.82] tracking-[-0.075em] text-white">
                {content.contact.titlePrimary}
              </p>
              <div className="mt-3 flex items-end justify-between gap-6">
                <p className="bg-gradient-to-r from-neutral-600 via-white to-cyan-200 bg-clip-text text-[clamp(3.5rem,11vw,10rem)] font-medium leading-[0.82] tracking-[-0.075em] text-transparent">
                  {content.contact.titleSecondary}
                </p>
                <span className="mb-2 hidden h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/15 transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black md:flex">
                  <ArrowUpRight className="h-7 w-7" />
                </span>
              </div>
            </motion.a>

            <ContactForm />

            <div className="mt-12 grid gap-5 md:grid-cols-[1fr_2fr]">
              <div>
                <p className="max-w-sm text-sm leading-6 text-neutral-500">
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
                    className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-neutral-500 transition group-hover:text-cyan-200">
                        <SocialIcon label={link.label} />
                      </span>
                      <div>
                        <p className="text-sm text-white">{link.label}</p>
                        <p className="mt-1 max-w-[190px] truncate text-xs text-neutral-600">{link.value}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-neutral-600 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.07] pb-28 pt-10 md:pb-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {content.contact.copyrightName}. {content.contact.rightsLabel}.</p>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            Designed and built in India
          </div>
        </div>
      </footer>
    </div>
  );
}
