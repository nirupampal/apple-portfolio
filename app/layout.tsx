import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";




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
    {children}
  </ThemeProvider>
</body>

    </html>
  );
}
