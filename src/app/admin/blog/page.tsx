
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import posts from "@/data/posts.json";

export default async function AdminBlogPage() {

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
           {posts.length > 0 ? (
             <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.slug} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{new Date(post.publishedDate).toLocaleDateString()}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/blog/edit/${post.slug}`}>Edit</Link>
                  </Button>
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
