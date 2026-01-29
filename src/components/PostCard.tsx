import Link from 'next/link';
import { PostData } from '@/lib/markdown';

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=800&q=80", // Abstract Paint
  "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80", // Colorful Paint
  "https://images.unsplash.com/photo-1579783902614-a3fb39279c23?auto=format&fit=crop&w=800&q=80", // Museum Art
  "https://images.unsplash.com/photo-1501472312651-726efe1188c1?auto=format&fit=crop&w=800&q=80", // Cloud/Sky
  "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?auto=format&fit=crop&w=800&q=80", // Flower/Oil
];

export default function PostCard({ post }: { post: PostData }) {
  // Deterministic random image based on slug
  const imageIndex = post.slug.length % PLACEHOLDER_IMAGES.length;
  const imageUrl = post.coverImage || PLACEHOLDER_IMAGES[imageIndex];
  
  const isTextCover = imageUrl.startsWith('text:');
  const coverText = isTextCover ? imageUrl.replace('text:', '') : '';

  // Deterministic gradient
  const gradients = [
    'from-emerald-50 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 text-emerald-800 dark:text-emerald-100',
    'from-amber-50 to-amber-200 dark:from-amber-900/50 dark:to-amber-800/50 text-amber-800 dark:text-amber-100',
    'from-rose-50 to-rose-200 dark:from-rose-900/50 dark:to-rose-800/50 text-rose-800 dark:text-rose-100',
    'from-sky-50 to-sky-200 dark:from-sky-900/50 dark:to-sky-800/50 text-sky-800 dark:text-sky-100',
    'from-violet-50 to-violet-200 dark:from-violet-900/50 dark:to-violet-800/50 text-violet-800 dark:text-violet-100',
  ];
  const gradientClass = gradients[post.slug.length % gradients.length];

  return (
    <Link href={`/posts/${post.slug}`} className="group block h-full no-underline">
      <div className="flex flex-col h-full overflow-hidden rounded-xl border border-muted/20 bg-background transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
        <div className="relative h-48 w-full overflow-hidden bg-muted/10">
          {isTextCover ? (
            <div className={`h-full w-full bg-gradient-to-br ${gradientClass} flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-105`}>
              <span className="font-serif text-4xl font-bold tracking-tight opacity-90">
                {coverText}
              </span>
            </div>
          ) : (
            <img 
              src={imageUrl} 
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-sans text-muted">
            <span className="font-mono text-accent">{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-muted/30" />
            <span className="uppercase tracking-widest">{post.category}</span>
          </div>
          <h3 className="mb-3 font-serif text-xl font-bold text-heading leading-tight transition-colors group-hover:text-accent">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm text-foreground/70 font-serif leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
