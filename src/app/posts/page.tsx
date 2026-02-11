import { getAllPosts } from '@/lib/markdown';
import PostList from '@/components/PostList';
import Pagination from '@/components/Pagination';
import { siteConfig } from '../../../site.config';
import { Metadata } from 'next';
import { t } from '@/lib/i18n';

const PAGE_SIZE = siteConfig.pagination.posts;

export const metadata: Metadata = {
  title: `${t('posts')} | ${siteConfig.title}`,
  description: 'Browse the complete archive of articles.',
};

export default function AllPostsPage() {
  const allPosts = getAllPosts();
  const page = 1;
  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);
  const posts = allPosts.slice(0, PAGE_SIZE);

  return (
    <div className="layout-main">
      <header className="page-header mb-12">
        <h1 className="page-title">{t('posts')}</h1>
        <p className="page-subtitle">
          {allPosts.length} {t('posts').toLowerCase()} in total.
        </p>
      </header>

      <PostList posts={posts} />

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination currentPage={page} totalPages={totalPages} basePath="/posts" />
        </div>
      )}
    </div>
  );
}
