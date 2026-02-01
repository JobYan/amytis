# Amytis Project Context

## Project Overview
**Amytis** is a Next.js 15+ application (using App Router) designed as a "digital garden" or blog. It focuses on a clean, nature-inspired aesthetic (using emerald color palettes) and dynamically renders Markdown content.

### Main Technologies
- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Static Generation**: Uses `generateStaticParams` for pre-rendering blog posts at build time.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/typography` using the `prose-emerald` theme.
- **Content Parsing**: `gray-matter` for frontmatter and `react-markdown` for rendering Markdown.
- **Language**: TypeScript
- **Runtime/Package Manager**: Bun (indicated by `bun.lock`)

## Building and Running

### Development
```bash
bun dev
```

### Production Build
```bash
bun run build
bun run start
```

### Linting
```bash
bun run lint
```

## Project Structure
- `src/app/`: Contains the Next.js App Router pages and layouts.
  - `page.tsx`: Home page listing featured series, featured posts, and latest writing.
  - `posts/`: All posts list and individual post pages (`[slug]`).
  - `series/`: Series index and individual series pages (`[slug]`).
  - `archive/`: Archive timeline page.
  - `tags/`: Tag cloud and tag-specific pages.
- `src/lib/`: Shared utilities.
  - `markdown.ts`: Core logic for reading and parsing markdown files from the `content/` directory.
- `src/components/`: Reusable UI components (Hero, PostCard, Pagination, SeriesSidebar, etc.).
- `content/`: The source directory for `.md` files. Each file represents a post.
- `public/`: Static assets like images and SVGs.

## Key Features & Configuration

### Content Management
- **Posts**: Added to `content/posts/` (file-based).
- **Series**: Added to `content/series/` (folder-based or file-based).
  - Supports `index.mdx` for series metadata.
  - Supports mixed content (files and folders within series).
  - Configurable sorting (`date-desc`, `date-asc`, `manual`) via frontmatter.
  - Cross-referencing posts from other series/folders.
- **Frontmatter**: Standard fields (`title`, `date`, `excerpt`, `coverImage`, `tags`, `featured`).

### Layouts & Navigation
- **Homepage**: Configurable sections for "Curated Series" and "Featured Stories" with horizontal scrolling triggers.
- **Pagination**: Configurable page sizes for posts and series lists via `site.config.ts`.
- **Theme**: Light/Dark mode with configurable color palettes.
- **i18n**: Client-side language switcher (Infrastructure ready).

### Configuration (`site.config.ts`)
- **Navigation**: customizable menu items.
- **Featured Content**: `homepage.maxFeaturedSeries`, `homepage.maxFeaturedPosts`.
- **Pagination**: `pagination.posts`, `pagination.series`.
- **Socials**: Links for footer/contact.

## Recent Updates
- Refined homepage layout with distinct styles for Series (cards), Featured (wide cards/carousel), and Latest (timeline).
- Implemented robust series support with folder-based posts and asset co-location.
- Added "All Posts" page with pagination.
- Added Series pagination.
- Updated `PostCard` design (removed excerpt, simplified layout).
- Added `HorizontalScroll` component for homepage sections.
- Refined Archive and Tags pages for better typography and layout.