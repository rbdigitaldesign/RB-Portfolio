
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllPosts } from '@/lib/content';

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ seriesName: string }>;
}) {
  const { seriesName } = await params;
  const decoded = decodeURIComponent(seriesName);

  const posts = getAllPosts().filter((p) => p.series === decoded);
  if (posts.length === 0) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <nav className="mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Writing
        </Link>
      </nav>

      <header className="border-b border-border pb-10 mb-12">
        <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">Series</p>
        <h1 className="font-headline font-semibold text-4xl leading-tight">{decoded}</h1>
      </header>

      <ol className="divide-y divide-border">
        {posts.map((post, i) => (
          <li key={post.slug} className="py-6 flex items-baseline gap-4">
            <span className="text-sm font-mono text-muted-foreground w-6 flex-shrink-0">
              {i + 1}
            </span>
            <div>
              <Link
                href={`/blog/${post.slug}`}
                className="font-headline font-semibold text-lg hover:text-accent transition-colors"
              >
                {post.title}
              </Link>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                {new Date(post.date).toLocaleDateString('en-AU', {
                  year: 'numeric',
                  month: 'long',
                })}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
