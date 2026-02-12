import { getAllTags, getPostsByTag } from '@/lib/markdown';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '../../../../site.config';
import { Metadata } from 'next';
import { t } from '@/lib/i18n';

export async function generateStaticParams() {
  const tags = getAllTags();
  return Object.keys(tags).map((tag) => ({
    tag,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return {
    title: `#${decodedTag} | ${siteConfig.title}`,
    description: `${posts.length} posts tagged with "${decodedTag}".`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="layout-container">
      <nav className="mb-12 flex justify-center">
        <Link
          href="/tags"
          className="text-xs font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors no-underline"
        >
          ← {t('tags')}
        </Link>
      </nav>

      <header className="mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-heading mb-6 capitalize">
          <span className="text-accent/50 mr-2">#</span>{decodedTag}
        </h1>
        <p className="text-lg text-muted font-serif italic">
          {posts.length} {posts.length === 1 ? 'post' : t('posts').toLowerCase()} found.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
