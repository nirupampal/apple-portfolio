import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import PageLoader from "@/components/PageLoader";
import CursorEffect from "@/components/CursorEffect";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "Nirupam Pal | Fullstack Developer",
  description: "Nirupam Pal - Lead Fullstack Developer specializing in React, Next.js, Node.js, and scalable web applications. Building modern digital experiences.",
  keywords: ["Fullstack Developer", "React", "Next.js", "Node.js", "Web Developer", "Nirupam Pal"],
  authors: [{ name: "Nirupam Pal" }],
  icons: {
    icon: "/image.png",
  },
  openGraph: {
    title: "Nirupam Pal | Fullstack Developer",
    description: "Lead Fullstack Developer crafting modern digital experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body>
  <ThemeProvider>
    <ScrollProgress />
    <CursorEffect />
    <PageLoader />
    {children}
  </ThemeProvider>
</body>

    </html>
  );
}
