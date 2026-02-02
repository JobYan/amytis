import { getAllPosts } from '@/lib/markdown';
import PostList from '@/components/PostList';
import Pagination from '@/components/Pagination';
import { siteConfig } from '../../../site.config';

export const metadata = {
  title: 'All Posts',
  description: 'Browse the complete archive of articles.',
};

export default function AllPostsPage() {
  const allPosts = getAllPosts();
  const page = 1;
  const pageSize = siteConfig.pagination.posts;
  const totalPages = Math.ceil(allPosts.length / pageSize);
  const posts = allPosts.slice(0, pageSize);

  return (
    <div className="layout-main">
      <header className="page-header mb-12">
        <h1 className="page-title">All Posts</h1>
        <p className="page-subtitle">
          A complete collection of {allPosts.length} thoughts and tutorials.
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