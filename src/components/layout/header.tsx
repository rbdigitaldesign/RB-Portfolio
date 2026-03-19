'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 text-foreground/60 hover:text-foreground transition-colors"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Writing' },
  { href: '/frameworks', label: 'Frameworks' },
  { href: '/contact', label: 'Contact' },
];

function LogoMark({ filterId = 'rb-logo-tc' }: { filterId?: string }) {
  return (
    <svg
      width="54"
      height="42"
      viewBox="0 0 422.88 323.999988"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <clipPath id={`${filterId}-clip`}>
          <path d="M 0 0.046875 L 422.761719 0.046875 L 422.761719 323.953125 L 0 323.953125 Z" />
        </clipPath>
        {/* Convert white-background signature to terracotta-on-transparent */}
        <filter id={filterId} colorInterpolationFilters="sRGB">
          {/* Luminance → alpha: black ink = opaque, white bg = transparent */}
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    -0.299 -0.587 -0.114 0 1"
            result="ink"
          />
          {/* Flood terracotta */}
          <feFlood floodColor="#C0593A" result="color" />
          {/* Show terracotta only through ink mask */}
          <feComposite in="color" in2="ink" operator="in" />
        </filter>
      </defs>
      <g clipPath={`url(#${filterId}-clip)`}>
        <g transform="matrix(0.296188, 0.0830257, -0.0831183, 0.296519, -54.827135, -187.382845)">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <image
            href="/logo-signature.png"
            x="0"
            y="0"
            width="2340"
            height="1792"
            filter={`url(#${filterId})`}
          />
        </g>
      </g>
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
            <LogoMark filterId="rb-logo-tc-desktop" />
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
            <ThemeToggle />
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              className="p-2 -mr-2 text-foreground/60 hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
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
              <LogoMark filterId="rb-logo-tc-mobile" />
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
