
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const publications = [
    {
        title: "Example Publication One: The Rise of AI in Learning Design",
        journal: "Journal of Educational Technology",
        year: 2024,
        link: "#",
        authors: "Bartlett, R., & Doe, J.",
        summary: "This paper explores the ethical implications and practical applications of artificial intelligence within modern pedagogical frameworks, offering a new model for AI-assisted curriculum development."
    },
    {
        title: "Example Publication Two: UX Principles for Engaging Online Courses",
        journal: "International Conference on Human-Computer Interaction",
        year: 2023,
        link: "#",
        authors: "Bartlett, R.",
        summary: "A case study analysis of three online courses, identifying key user experience principles that correlate with higher student engagement and satisfaction."
    }
];

export default function AcademicWritingPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline mb-2">Academic Writing</h1>
        <p className="text-xl text-muted-foreground">
          A curated list of my published articles, papers, and other works.
        </p>
      </header>

      <div className="space-y-8">
        {publications.map((pub, index) => (
            <Card key={index}>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{pub.title}</CardTitle>
                    <CardDescription>
                        {pub.authors} ({pub.year}). Published in <em>{pub.journal}</em>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/80 mb-4">{pub.summary}</p>
                    <Button asChild>
                        <a href={pub.link} target="_blank" rel="noopener noreferrer">
                            Read Publication <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
