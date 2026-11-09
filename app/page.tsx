import type { Metadata } from "next";
import PortfolioPageClient from "@/components/PortfolioPageClient";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return <PortfolioPageClient />;
}
