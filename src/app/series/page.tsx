import { getAllSeries, getSeriesData } from '@/lib/markdown';
import Link from 'next/link';
import { siteConfig } from '../../../site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Series | ${siteConfig.title}`,
  description: 'Curated collections of articles and thoughts.',
};

export default function SeriesIndexPage() {
  const allSeries = getAllSeries();
  const seriesSlugs = Object.keys(allSeries).sort();

  return (
    <div className="layout-main">
      <header className="page-header">
        <h1 className="page-title">
          All Series
        </h1>
        <p className="page-subtitle">
          Curated collections of knowledge.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {seriesSlugs.map(slug => {
          const posts = allSeries[slug];
          const seriesData = getSeriesData(slug);
          const title = seriesData?.title || slug.charAt(0).toUpperCase() + slug.slice(1);
          const description = seriesData?.excerpt || `${posts.length} articles in this collection.`;

          return (
            <Link key={slug} href={`/series/${slug}`} className="group block no-underline">
              <div className="card-base h-full group flex flex-col p-0 overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden bg-muted/10">
                  <img 
                    src={seriesData?.coverImage || `https://images.unsplash.com/photo-1579783902614-a3fb39279c23?auto=format&fit=crop&w=800&q=80`} 
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <span className="badge-accent">
                    {posts.length} Posts
                  </span>
                  <h2 className="mb-4 font-serif text-2xl font-bold text-heading group-hover:text-accent transition-colors">
                    {title}
                  </h2>
                  <p className="text-muted font-serif italic leading-relaxed line-clamp-3">
                    {description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
