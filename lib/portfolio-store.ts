import { supabase, SITE_CONTENT_TABLE } from "@/lib/supabase";
import {
  defaultPortfolioContent,
  developerTerminalPreset,
  type PortfolioContent,
} from "@/lib/portfolio-content";

const DOCUMENT_KEY = "portfolio";

function mergePortfolioContent(data: Partial<PortfolioContent>): PortfolioContent {
  const containsLegacyDemoCommand = data.terminal?.commands?.some(
    (item) => item.command === "git log --impact",
  );

  return {
    hero: { ...defaultPortfolioContent.hero, ...data.hero },
    terminal: containsLegacyDemoCommand
      ? developerTerminalPreset
      : { ...defaultPortfolioContent.terminal, ...data.terminal },
    about: { ...defaultPortfolioContent.about, ...data.about },
    works: { ...defaultPortfolioContent.works, ...data.works },
    skills: { ...defaultPortfolioContent.skills, ...data.skills },
    achievements: { ...defaultPortfolioContent.achievements, ...data.achievements },
    blog: { ...defaultPortfolioContent.blog, ...data.blog },
    contact: { ...defaultPortfolioContent.contact, ...data.contact },
  };
}

export function subscribeToPortfolioContent(
  callback: (content: PortfolioContent) => void,
  onError?: (error: Error) => void,
) {
  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from(SITE_CONTENT_TABLE)
        .select("content")
        .eq("key", DOCUMENT_KEY)
        .maybeSingle();

      if (error || !data) {
        callback(defaultPortfolioContent);
        return;
      }

      callback(mergePortfolioContent(data.content as Partial<PortfolioContent>));
    } catch (err) {
      callback(defaultPortfolioContent);
      onError?.(err instanceof Error ? err : new Error(String(err)));
    }
  };

  fetchContent();

  const channel = supabase
    .channel("site_content_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: SITE_CONTENT_TABLE },
      () => {
        fetchContent();
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function savePortfolioContent(content: PortfolioContent) {
  const { error } = await supabase.from(SITE_CONTENT_TABLE).upsert({
    key: DOCUMENT_KEY,
    content,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Failed to save portfolio content to Supabase:", error);
    throw error;
  }
}
