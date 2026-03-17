
import Link from 'next/link';
import { Github, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          <p>© {currentYear} Rich Bartlett</p>
          <div className="flex gap-3 mt-1">
            <Link href="/privacy-policy" className="text-xs hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span className="text-border">·</span>
            <Link href="/terms-of-service" className="text-xs hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/richbart11/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://github.com/rbdigitaldesign"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.instagram.com/rb_digital_design_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
