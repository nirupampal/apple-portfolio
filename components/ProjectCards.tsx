"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Expand } from "lucide-react";
import type { ProjectItem } from "@/lib/portfolio-content";
import { projectPath } from "@/lib/project-case-studies";
import ProjectGallery from "./ProjectGallery";
import styles from "./portfolio.module.css";

export default function ProjectCards({ projects, filterable = false, layout = "three" }: { projects: ProjectItem[]; filterable?: boolean; layout?: "two" | "three" }) {
  const [filter, setFilter] = useState("All work");
  const [gallery, setGallery] = useState<ProjectItem | null>(null);
  const visible = filter === "BuildNerd" ? projects.filter(project => project.category === "business") : filter === "Mobile" ? projects.filter(project => project.mobile) : projects;
  return <>
    {filterable && <div className={styles.filters} role="group" aria-label="Filter projects">{["All work", "BuildNerd", "Mobile"].map(label => <button key={label} onClick={() => setFilter(label)} aria-pressed={filter === label} className={filter === label ? styles.activeFilter : ""}>{label}</button>)}</div>}
    <div className={`${styles.projectGrid} ${layout === "two" ? styles.twoColumnCards : styles.threeColumnCards}`}>{visible.map(project => {
      const screenshots=project.screenshots ?? [];
      return <article key={project.title} className={`${styles.project} ${project.featured ? styles.featured : ""}`}>
        <Link href={projectPath(project)} className={`${styles.projectVisual} ${styles.screenshotVisual} ${project.mobile ? styles.mobileVisual : styles.desktopVisual}`} style={{background:project.mobile ? "#e0e7d8" : "#e1e8ec"}} aria-label={`Read ${project.title} case study`}>
          <div className={project.mobile ? styles.phoneScreens : styles.desktopScreen}>{screenshots.slice(0,project.mobile ? 2 : 1).map(shot => <div key={shot.src} className={project.mobile ? styles.phoneFrame : styles.browserFrame}>
            {!project.mobile && <div className={styles.browserBar}><span/><span/><span/><p>{new URL(project.link).hostname}</p></div>}
            <Image src={shot.src} alt={shot.alt} width={project.mobile ? 720 : 1440} height={project.mobile ? 1600 : 900} sizes={project.mobile ? "(max-width: 700px) 38vw, 230px" : "(max-width: 700px) 90vw, 600px"} className={styles.actualScreen}/>
          </div>)}</div><span className={styles.screenLabel}>READ THE CASE STUDY</span><span className={styles.visitArrow}><ArrowUpRight size={18}/></span>
        </Link>
        <div className={styles.projectMeta}><span>{project.type}</span>{project.badge && <span className={styles.badge}>{project.badge}</span>}</div>
        <h3><Link href={projectPath(project)}>{project.title}<ArrowUpRight size={19}/></Link></h3><p>{project.description}</p><div className={styles.tags}>{project.tech.map(tech=><span key={tech}>{tech}</span>)}</div>
        <div className={styles.projectActions}><Link href={projectPath(project)}>View case study <ArrowUpRight size={14}/></Link>{screenshots.length>0 && <button type="button" onClick={() => setGallery(project)}>Screenshots <Expand size={13}/></button>}</div>
      </article>;
    })}</div>
    {visible.length===0 && <p className={styles.emptyState}>No projects in this category yet.</p>}
    {gallery && <ProjectGallery key={gallery.title} project={gallery} onClose={() => setGallery(null)}/>}
  </>;
}
