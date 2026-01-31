import { getAllPosts } from '@/lib/markdown';
import PostCard from '@/components/PostCard';
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
      <div className="mb-12 border-b border-muted/10 pb-8">
        <h1 className="page-title mb-4">All Posts</h1>
        <p className="text-muted text-lg">A complete collection of thoughts and tutorials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} basePath="/posts" />
      )}
    </div>
  );
}