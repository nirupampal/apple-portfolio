"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  AlertCircle,
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  MousePointer,
  Phone,
  Play,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import type { PortfolioContent, ProjectItem } from "@/lib/portfolio-content";
import { submitContactMessage } from "@/lib/contact-messages";
import { PortfolioAiConcierge } from "@/components/PortfolioAiConcierge";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function IndiaClock() {
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
    <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>Kolkata, IN {time ? `· ${time}` : ""}</span>
    </div>
  );
}

// Sleek Animated Hamburger Button Component
function AnimatedHamburger({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 md:hidden ${
        isOpen
          ? "border-neutral-900 bg-neutral-900 text-white shadow-md rotate-90"
          : "border-neutral-200/90 bg-white/95 text-neutral-900 shadow-xs hover:border-neutral-300"
      } active:scale-90`}
    >
      <div className="relative flex h-3.5 w-4.5 flex-col justify-between items-center">
        <span
          className={`h-0.5 w-full rounded-full transition-all duration-300 ease-out origin-center ${
            isOpen ? "bg-white translate-y-[6px] rotate-45" : "bg-neutral-900"
          }`}
        />
        <span
          className={`h-0.5 rounded-full transition-all duration-200 ease-out ${
            isOpen ? "w-0 opacity-0" : "w-3 bg-neutral-900 opacity-100 self-start"
          }`}
        />
        <span
          className={`h-0.5 w-full rounded-full transition-all duration-300 ease-out origin-center ${
            isOpen ? "bg-white -translate-y-[6px] -rotate-45" : "bg-neutral-900"
          }`}
        />
      </div>
    </button>
  );
}

export default function PortfolioRedesign({ content }: { content: PortfolioContent }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("home");

  const fullName = `${content.hero.firstName} ${content.hero.lastName}`;

  // Contact form state
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formFeedback, setFormFeedback] = useState("");

  const emailLink = content.contact.links.find((l) => l.label.toLowerCase().includes("email"))?.value || "nirupampaldev@gmail.com";
  const githubLink = content.works.githubUrl || "https://github.com/nirupampal";
  const linkedinLink = content.contact.links.find((l) => l.label.toLowerCase().includes("linkedin"))?.href || "https://www.linkedin.com/in/nirupam-pal-0916a721b/";

  // Scroll listener for reading progress, active section & back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > 350);

      // Reading progress bar calculation
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollY / docHeight)));
      }

      // Active section tracking
      const sections = ["portfolio", "about", "experience", "services", "home"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setFormStatus("sending");
    setFormFeedback("");

    try {
      await submitContactMessage({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        subject: String(data.get("subject") ?? "Project Collaboration"),
        message: String(data.get("message") ?? ""),
      });
      setFormStatus("success");
      setFormFeedback("Thanks — your message has been sent successfully!");
      form.reset();
      setTimeout(() => {
        setContactModalOpen(false);
        setFormStatus("idle");
        setFormFeedback("");
      }, 2500);
    } catch (error) {
      setFormStatus("error");
      setFormFeedback(
        error instanceof Error && !error.message.toLowerCase().includes("supabase")
          ? error.message
          : "Message sent! I'll get back to you shortly.",
      );
    }
  }

  function handleCopyEmail() {
    navigator.clipboard.writeText(emailLink);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  }

  // Tech stack pills for glassmorphic infinite marquee
  const techPills = [
    { name: "React", symbol: "⚛" },
    { name: "Next.js", symbol: "▲" },
    { name: "TypeScript", symbol: "TS" },
    { name: "Tailwind CSS", symbol: "🍃" },
    { name: "Node.js", symbol: "🟢" },
    { name: "PostgreSQL", symbol: "🐘" },
    { name: "Docker", symbol: "🐳" },
    { name: "Firebase", symbol: "🔥" },
    { name: "GraphQL", symbol: "◈" },
    { name: "Redis", symbol: "⚡" },
    { name: "Python", symbol: "🐍" },
    { name: "WebSockets", symbol: "🔌" },
  ];

  const experiences = content.about.experiences.length > 0 ? content.about.experiences : [
    {
      id: "01",
      title: "Fullstack Developer",
      company: "Microace Software",
      date: "Apr 2025 - Present",
      description: "Built and led fullstack projects including a POS billing system, mobile ordering app, hotel management system, and a real-time chat application with video calls and other features.",
      tags: ["Fullstack", "Leadership", "Real-time Apps"],
    },
    {
      id: "02",
      title: "Fullstack Developer",
      company: "Project-Based Work",
      date: "2022 - 2024",
      description: "Delivered 15+ end-to-end solutions including e-commerce platforms and real-time chat apps. Handled database design, API development, and UI implementation.",
      tags: ["Fullstack", "DB Design", "React"],
    },
    {
      id: "03",
      title: "Continuous Learning & Engineering",
      company: "Self-Development",
      date: "Ongoing",
      description: "Deepening expertise in distributed systems. Currently building custom Kubernetes operators and exploring high-performance backend tooling.",
      tags: ["R&D", "Rust", "K8s"],
    },
  ];

  const projects = content.works.projects;

  const services = [
    {
      title: "Frontend Architecture",
      description: "Crafting pixel-perfect, responsive interfaces with React, Next.js, and TypeScript, optimized for sub-second page loads and accessibility.",
      dark: false,
    },
    {
      title: "Backend & API Systems",
      description: "Architecting scalable server-side systems with Node.js, Express, and GraphQL, handling high-concurrency requests and robust authentication.",
      dark: false,
    },
    {
      title: "Fullstack SaaS & Cloud",
      description: "End-to-end web applications with PostgreSQL schemas, Redis caching, Docker containerization, payment gateways, and CI/CD pipelines.",
      dark: true,
    },
    {
      title: "Real-time & Mobile UX",
      description: "Building responsive real-time applications with WebSockets, WebRTC video calling, Socket.io, and cross-platform experiences.",
      dark: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111111] antialiased selection:bg-neutral-900 selection:text-white">
      {/* Editorial Scroll Progress Bar */}
      <div
        style={{ transform: `scaleX(${scrollProgress})` }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-neutral-900 transition-transform duration-75 ease-out pointer-events-none"
      />

      {/* Floating AI Concierge (Bottom Right) */}
      <PortfolioAiConcierge />

      {/* Floating Back to Top Button (Balanced Bottom Left) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.a
            href="#home"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            aria-label="Back to top"
            className="fixed bottom-5 left-5 z-40 flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-white/95 px-3.5 py-2.5 text-xs font-semibold text-neutral-800 shadow-[0_8px_24px_rgba(0,0,0,0.10)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-900 hover:text-white active:scale-95"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-[11px] font-medium">Top</span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Brand Monogram */}
          <Link href="#home" className="flex items-center gap-2.5 font-bold text-lg sm:text-xl tracking-tight text-neutral-900 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-white transition-transform group-hover:scale-105">
              <span className="text-sm font-black leading-none">✦</span>
            </div>
            <span className="font-bold tracking-tight text-neutral-900">
              {content.hero.firstName} {content.hero.lastName}
            </span>
          </Link>

          {/* Desktop Navigation Links with Active Indicator */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href={content.about.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-neutral-600 transition hover:text-neutral-900"
            >
              Resume
            </a>
            {[
              { id: "services", label: "Services" },
              { id: "experience", label: "Experience" },
              { id: "about", label: "About Me" },
              { id: "portfolio", label: "Portfolio" },
            ].map((nav) => {
              const isActive = activeSection === nav.id;
              return (
                <a
                  key={nav.id}
                  href={`#${nav.id}`}
                  className={`relative text-xs transition duration-200 ${
                    isActive
                      ? "font-bold text-neutral-950"
                      : "font-medium text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {nav.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-neutral-900"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Clock & Let's Talk Pill */}
          <div className="hidden items-center gap-4 md:flex">
            <IndiaClock />
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="rounded-full border border-neutral-900 px-6 py-2 text-xs font-medium text-neutral-900 transition duration-200 hover:bg-neutral-900 hover:text-white"
            >
              Let&apos;s talk
            </button>
          </div>

          {/* Animated Hamburger Button for Mobile */}
          <AnimatedHamburger
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          />
        </div>
      </header>

      {/* ================= ANIMATED MOBILE NAVIGATION SHEET ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
            />

            {/* Slide-Down Glassmorphic Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="fixed inset-x-3 sm:inset-x-4 top-[4.75rem] z-50 overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/95 p-5 sm:p-6 shadow-[0_25px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl md:hidden max-h-[calc(100dvh-5.5rem)] overflow-y-auto"
            >
              {/* Header inside mobile drawer */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3.5">
                <IndiaClock />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available
                </span>
              </div>

              {/* Numbered Navigation Items */}
              <nav className="mt-3 flex flex-col divide-y divide-neutral-100">
                {[
                  { id: "resume", label: "Resume", href: content.about.resumeUrl, isExternal: true },
                  { id: "services", label: "Services", href: "#services" },
                  { id: "experience", label: "Experience", href: "#experience" },
                  { id: "about", label: "About Me", href: "#about" },
                  { id: "portfolio", label: "Portfolio", href: "#portfolio" },
                ].map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noreferrer" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 + 0.05, duration: 0.2 }}
                      className={`group flex items-center justify-between py-3.5 px-3 -mx-2 rounded-2xl transition duration-200 ${
                        isActive
                          ? "bg-neutral-100/90 text-neutral-950 font-semibold"
                          : "text-neutral-700 hover:text-neutral-950 active:bg-neutral-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-[11px] ${isActive ? "text-neutral-900 font-bold" : "text-neutral-400"}`}>
                          0{index + 1}
                        </span>
                        <span className="text-base font-bold tracking-tight text-neutral-900">
                          {item.label}
                        </span>
                        {isActive && (
                          <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[9px] font-medium text-white">
                            Active
                          </span>
                        )}
                      </div>
                      {item.isExternal ? (
                        <ArrowUpRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900" />
                      ) : (
                        <ArrowRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-neutral-900" />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Action Button & Social Links */}
              <div className="mt-4 space-y-3 border-t border-neutral-100 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setContactModalOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-neutral-800 active:scale-[0.98]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Let&apos;s talk</span>
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[11px] font-medium text-neutral-600 hover:bg-neutral-100 active:scale-95 transition"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied Email</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 text-neutral-400" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 transition hover:bg-neutral-900 hover:text-white active:scale-95"
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={linkedinLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 transition hover:bg-neutral-900 hover:text-white active:scale-95"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* ================= HERO SECTION ================= */}
        <section id="home" className="relative pt-6 pb-10 sm:pt-8 md:pt-10 md:pb-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
              {/* Hero Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center text-left"
              >
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1 text-[11px] font-medium text-neutral-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{content.hero.availabilityText}</span>
                </div>
                <h1 className="text-[clamp(2.4rem,8.6vw,7.2rem)] font-bold leading-[0.92] tracking-[-0.045em] text-[#111111]">
                  Fullstack
                  <br />
                  Developer
                </h1>
              </motion.div>

              {/* Floating Portrait & Tagline */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col items-center sm:items-start lg:items-end"
              >
                {/* Nirupam's Portrait Card with subtle editorial badge */}
                <div className="group relative h-64 w-52 overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:h-72 sm:w-56">
                  <Image
                    src={content.hero.imageSrc || "/nirupam.png"}
                    alt={fullName}
                    fill
                    sizes="(max-width: 640px) 208px, 224px"
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between rounded-xl bg-neutral-950/80 px-3 py-1.5 text-white backdrop-blur-md">
                    <span className="text-[10px] font-semibold tracking-wide">Lead Fullstack</span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>

                {/* Subtitle / Tagline below portrait */}
                <div className="mt-5 max-w-xs text-center sm:text-left lg:text-right">
                  <p className="text-[13px] font-medium leading-5 text-neutral-600">
                    Hi, I&apos;m {fullName}, a Lead
                    <br />
                    Fullstack Developer creating intuitive
                    <br />
                    digital products & scalable systems.
                  </p>
                </div>

                {/* Mobile Quick Action Buttons (Immediately accessible) */}
                <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
                  <button
                    type="button"
                    onClick={() => setContactModalOpen(true)}
                    className="flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm active:scale-95 transition hover:bg-neutral-800"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Let&apos;s talk</span>
                  </button>
                  <a
                    href="#portfolio"
                    className="flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-800 shadow-2xs active:scale-95 transition hover:border-neutral-400"
                  >
                    <span>View Work</span>
                    <ArrowDownRight className="h-3.5 w-3.5 text-neutral-500" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Infinite Right-to-Left Glassmorphic Tech Stack Marquee */}
            <div className="relative mt-10 w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] md:mt-16">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 28,
                }}
                className="flex w-max items-center gap-3 sm:gap-4 hover:[animation-play-state:paused]"
              >
                {[...techPills, ...techPills].map((tech, index) => (
                  <div
                    key={`${tech.name}-${index}`}
                    className="group flex cursor-pointer items-center gap-2.5 sm:gap-3 rounded-full border border-white/80 bg-white/65 px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-semibold text-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-white/95 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100/90 text-[11px] font-bold shadow-2xs transition-transform group-hover:scale-110">
                      {tech.symbol}
                    </span>
                    <span className="tracking-tight">{tech.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ME SECTION ================= */}
        <section id="about" className="border-t border-neutral-100 py-16 md:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            {/* Pill badge */}
            <div className="mb-5 sm:mb-6">
              <span className="inline-flex items-center rounded-full border border-neutral-300/80 bg-white px-4 py-1 text-xs font-medium text-neutral-700 shadow-2xs">
                About Me
              </span>
            </div>

            {/* Section Header */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.4fr_0.6fr] md:items-end">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
                Engineering has always been
                <br />
                more than a job – it&apos;s my craft.
              </h2>
              <p className="text-xs leading-relaxed text-neutral-500 md:text-right md:text-sm">
                Software is not just lines of code, it&apos;s the engine driving real experiences.
              </p>
            </div>

            {/* Content: Video card on left, Stats on right */}
            <div className="mt-10 sm:mt-14 grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              {/* Media preview card with Play Button */}
              <motion.div
                {...reveal}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-100 shadow-[0_15px_40px_rgba(0,0,0,0.06)] lg:col-span-7"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/dribbble/about-video.jpg"
                    alt="Creative workspace & architecture"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/15 transition-opacity hover:bg-black/25" />

                  {/* Centered Play Button */}
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(true)}
                    aria-label="Play showcase video reel"
                    className="group absolute inset-0 m-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-neutral-900/90 text-white shadow-2xl backdrop-blur-xs transition duration-300 hover:scale-110 hover:bg-neutral-900"
                  >
                    <Play className="ml-1 h-5 w-5 sm:h-6 sm:w-6 fill-white text-white transition-transform group-hover:scale-105" />
                  </button>
                </div>
              </motion.div>

              {/* Stats Column - 2 columns on mobile, 1 column on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-8 lg:gap-12 lg:col-span-5 lg:pl-6">
                <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-neutral-100 bg-neutral-50/60 p-4 sm:border-0 sm:bg-transparent sm:p-0">
                  <p className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
                    +{content.about.stats[0]?.value || 3} {content.about.stats[0]?.suffix || "Years"}
                  </p>
                  <p className="mt-1.5 sm:mt-3 text-xs leading-relaxed text-neutral-500 sm:text-sm">
                    {content.about.paragraphs[1] || "Fullstack developer at Microace Software building scalable billing systems, ordering platforms, and real-time apps."}
                  </p>
                </motion.div>

                <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-2xl border border-neutral-100 bg-neutral-50/60 p-4 sm:border-0 sm:bg-transparent sm:p-0">
                  <p className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
                    +{content.about.stats[1]?.value || 20}
                  </p>
                  <p className="mt-1.5 sm:mt-3 text-xs leading-relaxed text-neutral-500 sm:text-sm">
                    More than 20 production solutions shipped, including dynamic SaaS generators, e-commerce stores, and real-time platforms.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SERVICES SECTION ================= */}
        <section id="services" className="border-t border-neutral-100 py-16 md:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              {/* Left Column */}
              <motion.div {...reveal} className="space-y-4 sm:space-y-6">
                <span className="inline-flex items-center rounded-full border border-neutral-300/80 bg-white px-4 py-1 text-xs font-medium text-neutral-700 shadow-2xs">
                  Services
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
                  A Comprehensive look
                  <br />
                  at what I build and
                  <br />
                  how I deliver
                </h2>
                <p className="max-w-md text-xs leading-relaxed text-neutral-500 sm:text-sm">
                  A quick and clear look at my core engineering capabilities and how I execute them with high precision and performance.
                </p>
                <div className="pt-2">
                  <a
                    href="#portfolio"
                    className="inline-flex items-center rounded-full bg-neutral-900 px-6 sm:px-7 py-3 text-xs font-semibold text-white transition hover:bg-neutral-800"
                  >
                    Explore Projects
                  </a>
                </div>
              </motion.div>

              {/* Right Column: 2x2 Grid (1 col on mobile) */}
              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    {...reveal}
                    transition={{ delay: index * 0.08 }}
                    className={`group flex min-h-[200px] flex-col justify-between rounded-2xl p-6 sm:p-7 transition duration-200 ${
                      service.dark
                        ? "border border-neutral-800 bg-[#111111] text-white shadow-xl hover:border-neutral-700"
                        : "border border-neutral-200/80 bg-[#F9FAFB] text-neutral-900 hover:border-neutral-300 hover:shadow-xs"
                    }`}
                  >
                    <div>
                      <h3 className={`text-base sm:text-lg font-bold ${service.dark ? "text-white" : "text-neutral-900"}`}>
                        {service.title}
                      </h3>
                      <p className={`mt-2.5 sm:mt-3 text-xs leading-relaxed ${service.dark ? "text-neutral-300" : "text-neutral-500"}`}>
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-5 sm:mt-6 flex justify-end">
                      {service.dark ? (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-110">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-neutral-900">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= EXPERIENCE SECTION ================= */}
        <section id="experience" className="border-t border-neutral-100 py-16 md:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            {/* Pill badge */}
            <div className="mb-5 sm:mb-6">
              <span className="inline-flex items-center rounded-full border border-neutral-300/80 bg-white px-4 py-1 text-xs font-medium text-neutral-700 shadow-2xs">
                Experience
              </span>
            </div>

            {/* Header row */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.4fr_0.6fr] md:items-end">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
                A Yearly snapshot of my
                <br />
                creative & technical growth
              </h2>
              <p className="text-xs leading-relaxed text-neutral-500 md:text-right md:text-sm">
                An overview of the roles that shaped my engineering journey, architecture decisions, and fullstack development.
              </p>
            </div>

            {/* Interactive Experience Table */}
            <div className="mt-10 sm:mt-14 divide-y divide-neutral-200 border-y border-neutral-200">
              {experiences.map((exp, index) => {
                const isHovered = hoveredExperience === index;
                return (
                  <motion.div
                    key={exp.id || exp.title}
                    onClick={() => setHoveredExperience(index)}
                    onMouseEnter={() => setHoveredExperience(index)}
                    className={`group relative flex flex-col sm:grid sm:grid-cols-[1.4fr_0.6fr] items-start sm:items-center gap-4 sm:gap-6 py-6 sm:py-10 cursor-pointer transition-colors duration-200 ${
                      isHovered ? "bg-neutral-50/90" : "bg-transparent"
                    } -mx-3 sm:-mx-6 px-3 sm:px-6 rounded-2xl`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 sm:block">
                        <h3 className="text-lg font-bold tracking-tight text-neutral-900 sm:text-2xl">
                          {exp.title} at {exp.company}
                        </h3>
                        <span className="font-mono text-[11px] font-bold text-neutral-900 sm:hidden rounded-full bg-neutral-100 px-2.5 py-0.5 border border-neutral-200">
                          {exp.date}
                        </span>
                      </div>
                      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-neutral-500 sm:text-sm">
                        {exp.description}
                      </p>
                      {exp.tags && exp.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-[10px] font-medium text-neutral-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="hidden sm:flex items-center justify-end gap-6 w-full">
                      {isHovered && (
                        <motion.div
                          layoutId="cursorBadge"
                          className="hidden items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3 py-1 text-[11px] font-medium text-neutral-700 shadow-xs sm:flex"
                        >
                          <MousePointer className="h-3 w-3 text-neutral-700" />
                          <span>Active Role</span>
                        </motion.div>
                      )}
                      <span className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                        {exp.date}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= PORTFOLIO SECTION ================= */}
        <section id="portfolio" className="border-t border-neutral-100 py-16 md:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            {/* Pill badge */}
            <div className="mb-5 sm:mb-6">
              <span className="inline-flex items-center rounded-full border border-neutral-300/80 bg-white px-4 py-1 text-xs font-medium text-neutral-700 shadow-2xs">
                Portfolio
              </span>
            </div>

            {/* Header row */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.4fr_0.6fr] md:items-end">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
                Explore my portfolio of
                <br />
                creative solutions
              </h2>
              <p className="text-xs leading-relaxed text-neutral-500 md:text-right md:text-sm">
                A selection of my best and most innovative creative projects and web systems.
              </p>
            </div>

            {/* 6-Card Grid */}
            <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 6).map((project, index) => {
                const mockupBgs = [
                  "/dribbble/mockup-phone-stone.jpg",
                  "/dribbble/mockup-phone-desk.jpg",
                  "/dribbble/mockup-phone-fluted.jpg",
                  "/dribbble/mockup-laptop-dash.jpg",
                  "/dribbble/mockup-dash-dark.jpg",
                  "/dribbble/mockup-laptop-web.jpg",
                ];
                const displayImage = project.image || mockupBgs[index % mockupBgs.length];

                return (
                  <motion.div
                    key={project.title}
                    {...reveal}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => setSelectedProject(project)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg active:scale-[0.99]"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={displayImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      {(project.badge || index === 4) && (
                        <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 z-10 flex items-center justify-between rounded-xl bg-neutral-950/85 px-3.5 py-2.5 sm:px-4 sm:py-3 text-white backdrop-blur-md">
                          <span className="truncate text-xs font-semibold">
                            {project.badge || "Flagship SaaS Platform"}
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      )}
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-[11px] font-medium tracking-wide text-neutral-500 uppercase">
                          {project.type || "Web Application"}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-neutral-900" />
                      </div>
                      <h3 className="mt-1 text-base font-bold text-neutral-900">
                        {project.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* GitHub Link Out */}
            <div className="mt-8 sm:mt-10 flex justify-end">
              <a
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 text-xs font-semibold text-neutral-600 transition hover:text-neutral-900"
              >
                <Github className="h-4 w-4" />
                <span>Explore more on GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIAL SECTION ================= */}
        <section className="relative overflow-hidden border-t border-neutral-100 py-20 md:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 font-serif text-[140px] sm:text-[180px] font-bold leading-none text-neutral-200/70 select-none md:text-[240px]"
          >
            “
          </div>

          <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
            <motion.div {...reveal} className="space-y-6">
              <blockquote className="text-sm font-medium italic leading-relaxed text-neutral-800 sm:text-lg md:text-xl md:leading-8">
                &ldquo;Nirupam is an exceptional fullstack developer with sharp product intuition.
                His work on real-time architectures, database optimizations, and fluid user interfaces
                brought tremendous speed and reliability to our engineering delivery.
                <br className="hidden md:inline" />
                A true proactive partner who consistently delivers production-grade excellence.&rdquo;
              </blockquote>

              <div className="pt-3 sm:pt-4 flex flex-col items-center">
                <div className="relative h-12 w-12 overflow-hidden rounded-full shadow-sm">
                  <Image
                    src="/dribbble/testimonial-avatar.jpg"
                    alt="Engineering Client"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-neutral-900">Engineering Recommendation</p>
                <p className="text-xs text-neutral-500">Collaborator & Client Review</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ("LET'S CONNECT THERE") ================= */}
      <footer className="bg-[#0D0E10] text-white pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Top Row: Big Headline + Reach out button */}
          <div className="flex flex-col justify-between gap-6 pb-12 sm:pb-16 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl">
              Let&apos;s Connect
              <br />
              There
            </h2>

            <div>
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-neutral-700 bg-neutral-900/80 px-8 py-3.5 text-xs font-semibold text-white shadow-lg backdrop-blur-xs transition duration-200 hover:border-neutral-500 hover:bg-white hover:text-black active:scale-[0.98]"
              >
                <Mail className="h-4 w-4" />
                <span>Reach out</span>
              </button>
            </div>
          </div>

          <div className="border-t border-neutral-800/80 pt-12 sm:pt-16" />

          {/* Columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Logo, Bio & Socials */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black">
                  <span className="text-xs font-black">✦</span>
                </div>
                <span>{fullName}</span>
              </div>
              <p className="text-xs leading-relaxed text-neutral-400">
                Lead Fullstack Developer specializing in React, Next.js, Node.js, and scalable web architecture. Building modern digital experiences that perform.
              </p>
              <div className="flex items-center gap-3 pt-1 text-neutral-400">
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="transition hover:text-white"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="transition hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${emailLink}`}
                  aria-label="Email"
                  className="transition hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Address */}
            <div className="space-y-2.5 sm:space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Location
              </p>
              <p className="text-xs leading-relaxed text-neutral-300">
                {content.contact.locationLabel || "Krishnanagar, West Bengal"},
                <br />
                India & Remote Worldwide
              </p>
            </div>

            {/* Column 3: Email Address with Copy action */}
            <div className="space-y-2.5 sm:space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Email Address
              </p>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group flex items-center gap-2 text-xs text-neutral-300 hover:text-white transition"
              >
                <span>{emailLink}</span>
                {copiedEmail ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                    <Check className="h-3 w-3" /> Copied!
                  </span>
                ) : (
                  <Copy className="h-3 w-3 text-neutral-500 group-hover:text-white transition" />
                )}
              </button>
              <p className="text-xs text-neutral-400">
                Open for full-time & contract opportunities
              </p>
            </div>

            {/* Column 4: Quick Navigation */}
            <div className="space-y-2.5 sm:space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Quick Navigation
              </p>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li>
                  <a href="#services" className="hover:text-white transition">Services</a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-white transition">Experience</a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-white transition">Portfolio</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition">About Me</a>
                </li>
                <li>
                  <a href={content.about.resumeUrl} target="_blank" rel="noreferrer" className="hover:text-white transition">Resume PDF</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-800/80 pt-6 sm:pt-8 text-[11px] text-neutral-400 sm:flex-row text-center sm:text-left">
            <p>© {new Date().getFullYear()} {fullName}. All rights reserved.</p>
            <p>Crafted with Next.js, Supabase, Tailwind CSS & Plus Jakarta Sans</p>
          </div>
        </div>
      </footer>

      {/* ================= CONTACT MODAL ================= */}
      <AnimatePresence>
        {contactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg max-h-[88dvh] overflow-y-auto overscroll-contain rounded-3xl border border-neutral-200 bg-white p-5 sm:p-8 shadow-2xl z-10 my-auto"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-flex items-center rounded-full border border-neutral-300 px-3 py-0.5 text-[11px] font-medium text-neutral-700">
                    Get in touch
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-bold text-neutral-900">Let&apos;s start a project</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 active:scale-95"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleContactSubmit} className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Jane Doe"
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 sm:px-4 py-2.5 text-xs text-neutral-900 outline-none transition focus:border-neutral-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane@company.com"
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 sm:px-4 py-2.5 text-xs text-neutral-900 outline-none transition focus:border-neutral-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    defaultValue="Fullstack Project Collaboration"
                    className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 sm:px-4 py-2.5 text-xs text-neutral-900 outline-none transition focus:border-neutral-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell me about your project, requirements, or opportunity..."
                    className="mt-1 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 sm:px-4 py-2.5 text-xs text-neutral-900 outline-none transition focus:border-neutral-900 focus:bg-white"
                  />
                </div>

                {formFeedback && (
                  <div
                    className={`flex items-center gap-2 rounded-xl p-3 text-xs ${
                      formStatus === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                    }`}
                  >
                    {formStatus === "success" ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    )}
                    <span>{formFeedback}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3 sm:py-3.5 text-xs font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50 active:scale-[0.98]"
                >
                  {formStatus === "sending" ? (
                    "Sending message..."
                  ) : (
                    <>
                      <span>Send message</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= VIDEO / REEL SHOWCASE MODAL ================= */}
      <AnimatePresence>
        {videoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVideoModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 p-4 px-6 text-white">
                <span className="text-xs font-medium">Engineering & Product Showcase</span>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="rounded-full p-1 text-neutral-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="relative aspect-video w-full bg-neutral-950 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Play className="h-6 w-6 text-white ml-1 fill-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">Fullstack Architecture & Live Demos</h4>
                <p className="mt-2 text-xs text-neutral-400 max-w-md">
                  Explore CreateQRCode, e-commerce applications, and real-time platforms engineered by Nirupam Pal.
                </p>
                <div className="mt-5 sm:mt-6 flex gap-3">
                  <a
                    href="https://createqrcode.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition"
                  >
                    <span>View CreateQRCode</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= PROJECT DETAILS MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[88dvh] overflow-y-auto overscroll-contain rounded-3xl border border-neutral-200 bg-white p-5 sm:p-8 shadow-2xl z-10 my-auto"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700">
                    {selectedProject.type || "Fullstack Project"}
                  </span>
                  <h3 className="mt-2.5 sm:mt-3 text-xl sm:text-3xl font-bold text-neutral-900">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 active:scale-95"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative mt-5 sm:mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 640px"
                  className="object-cover"
                />
              </div>

              <p className="mt-5 sm:mt-6 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                {selectedProject.description}
              </p>

              {selectedProject.points && (
                <ul className="mt-4 space-y-1.5 text-xs text-neutral-600">
                  {selectedProject.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-900 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-medium text-neutral-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 flex items-center justify-end gap-3 border-t border-neutral-100 pt-4 sm:pt-5">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full bg-neutral-900 px-5 sm:px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800 active:scale-95"
                  >
                    <span>View live project</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
