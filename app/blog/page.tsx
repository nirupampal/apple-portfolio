import type { Metadata } from "next";

import { BlogIndexPage } from "@/components/BlogPages";

export const metadata: Metadata = {
  title: "Writing | Nirupam Pal",
  description: "Notes on fullstack engineering, product craft, and building modern web experiences.",
};

export default function BlogPage() {
  return <BlogIndexPage />;
}
