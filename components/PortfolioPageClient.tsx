"use client";

import PortfolioRedesign from "@/components/PortfolioRedesign";
import { usePortfolioContent } from "@/lib/use-portfolio-content";

export default function PortfolioPageClient() {
  const { content } = usePortfolioContent();

  return <PortfolioRedesign content={content} />;
}
