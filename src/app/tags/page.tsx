import { getAllTags } from '@/lib/markdown';
import Tag from '@/components/Tag';
import { siteConfig } from '../../../site.config';
import { Metadata } from 'next';
import { t, resolveLocale } from '@/lib/i18n';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: `${t('tags')} | ${resolveLocale(siteConfig.title)}`,
  description: 'Explore topics in the garden.',
};

export default function TagsPage() {
  const tags = getAllTags();
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  const totalTags = sortedTags.length;

  return (
    <div className="layout-main">
      <PageHeader
        titleKey="tags"
        subtitleKey="tags_subtitle"
        subtitleOneKey="tags_subtitle_one"
        count={totalTags}
        subtitleParams={{ count: totalTags }}
      />

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
