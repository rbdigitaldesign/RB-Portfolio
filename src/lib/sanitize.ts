
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html: string): string {
  // Allow style for image width control
  DOMPurify.addHook('uponSanitizeAttribute', (node, data) => {
    if (data.attrName === 'style') {
      // only allow width property
      if (!/^width:\s*\d+(\.\d+)?%$/.test(data.attrValue)) {
        data.keepAttr = false;
      } else {
        // Keep the style if it matches
        return;
      }
    }
  });

  return DOMPurify.sanitize(html || '', {
    ADD_ATTR: ['class', 'style', 'loading', 'referrerpolicy', 'rel'],
    ALLOWED_TAGS: [
      'a','b','strong','em','ul','ol','li','blockquote','code','pre','p','br','hr','h1','h2','h3','h4','img','figure','figcaption'
    ],
  });
}

    