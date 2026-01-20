---
title: "Legacy Markdown Support"
date: "2025-10-15"
excerpt: "Demonstrating support for standard .md files."
category: "Meta"
tags: ["markdown", "legacy"]
author: "Old Timer"
---

# Legacy Markdown Support

This post is written in a standard `.md` file, not `.mdx`.

## Why support both?

Migration from other systems (Jekyll, Hugo) often involves thousands of `.md` files. Supporting them natively makes migration easier.

### Code Block Test

```javascript
console.log("Hello from .md file!");
```

- Item 1
- Item 2

## References

This is a [link to markdown guide][md-guide].

Internal links: [Home](/) and [Archives](/archive).

## More Reference Links

Reference links test: [Markdown Guide][guide], [CommonMark][commonmark].

[guide]: https://www.markdownguide.org
[commonmark]: https://commonmark.org

### markdown table

| Feature | Sum | Notes |
| :--- | :---: | :--- |
| Tables | `>` 10 | Requires remark-gfm |
| Task Lists | 5 | Checkboxes |
| Strikethrough | 1 | ~~Deleted~~ |

