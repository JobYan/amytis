import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Simple mime type lookup since I can't install packages easily without user command
function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    case '.webp': return 'image/webp';
    case '.mp4': return 'video/mp4';
    case '.pdf': return 'application/pdf';
    case '.txt': return 'text/plain';
    case '.json': return 'application/json';
    default: return 'application/octet-stream';
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; path: string[] }> }
) {
  const { slug, path: pathSegments } = await params;

  // Security: prevent directory traversal
  if (slug.includes('..') || pathSegments.some(segment => segment.includes('..'))) {
    return new NextResponse('Invalid path', { status: 400 });
  }

  const relativePath = path.join(...pathSegments);
  const postsDirectory = path.join(process.cwd(), 'content', 'posts');
  
  // Check if the post is a directory
  let nestedPostDir = path.join(postsDirectory, slug);

  // If direct match doesn't exist, scan for date-prefixed directory
  if (!fs.existsSync(nestedPostDir)) {
    const items = fs.readdirSync(postsDirectory);
    for (const item of items) {
      const dateRegex = /^(\d{4}-\d{2}-\d{2})-(.*)$/;
      const match = item.match(dateRegex);
      if (match && match[2] === slug) {
        nestedPostDir = path.join(postsDirectory, item);
        break;
      }
    }
  }

  const assetPath = path.join(nestedPostDir, relativePath);

  if (!fs.existsSync(assetPath)) {
    return new NextResponse('File not found', { status: 404 });
  }

  // Ensure the file is actually inside the nested post directory (extra safety)
  if (!assetPath.startsWith(nestedPostDir)) {
     return new NextResponse('Access denied', { status: 403 });
  }

  const fileBuffer = fs.readFileSync(assetPath);
  const contentType = getMimeType(assetPath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
