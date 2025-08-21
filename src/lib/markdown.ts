
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

marked.setOptions({
  breaks: true,
  gfm: true,
});

export function mdToSafeHtml(md: string): string {
  const html = marked.parse(md ?? '', { breaks: true }) as string;
  
  // Allow images + basic attributes
  const purify = DOMPurify as any;
   purify.addHook?.('uponSanitizeElement', (node: Element) => {
    if (node.tagName === 'IMG') {
      node.setAttribute('class', 'mx-auto my-4 max-w-full h-auto rounded-md');
      node.setAttribute('loading', 'lazy');
      node.setAttribute('decoding', 'async');
    }
  });

  return purify.sanitize(html, {
     ALLOWED_TAGS: [
      'p','br','strong','em','blockquote','code','pre','ul','ol','li','a',
      'h1','h2','h3','h4','h5','h6','img','hr'
    ],
    ALLOWED_ATTR: ['href','title','target','rel','src','alt','width','height','loading','decoding','class'],
  });
}
