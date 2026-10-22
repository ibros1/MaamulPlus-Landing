import 'server-only';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { z } from 'zod';

const BLOG_DIR = join(process.cwd(), 'src/content/blog');

const frontMatterSchema = z.object({
  title: z.string().min(10).max(110),
  description: z.string().min(140).max(160),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  author: z.string(),
  tags: z.array(z.string()),
  ogTitle: z.string().optional(),
  /** Short <title> (≤ 47 chars before the template). Defaults to title. */
  seoTitle: z.string().max(47).optional(),
});

export type PostFrontMatter = z.infer<typeof frontMatterSchema>;

export interface PostMeta extends PostFrontMatter {
  slug: string;
  readingMinutes: number;
  words: number;
  headings: { id: string; text: string }[];
}

export interface Post extends PostMeta {
  content: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parse(file: string): Post {
  const raw = readFileSync(join(BLOG_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const fm = frontMatterSchema.parse(data);
  const stats = readingTime(content);
  const headings = Array.from(content.matchAll(/^## (.+)$/gm)).map((m) => {
    const text = (m[1] ?? '').trim();
    return { id: slugify(text), text };
  });
  return {
    ...fm,
    slug: file.replace(/\.mdx$/, ''),
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    words: stats.words,
    headings,
    content,
  };
}

let cache: Post[] | undefined;

/** All posts, newest first. Read from disk once per build. */
export function getAllPosts(): Post[] {
  cache ??= readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map(parse)
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
