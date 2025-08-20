
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPost } from '@/app/actions/blog';
import type { Post } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BlogPostActions } from '@/components/blog-post-actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { cn } from '@/lib/utils';

import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';

const toSafeHtml = (input: string) => {
  // First, check if the input is likely HTML. If so, use it directly.
  // Otherwise, parse it as Markdown.
  const html = input.includes('<') ? input : (marked.parse(input || '') as string);

  // Then, sanitize the HTML to ensure it's safe.
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img','h1','h2','h3','figure','figcaption','code','pre']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src','alt','title','width','height','loading', 'class', 'style'], // allow style for resizing
      a: ['href','name','target','rel'],
      code: ['class'],
      div: ['class'] // Allow class for containers
    },
    // Ensure links are safe
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer nofollow' }),
    },
  });
};


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPostData() {
      setIsLoading(true);
      const fetchedPost = await getPost(params.slug);
      if (!fetchedPost) {
        setIsLoading(false);
        notFound();
        return;
      }
      setPost(fetchedPost);
      setIsLoading(false);
    }
    getPostData();
  }, [params.slug]);

  if (isLoading) {
    return (
      <article className="container mx-auto max-w-4xl py-16 px-4">
        <header className="text-center mb-12">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
        </header>
        <Skeleton className="relative w-full aspect-video mb-12 rounded-lg" />
        <div className="prose dark:prose-invert max-w-none mx-auto space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </article>
    );
  }

  if (!post) {
    return null; // notFound() is called in useEffect
  }

  const isSpecialPost = post.slug === 'simple-truths-we-often-overlook-in-learning-design';

  return (
    <article className="container mx-auto max-w-4xl py-16 px-4">
       <nav className="mb-8">
        <Button variant="blogHome" asChild>
          <Link href="/blog">
            <Home className="mr-2 h-4 w-4" />
             Blog Home
          </Link>
        </Button>
      </nav>

      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-4">{post.title}</h1>
        <div className="text-sm text-muted-foreground mb-4">
          <span>Published on {new Date(post.publishedDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</span> by <span>{post.author}</span>
        </div>
        <div className="flex justify-center flex-wrap gap-2">
            {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
      </header>

      <div className="relative w-full aspect-video mb-12 rounded-lg overflow-hidden shadow-strong">
         <Image
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            fill
            priority
            className="object-cover"
            data-ai-hint="blog post cover abstract"
          />
      </div>

      <div 
        className={cn(
          "prose dark:prose-invert max-w-none mx-auto blog-content",
          "prose-headings:font-headline prose-headings:text-primary dark:prose-headings:text-primary-foreground",
          "prose-a:text-primary hover:prose-a:text-accent dark:prose-a:text-accent",
          "prose-img:max-w-[680px] prose-img:w-full prose-img:h-auto prose-img:mx-auto prose-img:rounded-lg",
          isSpecialPost && "post-simple-truths"
        )}
        dangerouslySetInnerHTML={{ __html: toSafeHtml(post.content) }}
      />
      
      <Separator className="my-8" />
      
      <div className="flex justify-center">
        <BlogPostActions slug={post.slug} />
      </div>
      
      <ScrollToTopButton />
    </article>
  );
}
