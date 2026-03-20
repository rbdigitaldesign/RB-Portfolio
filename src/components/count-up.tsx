'use client';
import { useEffect, useRef, useState } from 'react';

export function CountUp({
  startYear,
  suffix = '+',
  duration = 900,
  active = false,
}: {
  startYear: number;
  suffix?: string;
  duration?: number;
  active?: boolean;
}) {
  const target = new Date().getFullYear() - startYear;
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    started.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return <span>{count}{suffix}</span>;
}
