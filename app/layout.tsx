import type { Metadata } from "next";
import "./globals.css";




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
      <body
      >
        {children}
      </body>
    </html>
  );
}
