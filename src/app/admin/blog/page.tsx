
'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Share2, Trash2, Eye, Pencil, Clock, Library } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import type { Post } from "@/lib/types";
import { getAllPosts } from "@/app/actions/blog";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { clientDb, clientStorage } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";

export default function AdminBlogPage() {
  const { toast } = useToast();
  const [origin, setOrigin] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const fetchedPosts = await getAllPosts();
    setPosts(fetchedPosts);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setOrigin(window.location.origin);
    fetchPosts();
  }, [fetchPosts]);

  const handleShare = (slug: string) => {
    const postUrl = `${origin}/blog/${slug}`;
    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        toast({
          title: "Link copied",
          description: "The blog post link has been copied to your clipboard."
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast({
          title: "Error",
          description: "Could not copy link to clipboard.",
          variant: "destructive"
        });
      });
  };

  const handleDelete = async (postId: string) => {
    try {
      if (!clientDb) {
        throw new Error('Database service is not available.');
      }
      const postRef = doc(clientDb, "posts", postId);
      const postSnap = await getDoc(postRef);
      if (!postSnap.exists()) {
        throw new Error("Post to delete not found.");
      }

      const postData = postSnap.data() as any;

      if (postData.coverImage && postData.coverImage.includes("firebasestorage.googleapis.com")) {
        // Only fail if storage is explicitly unavailable.
        if (!clientStorage) {
            console.warn('Storage service not available, skipping image deletion.');
        } else {
            try {
              const imageRef = ref(clientStorage, postData.coverImage);
              await deleteObject(imageRef);
            } catch (storageError: any) {
              // Log non-critical errors but don't block post deletion.
              if (storageError?.code !== "storage/object-not-found") {
                console.warn(`Could not delete cover image from storage, but proceeding with post deletion: ${storageError}`);
              }
            }
        }
      }

      await deleteDoc(postRef);

      toast({
        title: "Post deleted",
        description: "The blog post has been successfully deleted."
      });

      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        title: "Error deleting post",
        description: `Failed to delete post: ${errorMessage}`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold font-headline">Blog management</h1>
          <p className="text-xl text-muted-foreground">Create and manage your blog posts.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/blog/new">
              <PlusCircle className="mr-2 h-5 w-5" />
              New post
            </Link>
          </Button>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Existing posts</CardTitle>
          <CardDescription>A list of your current blog posts.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : posts.length > 0 ? (
            <ul className="divide-y">
              {posts.map((post) => (
                <li key={post.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold">{post.title}</h3>
                      {post.status === 'draft' ? (
                        <Badge variant="outline" className="text-xs text-amber-600 border-amber-400">Draft</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-400">Published</Badge>
                      )}
                      {post.series && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Library className="h-3 w-3" />{post.series}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{new Date(post.publishedDate).toLocaleDateString("en-GB", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      {post.readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />{post.readingTime} min read
                        </span>
                      )}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs py-0 px-1.5">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare(post.slug)}>
                      <Share2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/blog/edit/${post.slug}`}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the post titled "
                            {post.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(post.id!)}>
                            Yes, delete post
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
