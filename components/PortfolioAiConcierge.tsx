"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, LoaderCircle, Send, Sparkles, UserRound, X } from "lucide-react";

import { BackgroundGradient } from "@/components/ui/background-gradient";
import { askPortfolioAi, type PortfolioChatTurn } from "@/lib/portfolio-ai";

const INITIAL_MESSAGE: PortfolioChatTurn = {
  role: "assistant",
  text: "Hi — I’m Nirupam’s AI portfolio concierge. Ask me about his projects, experience, technical stack, achievements, or availability.",
};

const SUGGESTIONS = [
  "What are Nirupam’s strongest skills?",
  "Which projects should I explore?",
  "Is Nirupam available for work?",
];

function friendlyError(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message.includes("resource-exhausted")) return "Too many questions right now. Please wait a minute and try again.";
  if (message.includes("unavailable") || message.includes("internal")) return "The AI concierge is temporarily unavailable. Please try again shortly.";
  return message || "I couldn’t answer that right now. Please try again.";
}

export function PortfolioAiConcierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<PortfolioChatTurn[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  async function sendMessage(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const history = messages.slice(1);
    setMessages((current) => [...current, { role: "user", text: question }]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const answer = await askPortfolioAi(question, history);
      setMessages((current) => [...current, { role: "assistant", text: answer }]);
    } catch (nextError) {
      setError(friendlyError(nextError));
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-[115] mx-auto max-w-[430px] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[430px]"
          >
            <BackgroundGradient containerClassName="rounded-[1.8rem] p-px" className="overflow-hidden rounded-[calc(1.8rem-1px)] bg-[#090a0d] shadow-[0_35px_120px_rgba(0,0,0,0.7)]">
              <section aria-label="Ask Nirupam AI concierge" className="flex h-[min(680px,calc(100svh-6rem))] flex-col">
                <header className="relative overflow-hidden border-b border-white/[0.08] px-5 py-4">
                  <div className="absolute -right-14 -top-16 h-36 w-36 rounded-full bg-violet-500/20 blur-[45px]" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">Ask Nirupam</p>
                        <p className="mt-1 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.17em] text-neutral-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_9px_rgba(74,222,128,0.8)]" /> AI portfolio concierge
                        </p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setOpen(false)} aria-label="Close AI concierge" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-neutral-500 transition hover:bg-white/[0.05] hover:text-white">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </header>

                <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
                  {messages.map((message, index) => (
                    <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      {message.role === "assistant" ? <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-200"><Bot className="h-3.5 w-3.5" /></span> : null}
                      <p className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-md bg-white text-black" : "rounded-bl-md border border-white/[0.08] bg-white/[0.035] text-neutral-300"}`}>
                        {message.text}
                      </p>
                      {message.role === "user" ? <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200"><UserRound className="h-3.5 w-3.5" /></span> : null}
                    </div>
                  ))}

                  {messages.length === 1 ? (
                    <div className="flex flex-wrap gap-2 pl-10">
                      {SUGGESTIONS.map((suggestion) => (
                        <button key={suggestion} type="button" onClick={() => void sendMessage(suggestion)} className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-left text-[10px] text-neutral-500 transition hover:border-cyan-300/20 hover:text-cyan-200">
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {loading ? (
                    <div className="flex items-center gap-3 text-xs text-neutral-600">
                      <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-violet-400/10 text-violet-200"><LoaderCircle className="h-3.5 w-3.5 animate-spin" /></span>
                      Reading the portfolio…
                    </div>
                  ) : null}
                  {error ? <p className="ml-10 rounded-xl border border-red-500/15 bg-red-500/[0.06] px-3 py-2 text-xs leading-5 text-red-300">{error}</p> : null}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={submit} className="border-t border-white/[0.08] p-3">
                  <div className="flex items-end gap-2 rounded-2xl border border-white/[0.09] bg-black/30 p-2 transition focus-within:border-cyan-300/30">
                    <textarea
                      value={input}
                      onChange={(event) => setInput(event.target.value.slice(0, 800))}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          void sendMessage(input);
                        }
                      }}
                      rows={1}
                      maxLength={800}
                      placeholder="Ask about projects, skills, experience…"
                      className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-5 text-white outline-none placeholder:text-neutral-700"
                    />
                    <button type="submit" disabled={loading || !input.trim()} aria-label="Send question" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black transition hover:bg-cyan-200 disabled:opacity-30">
                      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="mt-2 text-center font-mono text-[7px] uppercase tracking-[0.15em] text-neutral-800">AI answers are grounded in this portfolio</p>
                </form>
              </section>
            </BackgroundGradient>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!open ? (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.45 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
          className="fixed bottom-5 right-5 z-[95] flex h-12 items-center gap-2 rounded-full border border-white/10 bg-[#0b0c10]/85 px-4 text-xs font-medium text-white shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
        >
          <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-500/15 via-cyan-300/10 to-blue-500/15" />
          <Sparkles className="h-4 w-4 text-cyan-200" />
          <span>Ask AI</span>
        </motion.button>
      ) : null}
    </>
  );
}
