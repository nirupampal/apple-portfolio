import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import SmoothScroll from "@/components/ui/SmoothScroll";

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
    url: "https://inirupampal.in",
    images: [
      {
        url: "https://inirupampal.in/apple-og-image.png",
        width: 1200,
        height: 630,
        alt: "Nirupam Pal Portfolio",
      },
    ],
    siteName: "Nirupam Pal Portfolio",
  },
};

const siteUrl = "https://inirupampal.in";
const siteDescription = metadata.description as string;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nirupam Pal",
  "url": siteUrl,
  "sameAs": [
    "https://github.com/nirupampal",
    "https://linkedin.com/in/nirupampal"
  ],
  "jobTitle": "Lead Fullstack Developer",
  "description": siteDescription
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#050608] text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
