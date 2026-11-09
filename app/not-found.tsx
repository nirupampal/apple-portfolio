import Link from "next/link";
import { PortfolioNavigation,PortfolioFooter } from "@/components/PortfolioNavigation";
import styles from "@/components/portfolio.module.css";
export default function NotFound(){return <div className={styles.site}><PortfolioNavigation/><main id="main" className={styles.caseMain}><section className={styles.caseHero}><p className={styles.eyebrow}>404 / PAGE NOT FOUND</p><h1 className={styles.routeTitle}>This page<br/><span>isn’t here.</span></h1><p className={styles.caseLead}>You can explore my projects or head back to the homepage.</p><div className={styles.actions}><Link href="/projects" className={styles.primary}>Explore projects ↗</Link><Link href="/" className={styles.secondary}>Back home</Link></div></section></main><PortfolioFooter/></div>;}
