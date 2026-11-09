"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./portfolio.module.css";

export function PortfolioNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function onKey(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return <><a href="#main" className={styles.skip}>Skip to content</a><header className={styles.header}>
    <Link href="/" className={styles.brand} aria-label="Nirupam Pal home">np<span>.</span></Link>
    <nav className={`${styles.nav} ${open ? styles.open : ""}`} aria-label="Main navigation">
      {[["/projects", "Projects"], ["/about", "About"], ["/experience", "Experience"], ["/skills", "Skills"]].map(([href,label]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link href="/contact" className={styles.navContact} onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={16}/></Link>
    </nav>
    <button type="button" className={styles.menu} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
  </header></>;
}
export function PortfolioFooter() {
  return <footer className={styles.footer}><Link href="/" className={styles.brand} aria-label="Nirupam Pal home">np<span>.</span></Link><span>© {new Date().getFullYear()} Nirupam Pal. Built with care.</span><div className={styles.footerLinks}><Link href="/projects">Projects</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><a href="/Nirupam_Pal_CV.pdf" download>CV ↓</a></div></footer>;
}
