import { BlogArticlePage } from "@/components/BlogPages";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogArticlePage slug={slug} />;
}
