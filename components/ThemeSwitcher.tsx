"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-10 h-10 flex items-center justify-center rounded-full 
                 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 
                 transition-all duration-300"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 40, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            <IoSunny className="w-6 h-6 text-yellow-400" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 40, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -40, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            <IoMoon className="w-6 h-6 text-gray-900 dark:text-gray-100" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
