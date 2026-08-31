"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  Award,
  BookOpenText,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  Clock3,
  Code2,
  ExternalLink,
  FolderKanban,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  LoaderCircle,
  LogIn,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  RotateCcw,
  Save,
  TerminalSquare,
  Trash2,
  UploadCloud,
  UserRound,
  X,
} from "lucide-react";

import { Spotlight } from "@/components/ui/spotlight-new";
import { ADMIN_EMAIL, auth } from "@/firebase";
import {
  deleteContactMessage,
  setContactMessageStatus,
  subscribeToContactMessages,
  type ContactMessage,
} from "@/lib/contact-messages";
import {
  developerTerminalPreset,
  type AchievementItem,
  type BlogPost,
  type ContactLink,
  type ExperienceItem,
  type PortfolioContent,
  type ProjectItem,
  type SkillCategory,
  type SkillItem,
  type StatItem,
  type TerminalCommand,
  type TerminalMetric,
} from "@/lib/portfolio-content";
import { savePortfolioContent } from "@/lib/portfolio-store";
import { uploadPortfolioImage } from "@/lib/upload-media";
import { usePortfolioContent } from "@/lib/use-portfolio-content";

type SectionId =
  | "hero"
  | "about"
  | "works"
  | "skills"
  | "terminal"
  | "achievements"
  | "blog"
  | "inbox"
  | "contact";

const NAV_ITEMS: { id: SectionId; label: string; icon: React.ElementType }[] = [
  { id: "hero", label: "Hero", icon: LayoutDashboard },
  { id: "about", label: "About", icon: UserRound },
  { id: "works", label: "Projects", icon: FolderKanban },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "terminal", label: "Console", icon: TerminalSquare },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "blog", label: "Blog", icon: BookOpenText },
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "contact", label: "Contact", icon: Mail },
];

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-700 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10";

function replaceAt<T>(items: T[], index: number, value: T) {
  return items.map((item, current) => (current === index ? value : item));
}

function removeAt<T>(items: T[], index: number) {
  return items.filter((_, current) => current !== index);
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const emptyExperience = (): ExperienceItem => ({
  id: makeId("experience"),
  title: "New role",
  company: "Company",
  date: "2026 — Present",
  description: "Describe the role, responsibility, and measurable impact.",
  tags: ["Fullstack"],
});

const emptyStat = (): StatItem => ({ value: 1, suffix: "+", label: "Metric" });

const emptyProject = (): ProjectItem => ({
  title: "New project",
  description: "Explain the product, problem, and result.",
  image: "/dashboard.png",
  link: "#",
  type: "Fullstack",
  year: new Date().getFullYear().toString(),
  tech: ["Next.js", "Firebase"],
});

const emptySkill = (): SkillItem => ({ name: "New skill", icon: "code" });

const emptyCategory = (): SkillCategory => ({
  id: makeId("category"),
  title: "New category",
  description: "Describe this capability group.",
  color: "#67e8f9",
  skills: [emptySkill()],
});

const emptyCommand = (): TerminalCommand => ({
  command: "npm run next",
  title: "New workflow",
  output: ["First result", "Second result"],
});

const emptyMetric = (): TerminalMetric => ({ value: "1+", label: "metric" });

const emptyAchievement = (): AchievementItem => ({
  id: makeId("achievement"),
  title: "New achievement",
  issuer: "Issuer",
  issuedOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
  description: "Explain what this achievement represents.",
  image: "/hacker-rank-software-engineer.png",
  verifyUrl: "#",
});

const emptyPost = (): BlogPost => {
  const id = makeId("post");
  return {
    id,
    slug: id,
    title: "New article",
    excerpt: "A concise summary that invites readers into the article.",
    coverImage: "/TechStack.png",
    publishedAt: new Date().toISOString().slice(0, 10),
    readTime: "5 min read",
    tags: ["Engineering"],
    content: "Start writing here.\n\n## A section heading\n\nAdd the article content in clear paragraphs.",
    published: false,
  };
};

const emptyLink = (): ContactLink => ({
  id: makeId("link"),
  label: "New link",
  value: "Display value",
  href: "#",
});

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} placeholder={placeholder} className={`${inputClass} resize-y leading-6`} />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={inputClass} />
      )}
      {hint ? <span className="block text-[11px] leading-5 text-neutral-600">{hint}</span> : null}
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <Field label={label} value={String(value)} type="number" onChange={(value) => onChange(Number(value))} />;
}

function ListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [pending, setPending] = useState("");

  function addItems(rawValue: string) {
    const candidates = rawValue
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (!candidates.length) return;

    const existing = new Set(value.map((item) => item.toLocaleLowerCase()));
    const additions = candidates.filter((item) => {
      const normalized = item.toLocaleLowerCase();
      if (existing.has(normalized)) return false;
      existing.add(normalized);
      return true;
    });

    if (additions.length) onChange([...value, ...additions]);
    setPending("");
  }

  function removeItem(index: number) {
    onChange(removeAt(value, index));
  }

  return (
    <label className="block space-y-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">{label}</span>
      <div className="flex min-h-14 flex-wrap items-center gap-2 rounded-xl border border-white/[0.08] bg-black/25 px-3 py-2.5 transition focus-within:border-cyan-300/50 focus-within:ring-2 focus-within:ring-cyan-300/10">
        {value.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/15 bg-cyan-300/[0.08] py-1.5 pl-3 pr-2 text-xs text-cyan-100">
            {item}
            <button
              type="button"
              onClick={() => removeItem(index)}
              aria-label={`Remove ${item}`}
              className="flex h-4 w-4 items-center justify-center rounded-full text-cyan-200/50 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={pending}
          onChange={(event) => setPending(event.target.value)}
          onKeyDown={(event) => {
            if ((event.key === "Enter" || event.key === ",") && !event.nativeEvent.isComposing) {
              event.preventDefault();
              addItems(pending);
            } else if (event.key === "Backspace" && !pending && value.length) {
              removeItem(value.length - 1);
            }
          }}
          onPaste={(event) => {
            const pasted = event.clipboardData.getData("text");
            if (pasted.includes(",") || pasted.includes("\n")) {
              event.preventDefault();
              addItems(pasted);
            }
          }}
          onBlur={() => addItems(pending)}
          placeholder={value.length ? "Add another…" : "Type an item and press Enter"}
          className="min-w-44 flex-1 bg-transparent px-1 py-1.5 text-sm text-white outline-none placeholder:text-neutral-700"
        />
      </div>
      <span className="block text-[11px] leading-5 text-neutral-600">Press Enter or comma to create a capsule. Backspace removes the last one.</span>
    </label>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)} className="flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-left">
      <span className="text-sm text-neutral-300">{label}</span>
      <span className={`relative h-6 w-11 rounded-full transition ${value ? "bg-cyan-300" : "bg-neutral-800"}`}>
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-black transition ${value ? "left-6" : "left-1"}`} />
      </span>
    </button>
  );
}

function ImageField({
  label,
  value,
  onChange,
  folder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file?: File) {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setError(null);
    try {
      const url = await uploadPortfolioImage(file, folder, setProgress);
      onChange(url);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">{label}</span>
      <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
        <div className="relative h-32 overflow-hidden rounded-xl border border-white/[0.08] bg-black/30">
          {value ? (
            // Images are admin-managed and can come from Firebase Storage.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-700"><ImageIcon className="h-6 w-6" /></div>
          )}
          {uploading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-xs text-white">
              <LoaderCircle className="mb-2 h-5 w-5 animate-spin" />{progress}%
            </div>
          ) : null}
        </div>
        <div className="space-y-3">
          <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="/image.png or https://..." className={inputClass} />
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 px-4 py-3 text-xs text-neutral-400 transition hover:border-cyan-300/40 hover:text-cyan-200">
            <UploadCloud className="h-4 w-4" />
            {uploading ? "Uploading…" : "Choose image"}
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                void handleFile(file);
              }}
              className="hidden"
            />
          </label>
          {error ? <p className="text-xs text-red-400">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}

function SectionIntro({ icon: Icon, eyebrow, title, copy }: { icon: React.ElementType; eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mb-8 flex items-start gap-4 border-b border-white/[0.07] pb-8">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] text-cyan-200"><Icon className="h-5 w-5" /></span>
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-300/70">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-medium tracking-[-0.035em] text-white md:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">{copy}</p>
      </div>
    </div>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

function EditorCard({ title, subtitle, onRemove, children }: { title: string; subtitle?: string; onRemove: () => void; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20">
      <div className="flex items-center gap-3 px-5 py-4">
        <button type="button" onClick={() => setOpen((value) => !value)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          {open ? <ChevronDown className="h-4 w-4 text-neutral-600" /> : <ChevronRight className="h-4 w-4 text-neutral-600" />}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{title}</p>
            {subtitle ? <p className="mt-1 truncate text-xs text-neutral-600">{subtitle}</p> : null}
          </div>
        </button>
        <button type="button" onClick={onRemove} aria-label={`Remove ${title}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-600 transition hover:bg-red-500/10 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
      </div>
      {open ? <div className="space-y-5 border-t border-white/[0.06] p-5">{children}</div> : null}
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-neutral-300 transition hover:border-cyan-300/35 hover:text-cyan-200"><Plus className="h-4 w-4" />{label}</button>;
}

function CollectionHeader({ title, count, addLabel, onAdd }: { title: string; count: number; addLabel: string; onAdd: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
      <div className="flex items-center gap-3"><h2 className="text-sm font-medium text-white">{title}</h2><span className="rounded-full bg-white/[0.05] px-2 py-0.5 font-mono text-[9px] text-neutral-500">{count}</span></div>
      <AddButton label={addLabel} onClick={onAdd} />
    </div>
  );
}

function StringListEditor({ items, onChange, label }: { items: string[]; onChange: (items: string[]) => void; label: string }) {
  return (
    <div className="space-y-3">
      <CollectionHeader title={label} count={items.length} addLabel="Add paragraph" onAdd={() => onChange([...items, "New paragraph"])} />
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <textarea value={item} rows={3} onChange={(event) => onChange(replaceAt(items, index, event.target.value))} className={`${inputClass} resize-y leading-6`} />
          <button type="button" onClick={() => onChange(removeAt(items, index))} className="mt-2 p-2 text-neutral-600 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
        </div>
      ))}
    </div>
  );
}

function formatMessageDate(value: Date | null) {
  if (!value) return "Just now";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function InboxManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    return subscribeToContactMessages(
      (nextMessages) => {
        setMessages(nextMessages);
        setSelectedId((current) =>
          current && nextMessages.some((message) => message.id === current)
            ? current
            : (nextMessages[0]?.id ?? null),
        );
        setLoading(false);
      },
      (nextError) => {
        setError(nextError.message);
        setLoading(false);
      },
    );
  }, []);

  const selected = messages.find((message) => message.id === selectedId) ?? null;
  const unreadCount = messages.filter((message) => message.status === "unread").length;

  function selectMessage(message: ContactMessage) {
    setSelectedId(message.id);
    if (message.status === "unread") {
      void setContactMessageStatus(message.id, "read").catch((nextError: unknown) => {
        setError(nextError instanceof Error ? nextError.message : "Could not update the message.");
      });
    }
  }

  async function toggleReadStatus() {
    if (!selected) return;
    setWorking(true);
    setError(null);
    try {
      await setContactMessageStatus(selected.id, selected.status === "read" ? "unread" : "read");
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Could not update the message.");
    } finally {
      setWorking(false);
    }
  }

  async function removeSelected() {
    if (!selected || !window.confirm(`Delete the message from ${selected.name}?`)) return;
    setWorking(true);
    setError(null);
    try {
      await deleteContactMessage(selected.id);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Could not delete the message.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <section>
      <SectionIntro
        icon={Inbox}
        eyebrow={`${unreadCount} unread · ${messages.length} total`}
        title="Contact inbox"
        copy="Messages submitted through the portfolio appear here in real time. Only your authenticated admin account can read them."
      />

      {error ? <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-xs text-red-300">{error}</div> : null}

      {loading ? (
        <div className="flex min-h-72 items-center justify-center gap-3 rounded-[1.75rem] border border-white/[0.08] bg-black/20 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600">
          <LoaderCircle className="h-4 w-4 animate-spin text-cyan-200" /> Loading messages
        </div>
      ) : messages.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-white/10 bg-black/20 px-6 text-center">
          <MessageSquare className="h-8 w-8 text-neutral-700" />
          <h2 className="mt-5 text-lg font-medium text-white">Your inbox is clear</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-600">New portfolio enquiries will appear here automatically.</p>
        </div>
      ) : (
        <div className="grid overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-black/20 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="max-h-[680px] overflow-y-auto border-b border-white/[0.07] p-2 lg:border-b-0 lg:border-r">
            {messages.map((message) => (
              <button
                key={message.id}
                type="button"
                onClick={() => selectMessage(message)}
                className={`relative w-full rounded-2xl p-4 text-left transition ${selectedId === message.id ? "bg-white/[0.07]" : "hover:bg-white/[0.035]"}`}
              >
                {message.status === "unread" ? <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" /> : null}
                <div className="flex items-center gap-3 pr-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-xs font-medium text-neutral-300">{message.name.slice(0, 1).toUpperCase()}</span>
                  <div className="min-w-0">
                    <p className={`truncate text-sm ${message.status === "unread" ? "font-medium text-white" : "text-neutral-400"}`}>{message.name}</p>
                    <p className="mt-1 truncate text-xs text-neutral-600">{message.email}</p>
                  </div>
                </div>
                <p className="mt-4 truncate text-sm text-neutral-300">{message.subject}</p>
                <div className="mt-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.15em] text-neutral-700">
                  <Clock3 className="h-3 w-3" /> {formatMessageDate(message.createdAt)}
                </div>
              </button>
            ))}
          </div>

          {selected ? (
            <article className="min-h-[540px] p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/[0.07] pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] ${selected.status === "unread" ? "bg-cyan-300/10 text-cyan-200" : "bg-white/[0.05] text-neutral-500"}`}>{selected.status}</span>
                    <span className="text-xs text-neutral-600">{formatMessageDate(selected.createdAt)}</span>
                  </div>
                  <h2 className="mt-5 text-2xl font-medium tracking-[-0.035em] text-white">{selected.subject}</h2>
                  <p className="mt-3 text-sm text-neutral-500">From <span className="text-neutral-300">{selected.name}</span> · <a href={`mailto:${selected.email}`} className="text-cyan-200/80 hover:text-cyan-200">{selected.email}</a></p>
                </div>
                <div className="flex gap-2">
                  <button type="button" disabled={working} onClick={() => void toggleReadStatus()} className="flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-xs text-neutral-400 transition hover:text-white disabled:opacity-40">
                    <CheckCheck className="h-4 w-4" /> {selected.status === "read" ? "Mark unread" : "Mark read"}
                  </button>
                  <button type="button" disabled={working} onClick={() => void removeSelected()} aria-label="Delete message" className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/15 text-red-400 transition hover:bg-red-500/10 disabled:opacity-40">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="whitespace-pre-wrap py-8 text-sm leading-7 text-neutral-300">{selected.message}</div>
              <a href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-medium text-black transition hover:bg-cyan-200">
                <Mail className="h-3.5 w-3.5" /> Reply by email
              </a>
            </article>
          ) : null}
        </div>
      )}
    </section>
  );
}

function AdminEditor({ initialContent }: { initialContent: PortfolioContent }) {
  const [active, setActive] = useState<SectionId>("hero");
  const [draft, setDraft] = useState(initialContent);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(initialContent), [draft, initialContent]);

  function patch<K extends keyof PortfolioContent>(section: K, values: Partial<PortfolioContent[K]>) {
    setDraft((current) => ({ ...current, [section]: { ...current[section], ...values } }));
  }

  async function save() {
    setSaveState("saving");
    setSaveError(null);
    try {
      await savePortfolioContent(draft);
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 2500);
    } catch (error) {
      setSaveState("error");
      setSaveError(error instanceof Error ? error.message : "Could not save changes.");
    }
  }

  return (
    <div className="dark min-h-screen bg-[#050608] text-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/[0.07] bg-[#07080a] lg:flex lg:flex-col">
        <div className="flex h-20 items-center gap-3 border-b border-white/[0.07] px-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07] font-mono text-xs text-cyan-200">NP</span>
          <div><p className="text-sm font-medium">Content studio</p><p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-600">portfolio admin</p></div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} type="button" onClick={() => setActive(item.id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${active === item.id ? "bg-white/[0.07] text-white" : "text-neutral-500 hover:bg-white/[0.035] hover:text-neutral-200"}`}>
                <Icon className={`h-4 w-4 ${active === item.id ? "text-cyan-200" : ""}`} />{item.label}
              </button>
            );
          })}
        </nav>
        <div className="space-y-2 border-t border-white/[0.07] p-4">
          <a href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-neutral-500 transition hover:bg-white/[0.04] hover:text-white"><ExternalLink className="h-4 w-4" />Open portfolio</a>
          <button type="button" onClick={() => void signOut(auth)} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-neutral-500 transition hover:bg-red-500/[0.07] hover:text-red-300"><LogOut className="h-4 w-4" />Sign out</button>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#050608]/85 backdrop-blur-2xl lg:ml-64">
        <div className="flex min-h-20 items-center justify-between gap-4 px-4 md:px-8">
          <div><p className="text-sm font-medium capitalize">{active}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-600">{dirty ? "Unsaved changes" : "Everything saved"}</p></div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setDraft(initialContent)} disabled={!dirty || saveState === "saving"} className="flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-xs text-neutral-400 transition hover:text-white disabled:opacity-30"><RotateCcw className="h-3.5 w-3.5" /><span className="hidden sm:inline">Reset</span></button>
            <button type="button" onClick={() => void save()} disabled={!dirty || saveState === "saving"} className="flex h-10 min-w-28 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-medium text-black transition hover:bg-cyan-200 disabled:opacity-40">
              {saveState === "saving" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : saveState === "saved" ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saveState === "saving" ? "Saving" : saveState === "saved" ? "Saved" : "Save changes"}
            </button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-white/[0.05] px-3 py-2 lg:hidden">
          {NAV_ITEMS.map((item) => <button key={item.id} type="button" onClick={() => setActive(item.id)} className={`shrink-0 rounded-lg px-3 py-2 text-xs ${active === item.id ? "bg-white/10 text-white" : "text-neutral-600"}`}>{item.label}</button>)}
        </nav>
      </header>

      <main className="lg:ml-64">
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
          {saveError ? <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">{saveError}</div> : null}

          {active === "hero" ? (
            <section>
              <SectionIntro icon={LayoutDashboard} eyebrow="Homepage" title="Hero and identity" copy="Control the first impression, profile image, headline, positioning, and calls to action." />
              <div className="space-y-6">
                <ImageField label="Hero photo" value={draft.hero.imageSrc} onChange={(imageSrc) => patch("hero", { imageSrc })} folder="hero" />
                <Grid>
                  <Field label="Image alt text" value={draft.hero.imageAlt} onChange={(imageAlt) => patch("hero", { imageAlt })} />
                  <Field label="Availability" value={draft.hero.availabilityText} onChange={(availabilityText) => patch("hero", { availabilityText })} />
                  <Field label="First name" value={draft.hero.firstName} onChange={(firstName) => patch("hero", { firstName })} />
                  <Field label="Last name" value={draft.hero.lastName} onChange={(lastName) => patch("hero", { lastName })} />
                  <Field label="Headline line one" value={draft.hero.headlinePrimary} onChange={(headlinePrimary) => patch("hero", { headlinePrimary })} />
                  <Field label="Headline line two" value={draft.hero.headlineSecondary} onChange={(headlineSecondary) => patch("hero", { headlineSecondary })} />
                  <Field label="Profession label" value={draft.hero.professionLabel} onChange={(professionLabel) => patch("hero", { professionLabel })} />
                  <Field label="Country label" value={draft.hero.countryLabel} onChange={(countryLabel) => patch("hero", { countryLabel })} />
                  <Field label="Primary button" value={draft.hero.primaryCtaLabel} onChange={(primaryCtaLabel) => patch("hero", { primaryCtaLabel })} />
                  <Field label="Primary button link" value={draft.hero.primaryCtaHref} onChange={(primaryCtaHref) => patch("hero", { primaryCtaHref })} />
                  <Field label="Secondary button" value={draft.hero.secondaryCtaLabel} onChange={(secondaryCtaLabel) => patch("hero", { secondaryCtaLabel })} />
                  <Field label="Secondary button link" value={draft.hero.secondaryCtaHref} onChange={(secondaryCtaHref) => patch("hero", { secondaryCtaHref })} />
                </Grid>
                <Field label="Hero positioning" value={draft.hero.role} onChange={(role) => patch("hero", { role })} multiline />
                <Field label="SEO description" value={draft.hero.description} onChange={(description) => patch("hero", { description })} multiline />
              </div>
            </section>
          ) : null}

          {active === "about" ? (
            <section>
              <SectionIntro icon={UserRound} eyebrow="Profile" title="About and experience" copy="Edit the profile image, biography, proof points, work history, and resume link." />
              <div className="space-y-7">
                <ImageField label="About photo" value={draft.about.imageSrc} onChange={(imageSrc) => patch("about", { imageSrc })} folder="about" />
                <Grid>
                  <Field label="Image alt text" value={draft.about.imageAlt} onChange={(imageAlt) => patch("about", { imageAlt })} />
                  <Field label="Section label" value={draft.about.sectionLabel} onChange={(sectionLabel) => patch("about", { sectionLabel })} />
                  <Field label="Title line one" value={draft.about.titlePrimary} onChange={(titlePrimary) => patch("about", { titlePrimary })} />
                  <Field label="Title line two" value={draft.about.titleSecondary} onChange={(titleSecondary) => patch("about", { titleSecondary })} />
                  <Field label="Resume URL" value={draft.about.resumeUrl} onChange={(resumeUrl) => patch("about", { resumeUrl })} />
                  <Field label="CTA text" value={draft.about.ctaText} onChange={(ctaText) => patch("about", { ctaText })} />
                  <Field label="CTA label" value={draft.about.ctaLabel} onChange={(ctaLabel) => patch("about", { ctaLabel })} />
                  <Field label="CTA link" value={draft.about.ctaHref} onChange={(ctaHref) => patch("about", { ctaHref })} />
                </Grid>
                <StringListEditor label="Biography paragraphs" items={draft.about.paragraphs} onChange={(paragraphs) => patch("about", { paragraphs })} />
                <CollectionHeader title="Stats" count={draft.about.stats.length} addLabel="Add stat" onAdd={() => patch("about", { stats: [...draft.about.stats, emptyStat()] })} />
                <div className="grid gap-3 md:grid-cols-3">
                  {draft.about.stats.map((stat, index) => (
                    <div key={`${stat.label}-${index}`} className="space-y-3 rounded-2xl border border-white/[0.08] bg-black/20 p-4">
                      <div className="flex justify-end"><button type="button" onClick={() => patch("about", { stats: removeAt(draft.about.stats, index) })} className="text-neutral-600 hover:text-red-400"><Trash2 className="h-4 w-4" /></button></div>
                      <NumberField label="Value" value={stat.value} onChange={(value) => patch("about", { stats: replaceAt(draft.about.stats, index, { ...stat, value }) })} />
                      <Field label="Suffix" value={stat.suffix} onChange={(suffix) => patch("about", { stats: replaceAt(draft.about.stats, index, { ...stat, suffix }) })} />
                      <Field label="Label" value={stat.label} onChange={(label) => patch("about", { stats: replaceAt(draft.about.stats, index, { ...stat, label }) })} />
                    </div>
                  ))}
                </div>
                <CollectionHeader title="Experience" count={draft.about.experiences.length} addLabel="Add experience" onAdd={() => patch("about", { experiences: [...draft.about.experiences, emptyExperience()] })} />
                <div className="space-y-3">
                  {draft.about.experiences.map((item, index) => (
                    <EditorCard key={`experience-${index}`} title={item.title} subtitle={`${item.company} · ${item.date}`} onRemove={() => patch("about", { experiences: removeAt(draft.about.experiences, index) })}>
                      <Grid>
                        <Field label="ID" value={item.id} onChange={(id) => patch("about", { experiences: replaceAt(draft.about.experiences, index, { ...item, id }) })} />
                        <Field label="Role" value={item.title} onChange={(title) => patch("about", { experiences: replaceAt(draft.about.experiences, index, { ...item, title }) })} />
                        <Field label="Company" value={item.company} onChange={(company) => patch("about", { experiences: replaceAt(draft.about.experiences, index, { ...item, company }) })} />
                        <Field label="Date" value={item.date} onChange={(date) => patch("about", { experiences: replaceAt(draft.about.experiences, index, { ...item, date }) })} />
                      </Grid>
                      <Field label="Description" value={item.description} onChange={(description) => patch("about", { experiences: replaceAt(draft.about.experiences, index, { ...item, description }) })} multiline />
                      <ListField label="Tags" value={item.tags} onChange={(tags) => patch("about", { experiences: replaceAt(draft.about.experiences, index, { ...item, tags }) })} />
                    </EditorCard>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {active === "works" ? (
            <section>
              <SectionIntro icon={FolderKanban} eyebrow="Portfolio" title="Projects" copy="Add, remove, and update featured projects, screenshots, links, and technology labels." />
              <div className="space-y-7">
                <Grid>
                  <Field label="Section label" value={draft.works.sectionLabel} onChange={(sectionLabel) => patch("works", { sectionLabel })} />
                  <Field label="Title line one" value={draft.works.titlePrimary} onChange={(titlePrimary) => patch("works", { titlePrimary })} />
                  <Field label="Title line two" value={draft.works.titleSecondary} onChange={(titleSecondary) => patch("works", { titleSecondary })} />
                  <Field label="GitHub label" value={draft.works.githubLabel} onChange={(githubLabel) => patch("works", { githubLabel })} />
                  <Field label="GitHub URL" value={draft.works.githubUrl} onChange={(githubUrl) => patch("works", { githubUrl })} />
                </Grid>
                <CollectionHeader title="Projects" count={draft.works.projects.length} addLabel="Add project" onAdd={() => patch("works", { projects: [...draft.works.projects, emptyProject()] })} />
                <div className="space-y-3">
                  {draft.works.projects.map((project, index) => (
                    <EditorCard key={`project-${index}`} title={project.title} subtitle={`${project.type} · ${project.year}`} onRemove={() => patch("works", { projects: removeAt(draft.works.projects, index) })}>
                      <ImageField label="Project image" value={project.image} onChange={(image) => patch("works", { projects: replaceAt(draft.works.projects, index, { ...project, image }) })} folder={`projects/${slugify(project.title)}`} />
                      <Grid>
                        <Field label="Title" value={project.title} onChange={(title) => patch("works", { projects: replaceAt(draft.works.projects, index, { ...project, title }) })} />
                        <Field label="Type" value={project.type} onChange={(type) => patch("works", { projects: replaceAt(draft.works.projects, index, { ...project, type }) })} />
                        <Field label="Year" value={project.year} onChange={(year) => patch("works", { projects: replaceAt(draft.works.projects, index, { ...project, year }) })} />
                        <Field label="Project URL" value={project.link} onChange={(link) => patch("works", { projects: replaceAt(draft.works.projects, index, { ...project, link }) })} />
                      </Grid>
                      <Field label="Description" value={project.description} onChange={(description) => patch("works", { projects: replaceAt(draft.works.projects, index, { ...project, description }) })} multiline />
                      <ListField label="Technology" value={project.tech} onChange={(tech) => patch("works", { projects: replaceAt(draft.works.projects, index, { ...project, tech }) })} />
                    </EditorCard>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {active === "skills" ? (
            <section>
              <SectionIntro icon={Code2} eyebrow="Capabilities" title="Skills and categories" copy="Control the stack copy, capability groups, colors, and individual skills." />
              <div className="space-y-7">
                <Grid>
                  <Field label="Title line one" value={draft.skills.titlePrimary} onChange={(titlePrimary) => patch("skills", { titlePrimary })} />
                  <Field label="Title line two" value={draft.skills.titleSecondary} onChange={(titleSecondary) => patch("skills", { titleSecondary })} />
                  <Field label="End label" value={draft.skills.endLabel} onChange={(endLabel) => patch("skills", { endLabel })} />
                </Grid>
                <Field label="Description" value={draft.skills.description} onChange={(description) => patch("skills", { description })} multiline />
                <CollectionHeader title="Categories" count={draft.skills.categories.length} addLabel="Add category" onAdd={() => patch("skills", { categories: [...draft.skills.categories, emptyCategory()] })} />
                <div className="space-y-3">
                  {draft.skills.categories.map((category, categoryIndex) => (
                    <EditorCard key={`category-${categoryIndex}`} title={category.title} subtitle={`${category.skills.length} skills`} onRemove={() => patch("skills", { categories: removeAt(draft.skills.categories, categoryIndex) })}>
                      <Grid>
                        <Field label="ID" value={category.id} onChange={(id) => patch("skills", { categories: replaceAt(draft.skills.categories, categoryIndex, { ...category, id }) })} />
                        <Field label="Title" value={category.title} onChange={(title) => patch("skills", { categories: replaceAt(draft.skills.categories, categoryIndex, { ...category, title }) })} />
                        <Field label="Accent color" value={category.color} type="color" onChange={(color) => patch("skills", { categories: replaceAt(draft.skills.categories, categoryIndex, { ...category, color }) })} />
                      </Grid>
                      <Field label="Description" value={category.description} onChange={(description) => patch("skills", { categories: replaceAt(draft.skills.categories, categoryIndex, { ...category, description }) })} multiline />
                      <CollectionHeader title="Skills" count={category.skills.length} addLabel="Add skill" onAdd={() => patch("skills", { categories: replaceAt(draft.skills.categories, categoryIndex, { ...category, skills: [...category.skills, emptySkill()] }) })} />
                      <div className="grid gap-3 md:grid-cols-2">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={`${skill.name}-${skillIndex}`} className="relative space-y-3 rounded-xl border border-white/[0.07] p-4">
                            <button type="button" onClick={() => patch("skills", { categories: replaceAt(draft.skills.categories, categoryIndex, { ...category, skills: removeAt(category.skills, skillIndex) }) })} className="absolute right-3 top-3 text-neutral-700 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                            <Field label="Name" value={skill.name} onChange={(name) => patch("skills", { categories: replaceAt(draft.skills.categories, categoryIndex, { ...category, skills: replaceAt(category.skills, skillIndex, { ...skill, name }) }) })} />
                            <Field label="Icon slug" value={skill.icon} onChange={(icon) => patch("skills", { categories: replaceAt(draft.skills.categories, categoryIndex, { ...category, skills: replaceAt(category.skills, skillIndex, { ...skill, icon }) }) })} />
                          </div>
                        ))}
                      </div>
                    </EditorCard>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {active === "terminal" ? (
            <section>
              <SectionIntro icon={TerminalSquare} eyebrow="Process" title="Console section" copy="Edit the interactive command panel, workflow results, prompt, and metrics." />
              <div className="space-y-7">
                <div className="flex flex-col gap-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-cyan-100">Production workflow preset</p>
                    <p className="mt-1 text-xs leading-5 text-neutral-500">Load realistic TypeScript, Docker, Prisma, and Kubernetes commands.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      patch("terminal", {
                        ...developerTerminalPreset,
                        commands: developerTerminalPreset.commands.map((command) => ({ ...command, output: [...command.output] })),
                        metrics: developerTerminalPreset.metrics.map((metric) => ({ ...metric })),
                      })
                    }
                    className="shrink-0 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2.5 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300/20"
                  >
                    Load developer preset
                  </button>
                </div>
                <Grid>
                  <Field label="Eyebrow" value={draft.terminal.eyebrow} onChange={(eyebrow) => patch("terminal", { eyebrow })} />
                  <Field label="Title" value={draft.terminal.title} onChange={(title) => patch("terminal", { title })} />
                  <Field label="Prompt" value={draft.terminal.prompt} onChange={(prompt) => patch("terminal", { prompt })} />
                </Grid>
                <Field label="Description" value={draft.terminal.description} onChange={(description) => patch("terminal", { description })} multiline />
                <CollectionHeader title="Metrics" count={draft.terminal.metrics.length} addLabel="Add metric" onAdd={() => patch("terminal", { metrics: [...draft.terminal.metrics, emptyMetric()] })} />
                <div className="grid gap-3 md:grid-cols-3">
                  {draft.terminal.metrics.map((metric, index) => (
                    <div key={`${metric.label}-${index}`} className="relative space-y-3 rounded-xl border border-white/[0.07] p-4">
                      <button type="button" onClick={() => patch("terminal", { metrics: removeAt(draft.terminal.metrics, index) })} className="absolute right-3 top-3 text-neutral-700 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                      <Field label="Value" value={metric.value} onChange={(value) => patch("terminal", { metrics: replaceAt(draft.terminal.metrics, index, { ...metric, value }) })} />
                      <Field label="Label" value={metric.label} onChange={(label) => patch("terminal", { metrics: replaceAt(draft.terminal.metrics, index, { ...metric, label }) })} />
                    </div>
                  ))}
                </div>
                <CollectionHeader title="Commands" count={draft.terminal.commands.length} addLabel="Add command" onAdd={() => patch("terminal", { commands: [...draft.terminal.commands, emptyCommand()] })} />
                <div className="space-y-3">
                  {draft.terminal.commands.map((command, index) => (
                    <EditorCard key={`command-${index}`} title={command.command} subtitle={command.title} onRemove={() => patch("terminal", { commands: removeAt(draft.terminal.commands, index) })}>
                      <Grid>
                        <Field label="Command" value={command.command} onChange={(value) => patch("terminal", { commands: replaceAt(draft.terminal.commands, index, { ...command, command: value }) })} />
                        <Field label="Title" value={command.title} onChange={(title) => patch("terminal", { commands: replaceAt(draft.terminal.commands, index, { ...command, title }) })} />
                      </Grid>
                      <ListField label="Output lines" value={command.output} onChange={(output) => patch("terminal", { commands: replaceAt(draft.terminal.commands, index, { ...command, output }) })} />
                    </EditorCard>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {active === "achievements" ? (
            <section>
              <SectionIntro icon={Award} eyebrow="Recognition" title="Achievements and certificates" copy="Upload new credentials, add milestones, and control verification links." />
              <div className="space-y-7">
                <Grid>
                  <Field label="Section label" value={draft.achievements.sectionLabel} onChange={(sectionLabel) => patch("achievements", { sectionLabel })} />
                  <Field label="Title" value={draft.achievements.title} onChange={(title) => patch("achievements", { title })} />
                </Grid>
                <Field label="Description" value={draft.achievements.description} onChange={(description) => patch("achievements", { description })} multiline />
                <CollectionHeader title="Achievements" count={draft.achievements.items.length} addLabel="Add achievement" onAdd={() => patch("achievements", { items: [...draft.achievements.items, emptyAchievement()] })} />
                <div className="space-y-3">
                  {draft.achievements.items.map((item, index) => (
                    <EditorCard key={`achievement-${index}`} title={item.title} subtitle={`${item.issuer} · ${item.issuedOn}`} onRemove={() => patch("achievements", { items: removeAt(draft.achievements.items, index) })}>
                      <ImageField label="Certificate or achievement image" value={item.image} onChange={(image) => patch("achievements", { items: replaceAt(draft.achievements.items, index, { ...item, image }) })} folder={`achievements/${slugify(item.title)}`} />
                      <Grid>
                        <Field label="ID" value={item.id} onChange={(id) => patch("achievements", { items: replaceAt(draft.achievements.items, index, { ...item, id }) })} />
                        <Field label="Title" value={item.title} onChange={(title) => patch("achievements", { items: replaceAt(draft.achievements.items, index, { ...item, title }) })} />
                        <Field label="Issuer" value={item.issuer} onChange={(issuer) => patch("achievements", { items: replaceAt(draft.achievements.items, index, { ...item, issuer }) })} />
                        <Field label="Issued on" value={item.issuedOn} onChange={(issuedOn) => patch("achievements", { items: replaceAt(draft.achievements.items, index, { ...item, issuedOn }) })} />
                        <Field label="Verification URL" value={item.verifyUrl} onChange={(verifyUrl) => patch("achievements", { items: replaceAt(draft.achievements.items, index, { ...item, verifyUrl }) })} />
                      </Grid>
                      <Field label="Description" value={item.description} onChange={(description) => patch("achievements", { items: replaceAt(draft.achievements.items, index, { ...item, description }) })} multiline />
                    </EditorCard>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {active === "blog" ? (
            <section>
              <SectionIntro icon={BookOpenText} eyebrow="Publishing" title="Blog and articles" copy="Draft, publish, and update articles. Unpublished posts remain visible only in this portal." />
              <div className="space-y-7">
                <Grid>
                  <Field label="Eyebrow" value={draft.blog.eyebrow} onChange={(eyebrow) => patch("blog", { eyebrow })} />
                  <Field label="Blog title" value={draft.blog.title} onChange={(title) => patch("blog", { title })} />
                </Grid>
                <Field label="Blog description" value={draft.blog.description} onChange={(description) => patch("blog", { description })} multiline />
                <CollectionHeader title="Articles" count={draft.blog.posts.length} addLabel="New article" onAdd={() => patch("blog", { posts: [emptyPost(), ...draft.blog.posts] })} />
                <div className="space-y-3">
                  {draft.blog.posts.map((post, index) => (
                    <EditorCard key={`post-${index}`} title={post.title} subtitle={`${post.published ? "Published" : "Draft"} · ${post.publishedAt}`} onRemove={() => patch("blog", { posts: removeAt(draft.blog.posts, index) })}>
                      <ImageField label="Cover image" value={post.coverImage} onChange={(coverImage) => patch("blog", { posts: replaceAt(draft.blog.posts, index, { ...post, coverImage }) })} folder={`blog/${post.slug}`} />
                      <Toggle label="Published" value={post.published} onChange={(published) => patch("blog", { posts: replaceAt(draft.blog.posts, index, { ...post, published }) })} />
                      <Grid>
                        <Field label="Post ID" value={post.id} onChange={(id) => patch("blog", { posts: replaceAt(draft.blog.posts, index, { ...post, id }) })} />
                        <Field label="Title" value={post.title} onChange={(title) => patch("blog", { posts: replaceAt(draft.blog.posts, index, { ...post, title, slug: post.slug || slugify(title) }) })} />
                        <Field label="URL slug" value={post.slug} onChange={(slug) => patch("blog", { posts: replaceAt(draft.blog.posts, index, { ...post, slug: slugify(slug) }) })} hint={`Public URL: /blog/${post.slug}`} />
                        <Field label="Published date" value={post.publishedAt} type="date" onChange={(publishedAt) => patch("blog", { posts: replaceAt(draft.blog.posts, index, { ...post, publishedAt }) })} />
                        <Field label="Read time" value={post.readTime} onChange={(readTime) => patch("blog", { posts: replaceAt(draft.blog.posts, index, { ...post, readTime }) })} />
                      </Grid>
                      <Field label="Excerpt" value={post.excerpt} onChange={(excerpt) => patch("blog", { posts: replaceAt(draft.blog.posts, index, { ...post, excerpt }) })} multiline />
                      <ListField label="Tags" value={post.tags} onChange={(tags) => patch("blog", { posts: replaceAt(draft.blog.posts, index, { ...post, tags }) })} />
                      <Field label="Article content" value={post.content} onChange={(content) => patch("blog", { posts: replaceAt(draft.blog.posts, index, { ...post, content }) })} multiline rows={18} hint="Use blank lines for paragraphs, ## for section headings, and - for bullet lists." />
                      {post.slug ? <a href={`/blog/${post.slug}`} target="_blank" className="inline-flex items-center gap-2 text-xs text-cyan-200"><ExternalLink className="h-3.5 w-3.5" />Preview article</a> : null}
                    </EditorCard>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {active === "inbox" ? <InboxManager /> : null}

          {active === "contact" ? (
            <section>
              <SectionIntro icon={Mail} eyebrow="Footer" title="Contact and social links" copy="Control the final call to action, availability, location, social links, and copyright." />
              <div className="space-y-7">
                <Grid>
                  <Field label="Section label" value={draft.contact.sectionLabel} onChange={(sectionLabel) => patch("contact", { sectionLabel })} />
                  <Field label="Location" value={draft.contact.locationLabel} onChange={(locationLabel) => patch("contact", { locationLabel })} />
                  <Field label="Title line one" value={draft.contact.titlePrimary} onChange={(titlePrimary) => patch("contact", { titlePrimary })} />
                  <Field label="Title line two" value={draft.contact.titleSecondary} onChange={(titleSecondary) => patch("contact", { titleSecondary })} />
                  <Field label="Copyright name" value={draft.contact.copyrightName} onChange={(copyrightName) => patch("contact", { copyrightName })} />
                  <Field label="Rights label" value={draft.contact.rightsLabel} onChange={(rightsLabel) => patch("contact", { rightsLabel })} />
                  <Field label="Back to top label" value={draft.contact.backToTopLabel} onChange={(backToTopLabel) => patch("contact", { backToTopLabel })} />
                </Grid>
                <Field label="Availability message" value={draft.contact.availabilityText} onChange={(availabilityText) => patch("contact", { availabilityText })} multiline />
                <CollectionHeader title="Contact links" count={draft.contact.links.length} addLabel="Add link" onAdd={() => patch("contact", { links: [...draft.contact.links, emptyLink()] })} />
                <div className="space-y-3">
                  {draft.contact.links.map((link, index) => (
                    <EditorCard key={`contact-${index}`} title={link.label} subtitle={link.value} onRemove={() => patch("contact", { links: removeAt(draft.contact.links, index) })}>
                      <Grid>
                        <Field label="ID" value={link.id} onChange={(id) => patch("contact", { links: replaceAt(draft.contact.links, index, { ...link, id }) })} />
                        <Field label="Label" value={link.label} onChange={(label) => patch("contact", { links: replaceAt(draft.contact.links, index, { ...link, label }) })} />
                        <Field label="Display value" value={link.value} onChange={(value) => patch("contact", { links: replaceAt(draft.contact.links, index, { ...link, value }) })} />
                        <Field label="URL" value={link.href} onChange={(href) => patch("contact", { links: replaceAt(draft.contact.links, index, { ...link, href }) })} />
                      </Grid>
                    </EditorCard>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (credential.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setError("This account does not have admin access.");
      }
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="dark relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050608] px-5 text-white">
      <Spotlight
        gradientFirst="radial-gradient(68% 69% at 55% 31%, rgba(139,92,246,.2) 0, rgba(34,211,238,.05) 52%, transparent 82%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(34,211,238,.12) 0, transparent 80%)"
        translateY={-380}
      />
      <div className="aceternity-grid absolute inset-0 opacity-30" />
      <div className="relative z-40 w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-black/45 p-7 shadow-[0_35px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:p-9">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07] font-mono text-xs text-cyan-200">NP</span>
          <div><p className="text-sm font-medium">Content studio</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600">Secure admin portal</p></div>
        </div>
        <h1 className="mt-10 text-3xl font-medium tracking-[-0.04em]">Welcome back.</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-500">Sign in to manage every part of the portfolio.</p>
        <form onSubmit={login} className="mt-8 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            autoComplete="email"
            autoFocus
            className={inputClass}
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className={inputClass}
          />
          {error ? <p className="rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-xs text-red-300">{error}</p> : null}
          <button type="submit" disabled={loading || !email.trim() || !password} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-medium text-black transition hover:bg-cyan-200 disabled:opacity-40">
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}{loading ? "Signing in" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function AdminPage() {
  const { content, isLoading, error } = usePortfolioContent();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const editorKey = useMemo(() => JSON.stringify(content), [content]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      if (nextUser?.email && nextUser.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setUser(null);
      } else {
        setUser(nextUser);
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  if (authLoading || (user && isLoading)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050608] text-white">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600"><LoaderCircle className="h-4 w-4 animate-spin text-cyan-200" />Loading studio</div>
      </main>
    );
  }

  if (!user?.email || user.email !== ADMIN_EMAIL) return <LoginScreen />;

  return (
    <>
      {error ? <div className="fixed inset-x-0 top-0 z-[100] bg-red-950 px-4 py-2 text-center text-xs text-red-300">{error}</div> : null}
      <AdminEditor key={editorKey} initialContent={content} />
    </>
  );
}
