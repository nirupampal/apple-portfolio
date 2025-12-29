import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import PageLoader from "@/components/PageLoader";

export const metadata: Metadata = {
  title: "Nirupam Pal",
  description: "Nirupam Pal -Fullstack Developer",
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
    <PageLoader />
    {children}
  </ThemeProvider>
</body>

    </html>
  );
}
