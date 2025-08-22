
import Image from 'next/image';
import { ProjectNavigation } from '@/components/project-navigation';

export default function UxGroupUserTestingPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
        <ProjectNavigation 
            prevProject={{slug: 'ux-survey-2025'}}
            nextProject={{slug: 'flock-hackathon'}}
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
          This case study for the "UX Group - User Testing Four Designs" project is currently under construction. Please check back later!
        </p>
      </div>
    </div>
  );
}
