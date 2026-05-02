import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

import { db, PORTFOLIO_COLLECTION, PORTFOLIO_DOCUMENT } from "@/firebase";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/portfolio-content";

const portfolioRef = doc(db, PORTFOLIO_COLLECTION, PORTFOLIO_DOCUMENT);

function mergePortfolioContent(data: Partial<PortfolioContent>): PortfolioContent {
  return {
    hero: { ...defaultPortfolioContent.hero, ...data.hero },
    terminal: { ...defaultPortfolioContent.terminal, ...data.terminal },
    about: { ...defaultPortfolioContent.about, ...data.about },
    works: { ...defaultPortfolioContent.works, ...data.works },
    skills: { ...defaultPortfolioContent.skills, ...data.skills },
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
