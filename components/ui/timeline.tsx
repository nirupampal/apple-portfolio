"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  eyebrow = "Experience",
  heading = "A timeline of work and learning.",
  description = "The roles, projects, and experiments that shaped how I build today.",
  className,
}: {
  data: TimelineEntry[];
  eyebrow?: string;
  heading?: string;
  description?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className={cn("w-full bg-transparent font-sans", className)}
      ref={containerRef}
    >
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 md:px-10 md:pb-14 md:pt-28">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">
          {eyebrow}
        </p>
        <h2 className="max-w-4xl text-4xl font-medium tracking-[-0.04em] text-white md:text-6xl">
          {heading}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400 md:text-base">
          {description}
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#07080a] md:left-3">
                <div className="h-3.5 w-3.5 rounded-full border border-cyan-300/40 bg-neutral-900 shadow-[0_0_20px_rgba(34,211,238,0.25)]" />
              </div>
              <h3 className="hidden text-xl font-medium tracking-[-0.04em] text-neutral-600 md:block md:pl-20 md:text-5xl">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="mb-4 block text-left text-2xl font-medium text-neutral-500 md:hidden">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-800 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-violet-500 via-cyan-400 to-transparent from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  );
};
