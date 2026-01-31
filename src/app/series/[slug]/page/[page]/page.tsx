import { getSeriesData, getSeriesPosts, getAllSeries } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { Metadata } from 'next';
import { siteConfig } from '../../../../../../site.config';

const PAGE_SIZE = 1;

export async function generateStaticParams() {
  const allSeries = getAllSeries();
  const params: { slug: string; page: string }[] = [];
  
  Object.keys(allSeries).forEach(slug => {
    const posts = allSeries[slug];
    const totalPages = Math.ceil(posts.length / PAGE_SIZE);
    if (totalPages > 1) {
        for (let i = 2; i <= totalPages; i++) {
            params.push({ slug, page: i.toString() });
        }
    }
  });
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string; page: string }> }): Promise<Metadata> {
  const { slug, page } = await params;
  const seriesData = getSeriesData(slug);
  const title = seriesData?.title || slug;
  return {
    title: `${title} - Page ${page} | ${siteConfig.title}`,
  };
}

export default async function SeriesPage({ params }: { params: Promise<{ slug: string; page: string }> }) {
  const { slug, page: pageStr } = await params;
  const page = parseInt(pageStr);
  const seriesData = getSeriesData(slug);
  const allPosts = getSeriesPosts(slug);

  if (!seriesData && allPosts.length === 0) {
    notFound();
  }

  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);
  
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const posts = allPosts.slice(start, end);

  // Fallback title
  const title = seriesData?.title || slug.charAt(0).toUpperCase() + slug.slice(1);
  const description = seriesData?.excerpt;
  const coverImage = seriesData?.coverImage;

  return (
    <div className="layout-main">
      <header className="page-header">
        {coverImage && (
          <div className="relative w-full h-64 md:h-96 mb-12 rounded-3xl overflow-hidden shadow-xl shadow-accent/5">
            <img 
              src={coverImage} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <span className="badge-accent">
          Series
        </span>
        <h1 className="page-title">
          {title} <span className="text-muted/50 font-sans text-2xl ml-2">Page {page}</span>
        </h1>
        {description && (
          <p className="page-subtitle">
            {description}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath={`/series/${slug}`} />
    </div>
  );
}