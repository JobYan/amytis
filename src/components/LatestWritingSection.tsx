'use client';

import Link from 'next/link';
import PostList from './PostList';
import { useLanguage } from './LanguageProvider';
import { PostData } from '@/lib/markdown';

interface LatestWritingSectionProps {
  posts: PostData[];
  totalCount: number;
}

export default function LatestWritingSection({ posts, totalCount }: LatestWritingSectionProps) {
  const { t, tWith } = useLanguage();

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif font-bold text-heading">{t('latest_writing')}</h2>
      </div>

      <PostList posts={posts} showTags={false} />

      {totalCount > posts.length && (
        <div className="mt-12 text-center">
          <Link
            href="/posts"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-muted/20 bg-muted/5 text-sm font-medium text-muted hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 no-underline"
          >
            <span>{tWith('view_all_posts', { count: totalCount })}</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
