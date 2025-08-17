
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Dna, Wrench, Lightbulb, Award, ExternalLink, Heart, Radio, Music, BookOpen, Beer, Dog } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const skills = ["UX Research", "UI Design", "Instructional Design", "Prototyping", "Frontend Development", "Agile Methodologies"];
  const tools = ["Figma", "Adobe CC", "React", "Next.js", "Canvas LMS", "Miro", "Jira"];
  const interests = [
    {
      icon: <Dna className="h-5 w-5 text-primary" />,
      text: "Challenging my physical limits and having fun through CrossFit to maintain strength and resilience.",
    },
    {
      icon: <Dog className="h-5 w-5 text-primary" />,
      text: "Enjoying tranquility at home or the dog park with our Kelpie cross, 'Jerry Boi Seinfeld'.",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      text: "Immersing myself in compelling reads—from animal studies and biographies to Sci-Fi and Fantasy.",
    },
    {
      icon: <Music className="h-5 w-5 text-primary" />,
      text: "Humming along to inspiring music and continually reminding myself to practice guitar.",
    },
    {
      icon: <Radio className="h-5 w-5 text-primary" />,
      text: "Tuning into thought-provoking podcasts like 'Heavy Weight,' 'Science Vs,' and 'How I Built This'.",
    },
    {
      icon: <Beer className="h-5 w-5 text-primary" />,
      text: "Relishing a tasty beer or wine in the company of good friends, celebrating life’s simple pleasures.",
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <Avatar className="w-32 h-32">
          <AvatarImage src="https://i.imgur.com/X0EG5j2.png" alt="Rich Bartlett" data-ai-hint="profile picture" className="object-cover" />
          <AvatarFallback>RB</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold font-headline mb-2">About Me</h1>
          <p className="text-xl text-muted-foreground">
            I build bridges between learning theory and user-centered design to create experiences that are not just usable, but also meaningful and memorable.
          </p>
        </div>
      </header>
      
      <Separator className="my-12" />

      <div className="grid md:grid-cols-2 gap-12">
        <section aria-labelledby="profile-heading">
          <h2 id="profile-heading" className="text-2xl font-bold font-headline mb-4 flex items-center gap-2"><User /> Profile</h2>
          <div className="space-y-4 text-foreground/80">
            <p>
              With over nine years of experience in Australia's technology and education sectors, I've developed a unique skill set that merges the rigor of learning design with the empathy of user experience (UX) design. My career began in tech support and evolved into roles where I could directly impact how people interact with and learn from technology.
            </p>
            <p>
              Currently, as a Learning Designer at a Group of Eight university, I apply these principles to create engaging and effective online courses for thousands of students. I thrive on complex challenges and am passionate about using design to solve problems and improve people's lives.
            </p>
             <p>
              I am a{' '}
              <a 
                href="https://www.advance-he.ac.uk/fellowship/fellowship" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline underline-offset-4"
              >
                Fellow of the Higher Education Academy (FHEA)
                <ExternalLink className="inline-block ml-1 h-4 w-4" />
              </a>
              , a recognition of my commitment to professionalism in teaching and learning in higher education.
            </p>
          </div>
        </section>

        <section aria-labelledby="approach-heading">
          <h2 id="approach-heading" className="text-2xl font-bold font-headline mb-4 flex items-center gap-2"><Lightbulb /> My Approach</h2>
          <div className="space-y-4 text-foreground/80">
            <p>
              My design process is collaborative, iterative, and always grounded in research. I believe the best solutions come from a deep understanding of the user's needs, context, and motivations. 
            </p>
            <p>
              I follow a double-diamond approach: discover, define, develop, and deliver. This ensures that I'm not just building features, but solving the right problems in a way that is both elegant and effective. Biomimicry often inspires my work, looking to nature for time-tested patterns of efficiency and aesthetics.
            </p>
          </div>
        </section>
      </div>

      <Separator className="my-12" />

      <div className="grid md:grid-cols-2 gap-12">
         <section aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="text-2xl font-bold font-headline mb-4 flex items-center gap-2"><Dna /> Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
            ))}
          </div>
        </section>

        <section aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="text-2xl font-bold font-headline mb-4 flex items-center gap-2"><Wrench /> Favourite Tools</h2>
          <div className="flex flex-wrap gap-2">
            {tools.map(tool => (
              <Badge key={tool} variant="outline" className="text-sm">{tool}</Badge>
            ))}
          </div>
        </section>
      </div>

      <Separator className="my-12" />

      <section aria-labelledby="life-outside-work-heading">
          <h2 id="life-outside-work-heading" className="text-2xl font-bold font-headline mb-8 text-center flex items-center justify-center gap-3"><Heart /> Life Outside Work</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-strong">
                <Image
                    src="https://i.imgur.com/WyDEtud.png"
                    alt="Rich Bartlett with his family"
                    fill
                    className="object-cover"
                    data-ai-hint="family photo"
                />
            </div>
            <div>
              <p className="text-foreground/80 mb-6">
                When I'm not working, here's a glimpse into what fuels my spirit:
              </p>
              <ul className="space-y-4">
                {interests.map((interest, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{interest.icon}</div>
                    <span className="text-foreground/80">{interest.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
    </div>
  );
}
