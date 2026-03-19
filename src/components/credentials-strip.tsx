'use client';
import { useEffect, useRef, useState } from 'react';
import { CountUp } from './count-up';
import { FheaModal } from './fhea-modal';
import { LdxAnimation } from './ldx-animation';

// Sequential animation timing (ms after section enters viewport)
const T_COUNTUP = 0;
const T_FHEA    = 1050; // count-up finishes at ~900ms
const T_AU      = 2050; // FHEA: 4 letters × 220ms = 880ms
const T_LDX     = 3000; // AU flash lasts ~900ms

const STYLES = `
  /* FHEA — each letter flashes in with a scale + brightness burst */
  @keyframes fhea-flash-in {
    0%   { opacity: 0; transform: scale(0.25); filter: brightness(4); }
    55%  { opacity: 1; transform: scale(1.18); filter: brightness(1.9); }
    100% { opacity: 1; transform: scale(1);    filter: brightness(1); }
  }
  .fhea-f { animation: fhea-flash-in 0.38s cubic-bezier(0.22,1,0.36,1) 0ms   both; }
  .fhea-h { animation: fhea-flash-in 0.38s cubic-bezier(0.22,1,0.36,1) 190ms both; }
  .fhea-e { animation: fhea-flash-in 0.38s cubic-bezier(0.22,1,0.36,1) 380ms both; }
  .fhea-a { animation: fhea-flash-in 0.38s cubic-bezier(0.22,1,0.36,1) 570ms both; }

  /* AU — pulses from terracotta to deep indigo and back */
  @keyframes au-color-flash {
    0%   { color: hsl(var(--accent)); }
    30%  { color: #150f53; }
    68%  { color: #150f53; }
    100% { color: hsl(var(--accent)); }
  }
  .au-flash { animation: au-color-flash 0.95s ease-in-out 0ms both; }
`;

export function CredentialsStrip() {
  const ref = useRef<HTMLElement>(null);
  const [countupActive, setCountupActive] = useState(false);
  const [fheaActive,    setFheaActive]    = useState(false);
  const [auActive,      setAuActive]      = useState(false);
  const [ldxActive,     setLdxActive]     = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setCountupActive(true);
      setFheaActive(true);
      setAuActive(true);
      setLdxActive(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        timers.push(setTimeout(() => setCountupActive(true), T_COUNTUP));
        timers.push(setTimeout(() => setFheaActive(true),    T_FHEA));
        timers.push(setTimeout(() => setAuActive(true),      T_AU));
        timers.push(setTimeout(() => setLdxActive(true),     T_LDX));
        observer.unobserve(el);
      }
    }, { threshold: 0.25 });

    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section ref={ref} className="border-b border-border">
      <style>{STYLES}</style>
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-border">

        {/* 15+ — count-up */}
        <div className="md:px-10 first:md:pl-0">
          <p className="font-headline text-4xl md:text-5xl font-semibold text-accent mb-2">
            <CountUp startYear={2011} active={countupActive} />
          </p>
          <p className="text-sm text-muted-foreground leading-snug">Yrs in L&amp;D &amp; UX</p>
        </div>

        {/* FHEA — letter flash */}
        <div className="md:px-10">
          <FheaModal animate={fheaActive} />
        </div>

        {/* AU — colour flash + link */}
        <div className="md:px-10">
          <a
            href="https://adelaideuni.edu.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            aria-label="Adelaide University"
          >
            <p className={`font-headline text-4xl md:text-5xl font-semibold mb-2 transition-opacity group-hover:opacity-80 ${auActive ? 'au-flash' : 'opacity-0'}`}>
              AU
            </p>
            <p className="text-sm text-muted-foreground leading-snug">Adelaide University</p>
          </a>
        </div>

        {/* LDX — word-merge animation */}
        <div className="md:px-10 last:md:pr-0">
          <LdxAnimation active={ldxActive} />
          <p className="text-sm text-muted-foreground leading-snug">Learning Design × UX hybrid</p>
        </div>

      </div>
    </section>
  );
}
