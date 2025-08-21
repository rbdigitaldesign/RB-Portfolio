
'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostsBySeries } from '@/app/actions/blog';
import type { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Home } from 'lucide-react';

export default function SeriesPage() {
  const params = useParams();
  const seriesName = params.seriesName ? decodeURIComponent(params.seriesName as string) : '';
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!seriesName) return;
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const fetchedPosts = await getPostsBySeries(seriesName);
        if (fetchedPosts.length === 0) {
          notFound();
        }
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts for series:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [seriesName]);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl py-16 px-4">
        <Skeleton className="h-10 w-3/4 mx-auto mb-12" />
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
       <nav className="mb-8 flex justify-between items-center">
        <Button variant="blogHome" asChild>
          <Link href="/blog">
            <Home className="mr-2 h-4 w-4" />
             Blog Home
          </Link>
        </Button>
      </nav>
      <header className="text-center mb-12">
        <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Blog Series</p>
        <h1 className="text-4xl md:text-5xl font-bold font-headline mt-2">{seriesName}</h1>
      </header>
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {posts.map((post, index) => (
          <li key={post.id} className="mb-10 ml-6">
            <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground ring-8 ring-background">
              {index + 1}
            </span>
            <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                    </Link>
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    Published on {new Date(post.publishedDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">{post.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

