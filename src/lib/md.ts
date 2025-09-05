
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = (href, title, text) => {
  const html = linkRenderer.call(renderer, href, title, text);
  // Add target="_blank" and rel="noopener noreferrer" to external links
  if (href && (href.startsWith('http') || href.startsWith('//'))) {
    return html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" ');
  }
  // For internal links, just return the original HTML
  return html;
};


// Keep HTML simple & safe
marked.setOptions({
  breaks: true,
  gfm: true,
  mangle: false,
  headerIds: true,
  renderer: renderer, // Use our custom renderer
});

export function mdToHtmlSafe(md: string): string {
  const rawHtml = marked.parse(md || '') as string;

  // allow images & links; strip scripts/styles
  const clean = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'p','br','strong','em','blockquote','code','pre','ul','ol','li','a','h1','h2','h3','h4','h5','h6','img','hr','figure','figcaption',
      'div','span','svg','path'
    ],
    ALLOWED_ATTR: [
      'class','id','role','aria-label','aria-hidden','tabindex',
      'href','title','alt','target','rel','loading','decoding',
      'viewBox','focusable','xmlns','fill','stroke','stroke-width','d'
    ],
  });

  // Post-process: make images responsive
  return clean
    .replaceAll('<img ', '<img loading="lazy" class="blog-img" ');
}
