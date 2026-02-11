import { getAllPosts } from '@/lib/markdown';
import PostList from '@/components/PostList';
import Pagination from '@/components/Pagination';
import { siteConfig } from '../../../../../site.config';
import { Metadata } from 'next';
import { t } from '@/lib/i18n';

const PAGE_SIZE = siteConfig.pagination.posts;

export function generateStaticParams() {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);

  // Generate params for page 2 to totalPages (page 1 is handled by /posts/page.tsx)
  if (totalPages <= 1) return [];

  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: (i + 2).toString(),
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `${t('posts')} - ${page} | ${siteConfig.title}`,
  };
}

export default async function PostsPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageStr } = await params;
  const page = parseInt(pageStr);
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const posts = allPosts.slice(start, end);

  return (
    <div className="layout-main">
      <header className="page-header mb-12">
        <h1 className="page-title">{t('posts')}</h1>
        <p className="page-subtitle">
          {page} / {totalPages}
        </p>
      </header>

      <PostList posts={posts} />

      <div className="mt-12">
        <Pagination currentPage={page} totalPages={totalPages} basePath="/posts" />
      </div>
    </div>
  );
}
