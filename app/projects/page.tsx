import type { Metadata } from "next";
import { allProjects } from "@/lib/project-case-studies";
import { PortfolioNavigation,PortfolioFooter } from "@/components/PortfolioNavigation";
import ProjectCards from "@/components/ProjectCards";
import styles from "@/components/portfolio.module.css";
export const metadata: Metadata={title:"Projects & Case Studies | Nirupam Pal",description:"Production billing and ordering systems, mobile apps, BuildNerd products and websites built by Nirupam Pal.",alternates:{canonical:"/projects"}};
export default function ProjectsPage(){return <div className={styles.site}><PortfolioNavigation/><main id="main" className={styles.section}><p className={styles.eyebrow}>THE PROJECT INDEX / 12 SELECTED BUILDS</p><div className={styles.headingRow}><h1 className={styles.routeTitle}>Built for people.<br/><span>Used in the real world.</span></h1><p>Explore the work behind the screens: the problem, my contribution, the workflow and the result.</p></div><ProjectCards projects={allProjects} filterable/></main><PortfolioFooter/></div>;}
