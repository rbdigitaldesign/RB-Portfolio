
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import SiteAdminLauncher from '@/components/site-admin-launcher';


const navLinks = [
  { href: '/', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = resolvedTheme === 'dark' 
    ? 'https://i.imgur.com/hdIZnWQ.png' 
    : 'https://i.imgur.com/ocbJgCp.png';

  const NavLink = ({ href, label, className }: { href: string; label: string; className?: string }) => {
    const isActive = pathname === href || (href === '/' && pathname.startsWith('/projects'));
    // A special check for projects to keep the link active on case study pages.
    const isProjectsLink = href === '/';
    const isProjectPage = pathname.startsWith('/projects/');
    const checkIsActive = isProjectsLink ? isActive || isProjectPage : pathname === href;

    return (
      <Link
        href={href}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          checkIsActive ? 'text-primary dark:text-accent' : 'text-muted-foreground',
          className
        )}
      >
        {label}
      </Link>
    );
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {mounted ? (
            <Image src={logoSrc} alt="RB Digital Design Logo" width={32} height={32} />
          ) : (
            <div style={{ width: 32, height: 32 }} />
          )}
          <span className="font-bold text-lg font-headline">RB Digital Design</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <div className="flex items-center gap-2">
             <SiteAdminLauncher />
          </div>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <NavLink href={link.href} label={link.label} className="text-lg" />
                  </SheetClose>
                ))}
                 <div className="mt-4">
                    <SheetClose asChild>
                      <SiteAdminLauncher />
                    </SheetClose>
                 </div>
              </nav>
              <div className="absolute bottom-4 right-4">
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
