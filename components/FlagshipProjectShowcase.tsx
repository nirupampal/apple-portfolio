"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  CreditCard,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Lock,
  QrCode,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

import type { ProjectItem } from "@/lib/portfolio-content";

interface ScreenshotTab {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  image: string;
  route: string;
  caption: string;
  highlightBadge: string;
}

const SCREENSHOT_TABS: ScreenshotTab[] = [
  {
    id: "dashboard",
    label: "Analytics & Workspace",
    shortLabel: "Analytics",
    icon: Activity,
    image: "/createqrcode-dashboard.png",
    route: "createqrcode.in/overview",
    caption: "30-Day scan activity graph with automated bot exclusion, top QR codes, and Pro plan usage quotas.",
    highlightBadge: "Live Telemetry",
  },
  {
    id: "landing",
    label: "Landing & Generator",
    shortLabel: "Landing",
    icon: QrCode,
    image: "/createqrcode-landing.png",
    route: "createqrcode.in",
    caption: "High-converting SaaS landing page with instant dynamic QR code builder and live design preview.",
    highlightBadge: "Instant Preview",
  },
  {
    id: "modal",
    label: "5-Type QR Engine",
    shortLabel: "QR Engine",
    icon: Cpu,
    image: "/createqrcode-modal.png",
    route: "createqrcode.in/workspace/create",
    caption: "Multi-payload builders: WiFi (WPA/WPA2/WPA3), WhatsApp with prefilled message, URL, PDF, and Google Review.",
    highlightBadge: "5 Payloads",
  },
  {
    id: "billing",
    label: "Razorpay SaaS Checkout",
    shortLabel: "Billing",
    icon: CreditCard,
    image: "/createqrcode-billing.png",
    route: "createqrcode.in/plans",
    caption: "Seamless monetization modal powered by Razorpay: instant UPI QR, Cards, EMI, Netbanking, and Pro renewal.",
    highlightBadge: "Razorpay Gateway",
  },
];

const CAPABILITIES = [
  {
    icon: Zap,
    title: "Sub-10ms Dynamic Redirects",
    description:
      "Edit destination targets anytime after print without reprinting marketing collateral or physical stickers.",
    color: "from-amber-400/20 to-orange-500/10",
    iconColor: "text-amber-300",
  },
  {
    icon: TrendingUp,
    title: "Scan Activity & Bot Filtering",
    description:
      "Time-series scan tracking that isolates real user scans by filtering out search engine crawlers and automated bots.",
    color: "from-cyan-400/20 to-blue-500/10",
    iconColor: "text-cyan-300",
  },
  {
    icon: Layers,
    title: "5 Multi-Payload Engines",
    description:
      "Supports native WiFi credentials (SSID & hidden toggle), WhatsApp chats, PDF docs, Google Reviews, and URLs.",
    color: "from-purple-400/20 to-violet-500/10",
    iconColor: "text-purple-300",
  },
  {
    icon: CreditCard,
    title: "Razorpay Monetization",
    description:
      "Integrated ₹499/mo Pro subscription tiers with native UPI QR scanning, cards, and automated scan quota unlocks.",
    color: "from-emerald-400/20 to-teal-500/10",
    iconColor: "text-emerald-300",
  },
];

export function FlagshipProjectShowcase({
  project,
  githubUrl,
}: {
  project: ProjectItem;
  githubUrl?: string;
}) {
  const [activeTabId, setActiveTabId] = useState<string>("dashboard");

  const currentTab =
    SCREENSHOT_TABS.find((t) => t.id === activeTabId) ?? SCREENSHOT_TABS[0];

  return (
    <div className="relative col-span-12 overflow-hidden rounded-[2.5rem] border border-white/[0.12] bg-[#090a0e] p-4 shadow-[0_40px_140px_rgba(0,0,0,0.85)] md:p-8">
      {/* Ambient decorative glow */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

      <div className="relative z-10 flex flex-col gap-8">
        {/* Top Header Badge & Navigation Tabs */}
        <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Flagship SaaS · Live
              </span>
            </div>
            <span className="font-mono text-[11px] text-neutral-500">•</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              {project.type}
            </span>
            <span className="font-mono text-[11px] text-neutral-500">•</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              {project.year}
            </span>
          </div>

          {/* Interactive Screen Selector */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-white/[0.08] bg-black/40 p-1.5 backdrop-blur-xl">
            {SCREENSHOT_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`relative flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition duration-300 ${
                    isActive
                      ? "text-white shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/80 to-cyan-600/80"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Realistic macOS / Safari Viewport Showcase Frame */}
        <div className="group/frame relative overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-[#07080b] shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
          {/* Window Chrome Header Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0d0e14]/90 px-4 py-3 backdrop-blur-md">
            {/* macOS traffic lights */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]/90 shadow-[0_0_8px_rgba(255,95,86,0.4)]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/90 shadow-[0_0_8px_rgba(255,189,46,0.4)]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]/90 shadow-[0_0_8px_rgba(39,201,63,0.4)]" />
            </div>

            {/* URL bar pill */}
            <a
              href={`https://${currentTab.route}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/50 px-4 py-1 font-mono text-[11px] text-neutral-300 transition hover:border-cyan-300/40 hover:text-white"
            >
              <Lock className="h-3 w-3 text-emerald-400" />
              <span>https://{currentTab.route}</span>
              <ExternalLink className="h-3 w-3 text-neutral-500" />
            </a>

            {/* Feature badge */}
            <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-300 md:inline-block">
              {currentTab.highlightBadge}
            </span>
          </div>

          {/* Screenshot Display Screen */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950 sm:aspect-[16/9.5] lg:aspect-[16/8.8]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                {/* Image element with crisp rendering */}
                <img
                  src={currentTab.image}
                  alt={currentTab.label}
                  className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover/frame:scale-[1.015]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </motion.div>
            </AnimatePresence>

            {/* Dynamic Screen Caption Bar Overlay */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-1 border-t border-white/[0.08] bg-gradient-to-t from-[#090a0e] via-[#090a0e]/95 to-transparent p-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <p className="text-xs text-neutral-200 md:text-sm font-medium">
                  {currentTab.caption}
                </p>
              </div>
              <a
                href="https://createqrcode.in"
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-cyan-300 transition hover:text-cyan-200 md:mt-0 md:self-auto"
              >
                Test live on createqrcode.in
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Project Meta & Architecture Deep Dive */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Title, Narrative, CTA Buttons, Tech Badges */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl lg:text-5xl">
                {project.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-cyan-300/90 md:text-base">
                {project.description}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-neutral-400">
              A production-ready fullstack platform empowering businesses and creators with
              dynamic, trackable QR codes. Built from ground up with Next.js, PostgreSQL,
              real-time scan telemetry, and native Razorpay billing workflows.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_35px_rgba(99,102,241,0.45)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(34,211,238,0.6)]"
              >
                <Globe className="h-4 w-4" />
                <span>Launch Live App</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-300 transition duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub Repository</span>
                </a>
              ) : null}
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-2.5 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                Core Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] text-neutral-300 transition duration-200 hover:border-cyan-300/40 hover:bg-white/[0.07] hover:text-white"
                  >
                    <CheckCircle2 className="h-3 w-3 text-cyan-400" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Architecture Highlights Cards */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:col-span-7">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="group/card relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.045]"
                >
                  <div className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${cap.color} blur-2xl transition duration-500 group-hover/card:opacity-100 opacity-60`} />

                  <div className="relative z-10 space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/40">
                      <Icon className={`h-5 w-5 ${cap.iconColor}`} />
                    </div>
                    <h4 className="text-base font-medium tracking-tight text-white">
                      {cap.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-neutral-400">
                      {cap.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
