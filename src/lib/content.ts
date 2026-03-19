import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
const PUBS_DIR = path.join(process.cwd(), 'src/content/publications');
const FRAMEWORKS_DIR = path.join(process.cwd(), 'src/content/frameworks');

// ─── Blog Posts ──────────────────────────────────────────────────────────────

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  status: 'draft' | 'published';
  coverImage?: string;
  author?: string;
  series?: string;
}

export interface PostWithContent extends PostMeta {
  content: string;    // raw markdown string
  contentHtml: string; // rendered HTML
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8');
    const { data } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      summary: data.summary ?? '',
      tags: data.tags ?? [],
      status: (data.status ?? 'published') as 'draft' | 'published',
      coverImage: data.coverImage,
      author: data.author,
      series: data.series,
    } satisfies PostMeta;
  });

  return posts
    .filter((p) => p.status === 'published')
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): PostWithContent | null {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    summary: data.summary ?? '',
    tags: data.tags ?? [],
    status: (data.status ?? 'published') as 'draft' | 'published',
    coverImage: data.coverImage,
    author: data.author,
    series: data.series,
    content,
    contentHtml: marked(content) as string,
  };
}

// ─── Publications ─────────────────────────────────────────────────────────────

export interface PublicationMeta {
  slug: string;
  title: string;
  year: number;
  venue: string;
  status: 'published' | 'unpublished';
  collaborators?: string;
  abstract?: string;
  url?: string;
}

export interface PublicationWithContent extends PublicationMeta {
  content: string;
}

export function getAllPublications(): PublicationMeta[] {
  const files = fs.readdirSync(PUBS_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(PUBS_DIR, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        year: data.year ?? 0,
        venue: data.venue ?? '',
        status: (data.status ?? 'published') as 'published' | 'unpublished',
        collaborators: data.collaborators,
        abstract: data.abstract,
        url: data.url,
      } satisfies PublicationMeta;
    })
    .sort((a, b) => b.year - a.year);
}

// ─── Frameworks ───────────────────────────────────────────────────────────────

export interface FrameworkMeta {
  slug: string;
  title: string;
  category: string;
  summary: string;
  why_i_like_it?: string;
  where_i_heard_it?: string;
  real_world_application?: string;
  status: 'draft' | 'published';
}

export interface FrameworkWithContent extends FrameworkMeta {
  contentHtml: string;
}

export function getAllFrameworks(): FrameworkMeta[] {
  if (!fs.existsSync(FRAMEWORKS_DIR)) return [];
  const files = fs.readdirSync(FRAMEWORKS_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(FRAMEWORKS_DIR, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        category: data.category ?? '',
        summary: data.summary ?? '',
        why_i_like_it: data.why_i_like_it,
        where_i_heard_it: data.where_i_heard_it,
        real_world_application: data.real_world_application,
        status: (data.status ?? 'published') as 'draft' | 'published',
      } satisfies FrameworkMeta;
    })
    .filter((f) => f.status === 'published')
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getFramework(slug: string): FrameworkWithContent | null {
  const filepath = path.join(FRAMEWORKS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    category: data.category ?? '',
    summary: data.summary ?? '',
    why_i_like_it: data.why_i_like_it,
    where_i_heard_it: data.where_i_heard_it,
    real_world_application: data.real_world_application,
    status: (data.status ?? 'published') as 'draft' | 'published',
    contentHtml: marked(content) as string,
  };
}

export function getPublication(slug: string): PublicationWithContent | null {
  const filepath = path.join(PUBS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    year: data.year ?? 0,
    venue: data.venue ?? '',
    status: (data.status ?? 'published') as 'published' | 'unpublished',
    collaborators: data.collaborators,
    abstract: data.abstract,
    url: data.url,
    content,
  };
}
