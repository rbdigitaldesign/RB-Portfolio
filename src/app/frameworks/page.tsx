import type { Metadata } from 'next';
import { getAllFrameworks, getFramework } from '@/lib/content';
import { FrameworksGrid } from '@/components/frameworks-grid';
import type { FrameworkWithContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Frameworks | Rich Bartlett',
  description:
    'Principles, mental models, and mechanisms that shape how I think about design and the world.',
};

export default function FrameworksPage() {
  const metas = getAllFrameworks();

  const frameworks: FrameworkWithContent[] = metas
    .map((m) => getFramework(m.slug))
    .filter((f): f is FrameworkWithContent => f !== null);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="font-headline text-4xl font-semibold mb-3">Frameworks</h1>
      <p className="text-muted-foreground mb-4 max-w-xl">
        Principles, mental models, and mechanisms that shape how I think about design and the world.
      </p>
      <p className="text-xs text-muted-foreground/60 mb-12 max-w-xl">
        Every framework here is one I&apos;ve genuinely encountered in my work or reading. The card
        content was written with AI — which has actually been a useful way to deepen my own
        understanding of each one. I&apos;ve reviewed every card for accuracy and edited where needed.
      </p>
      {frameworks.length === 0 ? (
        <p className="text-muted-foreground">No frameworks published yet.</p>
      ) : (
        <FrameworksGrid frameworks={frameworks} />
      )}
    </main>
  );
}
