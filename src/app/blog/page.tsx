
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/types';
import { getAllPosts } from '../actions/blog';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const bannerUrl = 'https://i.imgur.com/v5tofnA.png'; 

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        // Optionally, show an error message to the user
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <section className="bg-[#568f90]">
         <div className="container mx-auto px-4 banner">
          {bannerUrl && (
            <div className="relative w-full h-auto aspect-[1900/225]">
               <Image
                src={bannerUrl}
                alt="What Am I On About – blog banner"
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>
          )}
        </div>
      </section>

      <div className="container mx-auto max-w-4xl py-16 px-4">
        {isLoading ? (
          <div className="grid gap-8">
            <Card className="flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-2/5 relative min-h-[200px] md:min-h-full">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="md:w-3/5 flex flex-col p-6">
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </Card>
            <Card className="flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-2/5 relative min-h-[200px] md:min-h-full">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="md:w-3/5 flex flex-col p-6">
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </Card>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-8">
            {posts.map((post) => (
              <Card key={post.slug} className="flex flex-col md:flex-row overflow-hidden">
                  <div className="md:w-2/5 relative min-h-[200px] md:min-h-full">
                      <Image 
                          src={post.coverImage} 
                          alt={`Cover image for ${post.title}`}
                          fill
                          className="object-cover"
                          data-ai-hint="abstract texture"
                      />
                  </div>
                  <div className="md:w-3/5 flex flex-col">
                      <CardHeader>
                          <CardTitle className="font-headline text-2xl">
                            <Link href={`/blog/${post.slug}`} className="hover:underline">
                              {post.title}
                            </Link>
                          </CardTitle>
                          <CardDescription>
                              {new Date(post.publishedDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                          <p>{post.summary}</p>
                      </CardContent>
                      <CardFooter>
                          <Button asChild variant="link" className="p-0 h-auto">
                              <Link href={`/blog/${post.slug}`} className="group">
                                  Read More
                                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Link>
                          </Button>
                      </CardFooter>
                  </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground">No blog posts have been published yet. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
}
