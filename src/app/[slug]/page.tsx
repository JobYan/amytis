import { getPageBySlug, getAllPages } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import PostLayout from '@/layouts/PostLayout';
import SimpleLayout from '@/layouts/SimpleLayout';

/**
 * Generates the static paths for all top-level pages at build time.
 */
export async function generateStaticParams() {
  const pages = getAllPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // Determine layout based on frontmatter, defaulting to 'simple' for pages
  const layout = page.layout || 'simple';

  if (layout === 'post') {
    return <PostLayout post={page} />;
  }

  return <SimpleLayout post={page} />;
}
