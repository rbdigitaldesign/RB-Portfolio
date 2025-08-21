
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html || '', {
    ADD_TAGS: ['iframe', 'video', 'figure', 'figcaption'],
    ADD_ATTR: [
      'allow', 'allowfullscreen', 'frameborder', 'scrolling', 
      'src', 'alt', 'title', 'width', 'height', 'loading', 'class', 
      'target', 'rel'
    ],
  });
}
