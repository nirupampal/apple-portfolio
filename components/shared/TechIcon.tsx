"use client";

import React from "react";
import { FaAws } from "react-icons/fa6";
import {
  SiCss,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiRazorpay,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiWebrtc,
} from "react-icons/si";
import { Code2, Globe, Layers } from "lucide-react";

interface TechMeta {
  icon: React.ElementType;
  color: string;
  label: string;
}

const TECH_MAP: Record<string, TechMeta> = {
  react: { icon: SiReact, color: "#61DAFB", label: "React" },
  "react native": { icon: SiReact, color: "#61DAFB", label: "React Native" },
  nextjs: { icon: SiNextdotjs, color: "#ffffff", label: "Next.js" },
  "next.js": { icon: SiNextdotjs, color: "#ffffff", label: "Next.js" },
  typescript: { icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  ts: { icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  javascript: { icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
  js: { icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
  tailwindcss: { icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind CSS" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind CSS" },
  "tailwind css": { icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind CSS" },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E", label: "Node.js" },
  "node.js": { icon: SiNodedotjs, color: "#5FA04E", label: "Node.js" },
  node: { icon: SiNodedotjs, color: "#5FA04E", label: "Node.js" },
  express: { icon: SiExpress, color: "#ffffff", label: "Express" },
  "express.js": { icon: SiExpress, color: "#ffffff", label: "Express" },
  postgresql: { icon: SiPostgresql, color: "#4169E1", label: "PostgreSQL" },
  postgres: { icon: SiPostgresql, color: "#4169E1", label: "PostgreSQL" },
  mongodb: { icon: SiMongodb, color: "#47A248", label: "MongoDB" },
  stripe: { icon: SiStripe, color: "#635BFF", label: "Stripe" },
  razorpay: { icon: SiRazorpay, color: "#0284C7", label: "Razorpay" },
  webrtc: { icon: SiWebrtc, color: "#38BDF8", label: "WebRTC" },
  "socket.io": { icon: SiSocketdotio, color: "#ffffff", label: "Socket.io" },
  socketio: { icon: SiSocketdotio, color: "#ffffff", label: "Socket.io" },
  redis: { icon: SiRedis, color: "#DC382D", label: "Redis" },
  docker: { icon: SiDocker, color: "#2496ED", label: "Docker" },
  aws: { icon: FaAws, color: "#FF9900", label: "AWS" },
  firebase: { icon: SiFirebase, color: "#FFCA28", label: "Firebase" },
  supabase: { icon: SiSupabase, color: "#3ECF8E", label: "Supabase" },
  python: { icon: SiPython, color: "#3776AB", label: "Python" },
  graphql: { icon: SiGraphql, color: "#E10098", label: "GraphQL" },
  framer: { icon: SiFramer, color: "#0055FF", label: "Framer Motion" },
  "framer motion": { icon: SiFramer, color: "#0055FF", label: "Framer Motion" },
  css: { icon: SiCss, color: "#1572B6", label: "CSS" },
  css3: { icon: SiCss, color: "#1572B6", label: "CSS" },
  html: { icon: SiHtml5, color: "#E34F26", label: "HTML5" },
  html5: { icon: SiHtml5, color: "#E34F26", label: "HTML5" },
  git: { icon: SiGit, color: "#F05032", label: "Git" },
  github: { icon: SiGithub, color: "#ffffff", label: "GitHub" },
  vercel: { icon: SiVercel, color: "#ffffff", label: "Vercel" },
  api: { icon: Globe, color: "#38BDF8", label: "REST API" },
  rest: { icon: Layers, color: "#A855F7", label: "REST API" },
};

export function getTechMeta(name: string): TechMeta {
  const normalized = name.toLowerCase().trim().replace(/[^a-z0-9.]/g, "");
  const directMatch = TECH_MAP[name.toLowerCase().trim()] || TECH_MAP[normalized];
  if (directMatch) return directMatch;

  for (const [key, value] of Object.entries(TECH_MAP)) {
    if (name.toLowerCase().includes(key)) {
      return value;
    }
  }

  return { icon: Code2, color: "#94A3B8", label: name };
}

export function TechBadge({
  name,
  className = "",
  showLabel = true,
}: {
  name: string;
  className?: string;
  showLabel?: boolean;
}) {
  const meta = getTechMeta(name);
  const Icon = meta.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-mono text-neutral-200 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white ${className}`}
      title={meta.label}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: meta.color }} />
      {showLabel ? <span>{name}</span> : null}
    </span>
  );
}
