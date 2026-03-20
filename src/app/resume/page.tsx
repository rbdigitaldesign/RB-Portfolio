import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Résumé — Rich Bartlett',
  description: 'Download the résumé of Rich Bartlett — LDX Designer based in Australia.',
};

export default function ResumePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="border-b border-border pb-10 mb-12">
        <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">Résumé</p>
        <h1 className="font-headline font-semibold text-4xl md:text-5xl leading-tight max-w-xl">
          15+ years of learning design &amp; UX.
        </h1>
      </header>

      <div className="max-w-xl space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          My résumé covers my experience across Australia's technology and education sectors —
          from instructional design and curriculum development to UX research and product design.
        </p>
        <a
          href="https://docs.google.com/document/d/1RIHsBSdbUdbeABwg0y3Ql_aiKISd0hpSJM7DIgJK3I8/export?format=pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="Rich_Bartlett_Resume.pdf"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity rounded-sm"
        >
          Download PDF <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
