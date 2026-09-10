"use client";

import { Github, Linkedin, Mail, FileText } from "lucide-react";

export function SocialIcon({ label }: { label: string }) {
  const lowered = label.toLowerCase();
  if (lowered.includes("github")) return <Github className="h-5 w-5" />;
  if (lowered.includes("linkedin")) return <Linkedin className="h-5 w-5" />;
  if (lowered.includes("mail") || lowered.includes("email")) return <Mail className="h-5 w-5" />;
  return <FileText className="h-5 w-5" />;
}
