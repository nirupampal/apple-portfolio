"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

import { submitContactMessage } from "@/lib/contact-messages";
import { reveal } from "@/components/shared/SectionHeading";
import { motion } from "motion/react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [lastSubmittedAt, setLastSubmittedAt] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("website") ?? "").trim()) {
      form.reset();
      setStatus("success");
      setFeedback("Thanks — your message has been received.");
      return;
    }

    if (Date.now() - lastSubmittedAt < 10_000) {
      setStatus("error");
      setFeedback("Please wait a few seconds before sending another message.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      await submitContactMessage({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        subject: String(data.get("subject") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setLastSubmittedAt(Date.now());
      setStatus("success");
      setFeedback("Message sent. I'll get back to you soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error && !error.message.toLowerCase().includes("supabase")
          ? error.message
          : "Could not send your message right now. Please try again.",
      );
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-[#e5e5e5] bg-[#f8f8f8] px-4 py-3.5 text-sm text-[#222222] outline-none transition placeholder:text-[#b0b0b0] focus:border-[#222222] focus:ring-1 focus:ring-[#222222]";

  return (
    <motion.div {...reveal} className="mt-14 md:mt-20">
      <div className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white">
        <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
          {/* Left Info Panel */}
          <div className="border-b border-[#e5e5e5] bg-[#f8f8f8] p-8 md:p-10 lg:border-b-0 lg:border-r">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7b7b7b]">Direct message</p>
            <h3 className="mt-5 max-w-sm font-display text-2xl leading-snug tracking-[-0.02em] text-[#222222] md:text-3xl">
              Tell me what you&apos;re building.
            </h3>
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-[#7b7b7b]">
              Share the project, problem, or opportunity. Your message goes directly into my inbox.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 md:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7b7b7b]">Name</span>
                <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={`mt-2 ${fieldClass}`} />
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7b7b7b]">Email</span>
                <input name="email" type="email" required maxLength={160} autoComplete="email" placeholder="you@company.com" className={`mt-2 ${fieldClass}`} />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7b7b7b]">Subject</span>
                <input name="subject" required maxLength={160} placeholder="Project collaboration" className={`mt-2 ${fieldClass}`} />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7b7b7b]">Message</span>
                <textarea name="message" required maxLength={5000} rows={5} placeholder="A few details about your project..." className={`mt-2 ${fieldClass} resize-none leading-6`} />
              </label>
            </div>

            <label className="absolute -left-[9999px]" aria-hidden="true">
              Website <input name="website" tabIndex={-1} autoComplete="off" />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div aria-live="polite" className="min-h-5">
                {feedback ? (
                  <p className={`flex items-center gap-2 text-xs ${status === "success" ? "text-emerald-600" : "text-red-500"}`}>
                    {status === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    {feedback}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#222222] px-6 text-sm font-medium text-white transition hover:bg-[#333333] disabled:cursor-wait disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send message"}
                <Send className={`h-3.5 w-3.5 transition-transform ${status === "sending" ? "animate-pulse" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
