import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.inirupampal.in"),
  title: "Nirupam Pal | Fullstack Developer",
  description: "Nirupam Pal, Full Stack Developer building web and mobile applications. Taste N Bite POS and ordering for 200+ franchises, restaurant software and BuildNerd products.",
  keywords: ["Fullstack Developer", "React", "Next.js", "Node.js", "Web Developer", "Nirupam Pal"],
  authors: [{ name: "Nirupam Pal" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Nirupam Pal | Fullstack Developer",
    description: "Full Stack Developer crafting modern digital experiences",
    type: "website",
    url: "https://www.inirupampal.in",
    images: [
      {
        url: "https://www.inirupampal.in/nirupam-pal.png",
        width: 1254,
        height: 1254,
        alt: "Nirupam Pal Portfolio",
      },
    ],
    siteName: "Nirupam Pal Portfolio",
  },
};

const siteUrl = "https://www.inirupampal.in";
const siteDescription = metadata.description as string;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nirupam Pal",
  "url": siteUrl,
  "sameAs": [
    "https://github.com/nirupampal",
    "https://linkedin.com/in/nirupampal",
    "https://x.com/nirupampaldev"
  ],
  "jobTitle": "Full Stack Developer",
  "description": siteDescription
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className={`${plusJakartaSans.className} min-h-screen bg-white text-[#111111] antialiased selection:bg-neutral-900 selection:text-white`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
