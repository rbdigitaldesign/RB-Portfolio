
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between py-6 px-4 gap-4 sm:flex-row">
        <div className="text-sm text-center sm:text-left">
            <p>&copy; {currentYear} RB Digital Design. All Rights Reserved.</p>
            <div className="flex gap-2 justify-center sm:justify-start mt-1">
                <Link href="/privacy-policy" className="text-xs hover:underline">Privacy Policy</Link>
                <Separator orientation="vertical" className="h-4" />
                <Link href="/terms-of-service" className="text-xs hover:underline">Terms of Service</Link>
            </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://www.linkedin.com/in/richbart11/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/rbdigitaldesign" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/contact" aria-label="Email">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
