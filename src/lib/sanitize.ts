import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html || '', {
    ADD_ATTR: ['class', 'style', 'loading', 'referrerpolicy', 'rel'],
    ALLOWED_TAGS: [
      'a','b','strong','em','ul','ol','li','blockquote','code','pre','p','br','hr','h1','h2','h3','h4','img','figure','figcaption'
    ],
  });
}
