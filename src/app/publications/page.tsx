
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, ExternalLink, ArrowRight } from 'lucide-react';
import publicationsData from '@/data/publications.json';
import { useToast } from '@/hooks/use-toast';

type Publication = {
    id: string;
    title: string;
    authors: string;
    publicationDate: string;
    journal: string;
    status: 'published' | 'unpublished';
    link: string;
    summary: string;
    coverImage?: string;
}

export default function PublicationsPage() {
  const { toast } = useToast();
  const [publications] = useState<Publication[]>(publicationsData);

  const handleShare = (title: string, link: string) => {
    const shareUrl = (link.startsWith('http') || link.startsWith('/')) ? new URL(link, window.location.origin).href : `${window.location.origin}${link}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "Link Copied!",
        description: `The link for "${title}" has been copied to your clipboard.`,
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
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline mb-2">Publications</h1>
        <p className="text-xl text-muted-foreground">
          A curated list of my published articles, papers, and other works.
        </p>
      </header>

      <div className="grid gap-8">
        {publications.map((pub) => (
            <Card key={pub.id} className="flex flex-col md:flex-row overflow-hidden">
                {pub.coverImage && (
                  <div className="md:w-1/3 relative min-h-[200px] md:min-h-full">
                      <Image 
                          src={pub.coverImage} 
                          alt={`Cover image for ${pub.title}`}
                          fill
                          className="object-cover"
                          data-ai-hint="publication cover abstract"
                      />
                  </div>
                )}
                <div className={`flex flex-col ${pub.coverImage ? 'md:w-2/3' : 'w-full'}`}>
                    <CardHeader>
                        <div className="flex justify-between items-start gap-2">
                            <CardTitle className="font-headline text-2xl pr-4">
                              <Link href={pub.link} className="hover:underline" target={pub.link.startsWith('http') ? '_blank' : '_self'}>
                                {pub.title}
                              </Link>
                            </CardTitle>
                            <Badge variant={pub.status === 'published' ? 'default' : 'secondary'} className="capitalize flex-shrink-0">
                                {pub.status}
                            </Badge>
                        </div>
                        <CardDescription>
                            {pub.authors}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-foreground/80">{pub.summary}</p>
                    </CardContent>
                    <CardFooter className="gap-2">
                         <Button asChild variant="link" className="p-0 h-auto">
                            <Link href={pub.link} className="group" target={pub.link.startsWith('http') ? '_blank' : '_self'}>
                                Read Publication
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleShare(pub.title, pub.link)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                    </CardFooter>
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
}
