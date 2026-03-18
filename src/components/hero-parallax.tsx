'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * HeroParallax — wraps the homepage hero section with a parallax background image.
 * The image translates at 30% of scroll speed, creating a depth effect.
 * Text content is passed as children and rendered above the background.
 */
export function HeroParallax({ children }: { children: React.ReactNode }) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden border-b border-white/10">
      {/* Parallax background layer — scales up slightly so translateY doesn't reveal edges */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-[1.15]"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        <Image
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark editorial overlay */}
        <div className="absolute inset-0 bg-foreground/62" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col justify-between min-h-[100svh] px-6 md:px-16 pt-28 pb-14">
        {children}
      </div>
    </section>
  );
}
