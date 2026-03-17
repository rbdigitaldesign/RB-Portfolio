
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/content';

export const metadata = {
  title: 'Writing — Rich Bartlett',
  description: 'Thoughts on learning design, UX, and the craft of making things that work.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="border-b border-border pb-10 mb-12">
        <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">Writing</p>
        <h1 className="text-4xl md:text-5xl font-headline font-semibold max-w-2xl leading-tight">
          Thoughts on design,<br /> learning, and craft.
        </h1>
      </header>

      {posts.length === 0 && (
        <p className="text-muted-foreground">No posts yet — check back soon.</p>
      )}

      {/* Featured post */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group block border border-border hover:border-foreground transition-colors mb-12"
        >
          <div className="grid md:grid-cols-2">
            {featured.coverImage && (
              <div className="relative aspect-video md:aspect-auto md:min-h-[280px] overflow-hidden bg-muted">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                />
              </div>
            )}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-3">
                {featured.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs font-medium text-accent uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-headline font-semibold text-2xl md:text-3xl leading-snug mb-3 group-hover:text-accent transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                {featured.summary}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-mono">
                  {new Date(featured.date).toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="text-sm font-medium text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Remaining posts */}
      {rest.length > 0 && (
        <div className="divide-y divide-border">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-8 hover:bg-muted/30 -mx-4 px-4 transition-colors"
            >
              {post.coverImage && (
                <div className="relative w-full sm:w-32 aspect-video sm:aspect-square flex-shrink-0 overflow-hidden bg-muted">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-headline font-semibold text-xl leading-snug mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.summary}</p>
                <span className="mt-3 text-xs text-muted-foreground font-mono block">
                  {new Date(post.date).toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
