"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  QrCode,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal as TerminalIcon,
  Zap,
} from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio-content";

interface HeroStudioShowcaseProps {
  content: PortfolioContent;
}

export function HeroStudioShowcase({ content }: HeroStudioShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"flagship" | "architecture" | "terminal">("flagship");
  const [activeQrType, setActiveQrType] = useState<"wifi" | "url" | "upi">("wifi");

  return (
    <div className="relative mx-auto mt-12 w-full max-w-7xl">
      {/* Ambient background glow behind the hardware showcase */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-20 -top-16 bottom-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-10 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/15 via-violet-500/10 to-blue-600/10 blur-[110px]" />
        <div className="absolute right-10 top-32 h-[340px] w-[340px] rounded-full bg-purple-500/10 blur-[90px]" />
      </div>

      {/* Main Grid: Left side Studio Display / Interactive Showcase (8 cols) + Right side Bento Deck (4 cols) */}
      <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
        {/* Apple Studio Workstation Display (lg:col-span-8) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#090a0f]/90 shadow-[0_25px_80px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl lg:col-span-8"
        >
          {/* Top Apple Studio Bezel / Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-black/40 px-6 py-4 backdrop-blur-md">
            {/* macOS Window Controls & Hardware Title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.6)]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.6)]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.6)]" />
              </div>
              <div className="hidden h-3.5 w-px bg-white/10 sm:block" />
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-neutral-400">
                <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                <span>STUDIO WORKSTATION · V2.6</span>
              </div>
            </div>

            {/* Apple Tab Switcher Pills */}
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
              <button
                type="button"
                onClick={() => setActiveTab("flagship")}
                className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "flagship"
                    ? "bg-white text-black shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <QrCode className="h-3.5 w-3.5" />
                <span>Flagship SaaS</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("architecture")}
                className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "architecture"
                    ? "bg-white text-black shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Architecture</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("terminal")}
                className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "terminal"
                    ? "bg-white text-black shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <TerminalIcon className="h-3.5 w-3.5" />
                <span>Live Console</span>
              </button>
            </div>
          </div>

          {/* Interactive Screen Canvas */}
          <div className="relative flex-1 p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* VIEW 1: Flagship SaaS (createqrcode.in) Live Telemetry & Interactive Preview */}
              {activeTab === "flagship" && (
                <motion.div
                  key="flagship"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                  className="space-y-6"
                >
                  {/* Top Bar: Live URL badge & External Launch */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-neutral-300">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      <span className="text-neutral-500">https://</span>
                      <span className="font-semibold text-white">createqrcode.in</span>
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-emerald-300">
                        Live SaaS
                      </span>
                    </div>

                    <a
                      href="https://createqrcode.in"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-medium text-cyan-200 transition hover:bg-cyan-400/20 hover:text-white"
                    >
                      Launch Platform
                      <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Headline & Project Pitch */}
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                      Enterprise Dynamic QR Code Infrastructure & Telemetry
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                      High-concurrency fullstack platform with sub-10ms dynamic redirects, time-series scan analytics, automated bot filtering, and native Razorpay Pro subscriptions.
                    </p>
                  </div>

                  {/* Live Interactive Telemetry Metrics */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5 transition hover:border-white/20">
                      <div className="flex items-center gap-1.5 text-cyan-300">
                        <Zap className="h-4 w-4" />
                        <span className="font-mono text-[10px] uppercase tracking-wider">Latency</span>
                      </div>
                      <p className="mt-2 font-mono text-xl font-semibold text-white">&lt; 10ms</p>
                      <p className="text-[11px] text-neutral-500">Global Edge Redirection</p>
                    </div>

                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5 transition hover:border-white/20">
                      <div className="flex items-center gap-1.5 text-emerald-300">
                        <ShieldCheck className="h-4 w-4" />
                        <span className="font-mono text-[10px] uppercase tracking-wider">Bot Filter</span>
                      </div>
                      <p className="mt-2 font-mono text-xl font-semibold text-white">99.8%</p>
                      <p className="text-[11px] text-neutral-500">Real Human Scans Only</p>
                    </div>

                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5 transition hover:border-white/20">
                      <div className="flex items-center gap-1.5 text-purple-300">
                        <Activity className="h-4 w-4" />
                        <span className="font-mono text-[10px] uppercase tracking-wider">Engines</span>
                      </div>
                      <p className="mt-2 font-mono text-xl font-semibold text-white">5 Types</p>
                      <p className="text-[11px] text-neutral-500">WiFi, WhatsApp, URL, PDF</p>
                    </div>

                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5 transition hover:border-white/20">
                      <div className="flex items-center gap-1.5 text-amber-300">
                        <Globe className="h-4 w-4" />
                        <span className="font-mono text-[10px] uppercase tracking-wider">Monetization</span>
                      </div>
                      <p className="mt-2 font-mono text-xl font-semibold text-white">Razorpay</p>
                      <p className="text-[11px] text-neutral-500">Live UPI & Cards Gateway</p>
                    </div>
                  </div>

                  {/* Interactive Payload Switcher Demonstration */}
                  <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                        Interactive Engine Payload Preview
                      </span>
                      <div className="flex gap-1">
                        {(["wifi", "url", "upi"] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setActiveQrType(type)}
                            className={`rounded-lg px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider transition ${
                              activeQrType === type
                                ? "border border-cyan-400/40 bg-cyan-400/20 text-cyan-300"
                                : "text-neutral-400 hover:text-white"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-4 font-mono text-xs">
                      <div className="space-y-1">
                        {activeQrType === "wifi" && (
                          <>
                            <p className="font-medium text-cyan-300">WIFI:S:Guest_HQ;T:WPA;P:••••••••;;</p>
                            <p className="text-[11px] text-neutral-500">One-tap instant router authentication with WPA3 fallback</p>
                          </>
                        )}
                        {activeQrType === "url" && (
                          <>
                            <p className="font-medium text-cyan-300">https://createqrcode.in/r/launch-2026</p>
                            <p className="text-[11px] text-neutral-500">Sub-10ms dynamic edge routing with query parameter preservation</p>
                          </>
                        )}
                        {activeQrType === "upi" && (
                          <>
                            <p className="font-medium text-cyan-300">upi://pay?pa=pro@razorpay&pn=SaaS_Pro</p>
                            <p className="text-[11px] text-neutral-500">Instant UPI payment link generation with webhook confirmation</p>
                          </>
                        )}
                      </div>
                      <div className="hidden shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-center sm:block">
                        <span className="text-[10px] uppercase tracking-wider text-emerald-400">Active Node</span>
                        <p className="font-mono text-xs text-white">ap-south-1</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VIEW 2: System Architecture Interactive Flow */}
              {activeTab === "architecture" && (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight text-white">
                      Fullstack Production Architecture
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                      How I structure modern distributed systems for zero downtime, edge performance, and type-safe maintainability.
                    </p>
                  </div>

                  {/* Architecture Diagram Nodes */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    {/* Layer 1: Client Edge */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center gap-2 text-cyan-300">
                        <Globe className="h-4 w-4" />
                        <span className="font-mono text-xs uppercase tracking-wider">Edge / UI Layer</span>
                      </div>
                      <ul className="mt-3 space-y-2 text-xs text-neutral-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Next.js 16 App Router</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>React 19 Server Components</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Tailwind CSS & Motion physics</span>
                        </li>
                      </ul>
                    </div>

                    {/* Layer 2: API & Services */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center gap-2 text-violet-300">
                        <Server className="h-4 w-4" />
                        <span className="font-mono text-xs uppercase tracking-wider">Core Services</span>
                      </div>
                      <ul className="mt-3 space-y-2 text-xs text-neutral-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Node.js / Express API</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Strict TypeScript Contracts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Cloudflare Workers & AI Edge</span>
                        </li>
                      </ul>
                    </div>

                    {/* Layer 3: Persistence & Caching */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center gap-2 text-amber-300">
                        <Database className="h-4 w-4" />
                        <span className="font-mono text-xs uppercase tracking-wider">Data & Cache</span>
                      </div>
                      <ul className="mt-3 space-y-2 text-xs text-neutral-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>PostgreSQL (ACID Transactions)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Redis In-Memory Cache</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Dockerized Deployment</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-black/40 p-4 font-mono text-xs text-neutral-400">
                    <p className="text-neutral-500">// Pipeline status</p>
                    <p className="mt-1 text-emerald-400">
                      ✓ Zero type errors · 100% strict null checks · Automated GitHub Actions CI/CD passed
                    </p>
                  </div>
                </motion.div>
              )}

              {/* VIEW 3: Live Developer Terminal */}
              {activeTab === "terminal" && (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                  className="space-y-4 font-mono text-xs"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-neutral-500">
                    <span>nirupam@macbook-pro ~ % release-check</span>
                    <span className="text-emerald-400">READY TO SHIP</span>
                  </div>

                  <div className="space-y-3 rounded-xl bg-black/60 p-5 text-neutral-300">
                    <p className="text-cyan-300">$ pnpm exec tsc --noEmit && pnpm lint</p>
                    <p className="pl-4 text-neutral-400">→ Verified 84 files in 420ms (0 type errors, 0 lint warnings)</p>

                    <p className="text-cyan-300">$ docker compose up -d --build</p>
                    <p className="pl-4 text-neutral-400">→ Container postgres:16-alpine [healthy] port 5432</p>
                    <p className="pl-4 text-neutral-400">→ Container redis:7-alpine [healthy] port 6379</p>
                    <p className="pl-4 text-neutral-400">→ Container api-gateway [ready] port 8080</p>

                    <p className="text-cyan-300">$ curl -I https://createqrcode.in/health</p>
                    <p className="pl-4 text-emerald-400">HTTP/2 200 OK · latency: 7.8ms · region: BOM1</p>
                  </div>

                  <p className="animate-pulse text-cyan-300">▋</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side Bento Deck (lg:col-span-4): Engineer Profile & Key Telemetry */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          {/* Card 1: Apple-Grade Engineer Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#090a0f]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/20 bg-neutral-900 shadow-md">
                <Image
                  src={content.hero.imageSrc}
                  alt={content.hero.imageAlt}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-lg font-semibold tracking-tight text-white">
                    {content.hero.firstName} {content.hero.lastName}
                  </h4>
                  <BadgeCheck className="h-4 w-4 text-cyan-400" />
                </div>
                <p className="font-mono text-xs text-neutral-400">Lead Fullstack Developer</p>
                <p className="text-[11px] text-neutral-500">Microace Software · India</p>
              </div>
            </div>

            {/* Quick HackerRank verified badge */}
            <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                  <BadgeCheck className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-xs font-medium text-emerald-200">HackerRank Certified</p>
                  <p className="text-[10px] text-emerald-400/80">Software Engineer · 2026</p>
                </div>
              </div>
              <a
                href="https://www.hackerrank.com/certificates/iframe/db1cfdf0bbf4"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-400 transition hover:text-white"
                aria-label="View HackerRank Certificate"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Quick Connect Links */}
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Direct Channels
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/nirupampal"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nirupam-pal-0916a721b/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a
                  href="mailto:nirupampaldev@gmail.com"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Email Nirupam"
                >
                  <Mail className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Pulse Production Telemetry Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 rounded-[2rem] border border-white/[0.12] bg-[#090a0f]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                Pulse Telemetry
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Production
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-2xl font-bold tracking-tight text-white">3+</p>
                <p className="mt-0.5 text-xs text-neutral-400">Years Experience</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-2xl font-bold tracking-tight text-white">20+</p>
                <p className="mt-0.5 text-xs text-neutral-400">Deployed Apps</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-2xl font-bold tracking-tight text-white">100%</p>
                <p className="mt-0.5 text-xs text-neutral-400">Delivery Rate</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-2xl font-bold tracking-tight text-white">&lt;10ms</p>
                <p className="mt-0.5 text-xs text-neutral-400">Target Latency</p>
              </div>
            </div>

            {/* Core Tech stack badges */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["Next.js", "React 19", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Redis"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-neutral-300"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
