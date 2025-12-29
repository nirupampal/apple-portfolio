"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import Head from "next/head";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* SEO Metadata for Footer */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Person",
              name: "Nirupam Pal",
              url: "https://nirupampal.vercel.app",
              sameAs: [
                "https://github.com/nirupampal",
                "https://www.linkedin.com/in/nirupam-pal-0916a721b/",
              ],
            }),
          }}
        />
      </Head>

      <footer
        className="py-10 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 
                   text-sm text-gray-500 dark:text-gray-400"
      >
        {/* Container */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto px-6 text-center"
        >
          {/* Animated Social Icons */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.12 },
              },
            }}
            className="flex justify-center space-x-6 mb-6"
          >
            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/nirupam-pal-0916a721b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.15 }}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 
                         transition-colors"
            >
              <FaLinkedin className="w-6 h-6" />
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/nirupampal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.15 }}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 
                         transition-colors"
            >
              <FaGithub className="w-6 h-6" />
            </motion.a>
          </motion.div>

          {/* Footer Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xs text-gray-600 dark:text-gray-400"
          >
            &copy; {year} <span className="font-semibold text-gray-900 dark:text-gray-100">Nirupam Pal</span>.  
            All Rights Reserved.
          </motion.p>

          {/* Inspiration */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-xs mt-1"
          >
            Design inspired by Apple Inc.
          </motion.p>

          {/* Enhanced Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="flex justify-center gap-6 mt-6 text-xs flex-wrap"
          >
            <a
              href="#home"
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              About Me
            </a>
            <a
              href="#skills"
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Skills
            </a>
            <a
              href="#works"
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Contact
            </a>
          </motion.div>
        </motion.div>
      </footer>
    </>
  );
}
