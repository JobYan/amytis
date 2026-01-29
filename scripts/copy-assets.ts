import fs from 'fs';
import path from 'path';
import { siteConfig } from '../site.config';

const srcDir = path.join(process.cwd(), 'content', 'posts');
const seriesSrcDir = path.join(process.cwd(), 'content', 'series');
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
      // Copy all files except markdown source
      if (!entry.name.endsWith('.md') && !entry.name.endsWith('.mdx')) {
        let shouldCopy = true;
        if (fs.existsSync(destPath)) {
          const srcStat = fs.statSync(srcPath);
          const destStat = fs.statSync(destPath);
          if (srcStat.mtimeMs <= destStat.mtimeMs) {
            shouldCopy = false;
          }
        }

        if (shouldCopy) {
          fs.copyFileSync(srcPath, destPath);
          // console.log(`Copied: ${entry.name} -> ${destPath}`);
        }
      }
    }
  }
}

function getSlugFromFilename(filename: string): string {
  const nameWithoutExt = filename.replace(/\.mdx?$/, '');
  const dateRegex = /^(\d{4}-\d{2}-\d{2})-(.*)$/;
  const match = nameWithoutExt.match(dateRegex);

  if (match && !siteConfig.includeDateInUrl) {
    return match[2];
  }
  return nameWithoutExt;
}

function processPosts() {
  if (fs.existsSync(srcDir)) {
    const entries = fs.readdirSync(srcDir, { withFileTypes: true });

    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        const targetName = getSlugFromFilename(entry.name);
        const srcPostDir = path.join(srcDir, entry.name);
        const destPostDir = path.join(destDir, targetName);

        console.log(`Processing Post: ${entry.name} -> ${targetName}`);
        copyRecursive(srcPostDir, destPostDir);
      }
    });
  }
}

function processSeries() {
  if (!fs.existsSync(seriesSrcDir)) return;

  const seriesEntries = fs.readdirSync(seriesSrcDir, { withFileTypes: true });

  seriesEntries.forEach((seriesEntry) => {
    if (seriesEntry.isDirectory()) {
      const seriesPath = path.join(seriesSrcDir, seriesEntry.name);
      const items = fs.readdirSync(seriesPath, { withFileTypes: true });

      // Identify posts and assets
      const posts = items.filter(i => i.isFile() && (i.name.endsWith('.md') || i.name.endsWith('.mdx')) && !i.name.startsWith('index.'));
      
      // For each post in the series, copy ALL siblings (assets) to its public folder
      posts.forEach(post => {
        const targetSlug = getSlugFromFilename(post.name);
        const destPostDir = path.join(destDir, targetSlug);
        
        console.log(`Processing Series Post: ${seriesEntry.name}/${post.name} -> ${targetSlug}`);
        
        // Copy everything from series folder EXCEPT markdown files
        // effectively copying "shared" assets
        items.forEach(item => {
           const srcItemPath = path.join(seriesPath, item.name);
           const destItemPath = path.join(destPostDir, item.name);
           
           if (item.isDirectory()) {
             copyRecursive(srcItemPath, destItemPath);
           } else if (!item.name.endsWith('.md') && !item.name.endsWith('.mdx')) {
             // Copy file
             if (!fs.existsSync(destPostDir)) {
                fs.mkdirSync(destPostDir, { recursive: true });
             }
             fs.copyFileSync(srcItemPath, destItemPath);
           }
        });
      });
    }
  });
}

console.log('Copying assets...');
processPosts();
processSeries();
console.log('Assets copied successfully.');