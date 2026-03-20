'use client';
import { useEffect, useState } from 'react';

/**
 * Phase sequence:
 *  0  →  invisible placeholder
 *  1  →  "Learning Designer" — L and D in terracotta, rest muted
 *  2  →  fade-out transition (word text disappears, L D stay a beat)
 *  3  →  "User eXperience" — U and X in terracotta, rest muted
 *  4  →  fade-out transition (word text disappears, X stays a beat)
 *  5  →  final "LDX" letters slide into position
 */
type Phase = 0 | 1 | 2 | 3 | 4 | 5;

const PHASE_TIMES: Array<[Phase, number]> = [
  [1,   60],   // Learning Designer fades in
  [2, 1500],   // word text fades out
  [3, 2000],   // User eXperience fades in
  [4, 3500],   // word text fades out
  [5, 4050],   // final LDX slides in
];

const STYLES = `
  @keyframes ldx-word-enter {
    from { opacity: 0; transform: translateY(7px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ldx-final-l {
    from { opacity: 0; transform: translateX(-22px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes ldx-final-d {
    from { opacity: 0; transform: translateX(-11px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes ldx-final-x {
    from { opacity: 0; transform: translateX(11px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .ldx-enter  { animation: ldx-word-enter 0.45s cubic-bezier(0.22,1,0.36,1) both; }
  .ldx-fin-l  { animation: ldx-final-l    0.42s cubic-bezier(0.22,1,0.36,1) 0ms   both; }
  .ldx-fin-d  { animation: ldx-final-d    0.42s cubic-bezier(0.22,1,0.36,1) 90ms  both; }
  .ldx-fin-x  { animation: ldx-final-x    0.42s cubic-bezier(0.22,1,0.36,1) 180ms both; }
`;

/** Shared classes for the big accent letter and the tiny muted word-remainder */
const BIG  = 'font-headline font-semibold text-accent leading-none';
const TINY = 'text-[9px] font-sans font-normal text-muted-foreground self-end pb-[3px] leading-none transition-opacity duration-300';

export function LdxAnimation({ active }: { active?: boolean }) {
  const [phase, setPhase] = useState<Phase>(0);

  useEffect(() => {
    if (!active) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setPhase(5); return; }

    const timers = PHASE_TIMES.map(([p, t]) =>
      setTimeout(() => setPhase(p), t)
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    /*
     * Outer div keeps the same height as "LDX" at its final text size
     * so the row below ("Learning Design × UX hybrid") never jumps.
     */
    <div
      className="relative mb-2 min-h-[2.25rem] md:min-h-[3rem]"
      aria-label="LDX"
    >
      <style>{STYLES}</style>

      {/* ── Phase 0: invisible slot ───────────────────────────────── */}
      {phase === 0 && (
        <span
          className="font-headline text-4xl md:text-5xl font-semibold opacity-0 pointer-events-none"
          aria-hidden
        >
          LDX
        </span>
      )}

      {/* ── Phase 1 & 2: Learning Designer ───────────────────────── */}
      {(phase === 1 || phase === 2) && (
        <div
          className={`flex items-end gap-0 ${phase === 1 ? 'ldx-enter' : ''} ${phase === 2 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        >
          <span className={`text-4xl md:text-5xl ${BIG}`}>L</span>
          <span className={`${TINY} ${phase === 2 ? 'opacity-0' : 'opacity-100'}`}>earning&nbsp;</span>
          <span className={`text-4xl md:text-5xl ${BIG}`}>D</span>
          <span className={`${TINY} ${phase === 2 ? 'opacity-0' : 'opacity-100'}`}>esigner</span>
        </div>
      )}

      {/* ── Phase 3 & 4: User eXperience ─────────────────────────── */}
      {(phase === 3 || phase === 4) && (
        <div
          className={`flex items-end gap-0 ${phase === 3 ? 'ldx-enter' : ''} ${phase === 4 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        >
          <span className={`text-4xl md:text-5xl ${BIG}`}>U</span>
          <span className={`${TINY} ${phase === 4 ? 'opacity-0' : 'opacity-100'}`}>ser&nbsp;e</span>
          <span className={`text-4xl md:text-5xl ${BIG}`}>X</span>
          <span className={`${TINY} ${phase === 4 ? 'opacity-0' : 'opacity-100'}`}>perience</span>
        </div>
      )}

      {/* ── Phase 5: final LDX ───────────────────────────────────── */}
      {phase === 5 && (
        <div className="flex items-end gap-0 font-headline text-4xl md:text-5xl font-semibold text-accent">
          <span className="ldx-fin-l leading-none">L</span>
          <span className="ldx-fin-d leading-none">D</span>
          <span className="ldx-fin-x leading-none">X</span>
        </div>
      )}
    </div>
  );
}
