"use client";
import Image from "next/image";
import { useState } from "react";
import { Expand } from "lucide-react";
import type { ProjectItem } from "@/lib/portfolio-content";
import ProjectGallery from "./ProjectGallery";
import styles from "./portfolio.module.css";
export default function ProjectScreens({ project }: { project: ProjectItem }) {
  const [selected,setSelected]=useState<number | null>(null);
  return <><div className={`${styles.caseScreens} ${project.mobile ? styles.mobileCaseScreens : ""}`}>
    {(project.screenshots ?? []).map((shot,i)=><figure key={shot.src}><button type="button" onClick={()=>setSelected(i)} aria-label={`Open ${project.title} screenshot ${i+1}`}><Image src={shot.src} alt={shot.alt} width={project.mobile?720:1440} height={project.mobile?1600:900} sizes={project.mobile?"(max-width: 700px) 85vw, 300px":"(max-width: 700px) 90vw, 1000px"}/><span><Expand size={17}/></span></button><figcaption><span>0{i+1}</span>{shot.alt}</figcaption></figure>)}
  </div>{selected !== null && <ProjectGallery key={`${project.title}-${selected}`} project={project} initialIndex={selected} onClose={()=>setSelected(null)}/>}</>;
}
