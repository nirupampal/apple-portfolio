import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

import { db, PORTFOLIO_COLLECTION, PORTFOLIO_DOCUMENT } from "@/firebase";
import {
  defaultPortfolioContent,
  developerTerminalPreset,
  type PortfolioContent,
} from "@/lib/portfolio-content";

const portfolioRef = doc(db, PORTFOLIO_COLLECTION, PORTFOLIO_DOCUMENT);

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
  return onSnapshot(
    portfolioRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback(defaultPortfolioContent);
        return;
      }

      callback(mergePortfolioContent(snapshot.data() as Partial<PortfolioContent>));
    },
    (error) => onError?.(error),
  );
}

export async function savePortfolioContent(content: PortfolioContent) {
  await setDoc(
    portfolioRef,
    {
      ...content,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}
