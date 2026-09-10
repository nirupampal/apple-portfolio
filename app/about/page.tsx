import type { Metadata } from "next";

import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About | Nirupam Pal",
  description: "Learn about Nirupam Pal — Lead Fullstack Developer specializing in React, Next.js, Node.js. Explore experience, achievements, and tech stack.",
};

export default function About() {
  return <AboutPage />;
}
