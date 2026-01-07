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
  - `page.tsx`: Home page listing all available posts.
  - `posts/[slug]/page.tsx`: Handles dynamic rendering and static generation of individual blog posts.
- `src/lib/`: Shared utilities.
  - `markdown.ts`: Core logic for reading and parsing markdown files from the `content/` directory.
- `content/`: The source directory for `.md` files. Each file represents a post.
- `public/`: Static assets like images and SVGs.

## Development Conventions

### Content Management
- Posts are added by creating a new `.md` file in the `content/` directory.
- Files should include frontmatter (title, date, excerpt) compatible with the `PostData` interface in `src/lib/markdown.ts`.

### Coding Style
- Functional components with React 19.
- TypeScript for type safety, especially for data fetching and content parsing.
- Tailwind CSS utility classes for styling, adhering to the Typography plugin for article content.
