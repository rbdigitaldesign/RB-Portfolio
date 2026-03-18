'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyCitation({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 border border-border rounded hover:border-foreground/30"
      aria-label="Copy citation"
    >
      {copied ? (
        <><Check className="h-3 w-3 text-accent" /> Copied</>
      ) : (
        <><Copy className="h-3 w-3" /> Copy</>
      )}
    </button>
  );
}
