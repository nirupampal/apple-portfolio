import type { MetadataRoute } from "next";
import { allProjects,projectPath } from "@/lib/project-case-studies";
export default function sitemap():MetadataRoute.Sitemap{const base="https://www.inirupampal.in";return [{url:base,changeFrequency:"monthly",priority:1},...["/projects","/about","/experience","/skills","/contact"].map(path=>({url:base+path,changeFrequency:"monthly" as const,priority:0.8})),...allProjects.map(project=>({url:base+projectPath(project),changeFrequency:"monthly" as const,priority:0.7}))];}
