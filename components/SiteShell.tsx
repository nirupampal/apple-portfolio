"use client";

import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollBeam, MobileScrollRail } from "@/components/shared/ScrollBeam";
import { PortfolioAiConcierge } from "@/components/PortfolioAiConcierge";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-clip bg-white text-[#222222] selection:bg-[#222222] selection:text-white">
      <ScrollBeam />
      <MobileScrollRail />
      <PortfolioAiConcierge />
      <SiteNavigation />
      {children}
      <SiteFooter />
    </div>
  );
}
