"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: string; // e.g., "16/9"
}

function isRemoteImage(src: string) {
    return src.startsWith("http://") || src.startsWith("https://");
}

export default function ParallaxImage({
    src,
    alt,
    className = "",
    aspectRatio = "4/3"
}: ParallaxImageProps) {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Parallax effect: Image moves slightly faster than the container
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    // Smooth out the motion
    const smoothY = useSpring(y, { damping: 15, stiffness: 100 });

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden ${className}`}
            style={{ aspectRatio }}
        >
            <motion.div
                style={{ y: smoothY, scale }}
                className="absolute inset-0 h-[130%] w-full -top-[15%]"
            >
                {isRemoteImage(src) ? (
                    // Admin-managed project images can use full URLs from any trusted image host.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover"
                    />
                )}
            </motion.div>
        </div>
    );
}
