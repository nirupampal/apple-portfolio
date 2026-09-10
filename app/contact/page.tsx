import type { Metadata } from "next";

import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Nirupam Pal",
  description: "Get in touch with Nirupam Pal for freelance projects, full-time opportunities, or collaborations. Send a direct message or connect on social media.",
};

export default function Contact() {
  return <ContactPage />;
}
