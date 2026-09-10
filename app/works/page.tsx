import type { Metadata } from "next";

import WorksPage from "@/components/pages/WorksPage";

export const metadata: Metadata = {
  title: "Works | Nirupam Pal",
  description: "Selected works and projects by Nirupam Pal — fullstack developer building scalable web applications with React, Next.js, and Node.js.",
};

export default function Works() {
  return <WorksPage />;
}
