"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown, Download, Github, Menu, X, Check, Copy, Mail, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import type { PortfolioContent, ProjectItem } from "@/lib/portfolio-content";
import styles from "./portfolio.module.css";

const productStyles: Record<string, { color: string; mark: string }> = {
  "BuildNerd Catalogue": { color: "#d8e8ca", mark: "Ca" },
  "BuildNerd Quotes": { color: "#eee0c6", mark: "Qu" },
  "Catalogue Studio": { color: "#e0dff1", mark: "St" },
  "Create QRcode": { color: "#d1e7ea", mark: "Qr" },
  "BuildNerd Bookings": { color: "#efdbd4", mark: "Bo" },
};

function ProjectGallery({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
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
      <div className={styles.galleryStage}><Image src={screenshots[index].src} alt={screenshots[index].alt} fill sizes="(max-width: 700px) 90vw, 1000px" style={{objectFit:"contain"}} />
        {screenshots.length > 1 && <><button className={styles.galleryPrevious} aria-label="Previous screenshot" onClick={() => move(-1)}><ChevronLeft/></button><button className={styles.galleryNext} aria-label="Next screenshot" onClick={() => move(1)}><ChevronRight/></button></>}
      </div>
      <p className={styles.galleryCaption} aria-live="polite">{index+1} / {screenshots.length} · {screenshots[index].alt}</p>
      {screenshots.length > 1 && <div className={styles.galleryThumbs}>{screenshots.map((shot,i) => <button key={shot.src} aria-label={`Show screenshot ${i+1}: ${shot.alt}`} aria-pressed={index === i} onClick={() => setIndex(i)}><Image src={shot.src} alt="" width={54} height={80} style={{objectFit:"contain",height:64,width:48}}/></button>)}</div>}
    </div>
  </dialog>;
}

export default function PortfolioRedesign({ content }: { content: PortfolioContent }) {
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState("All work");
  const projects = content.works.projects;
  const [galleryProject, setGalleryProject] = useState<ProjectItem | null>(null);
  const email = content.contact.links.find(link => link.id === "email");
  const visible = filter === "Business tools" ? projects.filter(project => project.category === "business") : filter === "Mobile" ? projects.filter(project => project.mobile) : projects;
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email?.value || "iamnirupampal@gmail.com"); setCopied(true); window.setTimeout(() => setCopied(false), 2200); }
    catch { window.location.href = email?.href || "mailto:iamnirupampal@gmail.com"; }
  }
  return <div className={styles.site}>
    <a href="#main" className={styles.skip}>Skip to content</a>
    <header className={styles.header}>
      <a href="/" className={styles.brand} aria-label="Nirupam Pal home">np<span>.</span></a>
      <nav className={`${styles.nav} ${menu ? styles.open : ""}`} aria-label="Main navigation">
        {[["work", "Work"], ["experience", "Experience"], ["stack", "Stack"], ["about", "About"]].map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
        <a href="#contact" className={styles.navContact} onClick={() => setMenu(false)}>Let’s talk <ArrowUpRight size={16}/></a>
      </nav>
      <button className={styles.menu} aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
    </header>
    <main id="main">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.availability}><span/> {content.hero.availabilityText}</div>
          <p className={styles.intro}>Hello, I’m Nirupam Pal.</p>
          <h1>I build software.<br/><span>Businesses<br className={styles.desktopBreak}/> build on it.</span></h1>
          <p className={styles.heroDescription}>Full Stack Developer turning everyday business problems into web and mobile products. From franchise billing to tools for independent businesses.</p>
          <div className={styles.actions}><a href="#work" className={styles.primary}>Explore my work <ArrowDown size={17}/></a><a href={content.about.resumeUrl} download className={styles.secondary}>Download CV <Download size={17}/></a></div>
          <p className={styles.heroFoot}>BASED IN WEST BENGAL, INDIA <span>↗ OPEN TO RELOCATION</span></p>
        </div>
        <div className={styles.portraitArea}>
          <span className={styles.portraitLabel}>THE PERSON BEHIND THE PRODUCTS</span>
          <div className={styles.portrait}><Image src={content.hero.imageSrc || "/nirupam-pal.png"} alt={content.hero.imageAlt} fill priority sizes="(max-width: 760px) 90vw, 450px" /></div>
          <div className={styles.portraitCaption}><div><strong>Nirupam Pal</strong><span>Full Stack Developer · Founder, BuildNerd</span></div><span className={styles.signature}>np.</span></div>
        </div>
      </section>
      <div className={styles.proof}><div><strong>200<span>+</span></strong><p>Franchises using the ordering app<br/>I built at Microace Software</p></div><div><strong>Web <span>&</span> mobile</strong><p>Interfaces, APIs, databases<br/>and production deployment</p></div><div><strong>BuildNerd<span>↗</span></strong><p>My independent software venture<br/>Five focused business products</p></div></div>
      <section id="work" className={styles.section}>
        <div className={styles.sectionTop}><p className={styles.eyebrow}>01 / SELECTED WORK</p><span>BUILT TO BE USED.</span></div>
        <div className={styles.headingRow}><h2>Real workflows.<br/><span>Working software.</span></h2><p>Products I’ve built for businesses, their customers, and the people running the day-to-day.</p></div>
        <div className={styles.filters} role="group" aria-label="Filter projects">{["All work", "Business tools", "Mobile"].map(label => <button key={label} onClick={() => setFilter(label)} aria-pressed={filter === label} className={filter === label ? styles.activeFilter : ""}>{label}</button>)}</div>
        <div className={styles.projectGrid}>
          {visible.map(project => {
            const brand = productStyles[project.title] ?? { color: "#e4e9dd", mark: project.title.slice(0,2) };
            const screenshots = project.screenshots ?? [];
            return <article key={project.title} className={`${styles.project} ${project.featured ? styles.featured : ""}`}>
              {screenshots.length ? <button type="button" className={`${styles.projectVisual} ${styles.screenshotVisual} ${project.mobile ? styles.mobileVisual : styles.desktopVisual}`} style={{background: project.title === "Hisab Restro" ? "#dce4d4" : project.title === "Microace Staff" ? "#eee3e4" : "#dfe8ee"}} onClick={() => setGalleryProject(project)} aria-label={`View ${project.title} screenshots`}>
                <div className={project.mobile ? styles.phoneScreens : styles.desktopScreen}>
                  {screenshots.slice(0, project.mobile ? 2 : 1).map((shot) => <div key={shot.src} className={project.mobile ? styles.phoneFrame : styles.browserFrame}>
                    {!project.mobile && <div className={styles.browserBar}><span/><span/><span/><p>{new URL(project.link).hostname}</p></div>}
                    <Image src={shot.src} alt={shot.alt} width={project.mobile ? 720 : 1920} height={project.mobile ? 1600 : 1080} sizes={project.mobile ? "(max-width: 700px) 38vw, 230px" : "(max-width: 700px) 90vw, 600px"} className={styles.actualScreen} />
                  </div>)}
                </div>
                <span className={styles.screenLabel}>ACTUAL PRODUCT {screenshots.length === 1 ? "SCREEN" : "SCREENS"}</span><span className={styles.visitArrow}><Expand size={18}/></span>
              </button> : <a href={project.link} target="_blank" rel="noreferrer" className={styles.projectVisual} style={{background:brand.color}} aria-label={`Visit ${project.title}`}><div className={styles.productMark}><span>{brand.mark}</span><p>{project.title}<ArrowUpRight size={23}/></p></div><span className={styles.visualLabel}>BUILDNERD / OWN PRODUCT</span><span className={styles.visitArrow}><ArrowUpRight size={21}/></span></a>}
              <div className={styles.projectMeta}><span>{project.type}</span>{project.badge && <span className={styles.badge}>{project.badge}</span>}</div>
              <h3><a href={project.link} target="_blank" rel="noreferrer">{project.title}<ArrowUpRight size={19}/></a></h3><p>{project.description}</p><div className={styles.tags}>{project.tech.map(tech=><span key={tech}>{tech}</span>)}</div>
              {screenshots.length > 0 && <div className={styles.projectActions}><button onClick={() => setGalleryProject(project)}>View {screenshots.length === 1 ? "screenshot" : `${screenshots.length} screenshots`} <Expand size={13}/></button><a href={project.link} target="_blank" rel="noreferrer">{project.linkLabel ?? "Visit project"} <ArrowUpRight size={14}/></a></div>}
            </article>;
          })}
        </div>
        <a className={styles.textLink} href={content.works.githubUrl} target="_blank" rel="noreferrer"><Github size={18}/> More code on GitHub <ArrowUpRight size={17}/></a>
      </section>
      <section id="experience" className={`${styles.section} ${styles.experience}`}>
        <p className={styles.eyebrow}>02 / EXPERIENCE</p><div className={styles.headingRow}><h2>From an idea<br/><span>to the daily routine.</span></h2><p>I enjoy taking a practical problem through development and into the hands of the people who need it.</p></div>
        {content.about.experiences.map((item,i)=><article className={styles.experienceRow} key={item.id}><span className={styles.rowNumber}>0{i+1}</span><div><span className={styles.date}>{item.date}</span><h3>{item.title}</h3><p className={styles.company}>{item.company}</p></div><div><p>{item.description}</p><div className={styles.tags}>{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div></article>)}
        <p className={styles.joining}><span/> Completing my time at Microace on 30 November 2026. Available for my next role from 1 December.</p>
      </section>
      <section id="stack" className={styles.stack}>
        <div className={styles.stackInner}><p className={styles.eyebrow}>03 / THE TOOLKIT</p><div className={styles.headingRow}><h2>From interface<br/><span>to infrastructure.</span></h2><p>One product, many moving parts. These are the technologies I work with to connect them.</p></div><div className={styles.skillGrid}>{content.skills.categories.map((category,i)=><div key={category.id}><span className={styles.skillNumber}>0{i+1}</span><h3>{category.title}</h3><div>{category.skills.map(skill=><span className={styles.skill} key={skill.name}>{skill.name}</span>)}</div></div>)}</div></div>
      </section>
      <section id="about" className={`${styles.section} ${styles.about}`}>
        <div><p className={styles.eyebrow}>04 / A LITTLE ABOUT ME</p><h2>Curious by nature.<br/><span>A builder by choice.</span></h2><div className={styles.languageRow}>English <span>·</span> Hindi <span>·</span> Bengali</div></div>
        <div>{content.about.paragraphs.map(p=><p key={p}>{p}</p>)}<div className={styles.education}><span className={styles.eyebrow}>EDUCATION</span><div><strong>Bachelor of Arts</strong><span>Currently pursuing</span></div><div><strong>Diploma in Information Technology</strong><span>KJNNYCC · One-year programme · Completed 2021</span></div><p>HTML, CSS, C programming and computer operations.</p><div><strong>Higher Secondary (Class XII)</strong><span>Completed</span></div></div></div>
      </section>
      <section id="contact" className={styles.contact}><div className={styles.contactInner}><div className={styles.availability}><span/> Available from 1 December 2026</div><h2>Let’s build<br/>what’s <em>next.</em><ArrowUpRight/></h2><p>Looking for a full stack developer who can take a product from interface to deployment? I’d love to hear about your team.</p><div className={styles.contactActions}><a href={email?.href} className={styles.primary}>Email me <Mail size={18}/></a><button onClick={copyEmail} className={styles.copy}>{copied ? <Check size={17}/> : <Copy size={17}/>} {copied ? "Email copied" : email?.value}</button></div><div className={styles.contactBottom}><span>Krishnanagar, Nadia, West Bengal<br/>Open to relocation & remote work</span><div>{content.contact.links.filter(link=>link.id!=="email").map(link=><a key={link.id} href={link.href} target={link.id==="phone" ? undefined : "_blank"} rel="noreferrer">{link.label=== "Phone" ? link.value : link.label}<ArrowUpRight size={15}/></a>)}</div></div></div></section>
    </main>
    {galleryProject && <ProjectGallery key={galleryProject.title} project={galleryProject} onClose={() => setGalleryProject(null)}/>}
    <footer className={styles.footer}><a href="/" className={styles.brand}>np<span>.</span></a><span>© {new Date().getFullYear()} Nirupam Pal. Built with care.</span><a href="#main">Back to top ↑</a></footer>
  </div>;
}
