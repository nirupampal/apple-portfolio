"use client";

import { useEffect, useState } from "react";

import {
  defaultPortfolioContent,
  type PortfolioContent,
} from "@/lib/portfolio-content";
import { subscribeToPortfolioContent } from "@/lib/portfolio-store";

export function usePortfolioContent() {
  const [content, setContent] = useState<PortfolioContent>(defaultPortfolioContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToPortfolioContent(
      (nextContent) => {
        setContent(nextContent);
        setIsLoading(false);
      },
      (nextError) => {
        setError(nextError.message);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { content, isLoading, error };
}
