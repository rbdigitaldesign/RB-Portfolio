import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

// Keep HTML simple & safe
marked.setOptions({
  breaks: true,
  gfm: true,
  mangle: false,
  headerIds: true,
});

export function mdToHtmlSafe(md: string): string {
  const rawHtml = marked.parse(md || '') as string;

  // allow images & links; strip scripts/styles
  const clean = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'p','br','strong','em','blockquote','code','pre','ul','ol','li','a',
      'h1','h2','h3','h4','h5','h6','img','hr', 'figure', 'figcaption'
    ],
    ADD_ATTR: ['target','rel','class','loading','referrerpolicy', 'src', 'alt', 'title'],
  });

  // Post-process: make external links safe + images responsive
  return clean
    .replaceAll('<a ', '<a target="_blank" rel="noopener noreferrer" ')
    .replaceAll('<img ', '<img loading="lazy" class="blog-img" ');
}
