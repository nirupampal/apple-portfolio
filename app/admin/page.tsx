"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  ChevronDown,
  ChevronRight,
  Code2,
  Cpu,
  Globe,
  Layout,
  LogIn,
  LogOut,
  Mail,
  Plus,
  RotateCcw,
  Save,
  Terminal,
  Trash2,
  User2,
} from "lucide-react";

import { ADMIN_EMAIL, auth } from "@/firebase";
import {
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
import { usePortfolioContent } from "@/lib/use-portfolio-content";

/* ─── Design Tokens ──────────────────────────────────────────────────────── */

const ACCENT = "#00ffa3";
const ACCENT_DIM = "#00ffa320";

/* ─── Utilities ──────────────────────────────────────────────────────────── */

function replaceAt<T>(items: T[], index: number, nextItem: T) {
  return items.map((item, i) => (i === index ? nextItem : item));
}

function removeAt<T>(items: T[], index: number) {
  return items.filter((_, i) => i !== index);
}

/* ─── Empty factory helpers ──────────────────────────────────────────────── */

const emptyExperience = (): ExperienceItem => ({
  id: Date.now().toString(),
  title: "New Role",
  company: "Company",
  date: "2026 – Present",
  description: "Describe the work and measurable impact.",
  tags: ["React", "Next.js"],
});

const emptyStat = (): StatItem => ({ value: 1, suffix: "+", label: "Metric" });

const emptyProject = (): ProjectItem => ({
  title: "New Project",
  description: "Describe what it does and why it matters.",
  image:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  link: "#",
  type: "Fullstack",
  year: "2026",
  tech: ["Next.js", "Firebase"],
});

const emptySkill = (): SkillItem => ({ name: "New Skill", icon: "code" });

const emptySkillCategory = (): SkillCategory => ({
  id: `category-${Date.now()}`,
  title: "New Category",
  description: "Describe this skill group.",
  color: "#ffffff",
  skills: [emptySkill()],
});

const emptyContactLink = (): ContactLink => ({
  id: Date.now().toString().slice(-4),
  label: "New Link",
  value: "Display value",
  href: "#",
});

const emptyTerminalCommand = (): TerminalCommand => ({
  command: "npm run next",
  title: "New command",
  output: ["Add a strong proof point", "Add another result"],
});

const emptyTerminalMetric = (): TerminalMetric => ({
  value: "1+",
  label: "new metric",
});

/* ─── Nav Sections ───────────────────────────────────────────────────────── */

const NAV_SECTIONS = [
  { id: "hero", label: "Hero", Icon: Layout },
  { id: "terminal-feature", label: "Terminal", Icon: Terminal },
  { id: "about", label: "About", Icon: User2 },
  { id: "works", label: "Projects", Icon: Code2 },
  { id: "skills", label: "Skills", Icon: Cpu },
  { id: "contact", label: "Contact", Icon: Mail },
];

/* ─── Base field className ───────────────────────────────────────────────── */

const fieldCls =
  "w-full rounded-md border border-white/10 bg-[#0d0d0d] px-3 py-2.5 text-sm text-white font-mono " +
  "outline-none transition-all placeholder:text-zinc-700 " +
  "focus:border-[#00ffa3] focus:ring-1 focus:ring-[#00ffa3]/30";

/* ─── Primitive Fields ───────────────────────────────────────────────────── */

function TextField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-[10px] font-semibold tracking-widest uppercase text-zinc-500">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          rows={3}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={fieldCls + " resize-y leading-relaxed"}
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={fieldCls}
        />
      )}
      {hint && (
        <span className="block text-[11px] leading-5 text-zinc-600">{hint}</span>
      )}
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-[10px] font-semibold tracking-widest uppercase text-zinc-500">
        {label}
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={fieldCls}
      />
    </label>
  );
}

function ListField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <TextField
      label={label}
      value={value.join(", ")}
      placeholder={placeholder ?? "item1, item2, item3"}
      hint="Comma-separated values"
      onChange={(v) =>
        onChange(
          v
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        )
      }
    />
  );
}

/* ─── Layout Primitives ──────────────────────────────────────────────────── */

function Grid2({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">{children}</div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </span>
      <div className="h-px flex-1 bg-white/5" />
    </div>
  );
}

/* ─── Section Panel ──────────────────────────────────────────────────────── */

function SectionPanel({
  id,
  title,
  description,
  icon: Icon,
  children,
  badge,
}: {
  id: string;
  title: string;
  description?: string;
  icon: React.ElementType;
  children: ReactNode;
  badge?: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <section
      id={id}
      className="scroll-mt-6 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0a0a0a]"
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 border-b border-white/[0.07] px-6 py-4 text-left transition-colors hover:bg-white/[0.02]"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ background: ACCENT_DIM, color: ACCENT }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-white">{title}</h2>
            {badge && (
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-500">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-0.5 text-xs text-zinc-600">{description}</p>
          )}
        </div>
        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-zinc-600" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-zinc-600" />
        )}
      </button>

      {/* Body */}
      {open && (
        <div className="space-y-6 p-6">{children}</div>
      )}
    </section>
  );
}

/* ─── Editable Card ──────────────────────────────────────────────────────── */

function EditableCard({
  title,
  subtitle,
  onRemove,
  children,
}: {
  title: string;
  subtitle?: string;
  onRemove: () => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.07] bg-[#0d0d0d]">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          {open ? (
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{title}</p>
            {subtitle && (
              <p className="truncate text-xs text-zinc-600">{subtitle}</p>
            )}
          </div>
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${title}`}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent text-zinc-600 transition hover:border-red-900 hover:text-red-400"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      {open && (
        <div className="border-t border-white/[0.05] p-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── Add Button ─────────────────────────────────────────────────────────── */

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:border-[#00ffa3]/40 hover:text-[#00ffa3]"
    >
      <Plus className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

/* ─── Sub-section row (title + Add button) ───────────────────────────────── */

function SubHeader({
  label,
  count,
  onAdd,
  addLabel,
}: {
  label: string;
  count?: number;
  onAdd: () => void;
  addLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {label}
        </span>
        {count !== undefined && (
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-600">
            {count}
          </span>
        )}
      </div>
      <AddButton label={addLabel} onClick={onAdd} />
    </div>
  );
}

/* ─── Admin Editor ───────────────────────────────────────────────────────── */

function AdminEditor({ initialContent }: { initialContent: PortfolioContent }) {
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [draft, setDraft] = useState<PortfolioContent>(initialContent);

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(initialContent),
    [draft, initialContent]
  );

  async function handleSave() {
    setSaveState("saving");
    setSaveError(null);
    try {
      await savePortfolioContent(draft);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 3000);
    } catch (err) {
      setSaveState("error");
      setSaveError(err instanceof Error ? err.message : "Could not save content.");
    }
  }

  function resetDraft() {
    setDraft(initialContent);
    setSaveState("idle");
    setSaveError(null);
  }

  /* ── Patch helpers ──────────────────────────────────────────────────── */

  const patchHero = (patch: Partial<typeof draft.hero>) =>
    setDraft((c) => ({ ...c, hero: { ...c.hero, ...patch } }));

  const patchTerminal = (patch: Partial<typeof draft.terminal>) =>
    setDraft((c) => ({ ...c, terminal: { ...c.terminal, ...patch } }));

  const patchAbout = (patch: Partial<typeof draft.about>) =>
    setDraft((c) => ({ ...c, about: { ...c.about, ...patch } }));

  const patchWorks = (patch: Partial<typeof draft.works>) =>
    setDraft((c) => ({ ...c, works: { ...c.works, ...patch } }));

  const patchSkills = (patch: Partial<typeof draft.skills>) =>
    setDraft((c) => ({ ...c, skills: { ...c.skills, ...patch } }));

  const patchContact = (patch: Partial<typeof draft.contact>) =>
    setDraft((c) => ({ ...c, contact: { ...c.contact, ...patch } }));

  return (
    <div className="flex min-h-screen bg-[#080808]">
      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#070707] lg:flex">
        {/* Logo */}
        <div className="border-b border-white/[0.06] px-5 py-5">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold"
              style={{ background: ACCENT_DIM, color: ACCENT }}
            >
              ◈
            </span>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-white">
                Admin
              </p>
              <p className="text-[10px] text-zinc-600 font-mono">portfolio.cms</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {NAV_SECTIONS.map(({ id, label, Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-zinc-500 transition-all hover:bg-white/[0.04] hover:text-white"
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {label}
            </a>
          ))}
        </nav>

        {/* Stats */}
        <div className="border-t border-white/[0.06] p-4 space-y-2">
          {[
            { label: "Projects", value: draft.works.projects.length },
            { label: "Experiences", value: draft.about.experiences.length },
            { label: "Skill Groups", value: draft.skills.categories.length },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-600">{label}</span>
              <span className="font-mono text-[11px]" style={{ color: ACCENT }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Sign out */}
        <div className="border-t border-white/[0.06] p-3">
          <button
            type="button"
            onClick={() => signOut(auth)}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-zinc-600 transition hover:bg-red-950/40 hover:text-red-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/[0.06] bg-[#080808]/90 px-6 py-3 backdrop-blur-xl">
          <div>
            <h1 className="text-sm font-semibold text-white">Portfolio Editor</h1>
            <p className="text-[11px] text-zinc-600 font-mono">
              siteContent/portfolio
            </p>
          </div>

          <div className="flex items-center gap-2">
            {saveState === "saved" && (
              <span
                className="text-[11px] font-mono"
                style={{ color: ACCENT }}
              >
                ✓ Saved
              </span>
            )}
            {saveError && (
              <span className="text-[11px] font-mono text-red-400">
                {saveError}
              </span>
            )}

            {isDirty && (
              <button
                type="button"
                onClick={resetDraft}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-white/20 hover:text-white"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saveState === "saving"}
              className="inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-semibold transition disabled:opacity-50"
              style={{ background: ACCENT, color: "#000" }}
            >
              <Save className="h-3 w-3" />
              {saveState === "saving" ? "Saving…" : "Save Changes"}
            </button>

            {/* Mobile sign out */}
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-red-900 hover:text-red-400 lg:hidden"
            >
              <LogOut className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="mx-auto max-w-4xl space-y-4 p-6">

          {/* ── HERO ──────────────────────────────────────────────────── */}
          <SectionPanel
            id="hero"
            title="Hero"
            icon={Layout}
            description="Name, role, availability, and CTAs."
          >
            <Grid2>
              <TextField label="First Name" value={draft.hero.firstName} onChange={(v) => patchHero({ firstName: v })} />
              <TextField label="Last Name" value={draft.hero.lastName} onChange={(v) => patchHero({ lastName: v })} />
              <TextField label="Role Line" value={draft.hero.role} onChange={(v) => patchHero({ role: v })} multiline />
              <TextField label="Description" value={draft.hero.description} onChange={(v) => patchHero({ description: v })} multiline />
              <TextField label="Availability Text" value={draft.hero.availabilityText} onChange={(v) => patchHero({ availabilityText: v })} />
            </Grid2>

            <SectionDivider label="CTAs" />
            <Grid2>
              <TextField label="Primary Label" value={draft.hero.primaryCtaLabel} onChange={(v) => patchHero({ primaryCtaLabel: v })} />
              <TextField label="Primary Link" value={draft.hero.primaryCtaHref} onChange={(v) => patchHero({ primaryCtaHref: v })} />
              <TextField label="Secondary Label" value={draft.hero.secondaryCtaLabel} onChange={(v) => patchHero({ secondaryCtaLabel: v })} />
              <TextField label="Secondary Link" value={draft.hero.secondaryCtaHref} onChange={(v) => patchHero({ secondaryCtaHref: v })} />
            </Grid2>
          </SectionPanel>

          {/* ── TERMINAL ──────────────────────────────────────────────── */}
          <SectionPanel
            id="terminal-feature"
            title="Terminal"
            icon={Terminal}
            description="Interactive terminal block — commands and metrics."
            badge={`${draft.terminal.commands.length} cmds`}
          >
            <Grid2>
              <TextField label="Eyebrow" value={draft.terminal.eyebrow} onChange={(v) => patchTerminal({ eyebrow: v })} />
              <TextField label="Prompt" value={draft.terminal.prompt} onChange={(v) => patchTerminal({ prompt: v })} />
              <TextField label="Title" value={draft.terminal.title} onChange={(v) => patchTerminal({ title: v })} />
              <TextField label="Description" value={draft.terminal.description} onChange={(v) => patchTerminal({ description: v })} multiline />
            </Grid2>

            <SubHeader
              label="Commands"
              count={draft.terminal.commands.length}
              addLabel="Add Command"
              onAdd={() =>
                patchTerminal({
                  commands: [...draft.terminal.commands, emptyTerminalCommand()],
                })
              }
            />
            <div className="grid gap-3 lg:grid-cols-2">
              {draft.terminal.commands.map((cmd, i) => (
                <EditableCard
                  key={i}
                  title={cmd.title}
                  subtitle={`> ${cmd.command}`}
                  onRemove={() =>
                    patchTerminal({ commands: removeAt(draft.terminal.commands, i) })
                  }
                >
                  <TextField label="Command" value={cmd.command} onChange={(v) => patchTerminal({ commands: replaceAt(draft.terminal.commands, i, { ...cmd, command: v }) })} />
                  <TextField label="Title" value={cmd.title} onChange={(v) => patchTerminal({ commands: replaceAt(draft.terminal.commands, i, { ...cmd, title: v }) })} />
                  <TextField label="Output Lines (one per line)" value={cmd.output.join("\n")} onChange={(v) => patchTerminal({ commands: replaceAt(draft.terminal.commands, i, { ...cmd, output: v.split("\n").filter(Boolean) }) })} multiline />
                </EditableCard>
              ))}
            </div>

            <SubHeader
              label="Metrics"
              count={draft.terminal.metrics.length}
              addLabel="Add Metric"
              onAdd={() =>
                patchTerminal({
                  metrics: [...draft.terminal.metrics, emptyTerminalMetric()],
                })
              }
            />
            <div className="grid gap-3 md:grid-cols-3">
              {draft.terminal.metrics.map((m, i) => (
                <EditableCard
                  key={i}
                  title={m.label}
                  subtitle={m.value}
                  onRemove={() =>
                    patchTerminal({ metrics: removeAt(draft.terminal.metrics, i) })
                  }
                >
                  <TextField label="Value" value={m.value} onChange={(v) => patchTerminal({ metrics: replaceAt(draft.terminal.metrics, i, { ...m, value: v }) })} />
                  <TextField label="Label" value={m.label} onChange={(v) => patchTerminal({ metrics: replaceAt(draft.terminal.metrics, i, { ...m, label: v }) })} />
                </EditableCard>
              ))}
            </div>
          </SectionPanel>

          {/* ── ABOUT ─────────────────────────────────────────────────── */}
          <SectionPanel
            id="about"
            title="About"
            icon={User2}
            description="Bio, career history, resume link, and stats."
            badge={`${draft.about.experiences.length} roles`}
          >
            <Grid2>
              <TextField label="Section Label" value={draft.about.sectionLabel} onChange={(v) => patchAbout({ sectionLabel: v })} />
              <TextField label="Resume URL" value={draft.about.resumeUrl} onChange={(v) => patchAbout({ resumeUrl: v })} />
              <TextField label="Primary Title" value={draft.about.titlePrimary} onChange={(v) => patchAbout({ titlePrimary: v })} />
              <TextField label="Secondary Title" value={draft.about.titleSecondary} onChange={(v) => patchAbout({ titleSecondary: v })} />
              <TextField label="Image Source" value={draft.about.imageSrc} onChange={(v) => patchAbout({ imageSrc: v })} />
              <TextField label="Image Alt" value={draft.about.imageAlt} onChange={(v) => patchAbout({ imageAlt: v })} />
              <TextField label="CTA Label" value={draft.about.ctaLabel} onChange={(v) => patchAbout({ ctaLabel: v })} />
              <TextField label="CTA Link" value={draft.about.ctaHref} onChange={(v) => patchAbout({ ctaHref: v })} />
              <TextField label="CTA Intro Text" value={draft.about.ctaText} onChange={(v) => patchAbout({ ctaText: v })} />
            </Grid2>
            <TextField
              label="Paragraphs (separate with blank line)"
              value={draft.about.paragraphs.join("\n\n")}
              onChange={(v) => patchAbout({ paragraphs: v.split("\n\n").filter(Boolean) })}
              multiline
            />

            <SubHeader
              label="Stats"
              count={draft.about.stats.length}
              addLabel="Add Stat"
              onAdd={() => patchAbout({ stats: [...draft.about.stats, emptyStat()] })}
            />
            <div className="grid gap-3 md:grid-cols-3">
              {draft.about.stats.map((stat, i) => (
                <EditableCard
                  key={i}
                  title={stat.label}
                  subtitle={`${stat.value}${stat.suffix}`}
                  onRemove={() => patchAbout({ stats: removeAt(draft.about.stats, i) })}
                >
                  <NumberField label="Value" value={stat.value} onChange={(v) => patchAbout({ stats: replaceAt(draft.about.stats, i, { ...stat, value: v }) })} />
                  <TextField label="Suffix" value={stat.suffix} onChange={(v) => patchAbout({ stats: replaceAt(draft.about.stats, i, { ...stat, suffix: v }) })} />
                  <TextField label="Label" value={stat.label} onChange={(v) => patchAbout({ stats: replaceAt(draft.about.stats, i, { ...stat, label: v }) })} />
                </EditableCard>
              ))}
            </div>

            <SubHeader
              label="Experience"
              count={draft.about.experiences.length}
              addLabel="Add Role"
              onAdd={() =>
                patchAbout({ experiences: [...draft.about.experiences, emptyExperience()] })
              }
            />
            <div className="grid gap-3 lg:grid-cols-2">
              {draft.about.experiences.map((exp, i) => (
                <EditableCard
                  key={`${exp.id}-${i}`}
                  title={exp.title}
                  subtitle={`${exp.company} · ${exp.date}`}
                  onRemove={() =>
                    patchAbout({ experiences: removeAt(draft.about.experiences, i) })
                  }
                >
                  <TextField label="Title" value={exp.title} onChange={(v) => patchAbout({ experiences: replaceAt(draft.about.experiences, i, { ...exp, title: v }) })} />
                  <TextField label="Company" value={exp.company} onChange={(v) => patchAbout({ experiences: replaceAt(draft.about.experiences, i, { ...exp, company: v }) })} />
                  <TextField label="Date Range" value={exp.date} onChange={(v) => patchAbout({ experiences: replaceAt(draft.about.experiences, i, { ...exp, date: v }) })} />
                  <TextField label="Description" value={exp.description} onChange={(v) => patchAbout({ experiences: replaceAt(draft.about.experiences, i, { ...exp, description: v }) })} multiline />
                  <ListField label="Tags" value={exp.tags} onChange={(v) => patchAbout({ experiences: replaceAt(draft.about.experiences, i, { ...exp, tags: v }) })} />
                </EditableCard>
              ))}
            </div>
          </SectionPanel>

          {/* ── WORKS ─────────────────────────────────────────────────── */}
          <SectionPanel
            id="works"
            title="Projects"
            icon={Code2}
            description="Portfolio cards with images, links, and tech stack."
            badge={`${draft.works.projects.length} projects`}
          >
            <Grid2>
              <TextField label="Section Label" value={draft.works.sectionLabel} onChange={(v) => patchWorks({ sectionLabel: v })} />
              <TextField label="GitHub URL" value={draft.works.githubUrl} onChange={(v) => patchWorks({ githubUrl: v })} />
              <TextField label="Primary Title" value={draft.works.titlePrimary} onChange={(v) => patchWorks({ titlePrimary: v })} />
              <TextField label="Secondary Title" value={draft.works.titleSecondary} onChange={(v) => patchWorks({ titleSecondary: v })} />
              <TextField label="GitHub Label" value={draft.works.githubLabel} onChange={(v) => patchWorks({ githubLabel: v })} />
            </Grid2>

            <SubHeader
              label="Projects"
              count={draft.works.projects.length}
              addLabel="Add Project"
              onAdd={() =>
                patchWorks({ projects: [...draft.works.projects, emptyProject()] })
              }
            />
            <div className="grid gap-3 lg:grid-cols-2">
              {draft.works.projects.map((proj, i) => (
                <EditableCard
                  key={i}
                  title={proj.title}
                  subtitle={`${proj.type} · ${proj.year}`}
                  onRemove={() =>
                    patchWorks({ projects: removeAt(draft.works.projects, i) })
                  }
                >
                  <TextField label="Title" value={proj.title} onChange={(v) => patchWorks({ projects: replaceAt(draft.works.projects, i, { ...proj, title: v }) })} />
                  <TextField label="Description" value={proj.description} onChange={(v) => patchWorks({ projects: replaceAt(draft.works.projects, i, { ...proj, description: v }) })} multiline />
                  <TextField
                    label="Image URL"
                    value={proj.image}
                    placeholder="https://images.example.com/project.jpg"
                    hint="Full URL or a local path like /project.png"
                    onChange={(v) => patchWorks({ projects: replaceAt(draft.works.projects, i, { ...proj, image: v }) })}
                  />
                  <TextField label="Project Link" value={proj.link} onChange={(v) => patchWorks({ projects: replaceAt(draft.works.projects, i, { ...proj, link: v }) })} />
                  <Grid2>
                    <TextField label="Type" value={proj.type} onChange={(v) => patchWorks({ projects: replaceAt(draft.works.projects, i, { ...proj, type: v }) })} />
                    <TextField label="Year" value={proj.year} onChange={(v) => patchWorks({ projects: replaceAt(draft.works.projects, i, { ...proj, year: v }) })} />
                  </Grid2>
                  <ListField label="Tech Stack" value={proj.tech} onChange={(v) => patchWorks({ projects: replaceAt(draft.works.projects, i, { ...proj, tech: v }) })} />
                </EditableCard>
              ))}
            </div>
          </SectionPanel>

          {/* ── SKILLS ────────────────────────────────────────────────── */}
          <SectionPanel
            id="skills"
            title="Skills"
            icon={Cpu}
            description="Grouped categories with Simple Icons slugs."
            badge={`${draft.skills.categories.length} groups`}
          >
            <Grid2>
              <TextField label="Primary Title" value={draft.skills.titlePrimary} onChange={(v) => patchSkills({ titlePrimary: v })} />
              <TextField label="Secondary Title" value={draft.skills.titleSecondary} onChange={(v) => patchSkills({ titleSecondary: v })} />
              <TextField label="Description" value={draft.skills.description} onChange={(v) => patchSkills({ description: v })} multiline />
              <TextField label="End Label" value={draft.skills.endLabel} onChange={(v) => patchSkills({ endLabel: v })} />
            </Grid2>

            <SubHeader
              label="Categories"
              count={draft.skills.categories.length}
              addLabel="Add Category"
              onAdd={() =>
                patchSkills({
                  categories: [...draft.skills.categories, emptySkillCategory()],
                })
              }
            />
            <div className="space-y-3">
              {draft.skills.categories.map((cat, ci) => (
                <EditableCard
                  key={`${cat.id}-${ci}`}
                  title={cat.title}
                  subtitle={`${cat.skills.length} skills`}
                  onRemove={() =>
                    patchSkills({ categories: removeAt(draft.skills.categories, ci) })
                  }
                >
                  <Grid2>
                    <TextField label="Category ID" value={cat.id} onChange={(v) => patchSkills({ categories: replaceAt(draft.skills.categories, ci, { ...cat, id: v }) })} />
                    <TextField label="Title" value={cat.title} onChange={(v) => patchSkills({ categories: replaceAt(draft.skills.categories, ci, { ...cat, title: v }) })} />
                    <TextField label="Color (hex)" value={cat.color} onChange={(v) => patchSkills({ categories: replaceAt(draft.skills.categories, ci, { ...cat, color: v }) })} />
                    <TextField label="Description" value={cat.description} onChange={(v) => patchSkills({ categories: replaceAt(draft.skills.categories, ci, { ...cat, description: v }) })} multiline />
                  </Grid2>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-600">
                        Skills ({cat.skills.length})
                      </span>
                      <AddButton
                        label="Add Skill"
                        onClick={() =>
                          patchSkills({
                            categories: replaceAt(draft.skills.categories, ci, {
                              ...cat,
                              skills: [...cat.skills, emptySkill()],
                            }),
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2 md:grid-cols-2">
                      {cat.skills.map((skill, si) => (
                        <div
                          key={si}
                          className="space-y-2 rounded-md border border-white/[0.06] bg-[#0a0a0a] p-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate text-xs font-medium text-white">
                              {skill.name}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                patchSkills({
                                  categories: replaceAt(draft.skills.categories, ci, {
                                    ...cat,
                                    skills: removeAt(cat.skills, si),
                                  }),
                                })
                              }
                              aria-label={`Remove ${skill.name}`}
                              className="flex h-6 w-6 items-center justify-center rounded text-zinc-700 transition hover:text-red-400"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                          <TextField
                            label="Name"
                            value={skill.name}
                            onChange={(v) =>
                              patchSkills({
                                categories: replaceAt(draft.skills.categories, ci, {
                                  ...cat,
                                  skills: replaceAt(cat.skills, si, { ...skill, name: v }),
                                }),
                              })
                            }
                          />
                          <TextField
                            label="Simple Icons Slug"
                            value={skill.icon}
                            placeholder="react"
                            onChange={(v) =>
                              patchSkills({
                                categories: replaceAt(draft.skills.categories, ci, {
                                  ...cat,
                                  skills: replaceAt(cat.skills, si, { ...skill, icon: v }),
                                }),
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </EditableCard>
              ))}
            </div>
          </SectionPanel>

          {/* ── CONTACT ───────────────────────────────────────────────── */}
          <SectionPanel
            id="contact"
            title="Contact"
            icon={Mail}
            description="CTA copy, social links, and footer details."
            badge={`${draft.contact.links.length} links`}
          >
            <Grid2>
              <TextField label="Section Label" value={draft.contact.sectionLabel} onChange={(v) => patchContact({ sectionLabel: v })} />
              <TextField label="Location Label" value={draft.contact.locationLabel} onChange={(v) => patchContact({ locationLabel: v })} />
              <TextField label="Primary Title" value={draft.contact.titlePrimary} onChange={(v) => patchContact({ titlePrimary: v })} />
              <TextField label="Secondary Title" value={draft.contact.titleSecondary} onChange={(v) => patchContact({ titleSecondary: v })} />
              <TextField label="Copyright Name" value={draft.contact.copyrightName} onChange={(v) => patchContact({ copyrightName: v })} />
              <TextField label="Rights Label" value={draft.contact.rightsLabel} onChange={(v) => patchContact({ rightsLabel: v })} />
              <TextField label="Back To Top Label" value={draft.contact.backToTopLabel} onChange={(v) => patchContact({ backToTopLabel: v })} />
              <TextField label="Availability Text" value={draft.contact.availabilityText} onChange={(v) => patchContact({ availabilityText: v })} multiline />
            </Grid2>

            <SubHeader
              label="Links"
              count={draft.contact.links.length}
              addLabel="Add Link"
              onAdd={() =>
                patchContact({ links: [...draft.contact.links, emptyContactLink()] })
              }
            />
            <div className="grid gap-3 lg:grid-cols-2">
              {draft.contact.links.map((link, i) => (
                <EditableCard
                  key={`${link.id}-${i}`}
                  title={link.label}
                  subtitle={link.value}
                  onRemove={() =>
                    patchContact({ links: removeAt(draft.contact.links, i) })
                  }
                >
                  <TextField label="ID" value={link.id} onChange={(v) => patchContact({ links: replaceAt(draft.contact.links, i, { ...link, id: v }) })} />
                  <TextField label="Label" value={link.label} onChange={(v) => patchContact({ links: replaceAt(draft.contact.links, i, { ...link, label: v }) })} />
                  <TextField label="Display Value" value={link.value} onChange={(v) => patchContact({ links: replaceAt(draft.contact.links, i, { ...link, value: v }) })} />
                  <TextField label="URL" value={link.href} onChange={(v) => patchContact({ links: replaceAt(draft.contact.links, i, { ...link, href: v }) })} />
                </EditableCard>
              ))}
            </div>
          </SectionPanel>

          {/* Bottom spacer */}
          <div className="h-16" />
        </div>
      </main>
    </div>
  );
}

/* ─── Login Screen ───────────────────────────────────────────────────────── */

function LoginScreen() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
      if (cred.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setError("Access denied for this account.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-4">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, #00ffa308 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-2xl shadow-black/50">
          {/* Top stripe */}
          <div className="h-0.5 w-full" style={{ background: ACCENT }} />

          <div className="p-8">
            {/* Brand */}
            <div className="mb-8 flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold"
                style={{ background: ACCENT_DIM, color: ACCENT }}
              >
                ◈
              </span>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-white">
                  Admin Portal
                </p>
                <p className="text-[10px] font-mono text-zinc-600">
                  portfolio.cms
                </p>
              </div>
            </div>

            <h1 className="mb-1 text-2xl font-bold text-white">Welcome back</h1>
            <p className="mb-8 text-sm text-zinc-600">
              Restricted to the configured admin account.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email (read-only display) */}
              <div className="space-y-1.5">
                <span className="block text-[10px] font-semibold tracking-widest uppercase text-zinc-600">
                  Email
                </span>
                <div className="rounded-md border border-white/[0.06] bg-[#0d0d0d] px-3 py-2.5 font-mono text-sm text-zinc-500">
                  {ADMIN_EMAIL}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <span className="block text-[10px] font-semibold tracking-widest uppercase text-zinc-600">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={fieldCls}
                  autoFocus
                />
              </div>

              {error && (
                <p className="rounded-md border border-red-900/50 bg-red-950/30 px-3 py-2 text-xs font-mono text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all disabled:opacity-50"
                style={{ background: ACCENT, color: "#000" }}
              >
                <LogIn className="h-4 w-4" />
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-zinc-700">
          Use the password configured in Firebase Authentication.
        </p>
      </div>
    </main>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function AdminPage() {
  const { content, isLoading, error } = usePortfolioContent();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const editorKey = useMemo(() => JSON.stringify(content), [content]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      if (nextUser?.email && nextUser.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setUser(null);
      } else {
        setUser(nextUser);
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808]">
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 animate-ping rounded-full"
            style={{ background: ACCENT }}
          />
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-600">
            Checking session…
          </p>
        </div>
      </main>
    );
  }

  if (!user?.email || user.email !== ADMIN_EMAIL) {
    return <LoginScreen />;
  }

  return (
    <>
      {error && (
        <div className="sticky top-0 z-50 bg-red-950/80 px-4 py-2 text-xs font-mono text-red-400">
          {error}
        </div>
      )}
      {isLoading ? (
        <main className="flex min-h-screen items-center justify-center bg-[#080808]">
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 animate-ping rounded-full"
              style={{ background: ACCENT }}
            />
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-600">
              Loading content…
            </p>
          </div>
        </main>
      ) : (
        <AdminEditor key={editorKey} initialContent={content} />
      )}
    </>
  );
}