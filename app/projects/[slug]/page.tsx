import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft,ArrowUpRight,Check } from "lucide-react";
import { allProjects,findProject,getCaseStudy,projectPath,projectSlug } from "@/lib/project-case-studies";
import { PortfolioNavigation,PortfolioFooter } from "@/components/PortfolioNavigation";
import ProjectScreens from "@/components/ProjectScreens";
import styles from "@/components/portfolio.module.css";
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return allProjects.map(project=>({slug:projectSlug(project)}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const project=findProject(slug);if(!project)return{title:"Project not found"};return{title:`${project.title} — Case Study | Nirupam Pal`,description:project.description,alternates:{canonical:projectPath(project)},openGraph:{title:`${project.title} | Nirupam Pal`,description:project.description,url:projectPath(project),images:[{url:project.image,alt:project.title}]}};}
export default async function ProjectPage({params}:Props){
  const {slug}=await params;const project=findProject(slug);if(!project)notFound();const study=getCaseStudy(project);const related=(study.related??[]).flatMap(slug=>{const p=findProject(slug);return p?[p]:[];});
  const jsonLd={"@context":"https://schema.org","@type":"CreativeWork",name:project.title,description:project.description,url:`https://www.inirupampal.in${projectPath(project)}`,creator:{"@type":"Person",name:"Nirupam Pal",url:"https://www.inirupampal.in"},image:`https://www.inirupampal.in${project.image}`};
  return <div className={styles.site}><PortfolioNavigation/><main id="main" className={styles.caseMain}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/>
    <Link href="/projects" className={styles.backLink}><ArrowLeft size={15}/>All projects</Link>
    <header className={styles.caseHero}><p className={styles.eyebrow}>PROJECT / {project.type}</p><h1 className={styles.routeTitle}>{project.title}</h1><p className={styles.caseLead}>{project.description}</p><div className={styles.caseHeroActions}><a href={project.link} target="_blank" rel="noreferrer" className={styles.primary}>{project.linkLabel??"Visit project"}<ArrowUpRight size={17}/></a><a href="#screens" className={styles.secondary}>Explore screenshots <ArrowUpRight size={17}/></a></div></header>
    <dl className={styles.caseFacts}><div><dt>MY ROLE</dt><dd>{study.role}</dd></div><div><dt>CONTEXT</dt><dd>{study.context}</dd></div><div><dt>PROJECT FOCUS</dt><dd>{project.tech.join(" · ")}</dd></div></dl>
    <section className={styles.caseSection}><div><p className={styles.eyebrow}>01 / THE PROBLEM</p><h2>What needed<br/><span>to work better.</span></h2></div><p className={styles.caseBody}>{study.problem}</p></section>
    <section className={styles.caseSection}><div><p className={styles.eyebrow}>02 / MY CONTRIBUTION</p><h2>What I<br/><span>built.</span></h2></div><ul className={styles.contributionList}>{study.contribution.map(item=><li key={item}><Check size={17}/><span>{item}</span></li>)}</ul></section>
    <section className={styles.workflowSection}><p className={styles.eyebrow}>THE WORKFLOW</p><ol className={styles.workflow}>{study.workflow.map((step,i)=><li key={step}><span>0{i+1}</span><strong>{step}</strong>{i<study.workflow.length-1&&<ArrowUpRight size={17}/>}</li>)}</ol></section>
    {study.challenges && <section className={styles.caseLongSection}><p className={styles.eyebrow}>03 / ENGINEERING CHALLENGES</p><h2>Beyond the interface.<br/><span>Making operations work.</span></h2><div className={styles.challengeGrid}>{study.challenges.map((challenge,i)=><article key={challenge.title}><span className={styles.rowNumber}>0{i+1}</span><h3>{challenge.title}</h3><p>{challenge.detail}</p></article>)}</div></section>}
    <section className={styles.caseLongSection}><p className={styles.eyebrow}>PRODUCT / IMPLEMENTATION</p><h2>The pieces<br/><span>behind the workflow.</span></h2><div className={styles.implementationGrid}>{study.implementation.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div></section>
    <section className={`${styles.caseSection} ${styles.outcomeSection}`}><div><p className={styles.eyebrow}>THE RESULT</p><h2>From build<br/><span>to product.</span></h2></div><ul className={styles.contributionList}>{study.outcome.map(item=><li key={item}><Check size={17}/><span>{item}</span></li>)}</ul></section>
    <section id="screens" className={styles.caseLongSection}><p className={styles.eyebrow}>PRODUCT SCREENS</p><div className={styles.headingRow}><h2>A closer look<br/><span>at the software.</span></h2><p>Click a screen to open the gallery. Captions distinguish application screens, public pages and sample content.</p></div><ProjectScreens project={project}/></section>
    {related.length>0 && <section className={styles.relatedSection}><p className={styles.eyebrow}>KEEP EXPLORING</p><div className={styles.relatedLinks}>{related.map(item=><Link key={item.title} href={projectPath(item)}><span>{item.type}</span><strong>{item.title}<ArrowUpRight size={22}/></strong></Link>)}</div></section>}
    <div className={styles.routeCta}><div><p className={styles.eyebrow}>HAVE A ROLE IN MIND?</p><h2>Let’s talk about<br/><span>your next build.</span></h2></div><Link href="/contact" className={styles.primary}>Contact me <ArrowUpRight size={17}/></Link></div>
  </main><PortfolioFooter/></div>;
}
