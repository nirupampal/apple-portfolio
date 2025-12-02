"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  type: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Fullstack Next.js store with Stripe payments, inventory management, and optimized performance for scale.",
    image: "/e-commerce.png", // replace with your asset
    link: "#",
    type: "Fullstack",
  },
  {
    title: "EdTech Website",
    description: "Interactive online learning platform with teacher dashboards, student progress tracking, and live classes.",
    image: "/edtech.webp",
    link: "#",
    type: "EdTech",
  },
  {
    title: "Realtime Chat Application",
    description: "Socket.IO-powered chat with presence, typing indicators, and a robust Node.js/Express API backend.",
    image: "/chat.png",
    link: "#",
    type: "Realtime",
  },
  {
    title: "Weather App",
    description: "A responsive weather dashboard built with React, consuming external weather APIs and providing forecasts.",
    image: "/weather.png",
    link: "#",
    type: "Frontend",
  }];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ProjectCard: React.FC<Project> = ({ title, description, image, link, type }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl bg-white dark:bg-[#0b0b0b] shadow-md hover:shadow-2xl transition-shadow duration-400 will-change-transform"
      whileHover={{ translateY: -8 }}
      whileTap={{ translateY: -2 }}
      aria-label={`Open project ${title}`}
    >
      <div className="relative h-64 md:h-72 lg:h-64 overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-gray-900">
        {/* Image with subtle scale on hover */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
          priority={false}
        />

        {/* Soft overlay to emulate Apple's tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-transparent pointer-events-none" />

        {/* Badge */}
        <span className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/70 text-white text-xs font-medium px-3 py-1 backdrop-blur-sm">
          {type}
        </span>
      </div>

      <div className="p-6 md:p-7 lg:p-6 text-left">
        <h3 className="text-2xl md:text-2xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:underline">
          {title}
        </h3>
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.a>
  );
};

export default function WorksSection() {
  return (
    <section id="works" className="py-24 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Works.</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A selection of my best projects, focusing on modern stacks and user experience.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {projects.map((project, idx) => (
            <motion.div key={idx} variants={cardVariants} className="rounded-2xl overflow-hidden">
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="https://github.com/nirupampal"
            target="_blank"
            className="inline-flex items-center gap-3 text-lg font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors duration-200"
            rel="noopener noreferrer"
          >
            See all repositories on GitHub &rarr;
          </Link>
        </div>
      </div>

      {/* subtle bottom divider like Apple */}
      <div className="mt-16 border-t border-gray-100 dark:border-gray-800" />

      {/* Local styles for micro-interactions */}
      <style jsx>{`
        a[group] { text-decoration: none; }
        /* Add a tiny focus ring for accessibility */
        a:focus {
          outline: 4px solid rgba(59,130,246,0.12);
          outline-offset: 4px;
        }
      `}</style>
    </section>
  );
}
