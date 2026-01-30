import { visit } from 'unist-util-visit';
import sizeOf from 'image-size';
import path from 'path';
import fs from 'fs';

interface Options {
  slug?: string;
}

// Pre-compute the public directory path at module load time
// This helps Turbopack with static analysis
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const POSTS_DIR = path.resolve(PUBLIC_DIR, 'posts');

function getImageDimensions(imagePath: string): { width: number; height: number } | null {
  try {
    if (!fs.existsSync(imagePath)) {
      return null;
    }
    const buffer = fs.readFileSync(imagePath);
    const dimensions = sizeOf(buffer);
    if (dimensions && dimensions.width && dimensions.height) {
      return { width: dimensions.width, height: dimensions.height };
    }
  } catch {
    // Silently fail - image dimensions are optional
  }
  return null;
}

export default function rehypeImageMetadata(options: Options) {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'img' && node.properties && typeof node.properties.src === 'string') {
        const src = node.properties.src as string;

        if (src.startsWith('http')) return;

        let imagePath = '';
        let publicPath = '';

        if (src.startsWith('./') && options.slug) {
          // Relative path in post
          // e.g. ./assets/image.svg -> public/posts/slug/assets/image.svg
          const relative = src.substring(2);
          imagePath = path.resolve(POSTS_DIR, options.slug, relative);
          publicPath = `/posts/${options.slug}/${relative}`;
        } else if (src.startsWith('/')) {
          // Absolute path from public
          imagePath = path.resolve(PUBLIC_DIR, src.substring(1));
          publicPath = src;
        } else {
          return;
        }

        const dimensions = getImageDimensions(imagePath);
        if (dimensions) {
          node.properties.width = dimensions.width;
          node.properties.height = dimensions.height;
          node.properties.src = publicPath;
        }
      }
    });
  };
}
