'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

interface TagPageHeaderProps {
  tag: string;
  postCount: number;
}

export default function TagPageHeader({ tag, postCount }: TagPageHeaderProps) {
  const { t, tWith } = useLanguage();

  const subtitleKey = postCount === 1 ? 'tag_posts_found_one' : 'tag_posts_found';
  const subtitle = tWith(subtitleKey, { count: postCount });

  return (
    <>
      <nav className="mb-12 flex justify-center">
        <Link
          href="/tags"
          className="text-xs font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors no-underline"
        >
          &larr; {t('tags')}
        </Link>
      </nav>

      <header className="mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-heading mb-6 capitalize">
          <span className="text-accent/50 mr-2">#</span>{tag}
        </h1>
        <p className="text-lg text-muted font-serif italic">
          {subtitle}
        </p>
      </header>
    </>
  );
}
