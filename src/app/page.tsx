import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-16">
        <h1 className="text-4xl font-bold text-emerald-800 mb-2">Amytis</h1>
        <p className="text-xl text-gray-600 italic">A digital garden for growing thoughts.</p>
      </header>

      <main>
        <div className="grid gap-12">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/posts/${post.slug}`}>
                <time className="text-sm text-gray-500 mb-2 block">{post.date}</time>
                <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}