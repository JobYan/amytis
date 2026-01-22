import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const title = args[0];
const templateArgIndex = args.indexOf('--template');
const templateName = templateArgIndex > -1 ? args[templateArgIndex + 1] : 'default';

if (!title) {
  console.error('Please provide a post title.');
  console.error('Usage: bun new <title> [--template <name>]');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)+/g, '');

const date = new Date().toISOString().split('T')[0];
const filename = `${date}-${slug}.mdx`;
const targetPath = path.join(process.cwd(), 'content', 'posts', filename);

const templatePath = path.join(process.cwd(), 'templates', `${templateName}.mdx`);

let content = '';

if (fs.existsSync(templatePath)) {
  content = fs.readFileSync(templatePath, 'utf8');
} else {
  // Fallback default template if file not found
  content = `---
title: "{{title}}"
date: "{{date}}"
excerpt: ""
category: "Uncategorized"
tags: []
authors: ["Amytis"]
layout: "post"
draft: false
latex: false
---

Write your content here...
`;
}

content = content.replace(/{{title}}/g, title).replace(/{{date}}/g, date);

if (fs.existsSync(targetPath)) {
  console.error(`Error: Post already exists at ${targetPath}`);
  process.exit(1);
}

fs.writeFileSync(targetPath, content);
console.log(`Created new post: ${targetPath}`);
