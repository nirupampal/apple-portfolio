"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectItem } from "@/lib/portfolio-content";
import styles from "./portfolio.module.css";

export default function ProjectGallery({ project, onClose, initialIndex = 0 }: { project: ProjectItem; onClose: () => void; initialIndex?: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const screenshots = project.screenshots ?? [];
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (element && !element.open) element.showModal();
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);
  function move(direction: number) { setIndex(current => (current + direction + screenshots.length) % screenshots.length); }
  return <dialog ref={dialog} className={styles.gallery} onClose={onClose}
    onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
    onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); move(1); } if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } }}
    aria-labelledby="gallery-title">
    <div className={styles.galleryPanel}>
      <div className={styles.galleryHeader}><div><span>ACTUAL PRODUCT SCREENS</span><h2 id="gallery-title">{project.title}</h2></div><button type="button" aria-label="Close screenshots" onClick={() => dialog.current?.close()} autoFocus><X size={22}/></button></div>
      <div className={styles.galleryStage}><Image src={screenshots[index].src} alt={screenshots[index].alt} fill loading="eager" sizes="(max-width: 700px) 90vw, 1000px" style={{objectFit:"contain"}} />
        {screenshots.length > 1 && <><button className={styles.galleryPrevious} aria-label="Previous screenshot" onClick={() => move(-1)}><ChevronLeft/></button><button className={styles.galleryNext} aria-label="Next screenshot" onClick={() => move(1)}><ChevronRight/></button></>}
      </div>
      <p className={styles.galleryCaption} aria-live="polite">{index+1} / {screenshots.length} · {screenshots[index].alt}</p>
      {screenshots.length > 1 && <div className={styles.galleryThumbs}>{screenshots.map((shot,i) => <button key={shot.src} aria-label={`Show screenshot ${i+1}: ${shot.alt}`} aria-pressed={index === i} onClick={() => setIndex(i)}><Image src={shot.src} alt="" width={54} height={80} style={{objectFit:"contain",height:64,width:48}}/></button>)}</div>}
    </div>
  </dialog>;
}

