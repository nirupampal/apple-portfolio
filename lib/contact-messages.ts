import { supabase, CONTACT_MESSAGES_TABLE } from "@/lib/supabase";

export type ContactMessageStatus = "unread" | "read";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  createdAt: Date | null;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function normalizeInput(input: ContactMessageInput): ContactMessageInput {
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    subject: input.subject.trim(),
    message: input.message.trim(),
  };
}

export async function submitContactMessage(input: ContactMessageInput) {
  const message = normalizeInput(input);

  if (!message.name || !message.email || !message.subject || !message.message) {
    throw new Error("Please complete every field.");
  }

  if (
    message.name.length > 100 ||
    message.email.length > 160 ||
    message.subject.length > 160 ||
    message.message.length > 5000
  ) {
    throw new Error("One or more fields are too long.");
  }

  const { error } = await supabase.from(CONTACT_MESSAGES_TABLE).insert([
    {
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      status: "unread",
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Supabase contact insert error:", error);
    throw new Error(error.message || "Could not save message to Supabase.");
  }
}

export function subscribeToContactMessages(
  callback: (messages: ContactMessage[]) => void,
  onError?: (error: Error) => void,
) {
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from(CONTACT_MESSAGES_TABLE)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        callback(
          data.map((row) => ({
            id: String(row.id),
            name: row.name ?? "Unknown sender",
            email: row.email ?? "",
            subject: row.subject ?? "No subject",
            message: row.message ?? "",
            status: row.status === "read" ? "read" : "unread",
            createdAt: row.created_at ? new Date(row.created_at) : null,
          })),
        );
      }
    } catch (err) {
      onError?.(err instanceof Error ? err : new Error(String(err)));
    }
  };

  fetchMessages();

  const channel = supabase
    .channel("contact_messages_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: CONTACT_MESSAGES_TABLE },
      () => {
        fetchMessages();
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function setContactMessageStatus(id: string, status: ContactMessageStatus) {
  const { error } = await supabase
    .from(CONTACT_MESSAGES_TABLE)
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteContactMessage(id: string) {
  const { error } = await supabase
    .from(CONTACT_MESSAGES_TABLE)
    .delete()
    .eq("id", id);
  if (error) throw error;
}
