
'use client';

import React, { useEffect } from 'react';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';
import { Image as TipTapImage } from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Quote, Code, Link as LinkIcon, Link2Off, Undo, Redo, Heading2, Image as ImageIcon } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import he from 'he';


const TOOLBTN =
  "inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-foreground " +
  "hover:bg-[#37605f]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "transition-colors disabled:opacity-50 disabled:pointer-events-none " +
  "[aria-pressed=true]:bg-muted [aria-pressed=true]:text-foreground";

function toDirectImgur(urlStr: string): string | null {
  try {
    const u = new URL(urlStr);
    if (u.hostname === 'i.imgur.com') return urlStr;
    if (u.hostname === 'imgur.com' || u.hostname === 'www.imgur.com') {
      const id = u.pathname.split('/').filter(Boolean).pop();
      if (!id) return null;
      return `https://i.imgur.com/${id}.jpg`;
    }
  } catch {}
  return null;
}

function isDirectImageUrl(urlStr: string): boolean {
  return /\.(png|jpe?g|gif|webp)$/i.test(urlStr);
}


const IMAGE_BASE = 'mx-auto my-4 h-auto rounded-md'; // shared classes
const SIZE_PRESETS = {
  sm:  'max-w-md',   // ~28rem wide cap
  md:  'max-w-xl',   // ~36rem wide cap
  full:'w-full',     // fill container width
} as const;

const ALIGN_PRESETS = {
  left:  'float-left mr-4',
  center:'mx-auto',
  right: 'float-right ml-4',
} as const;

// Make sure Image is configured; keep any config you already have
const imageExt = TipTapImage.configure({
  inline: false,
  HTMLAttributes: { class: `${IMAGE_BASE} ${SIZE_PRESETS.md} ${ALIGN_PRESETS.center}` },
});

// helper to apply attrs to the selected image node
function updateSelectedImage(editor: Editor | null, attrs: Partial<{ class: string }>) {
  if (!editor) return;
  const isImage = editor.isActive('image');
  if (!isImage) return; // only act if selection is on an image
  editor.chain().focus().updateAttributes('image', attrs).run();
}

// utilities to compose class strings consistently
function buildImgClass({ size, align }: { size?: keyof typeof SIZE_PRESETS; align?: keyof typeof ALIGN_PRESETS }) {
  const s = size ? SIZE_PRESETS[size] : SIZE_PRESETS.md;
  const a = align ? ALIGN_PRESETS[align] : ALIGN_PRESETS.center;
  // remove any previous size/align tokens by rebuilding from base,
  // so we don’t accumulate classes
  return `${IMAGE_BASE} ${s} ${a}`;
}


export default function RichEditor({
  initialHtml = '',
  onChange,
}: {
  initialHtml?: string;
  onChange?: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ 
        history: false,
        heading: { levels: [2, 3] },
      }),
      History.configure({ depth: 100 }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ['http', 'https', 'mailto'],
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      imageExt,
    ],
    content: initialHtml,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none min-h-[240px] focus:outline-none',
      },
      handleKeyDown(view, event) {
        const mod = event.metaKey || event.ctrlKey;
        if (mod && event.key.toLowerCase() === 'k') {
          event.preventDefault();
          const href = window.prompt('Enter URL', editor?.getAttributes('link')?.href ?? '');
          if (href) {
            editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
          }
          return true;
        }
        return false;
      },
      handlePaste(view, event, slice) {
        const text = event.clipboardData?.getData('text/plain')?.trim();
        if (text && /^https?:\/\//i.test(text)) {
          const direct = isDirectImageUrl(text) ? text : toDirectImgur(text);
          if (direct) {
            event.preventDefault();
            editor?.chain().focus().setImage({ src: direct, alt: '' }).run();
            return true;
          }
        }
        
        const html = event.clipboardData?.getData('text/html');
        if (html) {
            event.preventDefault();
            const clean = DOMPurify.sanitize(html, {
                USE_PROFILES: { html: true },
                ALLOWED_TAGS: ['p','br','strong','em','u','s','ul','ol','li','blockquote','code','pre','a','img','figure','figcaption','iframe','h2','h3','h4'],
                ALLOWED_ATTR: ['href','title','target','rel','src','alt','width','height','loading','referrerpolicy','class','allow','allowfullscreen'],
            });
            if (clean) {
                editor?.commands.insertContent(clean);
                return true;
            }
        }

        return false;
      }
    }
  });

   useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== initialHtml) {
        editor.commands.setContent(initialHtml || '', false);
    }
  }, [initialHtml, editor]);

  if (!editor) return null;

  const canUndo = !!editor.can().undo?.();
  const canRedo = !!editor.can().redo?.();
  
  const handleImageInsert = () => {
    const imgUrl = window.prompt('Enter image URL (including Imgur links)');
    if (!imgUrl) return;

    const input = imgUrl.trim();
    let src = '';
    if (isDirectImageUrl(input)) {
        src = input;
    } else {
        const direct = toDirectImgur(input);
        if (direct) src = direct;
    }

    if (!src) {
        alert('Please provide a direct image URL or a valid Imgur link (e.g. imgur.com/xxxx).');
        return;
    }

    const size = (window.prompt('Size? sm | md | full (default md)') || 'md') as 'sm' | 'md' | 'full';

    editor.chain().focus().setImage({ 
        src: src, 
        alt: '',
        class: buildImgClass({ size, align: 'center' }),
    }).run();
  };

  return (
    <div className="rounded-xl border bg-background shadow-sm">
      <div
        role="toolbar"
        aria-label="Formatting"
        className="sticky top-0 z-10 -mx-4 mb-3 flex flex-wrap items-center gap-2 border-b bg-background px-4 py-2 sm:mx-0"
      >
        <button type="button" aria-label="Bold" aria-pressed={editor?.isActive('bold') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Italic" aria-pressed={editor?.isActive('italic') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Heading 2" aria-pressed={editor?.isActive('heading', { level: 2 }) ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Bullet list" aria-pressed={editor?.isActive('bulletList') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Ordered list" aria-pressed={editor?.isActive('orderedList') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Blockquote" aria-pressed={editor?.isActive('blockquote') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Code" aria-pressed={editor?.isActive('codeBlock') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>
          <Code className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Image" className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={handleImageInsert}>
          <ImageIcon className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Link" aria-pressed={editor?.isActive('link') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => {
            const current = editor?.getAttributes('link')?.href ?? '';
            const href = window.prompt('Enter URL', current || 'https://');
            if (!href) return;
            editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
          }}>
          <LinkIcon className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Unlink" className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')}>
          <Link2Off className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground mr-1">Size</span>
            <button
                type="button"
                className={TOOLBTN}
                aria-pressed={false}
                title="Small"
                onClick={() => updateSelectedImage(editor, { class: buildImgClass({ size: 'sm' }) })}
                disabled={!editor?.isActive('image')}
            >S</button>

            <button
                type="button"
                className={TOOLBTN}
                aria-pressed={false}
                title="Medium"
                onClick={() => updateSelectedImage(editor, { class: buildImgClass({ size: 'md' }) })}
                disabled={!editor?.isActive('image')}
            >M</button>

            <button
                type="button"
                className={TOOLBTN}
                aria-pressed={false}
                title="Full width"
                onClick={() => updateSelectedImage(editor, { class: buildImgClass({ size: 'full' }) })}
                disabled={!editor?.isActive('image')}
            >Full</button>
        </div>
        
        <div className="ml-auto flex items-center gap-1">
          <button type="button" aria-label="Undo" className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().undo().run()} disabled={!canUndo}>
            <Undo className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Redo" className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().redo().run()} disabled={!canRedo}>
            <Redo className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="min-h-[240px] px-4 pb-4 pt-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
