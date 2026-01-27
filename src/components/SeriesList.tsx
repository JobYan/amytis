import Link from 'next/link';
import { PostData } from '@/lib/markdown';

interface SeriesListProps {
  seriesName: string;
  posts: PostData[];
  currentSlug: string;
}

export default function SeriesList({ seriesName, posts, currentSlug }: SeriesListProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="my-8 p-6 bg-muted/5 rounded-lg border border-muted/20">
      <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-muted mb-4">
        Series: {seriesName}
      </h3>
      <ol className="list-decimal list-inside space-y-2">
        {posts.map((post) => (
          <li key={post.slug} className={`text-sm ${post.slug === currentSlug ? 'font-bold text-heading' : 'text-foreground/70'}`}>
            {post.slug === currentSlug ? (
              <span>{post.title}</span>
            ) : (
              <Link 
                href={`/posts/${post.slug}`}
                className="hover:text-accent hover:underline transition-colors duration-200"
              >
                {post.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
