'use client';
import { useEffect, useRef, useState } from 'react';

const STYLES = `
  @keyframes ldx-from-left {
    from { opacity: 0; transform: translateX(-18px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes ldx-from-right {
    from { opacity: 0; transform: translateX(18px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes ldx-label-fade {
    0%   { opacity: 0; transform: translateY(4px); }
    25%  { opacity: 1; transform: translateY(0); }
    70%  { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-4px); }
  }
  .ldx-l {
    animation: ldx-from-left 0.45s cubic-bezier(0.22,1,0.36,1) 0.05s both;
  }
  .ldx-d {
    animation: ldx-from-left 0.45s cubic-bezier(0.22,1,0.36,1) 0.18s both;
  }
  .ldx-x {
    animation: ldx-from-right 0.45s cubic-bezier(0.22,1,0.36,1) 0.32s both;
  }
  .ldx-sub-ld {
    animation: ldx-label-fade 2.2s ease-out 0.5s both;
  }
  .ldx-sub-ux {
    animation: ldx-label-fade 2.2s ease-out 0.65s both;
  }
`;

export function LdxAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="font-headline text-4xl md:text-5xl font-semibold text-accent mb-2 flex items-end"
      aria-label="LDX"
    >
      {active ? (
        <>
          <style>{STYLES}</style>

          {/* L — Learning */}
          <span className="ldx-l relative leading-none">
            L
            <span className="ldx-sub-ld absolute bottom-full left-0 text-[9px] font-sans font-normal text-muted-foreground whitespace-nowrap leading-none pb-0.5 pointer-events-none select-none">
              Learning
            </span>
          </span>

          {/* D — Design */}
          <span className="ldx-d relative leading-none">
            D
            <span className="ldx-sub-ld absolute bottom-full left-0 text-[9px] font-sans font-normal text-muted-foreground whitespace-nowrap leading-none pb-0.5 pointer-events-none select-none">
              Design
            </span>
          </span>

          {/* X — UX */}
          <span className="ldx-x relative leading-none">
            X
            <span className="ldx-sub-ux absolute bottom-full left-0 text-[9px] font-sans font-normal text-muted-foreground whitespace-nowrap leading-none pb-0.5 pointer-events-none select-none">
              UX
            </span>
          </span>
        </>
      ) : (
        /* Placeholder keeps layout stable before IntersectionObserver fires */
        <span className="opacity-0 pointer-events-none">LDX</span>
      )}
    </div>
  );
}
