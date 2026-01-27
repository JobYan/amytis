# Architecture Overview

Amytis is a static site generator built with **Next.js 15+ (App Router)**, designed to render a "digital garden" of Markdown/MDX content.

## Core Stack

- **Framework:** Next.js (React 19)
- **Runtime:** Bun
- **Styling:** Tailwind CSS v4 (using CSS variables for theming)
- **Content:** Local `.mdx` files
- **Testing:** Bun Test

## Data Flow

1.  **Source:** Content lives in `content/posts/*.mdx`.
2.  **Parsing:** `src/lib/markdown.ts` reads the file system using Node.js `fs` module. It uses `gray-matter` to parse frontmatter (metadata) and content.
3.  **Rendering:**
    *   **Lists:** `getAllPosts()` reads all files and returns an array of metadata. This is used in `src/app/page.tsx` (Home), `src/app/archive/page.tsx`, etc.
    *   **Single Post:** `getPostBySlug(slug)` reads a specific file. This is used in `src/app/posts/[slug]/page.tsx`.
    *   **Relationships:** `getRelatedPosts` (tag/category based) and `getSeriesPosts` (series grouping) fetch contextual links for individual posts.
    *   **Static Generation:** `generateStaticParams` is implemented in dynamic routes (`[slug]`, `[page]`, `[tag]`, `[author]`) to pre-render all possible pages at build time.

## Component Structure

- **`src/app`**: Route definitions.
    - `page.tsx`: Homepage.
    - `layout.tsx`: Global layout (providers, navbar).
    - `globals.css`: Global styles and theme variables.
- **`src/components`**: Reusable UI components.
    - `Navbar`: Config-driven navigation.
    - `PostList`: Standard list item display for posts.
    - `Pagination`: Previous/Next controls.
    - `Mermaid`: Client-side Mermaid chart rendering.
    - `ThemeToggle`: Light/Dark mode switcher.
    - `RelatedPosts`: Displays related content at the bottom of posts.
    - `SeriesList`: Displays navigation for multi-part post series.
- **`src/lib`**: Utilities.
    - `markdown.ts`: The data access layer.

## Theming

Theming is handled by `next-themes` and Tailwind CSS.
- `src/app/globals.css` defines CSS variables for colors (e.g., `--background`, `--foreground`) under `:root` (light) and `.dark` (dark).
- `tailwind.config` (or v4 CSS) maps utility classes to these variables.
- `ThemeProvider` in `src/components/ThemeProvider.tsx` manages the `.dark` class on the `<html>` element.
