import { getPostBySlug, getAllPosts } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="mb-12">
        <Link 
          href="/" 
          className="text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-2"
        >
          ← Back to Garden
        </Link>
      </nav>

      <article>
        <header className="mb-12">
          <time className="text-gray-500 mb-4 block">{post.date}</time>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-gray-600 italic leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        <div className="prose prose-emerald lg:prose-xl max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      <footer className="mt-20 pt-8 border-t border-gray-100">
        <p className="text-gray-500 text-sm italic">
          Grown in the Amytis digital garden.
        </p>
      </footer>
    </div>
  );
}
