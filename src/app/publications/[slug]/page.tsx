
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import { ExternalLink, ArrowLeft, BookOpen } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CopyCitation } from '@/components/copy-citation';
import { getAllPublications } from '@/lib/content';

export async function generateStaticParams() {
  return getAllPublications().map((p) => ({ slug: p.slug }));
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

    return { frontmatter: data, contentHtml };
  } catch {
    return null;
  }
}

export default async function PublicationPage({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params);
  const publication = await getPublicationContent(slug);

  if (!publication) notFound();

  const { frontmatter: fm, contentHtml } = publication;

  const isPublished = fm.status === 'published';

  return (
    <article className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-20">

      {/* Back link */}
      <Link
        href="/publications"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        All publications
      </Link>

      {/* Status + venue meta */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span
          className={
            isPublished
              ? 'text-xs font-medium px-2.5 py-1 bg-primary text-primary-foreground uppercase tracking-wider'
              : 'text-xs font-medium px-2.5 py-1 bg-muted text-muted-foreground uppercase tracking-wider'
          }
        >
          {isPublished ? 'Published' : 'Under Review'}
        </span>
        <span className="text-sm font-mono text-muted-foreground">
          {fm.year}
          {fm.venue && <> · {fm.venue}</>}
        </span>
      </div>

      {/* Title */}
      <h1
        className="font-headline font-semibold tracking-tight leading-[1.05] mb-5"
        style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
      >
        {fm.title}
      </h1>

      {/* Authors */}
      {fm.authors && Array.isArray(fm.authors) ? (
        <div className="mb-2">
          <p className="text-sm text-foreground/80 leading-relaxed">
            {(fm.authors as { name: string; affiliation?: string }[])
              .map((a) => a.name)
              .join(', ')}
          </p>
          {fm.authors[0]?.affiliation && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {fm.authors[0].affiliation}
            </p>
          )}
        </div>
      ) : fm.collaborators ? (
        <p className="text-sm text-foreground/80 mb-2">{fm.collaborators}</p>
      ) : null}

      {/* Conference / theme meta */}
      {(fm.conference || fm.theme) && (
        <p className="text-xs font-mono text-muted-foreground mt-3 mb-6">
          {fm.conference && <span>{fm.conference}</span>}
          {fm.conference && fm.theme && <span> · </span>}
          {fm.theme && <span>{fm.theme}</span>}
          {fm.subtheme && <span> · {fm.subtheme}</span>}
        </p>
      )}

      <Separator className="my-8" />

      {/* Abstract */}
      {fm.abstract && (
        <section className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
            Abstract
          </h2>
          <div className="bg-muted/40 rounded px-6 py-5 border-l-4 border-accent">
            <p className="text-base leading-relaxed text-foreground/90">{fm.abstract}</p>
          </div>
        </section>
      )}

      {/* Keywords */}
      {fm.tags && fm.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {(fm.tags as string[]).map((tag) => (
            <span
              key={tag}
              className="text-xs text-muted-foreground border border-border px-2.5 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <Separator className="my-8" />

      {/* Action button */}
      {fm.url && (
        <div className="mb-8">
          <Button asChild className="gap-2">
            <a href={fm.url} target="_blank" rel="noopener noreferrer">
              <BookOpen className="h-4 w-4" />
              View published paper
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </a>
          </Button>
        </div>
      )}

      {/* Citation */}
      {fm.citation && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Cite this paper
            </h2>
            <CopyCitation text={fm.citation} />
          </div>
          <div className="bg-muted/30 border border-border rounded-sm px-4 py-3">
            <p className="text-sm font-mono leading-relaxed text-foreground/80">{fm.citation}</p>
          </div>
        </section>
      )}

      <Separator className="my-8" />

      {/* Collaborative process — accordion */}
      {contentHtml && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="process" className="border-border">
            <AccordionTrigger className="font-headline font-semibold text-base hover:no-underline py-5">
              Behind the paper — collaborative process notes
            </AccordionTrigger>
            <AccordionContent>
              <div
                className="prose dark:prose-invert max-w-none mt-4
                           prose-headings:font-headline prose-headings:font-semibold
                           prose-a:text-accent hover:prose-a:text-accent/80
                           prose-li:text-foreground/80"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

    </article>
  );
}
