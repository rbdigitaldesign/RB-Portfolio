
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllPosts, getPost } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Rich Bartlett`,
    description: post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto px-6 py-16">
      {/* Back nav */}
      <nav className="mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Writing
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs font-medium text-accent uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="font-headline font-semibold leading-tight mb-4">{post.title}</h1>
        <p className="text-sm text-muted-foreground font-mono">
          {new Date(post.date).toLocaleDateString('en-AU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          {post.author && ` · ${post.author}`}
        </p>
      </header>

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative w-full aspect-video mb-12 overflow-hidden bg-muted">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Rendered content */}
      <div
        className="prose prose-lg max-w-none prose-headings:font-headline prose-headings:font-semibold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-accent prose-img:rounded-sm blog-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Footer nav */}
      <div className="mt-16 pt-8 border-t border-border">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} /> Back to Writing
        </Link>
      </div>
    </article>
  );
}
