"use client";
import { useState } from "react";
import { ArrowUpRight,Check,Copy,Download,Mail } from "lucide-react";
import styles from "./portfolio.module.css";
export default function ContactOptions(){const[copied,setCopied]=useState(false);async function copy(){try{await navigator.clipboard.writeText("iamnirupampal@gmail.com");setCopied(true);window.setTimeout(()=>setCopied(false),2000);}catch{window.location.href="mailto:iamnirupampal@gmail.com";}}
 return <div className={styles.contactOptions}><a href="mailto:iamnirupampal@gmail.com" className={styles.emailCard}><Mail size={22}/><div><span>EMAIL</span><strong>iamnirupampal@gmail.com</strong></div><ArrowUpRight size={22}/></a><button type="button" onClick={copy} className={styles.copyEmailButton}>{copied?<Check size={16}/>:<Copy size={16}/>}<span aria-live="polite">{copied?"Email copied":"Copy email address"}</span></button><div className={styles.socialCards}><a href="https://www.linkedin.com/in/nirupampal/" target="_blank" rel="noreferrer"><span>LinkedIn</span><ArrowUpRight size={20}/></a><a href="https://github.com/nirupampal" target="_blank" rel="noreferrer"><span>GitHub</span><ArrowUpRight size={20}/></a><a href="/Nirupam_Pal_CV.pdf" download><span>Download CV</span><Download size={20}/></a></div></div>;
}
