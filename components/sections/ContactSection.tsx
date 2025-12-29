"use client";

import React from "react";
import { motion } from "framer-motion";

const contactMethods = [
  {
    id: "01",
    label: "Email",
    value: "nirupampaldev@gmail.com",
    href: "mailto:nirupampaldev@gmail.com",
    description: "For project inquiries & collaborations",
  },
  {
    id: "02",
    label: "LinkedIn",
    value: "Nirupam Pal",
    href: "https://www.linkedin.com/in/nirupam-pal-0916a721b/",
    description: "Professional network & updates",
  },
  {
    id: "03",
    label: "GitHub",
    value: "@nirupampal",
    href: "https://github.com/nirupampal",
    description: "Open source & code samples",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-neutral-950 text-neutral-50 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-neutral-800" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-neutral-800" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-neutral-800" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-neutral-800" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-xs tracking-[0.4em] text-neutral-500 uppercase">
            05 — Contact
          </span>
          <div className="mt-4 flex items-end gap-8">
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tight">
              Let's Talk
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden md:block flex-1 h-px bg-neutral-800 mb-4"
            />
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed max-w-lg">
              Have a project in mind? I'm always open to discussing new
              opportunities, creative ideas, or potential collaborations.
            </p>

            <motion.a
              href="mailto:nirupampaldev@gmail.com"
              className="group inline-flex items-center gap-4 text-lg font-light"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-neutral-50">Start a conversation</span>
              <span className="w-12 h-px bg-neutral-50 group-hover:w-20 transition-all duration-300" />
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>

            {/* Availability indicator */}
            <div className="pt-8 border-t border-neutral-800">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-sm text-neutral-400">
                  Currently available for new projects
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right column - Contact methods */}
          <div className="space-y-0">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.id}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group block py-8 border-b border-neutral-800 first:border-t hover:bg-neutral-900/50 -mx-4 px-4 transition-colors duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-6">
                    <span className="text-xs text-neutral-600 font-mono mt-1">
                      {method.id}
                    </span>
                    <div>
                      <span className="text-xs tracking-[0.3em] text-neutral-500 uppercase block mb-2">
                        {method.label}
                      </span>
                      <span className="text-xl font-light text-neutral-50 group-hover:text-white transition-colors">
                        {method.value}
                      </span>
                      <p className="text-sm text-neutral-600 mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-neutral-600 group-hover:text-neutral-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom info bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-32 pt-8 border-t border-neutral-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
            <span>Based in Kolkata, India</span>
            <span>© {new Date().getFullYear()} Nirupam Pal</span>
            <span>Open to Remote Work</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
