import { getAllPosts, getAllSeries, getSeriesData, getFeaturedPosts } from '@/lib/markdown';
import { siteConfig } from '../../site.config';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import Hero from '@/components/Hero';

export default function Home() {
  const allPosts = getAllPosts();
  const allSeries = getAllSeries();
  const featuredPosts = getFeaturedPosts();
  
  const page = 1;
  const pageSize = 9; 
  const totalPages = Math.ceil(allPosts.length / pageSize);
  const posts = allPosts.slice(0, pageSize);

  // Get series names
  const seriesNames = Object.keys(allSeries).sort();

  return (
    <div>
      <Hero 
        title={siteConfig.hero.title} 
        subtitle={siteConfig.hero.subtitle} 
      />

      <div className="layout-main pt-0 md:pt-0">
        {/* Curated Series Section */}
        {seriesNames.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-serif font-bold text-heading">Curated Series</h2>
              <Link href="/series" className="text-sm font-sans font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors no-underline hover:underline">
                All Series →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {seriesNames.slice(0, 4).map(name => {
                const seriesPosts = allSeries[name];
                const seriesData = getSeriesData(name.toLowerCase().replace(/ /g, '-'));
                const title = seriesData?.title || name;
                const seriesUrl = `/series/${name.toLowerCase().replace(/ /g, '-')}`;
                
                return (
                  <div key={name} className="card-base group flex flex-col p-0 overflow-hidden h-full">
                    <Link href={seriesUrl} className="relative h-56 w-full overflow-hidden bg-muted/10 block">
                      <img 
                        src={seriesData?.coverImage || `https://images.unsplash.com/photo-1579783902614-a3fb39279c23?auto=format&fit=crop&w=800&q=80`} 
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    </Link>
                    <div className="p-8 flex flex-col flex-1 relative z-10">
                      <div className="mb-4">
                        <span className="badge-accent">
                          {seriesPosts.length} Parts
                        </span>
                      </div>
                      <h3 className="mb-3 font-serif text-2xl font-bold text-heading group-hover:text-accent transition-colors">
                        <Link href={seriesUrl} className="no-underline">
                          {title}
                        </Link>
                      </h3>
                      <p className="mb-6 text-muted font-serif italic line-clamp-2 text-base">
                        {seriesData?.excerpt || "A growing collection of related thoughts."}
                      </p>
                      <div className="mt-auto pt-6 border-t border-muted/10">
                        <div className="flex flex-col gap-2">
                          {seriesPosts.slice(0, 3).map((p, idx) => (
                            <Link 
                              key={p.slug} 
                              href={`/posts/${p.slug}`}
                              className="flex items-center gap-3 group/link no-underline"
                            >
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted/10 text-[10px] flex items-center justify-center font-mono text-muted group-hover/link:bg-accent/10 group-hover/link:text-accent transition-colors">
                                {idx + 1}
                              </span>
                              <span className="text-sm text-foreground/80 group-hover/link:text-accent transition-colors truncate">
                                {p.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-serif font-bold text-heading">Featured Posts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <div key={post.slug} className="card-base group flex flex-col p-0 overflow-hidden h-full">
                  <Link href={`/posts/${post.slug}`} className="relative h-64 w-full overflow-hidden bg-muted/10 block">
                    <img 
                      src={post.coverImage || `https://images.unsplash.com/photo-1493612276216-9c59019558f7?auto=format&fit=crop&w=800&q=80`} 
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </Link>
                  <div className="p-8 flex flex-col flex-1 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="badge-accent">
                        {post.category}
                      </span>
                      <span className="text-xs font-mono text-muted">
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="mb-3 font-serif text-2xl font-bold text-heading group-hover:text-accent transition-colors">
                      <Link href={`/posts/${post.slug}`} className="no-underline">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mb-6 text-muted font-serif italic line-clamp-3 text-base">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-6 border-t border-muted/10 flex items-center justify-between">
                      <span className="text-xs font-mono text-muted">{post.date}</span>
                      <Link href={`/posts/${post.slug}`} className="text-sm font-bold uppercase tracking-widest text-accent hover:underline">
                        Read Article
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Latest Writing Section */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold text-heading">Latest Writing</h2>
            <Link href="/posts" className="text-sm font-sans font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors no-underline hover:underline">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
               <Link href="/posts/page/2" className="btn-secondary">
                 Older Posts →
               </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}