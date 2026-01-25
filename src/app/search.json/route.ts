import { getAllPosts } from '@/lib/markdown';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();
  
  const searchIndex = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    date: post.date,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
  }));

  return Response.json(searchIndex);
}
