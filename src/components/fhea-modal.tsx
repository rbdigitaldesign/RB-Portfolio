'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ExternalLink, X } from 'lucide-react';

export function FheaModal({ animate }: { animate?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modal = open && mounted ? createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative bg-background rounded-sm shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <p className="text-sm font-medium">Fellow of the Higher Education Academy</p>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Certificate image */}
        <div className="overflow-y-auto flex-1 p-4">
          <div className="relative w-full aspect-[3/4]">
            <Image
              src="/fhea-certificate.png"
              alt="FHEA Certificate — Richard Bartlett, Fellow of the Higher Education Academy, PR301996, 12/02/2025"
              fill
              className="object-contain rounded-sm"
              sizes="(max-width: 512px) 100vw, 512px"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border shrink-0">
          <a
            href="https://www.advance-he.ac.uk/fellowship"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
          >
            Learn about Advance HE Fellowship <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="group block text-left w-full"
        aria-label="View FHEA certificate"
      >
        <p className="font-headline text-4xl md:text-5xl font-semibold text-accent mb-2 flex items-end gap-[1px] group-hover:opacity-80 transition-opacity">
          {animate ? (
            /* Letter-by-letter flash — CSS classes injected by CredentialsStrip */
            <>
              <span className="fhea-f inline-block">F</span>
              <span className="fhea-h inline-block">H</span>
              <span className="fhea-e inline-block">E</span>
              <span className="fhea-a inline-block">A</span>
            </>
          ) : (
            /* Invisible placeholder preserves layout until animation triggers */
            <span className="opacity-0 select-none">FHEA</span>
          )}
          <ExternalLink size={16} className="mb-1.5 ml-1 opacity-40 group-hover:opacity-70 transition-opacity" />
        </p>
        <p className="text-sm text-muted-foreground leading-snug">Advance HE Fellow</p>
      </button>

      {modal}
    </>
  );
}
