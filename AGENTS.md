# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router pages and route handlers (`posts`, `series`, `tags`, `authors`, feeds, sitemap).
- `src/components/`: Reusable UI building blocks (cards, navigation, search, i18n/theme controls).
- `src/lib/`: Content parsing and shared logic (`markdown.ts`, i18n helpers, rehype utilities).
- `content/posts/`, `content/series/`: Markdown/MDX source content. Use folder posts (`index.mdx` + `images/` or `assets/`) when media is co-located.
- `tests/`: Integration/e2e/tooling suites; keep focused utility tests near source (example: `src/lib/markdown.test.ts`).
- `scripts/`: Bun-based authoring/import tooling.

## Build, Test, and Development Commands
- `bun install`: Install dependencies.
- `bun dev`: Run local dev server at `http://localhost:3000`.
- `bun run build`: Production export build (asset copy + Next build + image optimizer).
- `bun run build:dev`: Build without export image optimization.
- `bun run clean`: Remove generated outputs (`.next`, `out`, `public/posts`).
- `bun run lint`: Run ESLint.
- `bun test` / `bun run test:unit` / `bun run test:int` / `bun run test:e2e`: Run all or scoped tests.

## Coding Style & Naming Conventions
- Use TypeScript for app and utility code; MDX/Markdown for content.
- Match existing file style and let ESLint enforce consistency.
- Naming: components in PascalCase (`PostCard.tsx`), helpers in camelCase (`getAuthorSlug`), content slugs in kebab-case unless intentionally Unicode.
- Keep business logic in `src/lib/` and keep route files thin.

## Static Export Route Rules (Important)
- Project uses `output: "export"` and `trailingSlash: true` in `next.config.ts`.
- In `generateStaticParams()`, return raw segment values; do not pre-encode with `encodeURIComponent`.
- Never link to route placeholders like `/posts/[slug]`; always link to concrete slugs (for example, `/posts/中文测试文章`).
- When touching dynamic routes, verify both ASCII and Unicode paths.

## Testing Guidelines
- Test framework: Bun (`bun:test`). File pattern: `*.test.ts`.
- Add tests when changing slug resolution, content parsing, routing, or scaffolding scripts.
- Before PR: run `bun run lint && bun test && bun run build:dev`.

## Commit & Pull Request Guidelines
- Follow Conventional Commits used in history (`feat:`, `fix:`, `refactor:`, `docs:`, `release:`).
- Keep commits single-purpose and include impacted paths in PR description.
- PRs should include intent, validation steps, and screenshots for UI changes.
- CI must pass (`bun install --frozen-lockfile`, lint, test, build).
