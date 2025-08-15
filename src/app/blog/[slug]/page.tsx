import { Construction } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <div className="text-center">
        <Construction className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="text-4xl font-bold font-headline mb-2">Blog Post Coming Soon</h1>
        <p className="text-xl text-muted-foreground">
          This is where the blog post with slug "{params.slug}" will be.
        </p>
      </div>
    </div>
  );
}
