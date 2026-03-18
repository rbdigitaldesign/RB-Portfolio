'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

function LogoMark() {
  return (
    <svg width="30" height="20" viewBox="0 0 30 20" fill="none" aria-hidden="true" className="shrink-0">
      {/* R — mirrored bowl (upper left) */}
      <path d="M 15 2 C 8 2 5 5 5 7 C 5 9 8 10 15 10"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* R — diagonal leg (lower left) */}
      <line x1="15" y1="10" x2="7" y2="18"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* B — upper bowl (upper right) */}
      <path d="M 15 2 C 22 2 25 5 25 7 C 25 9 22 10 15 10"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* B — lower bowl, slightly wider (lower right) */}
      <path d="M 15 10 C 23 10 26 13 26 15 C 26 17 23 18 15 18"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Shared spine — terracotta accent */}
      <line x1="15" y1="2" x2="15" y2="18"
            stroke="#C0593A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/95 backdrop-blur-sm border-b border-border'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-5xl mx-auto px-6 flex h-16 items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-headline text-lg font-semibold tracking-tight hover:text-accent transition-colors"
          >
            <LogoMark />
            Rich Bartlett
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent',
                  pathname === href || pathname.startsWith(href + '/')
                    ? 'text-accent'
                    : 'text-foreground/60'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2 text-foreground/60 hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col">
          <div className="max-w-5xl mx-auto px-6 w-full flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-headline text-lg font-semibold tracking-tight"
              onClick={() => setMenuOpen(false)}
            >
              <LogoMark />
              Rich Bartlett
            </Link>
            <button
              className="p-2 -mr-2 text-foreground/60"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col items-start justify-center flex-1 max-w-5xl mx-auto px-6 w-full gap-6 pb-16">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'font-headline text-4xl font-semibold transition-colors hover:text-accent',
                  pathname === href || pathname.startsWith(href + '/')
                    ? 'text-accent'
                    : 'text-foreground'
                )}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Spacer so content doesn't sit under fixed header */}
      <div className="h-16" />
    </>
  );
}
