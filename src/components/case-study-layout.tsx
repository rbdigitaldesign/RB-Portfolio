import type { ReactNode } from 'react';

/**
 * CaseStudyLayout — shared wrapper for all individual project case study pages.
 * Replaces the locally-defined `const CaseStudyLayout` that was duplicated across 22 files.
 */
export function CaseStudyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-20">
      {children}
    </div>
  );
}
