# Contributing to Amytis

## Getting Started

1.  **Install Bun:** Ensure you have Bun installed.
2.  **Install Dependencies:**
    ```bash
    bun install
    ```
3.  **Run Development Server:**
    ```bash
    bun dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## Writing Content

1.  Create a new `.mdx` file in `content/posts/`.
2.  The filename will be the URL slug (e.g., `my-new-post.mdx` -> `/posts/my-new-post`).
3.  Add the required frontmatter:

```yaml
---
title: "My New Post"
date: "2026-01-01"
excerpt: "A brief summary."
category: "Thoughts"
tags: ["example", "demo"]
authors: ["Your Name"]
---

Your content here...
```

## Running Tests

We use Bun's built-in test runner.

- **Run all tests:** `bun test`
- **Run unit tests:** `bun run test:unit`
- **Run integration tests:** `bun run test:int`

## Code Style

- **Linting:** `bun run lint`
- **Formatting:** Code should match the project's Prettier/ESLint configuration.
