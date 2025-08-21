
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

// Configure marked to keep images and basic formatting
marked.setOptions({
  breaks: true,
  gfm: true,
});

export function markdownToSafeHtml(md: string): string {
  const raw = marked.parse(md || '') as string;

  // Allow images + basic attributes
  const purify = DOMPurify as any;
  purify.addHook?.('uponSanitizeElement', (node: Element) => {
    if (node.tagName === 'IMG') {
      // Tailwind-friendly, responsive images
      node.setAttribute('class', 'mx-auto my-4 max-w-full h-auto');
      node.setAttribute('loading', 'lazy');
      node.setAttribute('decoding', 'async');
    }
  });

  return purify.sanitize(raw, {
    ALLOWED_TAGS: [
      'p','br','strong','em','blockquote','code','pre','ul','ol','li','a',
      'h1','h2','h3','h4','h5','h6','img','hr'
    ],
    ALLOWED_ATTR: ['href','title','target','rel','src','alt','width','height','loading','decoding','class'],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script','style'],
  });
}
