
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProjectNavigation } from '@/components/project-navigation';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';

export default function RedesigningCourseOrientationPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
        <ProjectNavigation 
            prevProject={{slug: 'communication-styles-quiz'}}
            nextProject={{slug: 'personal-professional-development-course-design'}}
        />
      <div className="text-center">
         <div className="relative w-full max-w-md mx-auto aspect-video mb-8 rounded-lg overflow-hidden shadow-strong">
            <Image
                src="https://i.imgur.com/zUVWgvo.png"
                alt="Under Construction"
                fill
                priority
                className="object-cover"
                data-ai-hint="illustration construction"
            />
        </div>
        <h1 className="text-4xl font-bold font-headline mb-2">Case Study Coming Soon</h1>
        <p className="text-xl text-muted-foreground">
          This case study for the "Redesigning Course Orientation" project is currently under construction. Please check back later!
        </p>
      </div>
       <Card className="mt-24 text-center p-8 md:p-12">
        <h3 className="text-2xl font-bold font-headline mb-2">Interested in this project?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">This case study is coming soon, but feel free to reach out if you have any questions in the meantime.</p>
        <Button asChild>
            <Link href="/contact">Contact me</Link>
        </Button>
      </Card>
      <ScrollToTopButton />
    </div>
  );
}
