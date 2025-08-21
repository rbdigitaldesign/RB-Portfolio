
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Library } from 'lucide-react';
import type { Post } from '@/lib/types';
import { getAllPosts } from '../actions/blog';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('All');
  const [activeSeries, setActiveSeries] = useState('All');

  const bannerUrl = 'https://i.imgur.com/v5tofnA.png'; 

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>(['All']);
    posts.forEach(p => {
      p.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  const allSeries = useMemo(() => {
    const series = new Set<string>(['All']);
    posts.forEach(p => {
      if (p.series) series.add(p.series);
    });
    return Array.from(series).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (activeTag !== 'All') {
      filtered = filtered.filter((p) => p.tags.includes(activeTag));
    }
    
    if (activeSeries !== 'All') {
      filtered = filtered.filter((p) => p.series === activeSeries);
    }

    return filtered;
  }, [posts, activeTag, activeSeries]);

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
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Filter by tag:</span>
              <Select onValueChange={setActiveTag} value={activeTag}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             {allSeries.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Filter by series:</span>
                 <Select onValueChange={setActiveSeries} value={activeSeries}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a series" />
                  </SelectTrigger>
                  <SelectContent>
                    {allSeries.map((series) => (
                      <SelectItem key={series} value={series}>
                        {series}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
        
        <Separator className="mb-12" />

        {isLoading ? (
          <div className="grid gap-8">
            <Card className="flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-1/2 relative min-h-[200px] md:min-h-full">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="md:w-1/2 flex flex-col p-6">
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </Card>
            <Card className="flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-1/2 relative min-h-[200px] md:min-h-full">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="md:w-1/2 flex flex-col p-6">
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </Card>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col md:flex-row overflow-hidden">
                  <div className="md:w-1/2 relative min-h-[200px] md:min-h-full">
                      <Image 
                          src={post.coverImage} 
                          alt={`Cover image for ${post.title}`}
                          fill
                          className="object-cover"
                          data-ai-hint="abstract texture"
                      />
                  </div>
                  <div className="md:w-1/2 flex flex-col">
                      <CardHeader>
                          {post.series && (
                                <Link href={`/blog/series/${encodeURIComponent(post.series)}`} className="text-sm font-semibold text-primary hover:underline flex items-center gap-2 -mt-2 mb-2">
                                    <Library className="h-4 w-4" />
                                    {post.series}
                                </Link>
                          )}
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
          <div className="text-center py-16">
            <h3 className="text-2xl font-headline">No Posts Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filter criteria.</p>
          </div>
        )}
      </div>
    </>
  );
}
