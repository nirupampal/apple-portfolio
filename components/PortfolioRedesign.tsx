"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, ArrowDown, Download, Github, Menu, X, Check, Copy, Mail } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio-content";
import styles from "./portfolio.module.css";

const productColors = ["#d8e8ca", "#eee0c6", "#e0dff1", "#d1e7ea", "#efdbd4", "#dbe8c2"];
const glyphs = ["Ca", "Qu", "St", "Qr", "Bo", "Ru"];

export default function PortfolioRedesign({ content }: { content: PortfolioContent }) {
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState("All work");
  const projects = content.works.projects;
  const email = content.contact.links.find(link => link.id === "email");
  const visible = filter === "Business tools" ? projects.slice(2, 7) : filter === "Mobile" ? projects.filter((_, i) => [0, 1, 7].includes(i)) : projects;
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
          {visible.map(project => { const index=projects.indexOf(project); return <article key={project.title} className={`${styles.project} ${index<2 ? styles.featured : ""}`}>
            <a href={project.link} target="_blank" rel="noreferrer" className={styles.projectVisual} style={{background: index<2 ? index===0 ? "#d9e3cf" : "#e9dfd1" : productColors[index-2]}} aria-label={`Visit ${project.title}`}>
              {index===0 ? <div className={styles.posPreview}><div className={styles.mockSidebar}><b>tnb<span>pos</span></b><span>Overview</span><span className={styles.mockActive}>Billing</span><span>Orders</span><span>Products</span></div><div className={styles.mockBody}><div className={styles.mockHeader}><strong>Everyday billing, connected.</strong><span>POS / WEB + MOBILE</span></div><div className={styles.mockTiles}>{["Burger", "Sandwich", "Beverages", "Combos"].map((item,i)=><div key={item}><span>{["◒","▰","◡","▧"][i]}</span>{item}</div>)}</div><div className={styles.mockBottom}><span>200+ franchise workflows</span><b>One connected system ↗</b></div></div></div>
              : index===1 ? <div className={styles.restroPreview}><div className={styles.receipt}><span>HISAB RESTRO</span><h3>Good food.<br/>Smooth service.</h3><div>Table 04 <span>QR ORDER</span></div><p>Order → Kitchen → Billing</p><div className={styles.receiptBars}/><small>Kitchen Order Ticket / KOT</small></div><div className={styles.tableTag}><span>04</span><p>Scan. Order.<br/>Enjoy.</p><div>▦</div></div></div>
              : <div className={styles.productMark}><span>{glyphs[index-2]}</span><p>{project.title}<ArrowUpRight size={23}/></p></div>}
              <span className={styles.visualLabel}>{index<2 ? "WORKFLOW ILLUSTRATION" : "BUILDNERD / OWN PRODUCT"}</span><span className={styles.visitArrow}><ArrowUpRight size={21}/></span>
            </a>
            <div className={styles.projectMeta}><span>{project.type}</span>{project.badge && <span className={styles.badge}>{project.badge}</span>}</div>
            <h3><a href={project.link} target="_blank" rel="noreferrer">{project.title}<ArrowUpRight size={19}/></a></h3><p>{project.description}</p><div className={styles.tags}>{project.tech.map(tech=><span key={tech}>{tech}</span>)}</div>
          </article>})}
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
    <footer className={styles.footer}><a href="/" className={styles.brand}>np<span>.</span></a><span>© {new Date().getFullYear()} Nirupam Pal. Built with care.</span><a href="#main">Back to top ↑</a></footer>
  </div>;
}
