import Link from 'next/link';
import { getAllTags } from '@/lib/markdown';

export const metadata = {
  title: 'Tags | Amytis',
  description: 'Explore topics in the garden.',
};

export default function TagsPage() {
  const tags = getAllTags();
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);

  return (
    <div className="layout-container">
      <header className="mb-20 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-heading mb-6">Tags</h1>
        <p className="text-lg text-muted font-serif italic">
          Explore the topics cultivated in this garden.
        </p>
      </header>

      <main>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {sortedTags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="group relative inline-flex items-center px-5 py-2.5 rounded-xl border border-muted/20 bg-muted/5 hover:bg-background hover:border-accent hover:shadow-md hover:shadow-accent/5 transition-all duration-300 no-underline"
            >
              <span className="font-sans font-medium text-foreground group-hover:text-accent transition-colors text-sm md:text-base">
                {tag}
              </span>
              <span className="ml-3 text-xs font-mono text-muted/60 group-hover:text-accent/60">
                {tags[tag]}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
