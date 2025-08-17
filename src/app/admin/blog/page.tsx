
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Share2 } from "lucide-react";
import Link from "next/link";
import posts from "@/data/posts.json";
import { useEffect, useState } from "react";
import type { Post } from "@/lib/types";


export default function AdminBlogPage() {
  const { toast } = useToast();
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const handleShare = (slug: string) => {
    const postUrl = `${origin}/blog/${slug}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      toast({
        title: "Link Copied!",
        description: "The blog post link has been copied to your clipboard.",
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({
        title: "Error",
        description: "Could not copy link to clipboard.",
        variant: "destructive",
      });
    });
  };

  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold font-headline">Blog Management</h1>
          <p className="text-xl text-muted-foreground">
            Create and manage your blog posts.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            New Post
          </Link>
        </Button>
      </header>

      <Card>
        <CardHeader>
            <CardTitle>Existing Posts</CardTitle>
            <CardDescription>A list of your current blog posts.</CardDescription>
        </CardHeader>
        <CardContent>
           {(posts as Post[]).length > 0 ? (
             <ul className="space-y-4">
              {(posts as Post[]).map((post) => (
                <li key={post.slug} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{new Date(post.publishedDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleShare(post.slug)}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/blog/edit/${post.slug}`}>Edit</Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
           ) : (
            <p className="text-center text-muted-foreground py-8">No posts yet. Create your first one!</p>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
