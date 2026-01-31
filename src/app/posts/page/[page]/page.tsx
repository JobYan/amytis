import { getAllPosts } from '@/lib/markdown';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { siteConfig } from '../../../../../site.config';

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

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  return {
    title: `All Posts - Page ${page}`,
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
      <div className="mb-12 border-b border-muted/10 pb-8">
        <h1 className="page-title mb-4">All Posts</h1>
        <p className="text-muted text-lg">Page {page} of {totalPages}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/posts" />
    </div>
  );
}