"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollBeam() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-[#222222]"
      style={{ scaleX }}
    />
  );
}

export function MobileScrollRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-24 right-2 top-24 z-[80] w-[2px] overflow-hidden rounded-full bg-[#e5e5e5] md:hidden"
    >
      <motion.div
        className="h-full origin-top rounded-full bg-[#222222]"
        style={{ scaleY }}
      />
    </div>
  );
}
