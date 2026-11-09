"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Download, Github } from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolio-content";
import { homeProjectSlugs, projectSlug } from "@/lib/project-case-studies";
import { PortfolioNavigation, PortfolioFooter } from "./PortfolioNavigation";
import ProjectCards from "./ProjectCards";
import styles from "./portfolio.module.css";

export default function PortfolioRedesign({ content }: { content: PortfolioContent }) {
  const projects=homeProjectSlugs.flatMap(slug=>content.works.projects.filter(project=>projectSlug(project)===slug));
  return <div className={styles.site}><PortfolioNavigation/><main id="main">
    <section className={styles.hero}>
      <div className={styles.heroCopy}><div className={styles.availability}><span/>{content.hero.availabilityText}</div><p className={styles.intro}>Hello, I’m Nirupam Pal.</p><h1>I build software.<br/><span>Businesses<br className={styles.desktopBreak}/> build on it.</span></h1><p className={styles.heroDescription}>Full Stack Developer turning everyday business problems into web and mobile products. From franchise billing to tools for independent businesses.</p><div className={styles.actions}><Link href="/projects" className={styles.primary}>Explore my work <ArrowDown size={17}/></Link><a href={content.about.resumeUrl} download className={styles.secondary}>Download CV <Download size={17}/></a></div><p className={styles.heroFoot}>BASED IN WEST BENGAL, INDIA <span>↗ OPEN TO RELOCATION</span></p></div>
      <div className={styles.portraitArea}><span className={styles.portraitLabel}>THE PERSON BEHIND THE PRODUCTS</span><div className={styles.portrait}><Image src={content.hero.imageSrc || "/nirupam-pal.png"} alt={content.hero.imageAlt} fill priority sizes="(max-width: 760px) 90vw, 450px"/></div><div className={styles.portraitCaption}><div><strong>Nirupam Pal</strong><span>Full Stack Developer · Founder, BuildNerd</span></div><span className={styles.signature}>np.</span></div></div>
    </section>
    <div className={styles.proof}><div><strong>200<span>+</span></strong><p>Franchises using the ordering app<br/>I built at Microace Software</p></div><div><strong>Web <span>&</span> mobile</strong><p>Interfaces, APIs, databases<br/>and production deployment</p></div><div><strong>BuildNerd<span>↗</span></strong><p>My independent software venture<br/>Five focused business products</p></div></div>
    <section id="work" className={styles.section}><div className={styles.sectionTop}><p className={styles.eyebrow}>01 / SELECTED WORK</p><span>BUILT TO BE USED.</span></div><div className={styles.headingRow}><h2>Real workflows.<br/><span>Working software.</span></h2><p>Six projects to start with. Explore the problem, my contribution and the product behind each one.</p></div><ProjectCards projects={projects} layout="two"/><div className={styles.browseActions}><Link className={styles.primary} href="/projects">View all 12 projects <ArrowUpRight size={17}/></Link><a className={styles.secondary} href={content.works.githubUrl} target="_blank" rel="noreferrer"><Github size={17}/> Explore GitHub</a></div></section>
    <section className={`${styles.section} ${styles.homeAbout}`}><div><p className={styles.eyebrow}>02 / THE DEVELOPER</p><h2>Curious by nature.<br/><span>A builder by choice.</span></h2></div><div><p>I’m a Full Stack Developer based in Krishnanagar, West Bengal. At Microace Software, I build production web and mobile applications. Through BuildNerd, I create and operate my own business tools.</p><Link href="/about" className={styles.inlineLink}>More about me <ArrowUpRight size={17}/></Link></div></section>
    <section className={styles.contact}><div className={styles.contactInner}><div className={styles.availability}><span/>Available from 1 December 2026</div><h2>Let’s build<br/>what’s <em>next.</em><ArrowUpRight/></h2><p>Looking for a full stack developer who can take a product from interface to deployment? I’d love to hear about your team.</p><div className={styles.contactActions}><Link href="/contact" className={styles.primary}>Get in touch <ArrowUpRight size={18}/></Link><a href="mailto:iamnirupampal@gmail.com" className={styles.inlineLink}>iamnirupampal@gmail.com</a></div></div></section>
  </main><PortfolioFooter/></div>;
}
