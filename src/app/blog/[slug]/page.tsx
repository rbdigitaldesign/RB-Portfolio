
import { notFound } from 'next/navigation';
import Image from 'next/image';
import postsData from '@/data/posts.json';
import type { Post } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPostActions } from '@/components/blog-post-actions';

const posts: Post[] = postsData;

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPostData(slug: string) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return null;
  }
  
  const processedContent = await remark()
    .use(html)
    .process(post.content);
  const contentHtml = processedContent.toString();

  return { post, contentHtml };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const data = await getPostData(params.slug);

  if (!data) {
    notFound();
  }

  const { post, contentHtml } = data;

  return (
    <article className="container mx-auto max-w-4xl py-16 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-4">{post.title}</h1>
        <div className="text-sm text-muted-foreground mb-4">
          <span>Published on {new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span> by <span>{post.author}</span>
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
        className="prose dark:prose-invert max-w-none mx-auto
                   prose-headings:font-headline prose-headings:text-primary dark:prose-headings:text-primary-foreground
                   prose-a:text-primary hover:prose-a:text-accent dark:prose-a:text-accent"
        dangerouslySetInnerHTML={{ __html: contentHtml }} 
      />
      
      <Separator className="my-8" />
      
      <div className="flex justify-center">
        <BlogPostActions slug={post.slug} />
      </div>

      <Separator className="my-8" />

    </article>
  );
}
