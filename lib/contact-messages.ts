import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
  updateDoc,
} from "firebase/firestore";

import { CONTACT_MESSAGES_COLLECTION, db } from "@/firebase";

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

const messagesCollection = collection(db, CONTACT_MESSAGES_COLLECTION);

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

  if (message.name.length > 100 || message.email.length > 160 || message.subject.length > 160 || message.message.length > 5000) {
    throw new Error("One or more fields are too long.");
  }

  await addDoc(messagesCollection, {
    ...message,
    status: "unread" satisfies ContactMessageStatus,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToContactMessages(
  callback: (messages: ContactMessage[]) => void,
  onError?: (error: Error) => void,
) {
  const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"));

  return onSnapshot(
    messagesQuery,
    (snapshot) => {
      callback(
        snapshot.docs.map((snapshotDoc) => {
          const data = snapshotDoc.data() as {
            name?: string;
            email?: string;
            subject?: string;
            message?: string;
            status?: ContactMessageStatus;
            createdAt?: Timestamp | null;
          };

          return {
            id: snapshotDoc.id,
            name: data.name ?? "Unknown sender",
            email: data.email ?? "",
            subject: data.subject ?? "No subject",
            message: data.message ?? "",
            status: data.status === "read" ? "read" : "unread",
            createdAt: data.createdAt?.toDate() ?? null,
          };
        }),
      );
    },
    (error) => onError?.(error),
  );
}

export async function setContactMessageStatus(id: string, status: ContactMessageStatus) {
  await updateDoc(doc(db, CONTACT_MESSAGES_COLLECTION, id), { status });
}

export async function deleteContactMessage(id: string) {
  await deleteDoc(doc(db, CONTACT_MESSAGES_COLLECTION, id));
}
