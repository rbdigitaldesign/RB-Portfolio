
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, ExternalLink } from 'lucide-react';
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
}

export default function PublicationsPage() {
  const { toast } = useToast();
  const [publications] = useState<Publication[]>(publicationsData);

  const handleShare = (title: string, link: string) => {
    const shareUrl = link !== '#' ? link : window.location.href;
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

      <div className="space-y-8">
        {publications.map((pub) => (
            <Card key={pub.id}>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="font-headline text-2xl pr-4">{pub.title}</CardTitle>
                        <Badge variant={pub.status === 'published' ? 'default' : 'secondary'} className="capitalize flex-shrink-0">
                            {pub.status}
                        </Badge>
                    </div>
                    <CardDescription>
                        {pub.authors} ({new Date(pub.publicationDate).getFullYear()}). Published in <em>{pub.journal}</em>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/80">{pub.summary}</p>
                </CardContent>
                <CardFooter className="gap-2">
                     <Button asChild>
                        <a href={pub.link} target="_blank" rel="noopener noreferrer">
                            Read Publication <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                    <Button variant="outline" onClick={() => handleShare(pub.title, pub.link)}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}

