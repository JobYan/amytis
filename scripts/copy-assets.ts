import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'content', 'posts');
const destDir = path.join(process.cwd(), 'public', 'posts');

function copyRecursive(src: string, dest: string) {
  if (!fs.existsSync(src)) return;
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      // Copy all files. You can filter for non-markdown here if you prefer.
      if (!entry.name.endsWith('.md') && !entry.name.endsWith('.mdx')) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${entry.name}`);
      }
    }
  }
}

console.log('Copying assets from content/posts to public/posts...');
copyRecursive(srcDir, destDir);
console.log('Assets copied successfully.');
