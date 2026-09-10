"use client";

import { motion } from "motion/react";

const reveal = {
  "data-scroll-reveal": "true",
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px 220px 0px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export function SectionHeading({
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
    <motion.div {...reveal}>
      <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-[#7b7b7b]">
        <span className="text-[#222222]">●</span> {eyebrow}
      </p>
      <h2 className="mt-5 max-w-4xl font-display text-4xl leading-[1.1] tracking-[-0.02em] text-[#222222] sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#7b7b7b]">
          {copy}
        </p>
      ) : null}
    </motion.div>
  );
}

export { reveal };
