'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  href: string;
  label: string;
}

interface CaseStudyTOCProps {
  items: TocItem[];
}

/**
 * CaseStudyTOC — shared sticky "On this page" sidebar navigation.
 * Replaces locally-defined `LocalTOC` in all case study pages.
 * Tracks the active section via IntersectionObserver.
 */
export function CaseStudyTOC({ items }: CaseStudyTOCProps) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const ids = items.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  return (
    <nav className="sticky top-24 space-y-1">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
        On this page
      </p>
      <ul className="space-y-0">
        {items.map((item) => {
          const id = item.href.replace('#', '');
          const isActive = active === id;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                className={`
                  block py-1.5 pl-3 text-sm border-l-2 transition-colors
                  ${isActive
                    ? 'border-accent text-foreground font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }
                `}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
