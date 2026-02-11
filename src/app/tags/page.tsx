import { getAllTags } from '@/lib/markdown';
import Tag from '@/components/Tag';
import { siteConfig } from '../../../site.config';
import { Metadata } from 'next';
import { t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: `${t('tags')} | ${siteConfig.title}`,
  description: 'Explore topics in the garden.',
};

export default function TagsPage() {
  const tags = getAllTags();
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  const totalTags = sortedTags.length;

  return (
    <div className="layout-main">
      <header className="page-header">
        <h1 className="page-title">{t('tags')}</h1>
        <p className="page-subtitle">
          {totalTags} {totalTags === 1 ? 'topic' : 'topics'} cultivated in this garden.
        </p>
      </header>

      <main>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {sortedTags.map((tag) => (
            <Tag key={tag} tag={tag} count={tags[tag]} variant="large" showHash={false} />
          ))}
        </div>
      </main>
    </div>
  );
}
