"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { LogOut, Plus, RotateCcw, Save, Trash2 } from "lucide-react";

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

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  hint?: string;
};

const fieldClassName =
  "w-full rounded-[8px] border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-emerald-400";

function TextField({ label, value, onChange, multiline = false, placeholder, hint }: TextFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="block text-xs font-medium uppercase text-neutral-400">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          rows={4}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClassName}
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClassName}
        />
      )}
      {hint ? <span className="block text-xs leading-5 text-neutral-500">{hint}</span> : null}
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
  onChange: (value: number) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-xs font-medium uppercase text-neutral-400">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={fieldClassName}
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
  onChange: (value: string[]) => void;
  placeholder?: string;
}) {
  return (
    <TextField
      label={label}
      value={value.join(", ")}
      placeholder={placeholder}
      onChange={(nextValue) =>
        onChange(nextValue.split(",").map((item) => item.trim()).filter(Boolean))
      }
    />
  );
}

function SectionPanel({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const sectionId = id ?? title.toLowerCase().replace(/\s+/g, "-");

  return (
    <section id={sectionId} className="scroll-mt-28 space-y-6 rounded-[8px] border border-white/10 bg-black/35 p-5">
      <div>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-400">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function EditableCard({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove: () => void;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="min-w-0 truncate text-sm font-semibold text-white">{title}</h3>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-white/10 text-neutral-400 transition hover:border-red-400 hover:text-red-300"
          aria-label={`Remove ${title}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      {children}
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-[8px] border border-white/10 px-4 py-2 text-sm text-white transition hover:border-emerald-400 hover:text-emerald-300"
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}

function replaceAt<T>(items: T[], index: number, nextItem: T) {
  return items.map((item, itemIndex) => (itemIndex === index ? nextItem : item));
}

function removeAt<T>(items: T[], index: number) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

const emptyExperience = (): ExperienceItem => ({
  id: Date.now().toString(),
  title: "New Role",
  company: "Company",
  date: "2026 - Present",
  description: "Describe the work and measurable impact.",
  tags: ["React", "Next.js"],
});

const emptyStat = (): StatItem => ({
  value: 1,
  suffix: "+",
  label: "Metric",
});

const emptyProject = (): ProjectItem => ({
  title: "New Project",
  description: "Describe what it does and why it matters.",
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  link: "#",
  type: "Fullstack",
  year: "2026",
  tech: ["Next.js", "Firebase"],
});

const emptySkill = (): SkillItem => ({
  name: "New Skill",
  icon: "code",
});

const emptySkillCategory = (): SkillCategory => ({
  id: `category-${Date.now()}`,
  title: "New Category",
  description: "Describe this skill group.",
  color: "#ffffff",
  skills: [emptySkill()],
});

const emptyContactLink = (): ContactLink => ({
  id: Date.now().toString().slice(-2),
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

const adminSections = [
  { id: "hero", label: "Hero" },
  { id: "terminal-feature", label: "Terminal" },
  { id: "about", label: "About" },
  { id: "works", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function AdminEditor({ initialContent }: { initialContent: PortfolioContent }) {
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [draft, setDraft] = useState<PortfolioContent>(initialContent);

  async function handleSave() {
    setSaveState("saving");
    setSaveError(null);

    try {
      await savePortfolioContent(draft);
      setSaveState("saved");
    } catch (nextError) {
      setSaveState("error");
      setSaveError(nextError instanceof Error ? nextError.message : "Could not save content.");
    }
  }

  function resetDraft() {
    setDraft(initialContent);
    setSaveState("idle");
    setSaveError(null);
  }

  function updateExperience(index: number, nextItem: ExperienceItem) {
    setDraft((current) => ({
      ...current,
      about: {
        ...current.about,
        experiences: replaceAt(current.about.experiences, index, nextItem),
      },
    }));
  }

  function updateStat(index: number, nextItem: StatItem) {
    setDraft((current) => ({
      ...current,
      about: {
        ...current.about,
        stats: replaceAt(current.about.stats, index, nextItem),
      },
    }));
  }

  function updateProject(index: number, nextItem: ProjectItem) {
    setDraft((current) => ({
      ...current,
      works: {
        ...current.works,
        projects: replaceAt(current.works.projects, index, nextItem),
      },
    }));
  }

  function updateSkillCategory(index: number, nextItem: SkillCategory) {
    setDraft((current) => ({
      ...current,
      skills: {
        ...current.skills,
        categories: replaceAt(current.skills.categories, index, nextItem),
      },
    }));
  }

  function updateContactLink(index: number, nextItem: ContactLink) {
    setDraft((current) => ({
      ...current,
      contact: {
        ...current.contact,
        links: replaceAt(current.contact.links, index, nextItem),
      },
    }));
  }

  function updateTerminalCommand(index: number, nextItem: TerminalCommand) {
    setDraft((current) => ({
      ...current,
      terminal: {
        ...current.terminal,
        commands: replaceAt(current.terminal.commands, index, nextItem),
      },
    }));
  }

  function updateTerminalMetric(index: number, nextItem: TerminalMetric) {
    setDraft((current) => ({
      ...current,
      terminal: {
        ...current.terminal,
        metrics: replaceAt(current.terminal.metrics, index, nextItem),
      },
    }));
  }

  return (
    <>
      <div className="sticky top-4 z-20 flex flex-col gap-4 rounded-[8px] border border-white/10 bg-black/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 font-mono text-xs uppercase text-emerald-400">Admin Portal</p>
          <h1 className="text-4xl font-semibold text-white">Edit your live portfolio</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-400">
            Use the cards below to update the Firestore document <span className="text-white">siteContent/portfolio</span>. No raw JSON needed now.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-neutral-400">
            <span className="rounded-[6px] border border-white/10 px-2.5 py-1">{draft.works.projects.length} projects</span>
            <span className="rounded-[6px] border border-white/10 px-2.5 py-1">{draft.about.experiences.length} experiences</span>
            <span className="rounded-[6px] border border-white/10 px-2.5 py-1">{draft.skills.categories.length} skill groups</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetDraft}
            className="inline-flex items-center gap-2 rounded-[8px] border border-white/10 px-4 py-2.5 text-sm text-white transition hover:border-white/30"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-[8px] bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-300"
          >
            <Save className="h-4 w-4" />
            {saveState === "saving" ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => signOut(auth)}
            className="inline-flex items-center gap-2 rounded-[8px] border border-white/10 px-4 py-2.5 text-sm text-white transition hover:border-red-400 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {saveState === "saved" ? <p className="text-sm text-emerald-400">Content saved successfully.</p> : null}
      {saveError ? <p className="text-sm text-red-400">{saveError}</p> : null}

      <nav className="sticky top-40 z-10 flex gap-2 overflow-x-auto rounded-[8px] border border-white/10 bg-black/60 p-2 backdrop-blur-xl">
        {adminSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="shrink-0 rounded-[8px] px-3 py-2 text-sm text-neutral-300 transition hover:bg-white/10 hover:text-white"
          >
            {section.label}
          </a>
        ))}
      </nav>

      <SectionPanel title="Hero" description="Edit the first impression: name, positioning, availability, and primary actions.">
        <div className="grid gap-4 lg:grid-cols-2">
          <TextField label="Availability Label" value={draft.hero.availabilityText} onChange={(value) => setDraft((current) => ({ ...current, hero: { ...current.hero, availabilityText: value } }))} />
          <TextField label="Description" value={draft.hero.description} onChange={(value) => setDraft((current) => ({ ...current, hero: { ...current.hero, description: value } }))} multiline />
          <TextField label="First Name" value={draft.hero.firstName} onChange={(value) => setDraft((current) => ({ ...current, hero: { ...current.hero, firstName: value } }))} />
          <TextField label="Last Name" value={draft.hero.lastName} onChange={(value) => setDraft((current) => ({ ...current, hero: { ...current.hero, lastName: value } }))} />
          <TextField label="Role Line" value={draft.hero.role} onChange={(value) => setDraft((current) => ({ ...current, hero: { ...current.hero, role: value } }))} multiline />
          <TextField label="Primary CTA Label" value={draft.hero.primaryCtaLabel} onChange={(value) => setDraft((current) => ({ ...current, hero: { ...current.hero, primaryCtaLabel: value } }))} />
          <TextField label="Primary CTA Link" value={draft.hero.primaryCtaHref} onChange={(value) => setDraft((current) => ({ ...current, hero: { ...current.hero, primaryCtaHref: value } }))} />
          <TextField label="Secondary CTA Label" value={draft.hero.secondaryCtaLabel} onChange={(value) => setDraft((current) => ({ ...current, hero: { ...current.hero, secondaryCtaLabel: value } }))} />
          <TextField label="Secondary CTA Link" value={draft.hero.secondaryCtaHref} onChange={(value) => setDraft((current) => ({ ...current, hero: { ...current.hero, secondaryCtaHref: value } }))} />
        </div>
      </SectionPanel>

      <SectionPanel title="Terminal Feature" description="Control the interactive terminal block that shows your working style and proof points.">
        <div className="grid gap-4 lg:grid-cols-2">
          <TextField label="Eyebrow" value={draft.terminal.eyebrow} onChange={(value) => setDraft((current) => ({ ...current, terminal: { ...current.terminal, eyebrow: value } }))} />
          <TextField label="Prompt" value={draft.terminal.prompt} onChange={(value) => setDraft((current) => ({ ...current, terminal: { ...current.terminal, prompt: value } }))} />
          <TextField label="Title" value={draft.terminal.title} onChange={(value) => setDraft((current) => ({ ...current, terminal: { ...current.terminal, title: value } }))} />
          <TextField label="Description" value={draft.terminal.description} onChange={(value) => setDraft((current) => ({ ...current, terminal: { ...current.terminal, description: value } }))} multiline />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">Commands</h3>
            <AddButton label="Add Command" onClick={() => setDraft((current) => ({ ...current, terminal: { ...current.terminal, commands: [...current.terminal.commands, emptyTerminalCommand()] } }))} />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {draft.terminal.commands.map((command, index) => (
              <EditableCard
                key={`${command.command}-${index}`}
                title={command.title}
                onRemove={() => setDraft((current) => ({ ...current, terminal: { ...current.terminal, commands: removeAt(current.terminal.commands, index) } }))}
              >
                <div className="grid gap-4">
                  <TextField label="Command" value={command.command} onChange={(value) => updateTerminalCommand(index, { ...command, command: value })} />
                  <TextField label="Title" value={command.title} onChange={(value) => updateTerminalCommand(index, { ...command, title: value })} />
                  <TextField label="Output Lines" value={command.output.join("\n")} onChange={(value) => updateTerminalCommand(index, { ...command, output: value.split("\n").filter(Boolean) })} multiline />
                </div>
              </EditableCard>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">Metrics</h3>
            <AddButton label="Add Metric" onClick={() => setDraft((current) => ({ ...current, terminal: { ...current.terminal, metrics: [...current.terminal.metrics, emptyTerminalMetric()] } }))} />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {draft.terminal.metrics.map((metric, index) => (
              <EditableCard
                key={`${metric.value}-${index}`}
                title={metric.label}
                onRemove={() => setDraft((current) => ({ ...current, terminal: { ...current.terminal, metrics: removeAt(current.terminal.metrics, index) } }))}
              >
                <div className="grid gap-4">
                  <TextField label="Value" value={metric.value} onChange={(value) => updateTerminalMetric(index, { ...metric, value })} />
                  <TextField label="Label" value={metric.label} onChange={(value) => updateTerminalMetric(index, { ...metric, label: value })} />
                </div>
              </EditableCard>
            ))}
          </div>
        </div>
      </SectionPanel>

      <SectionPanel title="About" description="Maintain your bio, career history, resume link, and quick credibility stats.">
        <div className="grid gap-4 lg:grid-cols-2">
          <TextField label="Section Label" value={draft.about.sectionLabel} onChange={(value) => setDraft((current) => ({ ...current, about: { ...current.about, sectionLabel: value } }))} />
          <TextField label="Resume URL" value={draft.about.resumeUrl} onChange={(value) => setDraft((current) => ({ ...current, about: { ...current.about, resumeUrl: value } }))} />
          <TextField label="Primary Title" value={draft.about.titlePrimary} onChange={(value) => setDraft((current) => ({ ...current, about: { ...current.about, titlePrimary: value } }))} />
          <TextField label="Secondary Title" value={draft.about.titleSecondary} onChange={(value) => setDraft((current) => ({ ...current, about: { ...current.about, titleSecondary: value } }))} />
          <TextField label="Image Source" value={draft.about.imageSrc} onChange={(value) => setDraft((current) => ({ ...current, about: { ...current.about, imageSrc: value } }))} />
          <TextField label="Image Alt" value={draft.about.imageAlt} onChange={(value) => setDraft((current) => ({ ...current, about: { ...current.about, imageAlt: value } }))} />
          <TextField label="Paragraphs" value={draft.about.paragraphs.join("\n\n")} onChange={(value) => setDraft((current) => ({ ...current, about: { ...current.about, paragraphs: value.split("\n\n").filter(Boolean) } }))} multiline />
          <TextField label="CTA Label" value={draft.about.ctaLabel} onChange={(value) => setDraft((current) => ({ ...current, about: { ...current.about, ctaLabel: value } }))} />
          <TextField label="CTA Link" value={draft.about.ctaHref} onChange={(value) => setDraft((current) => ({ ...current, about: { ...current.about, ctaHref: value } }))} />
          <TextField label="CTA Intro" value={draft.about.ctaText} onChange={(value) => setDraft((current) => ({ ...current, about: { ...current.about, ctaText: value } }))} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">Stats</h3>
            <AddButton label="Add Stat" onClick={() => setDraft((current) => ({ ...current, about: { ...current.about, stats: [...current.about.stats, emptyStat()] } }))} />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {draft.about.stats.map((stat, index) => (
              <EditableCard
                key={`${stat.label}-${index}`}
                title={stat.label}
                onRemove={() => setDraft((current) => ({ ...current, about: { ...current.about, stats: removeAt(current.about.stats, index) } }))}
              >
                <div className="grid gap-4">
                  <NumberField label="Value" value={stat.value} onChange={(value) => updateStat(index, { ...stat, value })} />
                  <TextField label="Suffix" value={stat.suffix} onChange={(value) => updateStat(index, { ...stat, suffix: value })} />
                  <TextField label="Label" value={stat.label} onChange={(value) => updateStat(index, { ...stat, label: value })} />
                </div>
              </EditableCard>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">Experiences</h3>
            <AddButton label="Add Experience" onClick={() => setDraft((current) => ({ ...current, about: { ...current.about, experiences: [...current.about.experiences, emptyExperience()] } }))} />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {draft.about.experiences.map((experience, index) => (
              <EditableCard
                key={`${experience.id}-${index}`}
                title={experience.title}
                onRemove={() => setDraft((current) => ({ ...current, about: { ...current.about, experiences: removeAt(current.about.experiences, index) } }))}
              >
                <div className="grid gap-4">
                  <TextField label="Title" value={experience.title} onChange={(value) => updateExperience(index, { ...experience, title: value })} />
                  <TextField label="Company" value={experience.company} onChange={(value) => updateExperience(index, { ...experience, company: value })} />
                  <TextField label="Date" value={experience.date} onChange={(value) => updateExperience(index, { ...experience, date: value })} />
                  <TextField label="Description" value={experience.description} onChange={(value) => updateExperience(index, { ...experience, description: value })} multiline />
                  <ListField label="Tags" value={experience.tags} onChange={(value) => updateExperience(index, { ...experience, tags: value })} />
                </div>
              </EditableCard>
            ))}
          </div>
        </div>
      </SectionPanel>

      <SectionPanel title="Works" description="Add polished portfolio cards. Project images can be local paths or full HTTPS image URLs.">
        <div className="grid gap-4 lg:grid-cols-2">
          <TextField label="Section Label" value={draft.works.sectionLabel} onChange={(value) => setDraft((current) => ({ ...current, works: { ...current.works, sectionLabel: value } }))} />
          <TextField label="GitHub URL" value={draft.works.githubUrl} onChange={(value) => setDraft((current) => ({ ...current, works: { ...current.works, githubUrl: value } }))} />
          <TextField label="Primary Title" value={draft.works.titlePrimary} onChange={(value) => setDraft((current) => ({ ...current, works: { ...current.works, titlePrimary: value } }))} />
          <TextField label="Secondary Title" value={draft.works.titleSecondary} onChange={(value) => setDraft((current) => ({ ...current, works: { ...current.works, titleSecondary: value } }))} />
          <TextField label="GitHub Label" value={draft.works.githubLabel} onChange={(value) => setDraft((current) => ({ ...current, works: { ...current.works, githubLabel: value } }))} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">Projects</h3>
          <AddButton label="Add Project" onClick={() => setDraft((current) => ({ ...current, works: { ...current.works, projects: [...current.works.projects, emptyProject()] } }))} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {draft.works.projects.map((project, index) => (
            <EditableCard
              key={`${project.title}-${index}`}
              title={project.title}
              onRemove={() => setDraft((current) => ({ ...current, works: { ...current.works, projects: removeAt(current.works.projects, index) } }))}
            >
              <div className="grid gap-4">
                <TextField label="Title" value={project.title} onChange={(value) => updateProject(index, { ...project, title: value })} />
                <TextField label="Description" value={project.description} onChange={(value) => updateProject(index, { ...project, description: value })} multiline />
                <TextField
                  label="Image URL"
                  value={project.image}
                  placeholder="https://images.example.com/project.jpg"
                  hint="Use a full image URL, or keep a local path like /e-commerce.png."
                  onChange={(value) => updateProject(index, { ...project, image: value })}
                />
                <TextField label="Project Link" value={project.link} onChange={(value) => updateProject(index, { ...project, link: value })} />
                <TextField label="Type" value={project.type} onChange={(value) => updateProject(index, { ...project, type: value })} />
                <TextField label="Year" value={project.year} onChange={(value) => updateProject(index, { ...project, year: value })} />
                <ListField label="Tech" value={project.tech} onChange={(value) => updateProject(index, { ...project, tech: value })} />
              </div>
            </EditableCard>
          ))}
        </div>
      </SectionPanel>

      <SectionPanel title="Skills" description="Group your stack by category and use Simple Icons slugs for crisp technology icons.">
        <div className="grid gap-4 lg:grid-cols-2">
          <TextField label="Primary Title" value={draft.skills.titlePrimary} onChange={(value) => setDraft((current) => ({ ...current, skills: { ...current.skills, titlePrimary: value } }))} />
          <TextField label="Secondary Title" value={draft.skills.titleSecondary} onChange={(value) => setDraft((current) => ({ ...current, skills: { ...current.skills, titleSecondary: value } }))} />
          <TextField label="Description" value={draft.skills.description} onChange={(value) => setDraft((current) => ({ ...current, skills: { ...current.skills, description: value } }))} multiline />
          <TextField label="End Label" value={draft.skills.endLabel} onChange={(value) => setDraft((current) => ({ ...current, skills: { ...current.skills, endLabel: value } }))} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">Skill Categories</h3>
          <AddButton label="Add Category" onClick={() => setDraft((current) => ({ ...current, skills: { ...current.skills, categories: [...current.skills.categories, emptySkillCategory()] } }))} />
        </div>
        <div className="grid gap-4">
          {draft.skills.categories.map((category, categoryIndex) => (
            <EditableCard
              key={`${category.id}-${categoryIndex}`}
              title={category.title}
              onRemove={() => setDraft((current) => ({ ...current, skills: { ...current.skills, categories: removeAt(current.skills.categories, categoryIndex) } }))}
            >
              <div className="grid gap-4 lg:grid-cols-2">
                <TextField label="Category ID" value={category.id} onChange={(value) => updateSkillCategory(categoryIndex, { ...category, id: value })} />
                <TextField label="Title" value={category.title} onChange={(value) => updateSkillCategory(categoryIndex, { ...category, title: value })} />
                <TextField label="Color" value={category.color} onChange={(value) => updateSkillCategory(categoryIndex, { ...category, color: value })} />
                <TextField label="Description" value={category.description} onChange={(value) => updateSkillCategory(categoryIndex, { ...category, description: value })} multiline />
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-sm font-semibold text-neutral-300">Skills</h4>
                  <AddButton
                    label="Add Skill"
                    onClick={() => updateSkillCategory(categoryIndex, { ...category, skills: [...category.skills, emptySkill()] })}
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={`${skill.name}-${skillIndex}`} className="grid gap-3 rounded-[8px] border border-white/10 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm text-white">{skill.name}</p>
                        <button
                          type="button"
                          onClick={() => updateSkillCategory(categoryIndex, { ...category, skills: removeAt(category.skills, skillIndex) })}
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border border-white/10 text-neutral-400 transition hover:border-red-400 hover:text-red-300"
                          aria-label={`Remove ${skill.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <TextField
                        label="Name"
                        value={skill.name}
                        onChange={(value) => {
                          const nextSkill = { ...skill, name: value };
                          updateSkillCategory(categoryIndex, { ...category, skills: replaceAt(category.skills, skillIndex, nextSkill) });
                        }}
                      />
                      <TextField
                        label="Simple Icons Slug"
                        value={skill.icon}
                        onChange={(value) => {
                          const nextSkill = { ...skill, icon: value };
                          updateSkillCategory(categoryIndex, { ...category, skills: replaceAt(category.skills, skillIndex, nextSkill) });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </EditableCard>
          ))}
        </div>
      </SectionPanel>

      <SectionPanel title="Contact" description="Update your contact CTA, social links, resume link, and footer details.">
        <div className="grid gap-4 lg:grid-cols-2">
          <TextField label="Section Label" value={draft.contact.sectionLabel} onChange={(value) => setDraft((current) => ({ ...current, contact: { ...current.contact, sectionLabel: value } }))} />
          <TextField label="Location Label" value={draft.contact.locationLabel} onChange={(value) => setDraft((current) => ({ ...current, contact: { ...current.contact, locationLabel: value } }))} />
          <TextField label="Primary Title" value={draft.contact.titlePrimary} onChange={(value) => setDraft((current) => ({ ...current, contact: { ...current.contact, titlePrimary: value } }))} />
          <TextField label="Secondary Title" value={draft.contact.titleSecondary} onChange={(value) => setDraft((current) => ({ ...current, contact: { ...current.contact, titleSecondary: value } }))} />
          <TextField label="Availability Text" value={draft.contact.availabilityText} onChange={(value) => setDraft((current) => ({ ...current, contact: { ...current.contact, availabilityText: value } }))} multiline />
          <TextField label="Copyright Name" value={draft.contact.copyrightName} onChange={(value) => setDraft((current) => ({ ...current, contact: { ...current.contact, copyrightName: value } }))} />
          <TextField label="Rights Label" value={draft.contact.rightsLabel} onChange={(value) => setDraft((current) => ({ ...current, contact: { ...current.contact, rightsLabel: value } }))} />
          <TextField label="Back To Top Label" value={draft.contact.backToTopLabel} onChange={(value) => setDraft((current) => ({ ...current, contact: { ...current.contact, backToTopLabel: value } }))} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">Links</h3>
          <AddButton label="Add Link" onClick={() => setDraft((current) => ({ ...current, contact: { ...current.contact, links: [...current.contact.links, emptyContactLink()] } }))} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {draft.contact.links.map((link, index) => (
            <EditableCard
              key={`${link.id}-${index}`}
              title={link.label}
              onRemove={() => setDraft((current) => ({ ...current, contact: { ...current.contact, links: removeAt(current.contact.links, index) } }))}
            >
              <div className="grid gap-4">
                <TextField label="ID" value={link.id} onChange={(value) => updateContactLink(index, { ...link, id: value })} />
                <TextField label="Label" value={link.label} onChange={(value) => updateContactLink(index, { ...link, label: value })} />
                <TextField label="Display Value" value={link.value} onChange={(value) => updateContactLink(index, { ...link, value })} />
                <TextField label="URL" value={link.href} onChange={(value) => updateContactLink(index, { ...link, href: value })} />
              </div>
            </EditableCard>
          ))}
        </div>
      </SectionPanel>
    </>
  );
}

export default function AdminPage() {
  const { content, isLoading, error } = usePortfolioContent();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
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

    return () => unsubscribe();
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError(null);

    try {
      const credentials = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);

      if (credentials.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setLoginError("This admin portal only allows the configured admin email.");
        return;
      }

      setPassword("");
    } catch (nextError) {
      setLoginError(nextError instanceof Error ? nextError.message : "Login failed.");
    }
  }

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
        <p className="font-mono text-sm uppercase text-neutral-400">Checking admin session...</p>
      </main>
    );
  }

  if (!user?.email || user.email !== ADMIN_EMAIL) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-md rounded-[8px] border border-white/10 bg-black/50 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <p className="mb-3 font-mono text-xs uppercase text-emerald-400">Admin Portal</p>
          <h1 className="mb-3 text-4xl font-semibold text-white">Portfolio Control Room</h1>
          <p className="mb-8 text-sm leading-6 text-neutral-400">
            Login is locked to <span className="text-white">{ADMIN_EMAIL}</span>. Use the password configured for this user in Firebase Authentication.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <label className="block space-y-2">
              <span className="text-xs font-medium uppercase text-neutral-400">Email</span>
              <input value={ADMIN_EMAIL} readOnly className="w-full rounded-[8px] border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-neutral-400 outline-none" />
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-medium uppercase text-neutral-400">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={fieldClassName}
                placeholder="Enter admin password"
              />
            </label>

            {loginError ? <p className="text-sm text-red-400">{loginError}</p> : null}

            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-300">
              <LogOut className="h-4 w-4 rotate-180" />
              Sign In
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {isLoading ? <p className="text-sm text-neutral-400">Loading current content...</p> : null}
        {!isLoading ? <AdminEditor key={editorKey} initialContent={content} /> : null}
      </div>
    </main>
  );
}
