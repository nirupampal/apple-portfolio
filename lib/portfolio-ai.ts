export interface PortfolioChatTurn {
  role: "user" | "assistant";
  text: string;
}

interface AskPortfolioResponse {
  answer?: string;
  model?: string;
  error?: string;
}

const PORTFOLIO_AI_ENDPOINT =
  "https://nirupam-portfolio-ai.nirupampal.workers.dev/ask";

export async function askPortfolioAi(message: string, history: PortfolioChatTurn[]) {
  const response = await fetch(PORTFOLIO_AI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history: history.slice(-6) }),
  });
  const result = (await response.json()) as AskPortfolioResponse;

  if (!response.ok) {
    throw new Error(result.error || `The AI concierge returned HTTP ${response.status}.`);
  }
  if (!result.answer) throw new Error("The assistant returned an empty response.");
  return result.answer;
}
