import { getAllTags, getPostsByTag } from '@/lib/markdown';
import PostCard from '@/components/PostCard';
import { notFound } from 'next/navigation';
import { siteConfig } from '../../../../site.config';
import { Metadata } from 'next';
import { resolveLocale } from '@/lib/i18n';
import TagPageHeader from '@/components/TagPageHeader';

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
    title: `#${decodedTag} | ${resolveLocale(siteConfig.title)}`,
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
      <TagPageHeader tag={decodedTag} postCount={posts.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
