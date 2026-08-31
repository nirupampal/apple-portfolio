"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Home,
} from "lucide-react";

import { Spotlight } from "@/components/ui/spotlight-new";
import type { BlogPost } from "@/lib/portfolio-content";
import { usePortfolioContent } from "@/lib/use-portfolio-content";

function CoverImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    // Blog media is managed in Firebase and may use different storage hosts.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`absolute inset-0 h-full w-full object-cover ${className}`} />
  );
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function BlogHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#050608]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 text-xs font-medium text-neutral-300 transition hover:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-mono text-[10px]">NP</span>
          <span className="hidden sm:block">Nirupam Pal</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 transition hover:text-white">
          <Home className="h-3.5 w-3.5" />
          Portfolio
        </Link>
      </div>
    </header>
  );
}

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <motion.a
      href={`/blog/${post.slug}`}
      initial={{ y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      className={`group overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] ${featured ? "lg:col-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden bg-neutral-900 ${featured ? "h-[420px]" : "h-64"}`}>
        <CoverImage src={post.coverImage} alt={post.title} className="transition duration-700 group-hover:scale-[1.035]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-black/10 to-transparent" />
        <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-xl transition group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="p-7 md:p-9">
        <div className="flex flex-wrap items-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600">
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h2 className={`mt-5 font-medium tracking-[-0.04em] text-white ${featured ? "text-3xl md:text-5xl" : "text-2xl"}`}>{post.title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-500">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-neutral-500">{tag}</span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export function BlogIndexPage() {
  const { content } = usePortfolioContent();
  const posts = content.blog.posts
    .filter((post) => post.published)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div className="dark min-h-screen bg-[#050608] text-white selection:bg-cyan-300 selection:text-black">
      <BlogHeader />
      <main>
        <section className="relative overflow-hidden border-b border-white/[0.07] px-6 pb-24 pt-40 md:pb-32 md:pt-52">
          <Spotlight
            gradientFirst="radial-gradient(68% 69% at 55% 31%, rgba(139,92,246,.18) 0, rgba(34,211,238,.05) 52%, transparent 82%)"
            gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(34,211,238,.10) 0, transparent 80%)"
            translateY={-420}
            duration={10}
          />
          <div className="aceternity-grid absolute inset-0 opacity-35" />
          <div className="relative z-40 mx-auto max-w-7xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300/80">{content.blog.eyebrow}</p>
            <h1 className="mt-8 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.06em] md:text-8xl">{content.blog.title}</h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-400">{content.blog.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          {posts.length ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {posts.map((post, index) => <PostCard key={post.id} post={post} featured={index === 0} />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-white/10 py-24 text-center">
              <p className="text-neutral-500">No published articles yet.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function ArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/).filter(Boolean);
  return (
    <div className="space-y-7">
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) {
          return <h2 key={index} className="pt-8 text-3xl font-medium tracking-[-0.035em] text-white md:text-4xl">{block.slice(3)}</h2>;
        }
        const lines = block.split("\n");
        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={index} className="space-y-3 pl-5 text-lg leading-8 text-neutral-300">
              {lines.map((line) => <li key={line} className="list-disc pl-2 marker:text-cyan-300">{line.slice(2)}</li>)}
            </ul>
          );
        }
        return <p key={index} className="text-lg leading-8 text-neutral-300 md:text-xl md:leading-9">{block}</p>;
      })}
    </div>
  );
}

export function BlogArticlePage({ slug }: { slug: string }) {
  const { content, isLoading } = usePortfolioContent();
  const post = content.blog.posts.find((item) => item.slug === slug && item.published);

  if (isLoading) {
    return <div className="min-h-screen bg-[#050608]" />;
  }

  if (!post) {
    return (
      <div className="dark flex min-h-screen items-center justify-center bg-[#050608] px-6 text-white">
        <BlogHeader />
        <div className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600">404 / Article</p>
          <h1 className="mt-5 text-4xl font-medium tracking-[-0.04em]">This article is not available.</h1>
          <Link href="/blog" className="mt-8 inline-flex items-center gap-2 text-sm text-cyan-200"><ArrowLeft className="h-4 w-4" /> Back to writing</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-[#050608] text-white selection:bg-cyan-300 selection:text-black">
      <BlogHeader />
      <main>
        <article>
          <header className="mx-auto max-w-5xl px-6 pb-16 pt-36 md:pb-20 md:pt-44">
            <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> All writing
            </Link>
            <div className="mt-12 flex flex-wrap items-center gap-5 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              <span className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5" />{formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" />{post.readTime}</span>
            </div>
            <h1 className="mt-7 text-5xl font-medium leading-[0.96] tracking-[-0.06em] md:text-8xl">{post.title}</h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-400">{post.excerpt}</p>
          </header>

          <div className="relative mx-auto h-[52vw] max-h-[720px] min-h-[360px] max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900">
            <CoverImage src={post.coverImage} alt={post.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          </div>

          <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-[180px_1fr] md:py-28">
            <aside>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-600">Topics</p>
              <div className="mt-4 flex flex-wrap gap-2 md:flex-col md:items-start">
                {post.tags.map((tag) => <span key={tag} className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-neutral-400">{tag}</span>)}
              </div>
            </aside>
            <ArticleBody content={post.content} />
          </div>
        </article>
      </main>
    </div>
  );
}
