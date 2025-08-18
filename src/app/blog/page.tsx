
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wrench } from 'lucide-react';
import posts from '@/data/posts.json';
import type { Post } from '@/lib/types';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

const DesignToSolveLogo = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 400 60" 
      aria-labelledby="dts-title" 
      role="img"
      className="w-full max-w-md h-auto"
    >
      <title id="dts-title">DesignToSolve Logo</title>
      <desc id="dts-desc">The words 'DesignToSolve' in a stylized font.</desc>
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        className="font-headline text-5xl fill-current"
      >
        DesignToSolve
      </text>
    </svg>
);


export default function BlogPage() {
  const typedPosts: Post[] = posts;
  const { user, loading } = useAuth();

  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <header className="mb-12">
        <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold font-headline mb-2 sr-only">DesignToSolve</h1>
            <DesignToSolveLogo />
        </div>
        <div className="text-lg text-muted-foreground space-y-4 max-w-3xl">
          <p>
            Design and learning aren’t always elegant. Here you’ll find ideas shaped by patterns in nature, sarcasm, and the occasional brain fart.
          </p>
        </div>
      </header>

      {typedPosts.length > 0 ? (
        <div className="grid gap-8">
          {typedPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-1/3 relative min-h-[200px] md:min-h-full">
                    <Image 
                        src={post.coverImage} 
                        alt={`Cover image for ${post.title}`}
                        fill
                        className="object-cover"
                        data-ai-hint="abstract texture"
                    />
                </div>
                <div className="md:w-2/3 flex flex-col">
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
  );
}
