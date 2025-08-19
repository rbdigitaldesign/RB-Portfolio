
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export async function generateStaticParams() {
  // We will not pre-build any pages since we don't have a reliable way to get all slugs yet.
  // This will force on-demand rendering.
  return [];
}

async function getPublicationContent(slug: string) {
    try {
        const filePath = path.join(process.cwd(), 'src', 'content', 'publications', `${slug}.mdx`);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        const processedContent = await remark()
            .use(html, { sanitize: false })
            .process(content);
        const contentHtml = processedContent.toString();

        return {
            frontmatter: data,
            contentHtml,
        };
    } catch (error) {
        console.error(`Error reading publication ${slug}:`, error);
        return null;
    }
}

export default async function PublicationPage({ params }: { params: { slug: string } }) {
  const publication = await getPublicationContent(params.slug);

  if (!publication) {
    notFound();
  }
  
  const { frontmatter, contentHtml } = publication;

  return (
    <article className="container mx-auto max-w-4xl py-16 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground mb-2">{frontmatter.title}</h1>
        <p className="text-xl text-muted-foreground mb-4">{frontmatter.subtitle}</p>
        <div className="flex justify-center flex-wrap gap-2">
            {frontmatter.tags?.map((tag: string) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
      </header>
      
       <div 
        className="prose dark:prose-invert max-w-none mx-auto
                   prose-headings:font-headline prose-headings:text-primary dark:prose-headings:text-primary-foreground
                   prose-a:text-primary hover:prose-a:text-accent dark:prose-a:text-accent"
        dangerouslySetInnerHTML={{ __html: contentHtml }} 
      />

    </article>
  );
}
