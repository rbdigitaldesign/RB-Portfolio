'use client';

import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FrameworkWithContent } from '@/lib/content';

interface FrameworksGridProps {
  frameworks: FrameworkWithContent[];
}

export function FrameworksGrid({ frameworks }: FrameworksGridProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = frameworks.find((f) => f.slug === activeSlug) ?? null;

  return (
    <>
      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {frameworks.map((framework) => (
          <button
            key={framework.slug}
            onClick={() => setActiveSlug(framework.slug)}
            className="group text-left border border-border border-t-4 border-t-accent hover:border-foreground hover:-translate-y-0.5 transition-all duration-200 p-8 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-accent">
              {framework.category}
            </span>
            <h2 className="font-headline text-2xl font-bold leading-tight mt-3 group-hover:text-accent transition-colors">
              {framework.title}
            </h2>
            {framework.summary && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {framework.summary}
              </p>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/50 mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
              Tap to explore <ArrowRight size={12} />
            </span>
          </button>
        ))}
      </div>

      {/* Modal overlay */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            onClick={() => setActiveSlug(null)}
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-background border border-border shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setActiveSlug(null)}
              className="absolute right-4 top-4 p-1 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="p-8 sm:p-10">
              {/* Header */}
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                {active.category}
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold mt-2 mb-6 leading-tight">
                {active.title}
              </h2>

              <hr className="border-border mb-8" />

              {/* What it is */}
              {active.contentHtml && (
                <Section label="What it is">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: active.contentHtml }}
                  />
                </Section>
              )}

              {/* Why I like it */}
              {active.why_i_like_it && (
                <Section label="Why I like it">
                  <div className="border-l-4 border-accent bg-accent/10 px-5 py-4 text-sm leading-relaxed">
                    {active.why_i_like_it}
                  </div>
                </Section>
              )}

              {/* Where I heard about it */}
              {active.where_i_heard_it && (
                <Section label="Where I heard about it">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {active.where_i_heard_it}
                  </p>
                </Section>
              )}

              {/* Real world application */}
              {active.real_world_application && (
                <Section label="Real world application">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {active.real_world_application}
                  </p>
                </Section>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}
