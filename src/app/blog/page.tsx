
import Link from 'next/link';
import Image from 'next/image';
import { getDownloadURL, ref } from 'firebase/storage';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wrench } from 'lucide-react';
import { storage } from '@/lib/firebase';
import posts from '@/data/posts.json';
import type { Post } from '@/lib/types';

async function BlogPage() {
  const typedPosts: Post[] = posts;
  let bannerUrl = '';
  try {
    const bannerRef = ref(storage, 'banners/What Am I On About - Blog.svg');
    bannerUrl = await getDownloadURL(bannerRef);
  } catch (error) {
    console.error("Failed to get banner URL:", error);
    // Use a placeholder or handle the error gracefully
    bannerUrl = 'https://placehold.co/1900x225.png'; 
  }

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
      
      <section className="bg-background text-foreground py-12">
        <div className="container mx-auto max-w-4xl py-8 px-4">
          <header className="text-center">
            <h1 className="text-4xl font-bold font-headline mb-4">WHAT AM I ON ABOUT 🤔</h1>
            <div className="text-lg space-y-4 max-w-3xl mx-auto opacity-90">
              <p>
                Design, learning, and biomimicry—a blog served with sarcasm and the occasional brain fart.
              </p>
            </div>
          </header>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl py-16 px-4">
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
    </>
  );
}

export default BlogPage;
