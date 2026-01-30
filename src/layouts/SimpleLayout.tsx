import Link from 'next/link';
import { PostData } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { siteConfig } from '../../site.config';

interface SimpleLayoutProps {
  post: PostData;
}

export default function SimpleLayout({ post }: SimpleLayoutProps) {
  return (
    <div className="layout-container">
      <article className="max-w-3xl mx-auto">
        <header className="mb-24 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-heading mb-6">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-muted font-serif italic leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        <MarkdownRenderer content={post.content} latex={post.latex} slug={post.slug} />
      </article>
    </div>
  );
}
